import { useNavigation } from "@react-navigation/native";
import { Button, Icon, List, Text, useTheme } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import useAppViewModel from "../../hooks/context/useAppViewModel";
import Cart from "../../model/core/entities/Cart";
import ToBuyBook from "../../model/core/entities/ToBuyBook";
import RoundButton from "../components/RoundButton";
import { RootNavProps } from "../routes/types.nav";
import CartItem from "./layouts/CartItem";

export default function CartOrder() {
    const navigation = useNavigation<RootNavProps>()
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()

    const { vimo } = useAppViewModel()
    const [refreshing, setRefreshing] = useState(false);

    const [cart, setCart] = useState<Cart>(new Cart([new ToBuyBook('', '', '', '', '', 20, false, 0, false, 1)]));
    const [books, setBooks] = useState(cart.getToBuyBooks());
    const [descuento, setDescuento] = useState(cart.getDiscountCalc() || 0);
    const [iva, setIva] = useState(cart?.getIvaCalc() || 0);
    const [subtotal, setSubtotal] = useState(cart.getSubtotal() || 0);
    const [total, setTotal] = useState(cart.getTotalPrice() || 0);
    const fecha = new Date().toLocaleDateString("ec");

    useEffect(() => { }, [cart, books, fecha, descuento, iva, subtotal, total]);

    const ButtonIconLeft = () => <Icon name="shopping-cart" fill="white" height="25" width="25" />
    const ButtonIconRight = () => <Icon name="arrow-circle-right-outline" fill="white" height="25" width="25" />
    return <View style={{ flex: 1 }}>
        <View style={styles.cartHeader}>
            <Text category="h3" style={{ color: "white", fontStyle: "italic" }}>
                En mi Carrito
            </Text>
        </View>
        <View style={styles.cartStatus}>
            <View style={[styles.statusLayouts, { width: "20%" }]}>
                <Text style={{ fontWeight: "bold" }}>Fecha</Text>
                <Text style={[styles.statusProperties, { fontWeight: "normal" }]}>{fecha}</Text>
            </View>
            <View style={[styles.statusLayouts]}>
                <Text style={[styles.statusProperties]}>Subtotal</Text>
                <Text style={[styles.statusProperties, { fontSize: 13 }]}>{subtotal.toFixed(2)}</Text>
            </View>
            <View style={[styles.statusLayouts]}>
                <Text style={[styles.statusProperties]}>IVA</Text>
                <Text style={[styles.statusProperties, { color: "darkred" }]}>+{iva.toFixed(2)}</Text>
            </View>
            <View style={[styles.statusLayouts]}>
                <Text style={[styles.statusProperties]}>Descuento</Text>
                <Text style={[styles.statusProperties, { color: "darkgreen" }]}>-{descuento.toFixed(2)}</Text>
            </View>
            <View style={[styles.statusLayouts, { backgroundColor: "orange", width: "25%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]}>
                <Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>TOTAL</Text>
                <Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>$ {total.toFixed(2)}</Text>
            </View>
        </View>
        <View style={styles.cartBooks}>
            <List scrollEnabled data={books} extraData={books} renderItem={CartItem} refreshing={refreshing} />
        </View>
        <Button
            size="large"
            status="warning"
            style={styles.button}
            accessoryLeft={ButtonIconLeft}
            accessoryRight={ButtonIconRight}
            onPress={() => {
                // const books = cartViMo.getCart().getToBuyBooks();
                // if (books !== undefined && books.length > 0) {
                //     cartViMo.setCallFromCart(true);
                //     navigation.navigate(clientViMo.isAuth() ? "Order" : "SignIn");
                // }
                // handleCloseModalPress();
            }}
        >
            Ir a CAJA
        </Button>
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
    statusProperties: { textAlign: "center", fontSize: 12, fontWeight: "bold" },
});