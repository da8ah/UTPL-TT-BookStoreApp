import { Text } from "@ui-kitten/components";
import { useState } from "react";
import { Image, Keyboard, ListRenderItem, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import useCart from "../../../hooks/useCart";
import ToBuyBook from "../../../model/core/entities/ToBuyBook";
import ModalDisplay from "../../components/ModalDisplay";
import ModalCant from "./ModalCant";

const transparent = "transparent";
const styles = StyleSheet.create({
    common: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    cardLayout: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
        padding: 2,
        margin: 2,
        borderRadius: 7,
    },
    cardLeft: { backgroundColor: "white", width: "30%", borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
    cardCenter: { backgroundColor: transparent, width: "50%", justifyContent: "space-around" },
    cardRight: { backgroundColor: transparent, width: "50%" },
    imageLayout: { backgroundColor: transparent, height: 75, alignItems: "center", borderRadius: 5 },
    image: {
        height: 75,
        resizeMode: "contain",
    },
});

const CartItem: ListRenderItem<ToBuyBook> = (info: ListRenderItemInfo<ToBuyBook>) => <CardToBuyBook book={info.item} index={info.index} />;

export default CartItem;

const CardToBuyBook = (props: { book: ToBuyBook; index: number }) => {
    const { rmBookFromCart } = useCart()
    const [isPressed, setPressedState] = useState(false);

    return (
        <View style={styles.cardLayout}>
            <ItemLeftPanel book={props.book} />
            <TouchableOpacity
                style={{
                    backgroundColor: isPressed ? "tomato" : "palegoldenrod",
                    width: '70%',
                    flexDirection: "row",
                    justifyContent: "center",
                    borderTopRightRadius: 7,
                    borderBottomRightRadius: 7
                }}
                activeOpacity={1}
                onPressIn={() => setPressedState(true)}
                onPressOut={() => setPressedState(false)}
                onLongPress={() => rmBookFromCart(props.book)}
            >
                <ItemCenterPanel book={props.book} cant={props.book.getCant()} />
                <ItemRightPanel book={props.book} cant={props.book.getCant()} />
            </TouchableOpacity>
        </View>
    );
};

const ItemLeftPanel = (props: { book: ToBuyBook }) => {
    const title = props.book.getTitle();
    return (
        <View style={styles.cardLeft}>
            <View style={styles.imageLayout}>
                <Image style={styles.image} source={require("@Assets/bookstore.png")} />
            </View>
            <ScrollView
                style={{ height: 25 }}
                horizontal
                alwaysBounceHorizontal
                showsVerticalScrollIndicator={false}
                fadingEdgeLength={50}
                contentContainerStyle={{ height: 20 }}
            >
                <Text style={{ fontSize: 12, color: "black", textAlignVertical: "center" }}>{title}</Text>
            </ScrollView>
        </View>
    );
};

const ItemCenterPanel = (props: { book: ToBuyBook; cant: number }) => {
    const { addBookToCart } = useCart()
    const [modalVisibility, setModalVisibility] = useState(false);

    const grossPrice = props.book.getGrossPricePerUnit() || 0;
    const discountAmount = props.book.getDiscountedAmount() || 0;
    const price = (props.book.getGrossPricePerUnit() || NaN) - discountAmount;
    const inOffer = props.book.isInOffer();
    const itHasIva = props.book.itHasIva();

    return (
        <View style={[styles.common, styles.cardCenter]}>
            <View style={{ backgroundColor: transparent, width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
                <Text style={{ color: "darkgrey", fontSize: 10, fontStyle: "italic" }}>{inOffer ? "* En Oferta" : ""}</Text>
                <Text style={{ color: "darkgrey", fontSize: 10, fontStyle: "italic" }}>{itHasIva ? "* IVA" : ""}</Text>
            </View>
            <View style={{ backgroundColor: transparent, width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
                <View style={{ backgroundColor: transparent, alignItems: "center" }}>
                    <Text style={{ fontSize: 16, color: '#303136' }}>💲{price.toFixed(2)}</Text>
                    <Text
                        style={{
                            backgroundColor: transparent,
                            color: "red",
                            width: "100%",
                            textAlign: "right",
                            textAlignVertical: "top",
                            fontSize: 12,
                            fontStyle: "italic",
                            textDecorationLine: "line-through",
                        }}
                    >
                        {inOffer ? `$${grossPrice.toFixed(2)}` : ""}
                    </Text>
                </View>
                <View style={{ backgroundColor: transparent, alignItems: "flex-start", flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, color: '#303136' }}> x 📦</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: "tomato", height: 20, width: 20, borderRadius: 100, justifyContent: "center", alignItems: "center" }}
                        onPressIn={() => setModalVisibility(true)}
                    >
                        <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{props.cant}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ModalDisplay
                visible={modalVisibility}
                onBackdropPress={() => { if (Keyboard.isVisible()) Keyboard.dismiss(); setModalVisibility(false) }}
            >
                <ModalCant
                    isCart
                    cant={props.book.getCant()}
                    onButtonPress={stock => {
                        addBookToCart(props.book, stock)
                        setModalVisibility(false)
                    }}
                />
            </ModalDisplay>
        </View>
    );
};

const ItemRightPanel = (props: { book: ToBuyBook; cant: number }) => {
    const totalPrice = (props.book.getPriceCalcPerUnit() || NaN) * props.cant;

    return (
        <View style={[styles.common, styles.cardRight]}>
            <Text style={{ color: "yellowgreen", fontSize: 25, fontWeight: "bold", textAlign: "left" }} numberOfLines={1}>
                💲{totalPrice.toFixed(2)}
            </Text>
        </View>
    );
};