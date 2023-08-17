import { useNavigation } from "@react-navigation/native";
import { Button, Icon, List, Text, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import ModalDisplay from "../components/ModalDisplay";
import { RootNavProps } from "../routes/types.nav";
import AlertModal from "./layouts/AlertModal";
import CartItem from "./layouts/CartItem";
import CartStatus from "./layouts/CartStatus";

export default function CartOrder() {
    const navigation = useNavigation<RootNavProps>()
    const theme = useTheme()
    const { isAuth, isBioSupported, isBioAuth, checkBioSupport, requestFingerprint, client } = useAuth()
    const [modalVisibility, setModalVisibility] = useState(false)

    const { myCart, toggleCart, setUserToCart, emptyCart } = useCart()
    const fecha = new Date().toLocaleDateString("ec")

    useEffect(() => {
        toggleCart()
        checkBioSupport()
        return () => toggleCart()
    }, []);

    const CleanIcon = () => <Icon name="trash-2" fill="white" height="25" width="25" />
    const ButtonIconLeft = () => <Icon name="shopping-cart" fill="white" height="25" width="25" />
    const ButtonIconRight = () => <Icon name="arrow-circle-right-outline" fill="white" height="25" width="25" />
    return <View style={{ flex: 1 }}>
        <View style={styles.cartHeader}>
            <Text category="h3" style={{ color: "white", fontSize: 20, fontStyle: "italic" }}>
                {isAuth ? `Carrito de ${client.getUser().toUpperCase()}` : "En mi Carrito"}
            </Text>
            <Button
                size="tiny"
                status="danger"
                activeOpacity={0.3}
                accessoryLeft={CleanIcon}
                onPress={emptyCart}
            />
        </View>
        <CartStatus fecha={fecha} subtotal={myCart.getSubtotal()} ivaCalc={myCart.getIvaCalc()} discountCalc={myCart.getDiscountCalc()} total={myCart.getTotalPrice()} />
        <View style={styles.cartBooks}>
            <List
                style={{ backgroundColor: theme['background-basic-color-2'] }}
                contentContainerStyle={{ backgroundColor: theme['background-basic-color-2'] }}
                scrollEnabled
                data={myCart.getToBuyBooks()}
                extraData={myCart.getToBuyBooks()}
                renderItem={CartItem}
                refreshing={false}
            />
        </View>
        <Button
            size="large"
            status="warning"
            style={styles.button}
            accessoryLeft={ButtonIconLeft}
            accessoryRight={ButtonIconRight}
            onPress={async () => {
                if (!isBioSupported) { setModalVisibility(true); return }
                if (myCart.getToBuyBooks().length <= 0) return

                if (isBioAuth || await requestFingerprint()) {
                    if (isAuth) {
                        setUserToCart(client.getUser())
                        navigation.navigate("Payment")
                    } else navigation.navigate("BottomNav", { screen: "UserNav", params: { screen: 'SignIn', params: { calledFromPayment: true } } })
                }
            }}
        >
            Ir a CAJA
        </Button>
        <ModalDisplay
            visible={modalVisibility}
            onBackdropPress={() => { if (Keyboard.isVisible()) Keyboard.dismiss(); setModalVisibility(false) }}
        >
            <AlertModal
                modalType="failed"
                data={{ title: "Huella Dactilar REQUERIDA", message: "No es posible realizar PAGOS" }}
                onButtonPress={() => setModalVisibility(false)}
            />
        </ModalDisplay>
    </View>
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "grey" },
    cartHeader: {
        backgroundColor: "black",
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    cartStatus: { flex: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    cartBooks: { flex: 25 },
    button: {},
    statusLayouts: { backgroundColor: "transparent", alignItems: "center", paddingVertical: 5 },
    statusProperties: { color: 'black', textAlign: "center", fontSize: 12, fontWeight: "bold" },
});