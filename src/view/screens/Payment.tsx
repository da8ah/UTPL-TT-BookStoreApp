import { useNavigation } from "@react-navigation/native";
import { BillingDetails, CardField, StripeProvider, useConfirmPayment } from "@stripe/stripe-react-native";
import { Details } from "@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput";
import { Button, Icon, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Card from "../../model/core/entities/Card";
import LoadingAlert from "../components/LoadingAlert";
import ModalDisplay from "../components/ModalDisplay";
import { RootNavProps } from "../routes/types.nav";
import AlertModal, { AlertModalProps } from "./layouts/AlertModal";
import CartStatus from "./layouts/CartStatus";

const styles = StyleSheet.create({
    common: {
        width: "100%"
    },
    container: { flex: 1 },
    cartHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    body: { flex: 4, width: "100%", justifyContent: "space-between", paddingVertical: 5 },
    paymentCardField: {
        height: 100,
        paddingHorizontal: 2,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default function Payment() {
    const { myCart, togglePayment, publishableKey, queryPublishableKey } = useCart()
    const fecha = new Date().toLocaleDateString("ec")

    useEffect(() => {
        togglePayment()
        queryPublishableKey()
        return () => togglePayment()
    }, [])

    return (
        <View style={[styles.common, styles.container]}>
            <View style={[styles.cartHeader, { backgroundColor: 'limegreen' }]}>
                <Text category="h3" style={{ color: "white", fontSize: 24, fontStyle: "italic" }}>
                    Pagar mi Carrito
                </Text>
            </View>
            <CartStatus fecha={fecha} subtotal={myCart.getSubtotal()} ivaCalc={myCart.getIvaCalc()} discountCalc={myCart.getDiscountCalc()} total={myCart.getTotalPrice()} />
            {!publishableKey ? (
                <LoadingAlert title="Generando Pago" />
            ) : (
                <StripeProvider key={"stripe"} publishableKey={publishableKey}>
                    <OrderFooter />
                </StripeProvider>
            )}
        </View>
    );
};

const OrderFooter = () => {
    const navigation = useNavigation<RootNavProps>()
    const { client, updateClient } = useAuth()
    const { confirmPayment } = useConfirmPayment()
    const { sendPaymentToServer, sendTransactionToServer, emptyCart } = useCart()

    const [isPress, setPressState] = useState(false)
    const [codeStatus, setCodeStatus] = useState('')
    const [confirmDisabled, setConfirmDisabledState] = useState<boolean>(true)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [isPaymentInProgress, setPaymentInProgress] = useState(false)

    function getModalAlertProps(codeStatus: string): AlertModalProps {
        const volverAlCarrito = () => {
            setModalVisibility(false)
            navigation.navigate("CartOrder")
        }
        switch (codeStatus) {
            case ":400": return {
                modalType: "failed",
                data: {
                    title: "Pago NO generado",
                    iconName: "alert-triangle-outline",
                    message: "Verifique los datos"
                },
                onButtonPress: volverAlCarrito
            }
            case "400": return {
                modalType: "failed",
                data: {
                    title: "Pago generado con errores",
                    iconName: "alert-triangle-outline",
                    message: "Intente generar el pago nuevamente"
                },
                onButtonPress: volverAlCarrito
            }
            case "4001": return {
                modalType: "failed",
                data: {
                    title: "Falló la operación",
                    iconName: "alert-triangle-outline",
                    message: "El pago no pudo ser procesado"
                },
                onButtonPress: volverAlCarrito
            }
            case "4002": return {
                modalType: "failed",
                data: {
                    title: "Transacción no registrada",
                    message: "El pago se procesó pero no se registró"
                },
                onButtonPress: volverAlCarrito
            }
            case "200": return {
                modalType: "success",
                data: {
                    title: "Pago realizado con éxito",
                    message: "Volviendo al Inicio"
                },
                onButtonPress: () => {
                    emptyCart()
                    setModalVisibility(false)
                    navigation.navigate("BottomNav", { screen: "Home" })
                }
            }
            default:
                return {
                    modalType: "failed",
                    data: {
                        title: "Fuera de servicio",
                        message: "Servidor ocupado, intente más tarde"
                    },
                    onButtonPress: volverAlCarrito
                }
        }
    }

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
                        if (client.getCards().length === 0) {
                            client.setCards([
                                new Card(
                                    client.getName(),
                                    cardDetails.last4,
                                    cardDetails.cvc || '',
                                    `${cardDetails.expiryMonth}/${cardDetails.expiryYear - 2000}`
                                ),
                            ])
                        }
                    } else setConfirmDisabledState(true)
                }}
            />
            {isPaymentInProgress && <LoadingAlert title="Procesando Pago" />}
            <View style={{ alignItems: "center" }}>
                <Button
                    disabled={confirmDisabled}
                    style={{ width: "90%" }}
                    status={!isPress ? "info" : "success"}
                    accessoryLeft={!isPress ? UnlockIcon : undefined}
                    accessoryRight={isPress ? LockIcon : undefined}
                    onPressIn={() => setPressState(true)}
                    onPressOut={() => {
                        if (!confirmDisabled) setPressState(false);
                    }}
                    onLongPress={async () => {
                        setConfirmDisabledState(true);
                        setPaymentInProgress(true)
                        const resultado = await sendPaymentToServer() as { codeStatus: string, clientSecret?: string }
                        setCodeStatus(resultado.codeStatus)
                        if (!resultado?.clientSecret) { setCodeStatus(":400"); return }

                        const billingDetails: BillingDetails = {
                            name: client.getName(),
                            email: client.getEmail(),
                            phone: client.getMobile(),
                        }
                        const { error, paymentIntent } = await confirmPayment(resultado.clientSecret, {
                            paymentMethodType: "Card",
                            paymentMethodData: {
                                billingDetails,
                            }
                        })
                        if (error) setCodeStatus("4001")
                        if (paymentIntent) {
                            setCodeStatus(await sendTransactionToServer(client) ? "200" : "4002")
                            updateClient()
                        }
                        setPaymentInProgress(false)
                        setModalVisibility(true)
                    }}
                >
                    {isPress ? "MANTEN PRESIONADO" : "CONFIRMAR PAGO"}
                </Button>
                <ModalDisplay
                    visible={modalVisibility}
                    onBackdropPress={() => {
                        if (Keyboard.isVisible()) Keyboard.dismiss()
                        getModalAlertProps(codeStatus).onButtonPress()
                    }}
                >
                    <AlertModal {...getModalAlertProps(codeStatus)} />
                </ModalDisplay>
            </View>
        </KeyboardAvoidingView>
    );
};