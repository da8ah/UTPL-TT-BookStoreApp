import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { memo } from "react";
import { Image, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import StockBook from "../../../model/core/entities/StockBook";
import { RootNavProps } from "../../routes/types.nav";

const CardTop = (props: { price: number; isInOffer: boolean; discountPercentage: number }) => (
    <View style={[styles.common, styles.cardTop]}>
        <View style={[styles.common, styles.cardHeader]}>
            <Text status="success">
                💲{props.price % 1 !== 0 ? props.price.toFixed(2) : props.price}
            </Text>
            <Text style={{ color: "red", fontStyle: "italic" }}>{props.isInOffer ? `-${props.discountPercentage}%` : ""}</Text>
        </View>
        <Image style={styles.image} source={require("@Assets/bookstore.png")} />
    </View>
);

const CardBottom = (props: { title: string; author: string; }) => {
    return (
        <View style={styles.cardBody}>
            <ScrollView
                horizontal
                alwaysBounceHorizontal
                style={{ height: 30 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                fadingEdgeLength={50}
            >
                <Text style={{ fontStyle: "italic" }}>{props.title}</Text>
            </ScrollView>
            <ScrollView
                horizontal
                alwaysBounceHorizontal
                style={{ height: 20 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                fadingEdgeLength={50}
            >
                <Text style={{ fontSize: 11 }}>
                    {props.author}
                </Text>
            </ScrollView>
        </View>
    );
};

const ButtonIcon = () => <Icon name="plus-circle" fill="white" height="15" width="15" />;
const CardButton = (props: { bookISBN: string }) => {
    // const { vimo } = useAppViewModel()
    const theme = useTheme()
    const navigation = useNavigation<RootNavProps>();

    return (
        <View style={[styles.common, styles.buttonLayout]}>
            <Button
                style={[styles.common, { width: '60%' }]}
                accessoryRight={ButtonIcon}
                status="info"
                size="tiny"
                onPress={() => {
                    // vimo.createDraftByISBN(props.bookISBN)
                    // navigation.navigate("BookEditor", { bookISBN: props.bookISBN })
                }}
            >
                AGREGAR
            </Button>
            <View style={[styles.common, { width: '20%' }]}>
                <TouchableOpacity
                    style={{ backgroundColor: theme['color-info-500'], height: 25, width: 25, borderRadius: 100, justifyContent: "center", alignItems: "center" }}
                    onPressIn={() => {
                        // setModalChildren(<ModalCant stock={props.book.getStock()} cantUpdater={setCant} setModalVisibility={setModalVisibility} />);
                        // setModalVisibility(true);
                    }}
                >
                    <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{1}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default function BookCard(info: ListRenderItemInfo<StockBook>) {
    return <CardElement info={info} />
};
const CardElement = memo((props: { info: any }) => {
    const theme = useTheme()
    const book = props.info.item
    return (
        <View style={[styles.mainLayout, { shadowColor: theme['background-alternative-color-4'] }]}>
            {/* Card */}
            <View style={[styles.cardLayout, { backgroundColor: theme['background-basic-color-2'] }]}>
                <CardTop
                    price={book.getGrossPricePerUnit()}
                    isInOffer={book.isInOffer()}
                    discountPercentage={book.getDiscountPercentage()}
                />
                <CardBottom
                    title={book.getTitle()}
                    author={book.getAuthor()}
                />
            </View>
            {/* Button */}
            <CardButton bookISBN={book.getIsbn()} />
        </View>
    );
})

const transparent = "transparent";

const styles = StyleSheet.create({
    common: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    mainLayout: {
        backgroundColor: transparent,
        width: 158,//'45%',
        height: 300,
        margin: 6,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            height: 20,
            width: 20,
        }
    },
    mainLayoutDisplay: {
        display: "none",
    },
    cardLayout: {
        backgroundColor: transparent,
        width: "100%",
        height: 250,
        paddingVertical: 5,
        borderRadius: 7,
    },
    cardTop: {
        backgroundColor: "white",
        height: 200,
        alignItems: "center",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    image: {
        maxWidth: "80%",
        height: 170,
        resizeMode: "contain",
    },
    cardHeader: {
        backgroundColor: transparent,
        width: "100%",
        height: 30,
        paddingHorizontal: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    icons: { width: "20%", justifyContent: "space-evenly" },
    cardBody: {
        backgroundColor: transparent,
        width: "100%",
        height: 30,
        paddingHorizontal: 2,
    },
    bodyProperties: {
        backgroundColor: transparent,
        paddingHorizontal: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonLayout: {
        backgroundColor: transparent,
        height: 50,
        flexDirection: "row",
    },
    button: { width: "90%" },
});