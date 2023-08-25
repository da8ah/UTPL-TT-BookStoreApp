import { ListRenderItemInfo } from "@shopify/flash-list";
import { Button, Divider, Icon, Text, useTheme } from "@ui-kitten/components";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import useThemeMode from "../../../hooks/useThemeMode";
import CardTransaction from "../../../model/core/entities/CardTransaction";

const CardHeader = (props: { id: string, date: string }) => (
    <View style={[styles.transparentBackground, styles.cardHeader]}>
        <View style={styles.transparentBackground}>
            <Text style={{ paddingVertical: 2, fontWeight: "bold", fontSize: 11 }}>
                {props.date}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
                Tipo: <Text style={{ fontStyle: "italic" }}>Card</Text>
            </Text>
            <Text style={{ fontWeight: "bold" }}>
                ID: <Text style={{ fontSize: 11 }}>{props.id}</Text>
            </Text>
        </View>
    </View>
);

const CardLateral = (props: { user: string; cant: number }) => (
    <View style={[styles.transparentBackground, styles.lateralLayout]}>
        <View style={[styles.transparentBackground, styles.client]}>
            <TouchableOpacity>
                <Text style={{ fontSize: 50, textAlign: "center" }} allowFontScaling adjustsFontSizeToFit>
                    💳
                </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.transparentBackground}>
            <View style={[styles.transparentBackground, { flexDirection: "row", justifyContent: "flex-end" }]}>
                <Text style={{ fontSize: 20, textAlign: "center" }} allowFontScaling adjustsFontSizeToFit>
                    {props.cant}
                </Text>
                <TouchableOpacity>
                    <Text style={{ fontSize: 40, textAlign: "center" }} allowFontScaling adjustsFontSizeToFit>
                        🛒
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const CardBody = (props: { subtotal: number, discountCalc: number; ivaCalc: number; totalPrice: number }) => (
    <View style={[styles.transparentBackground, styles.cardBody]}>
        <View style={[styles.transparentBackground, styles.bodyProperties]}>
            <Text style={{ fontWeight: "bold" }}>Subtotal</Text>
            <Text style={{ fontWeight: "bold" }}>{`$${props.subtotal.toFixed(2)}`}</Text>
        </View>
        <View style={[styles.transparentBackground, styles.bodyProperties]}>
            <Text style={{ fontStyle: "italic" }}>Descuento</Text>
            <Text style={{ color: "darkgreen", fontWeight: "bold" }}>{`- $${props.discountCalc.toFixed(2)}`}</Text>
        </View>
        <View style={[styles.transparentBackground, styles.bodyProperties]}>
            <Text style={{ fontStyle: "italic" }}>IVA</Text>
            <Text style={{ color: "darkred", fontWeight: "bold" }}>{`+ $${props.ivaCalc.toFixed(2)}`}</Text>
        </View>
        <View style={[styles.transparentBackground, styles.bodyProperties]}>
            <Text style={{ fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontWeight: "bold" }}>{`$${props.totalPrice.toFixed(2)}`}</Text>
        </View>
    </View>
);

const buttonIcon = () => <Icon name="layers" fill="white" height="15" width="15" />;
const CardButton = (props: { itemIndex: number }) => {
    const buttonAction = () => console.log(props.itemIndex);
    return (
        <View style={[styles.transparentBackground, styles.common, styles.buttonLayout]}>
            <Button disabled style={styles.button} size="small" status="info" accessoryLeft={buttonIcon} onPressOut={buttonAction}>
                Abrir
            </Button>
        </View>
    );
};

export default function TransactionCard(info: ListRenderItemInfo<CardTransaction>) {
    return <CardElement info={info} />
};
const CardElement = memo((props: { info: any }) => {
    const { themeMode } = useThemeMode()
    const theme = useTheme()
    const { item, index } = props.info
    const transaction = item
    const cart = transaction.getCart()
    return (
        <View style={[styles.mainLayout, { backgroundColor: themeMode === 'dark' ? theme['background-basic-color-3'] : 'gainsboro' }]}>
            {/* Card */}
            <View style={[styles.transparentBackground, styles.mainPanel]}>
                <View style={[styles.transparentBackground, styles.internalPanel]}>
                    <CardHeader id={transaction.getId()} date={transaction.getDate()} />
                    <Divider style={{ backgroundColor: 'white' }} />
                    {cart !== undefined &&
                        <CardBody
                            subtotal={cart.getSubtotal()}
                            discountCalc={cart.getDiscountCalc()}
                            ivaCalc={cart.getIvaCalc()}
                            totalPrice={cart.getTotalPrice()}
                        />
                    }
                </View>
                {cart && <CardLateral user={transaction.getUser()} cant={cart.getToBuyBooks().length} />}
            </View>
            {/* Button */}
            <Divider style={{ backgroundColor: 'white' }} />
            <CardButton itemIndex={index} />
        </View>
    );
})

const transparent = "transparent";

const styles = StyleSheet.create({
    transparentBackground: { backgroundColor: transparent },
    common: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    mainLayout: {
        height: 250,
        margin: 10,
        borderRadius: 7,
        justifyContent: "space-between",
    },
    mainLayoutDisplay: {
        display: "none",
    },
    mainPanel: {
        width: "100%",
        height: 200,
        flexDirection: "row",
    },
    internalPanel: { width: "80%", maxHeight: 200, paddingLeft: 2 },
    lateralLayout: { width: "20%", justifyContent: "space-between", paddingRight: 2 },
    cardHeader: {
        height: 70,
        paddingTop: 3,
        paddingHorizontal: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardBody: {
        width: "60%",
        height: 130,
        paddingHorizontal: 2,
        justifyContent: "space-around",
    },
    bodyProperties: {
        paddingHorizontal: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    client: {
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
    },
    buttonLayout: {
        height: 50,
        alignContent: "center",
    },
    button: { width: "30%", borderRadius: 20, opacity: 0.7 },
});