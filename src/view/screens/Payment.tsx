import { useNavigation } from "@react-navigation/native";
import { CardField, StripeProvider, useConfirmPayment } from "@stripe/stripe-react-native";
import { Details } from "@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput";
import { Button, Icon, Modal, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Card from "../../model/core/entities/Card";
import LoadingAlert from "../components/LoadingAlert";
import { RootNavProps } from "../routes/types.nav";
import CartStatus from "./layouts/CartStatus";

const styles = StyleSheet.create({
    common: {
        width: "100%"
    },
    container: { flex: 1 },
    body: { flex: 4, width: "100%", justifyContent: "space-between", paddingVertical: 5 },
    paymentCardField: {
        height: 100,
        paddingHorizontal: 2,
        alignItems: "center",
        justifyContent: "center",
    },
});

const Payment = () => {
    const { client } = useAuth()
    const { myCart, togglePayment, queryPublishableKey } = useCart()
    const fecha = new Date().toLocaleDateString("ec")

    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalChildren, setModalChildren] = useState<JSX.Element>();

    const [publishableKey, setPublishableKey] = useState<string>();

    const tryToGetKey = async () => {
        setPublishableKey(await queryPublishableKey(client.getUser()))
    }

    useEffect(() => {
        togglePayment()
        tryToGetKey()
        return () => togglePayment()
    }, [])

    return (
        <View style={[styles.common, styles.container]}>
            <CartStatus fecha={fecha} subtotal={myCart.getSubtotal()} ivaCalc={myCart.getIvaCalc()} discountCalc={myCart.getDiscountCalc()} total={myCart.getTotalPrice()} />
            {!publishableKey ? (
                <LoadingAlert />
            ) : (
                <>
                    <StripeProvider key={"stripe"} publishableKey={publishableKey}>
                        <OrderFooter setModalVisibility={setModalVisibility} setModalChildren={setModalChildren} />
                    </StripeProvider>
                </>
            )}
            <Modal visible={modalVisibility} style={{ width: "70%" }} backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} children={modalChildren} />
        </View>
    );
};

export default Payment;

const ModalSaveConfirmation = (props: {
    codeStatus: string | null;
    goBack: () => void;
    setModalVisibility: (value: boolean) => void;
}) => {
    let title;
    let message;
    let icon;
    let buttonStatus;

    switch (props.codeStatus) {
        case ":400":
            title = "Pago generado con errores";
            message = "(Verifique los datos)";
            icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
            buttonStatus = "warning";
            break;
        case "400":
            title = "Pago generado con errores";
            message = "(Intente generar el pago nuevamente)";
            icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
            buttonStatus = "warning";
            break;
        case "4001":
            title = "Falló la operación";
            message = "(El pago no pudo ser procesado)";
            icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
            buttonStatus = "warning";
            break;
        case "4002":
            title = "Transacción no registrada";
            message = "(El pago se procesó pero no se registró)";
            icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
            buttonStatus = "danger";
            break;
        case "200":
            title = "Pago realizado con éxito";
            message = "(Volviendo al Inicio)";
            icon = <Icon name="checkmark-circle-outline" fill="darkgreen" height="30" width="30" />;
            buttonStatus = "success";
            break;
        default:
            title = "Fuera de servicio";
            message = "(Servidor no disponible, intente más tarde)";
            icon = <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />;
            buttonStatus = "danger";
            break;
    }

    return (
        <View style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
            <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                <Text style={{ textTransform: "uppercase" }}>{title}</Text>
                {icon}
                <Text style={{ fontSize: 12, marginVertical: 5 }}>{message}</Text>
            </View>
            <Button
                size="small"
                status={buttonStatus}
                style={{ width: "50%", marginTop: 10 }}
                onPress={() => {
                    props.setModalVisibility(false);
                    if (props.goBack && props.codeStatus !== ":400") props.goBack();
                }}
            >
                Ok
            </Button>
        </View>
    );
};

const OrderFooter = (props: { setModalVisibility: (visibility: boolean) => void; setModalChildren: (children: JSX.Element) => void }) => {
    const navigation = useNavigation<RootNavProps>()
    const { client } = useAuth()
    const { transactionResult, sendPaymentToServer, sendTransactionToServer } = useCart()
    const { confirmPayment } = useConfirmPayment()

    const [isPress, setPressState] = useState(false);
    const [confirmDisabled, setConfirmDisabledState] = useState<boolean>(true);

    const validateCardInputs = (cardDetails: Details) => {
        const postalCode = cardDetails.postalCode;
        const postalCodeRegEx: RegExp = /^\d{6}$/;
        if (postalCode) return postalCodeRegEx.test(postalCode);
        else return false;
    }

    const UnlockIcon = () => <Icon name="unlock" fill="white" height="30" width="30" />;
    const LockIcon = () => <Icon name="lock" fill="white" height="30" width="30" />;
    return (
        <KeyboardAvoidingView style={styles.body}>
            <CardField
                autofocus={true}
                style={styles.paymentCardField}
                onCardChange={(cardDetails) => {
                    const completed = cardDetails.complete;
                    if (completed && validateCardInputs(cardDetails)) {
                        setConfirmDisabledState(false)
                        client
                            .setCards([
                                new Card(
                                    client.getName(),
                                    cardDetails.last4,
                                    cardDetails.cvc || '',
                                    `${cardDetails.expiryMonth}/${cardDetails.expiryYear - 2000}`,
                                ),
                            ]);
                    } else setConfirmDisabledState(true)
                }}
            />
            <View style={{ alignItems: "center" }}>
                <Button
                    disabled={confirmDisabled}
                    style={{ width: "90%" }}
                    status={!isPress ? "warning" : "success"}
                    accessoryLeft={!(isPress || confirmDisabled) ? UnlockIcon : LockIcon}
                    onPressIn={() => setPressState(true)}
                    onPressOut={() => {
                        if (!confirmDisabled) setPressState(false);
                    }}
                    onLongPress={async () => {
                        // setConfirmDisabledState(true);
                        // const resultado = await sendPaymentToServer()
                        // if (resultado?.clientSecret) {
                        //     const billingDetails: BillingDetails = {
                        //         name: client.getName(),
                        //         email: client.getEmail(),
                        //         phone: client.getMobile(),
                        //     };
                        //     const { error, paymentIntent } = await confirmPayment(resultado.clientSecret, {
                        //         paymentMethodType: "Card",
                        //         paymentMethodData: {
                        //             billingDetails,
                        //         },
                        //     });
                        //     if (error) resultado.codeStatus = "4001";
                        //     if (paymentIntent) {
                        //         resultado.codeStatus = (await sendTransactionToServer()) || "4002";
                        //     }
                        // }
                        // props.setModalChildren(
                        //     <ModalSaveConfirmation
                        //         codeStatus={resultado?.codeStatus || null}
                        //         goBack={navigation.pop}
                        //         setModalVisibility={props.setModalVisibility}
                        //     />,
                        // );
                        // props.setModalVisibility(true)
                    }}
                >
                    CONFIRM PAYMENT
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
};