import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { memo } from "react";
import { Image, ListRenderItemInfo, ScrollView, StyleSheet, View } from "react-native";
import useAppViewModel from "../../../hooks/useAppViewModel";
import StockBook from "../../../model/core/entities/StockBook";
import { RootNavProps } from "../../routes/types.nav";

const CardTop = (props: { isVisible: boolean; isInOffer: boolean; discountPercentage: number }) => {
    return (
        <View style={[styles.common, styles.cardHeader]}>
            {/* <View style={{ marginLeft: 1 }}> */}
            {props.isVisible ? (
                <Icon name="eye" fill="dodgerblue" height="30" width="30" />
            ) : (
                <Icon name="eye-off" fill="darkgray" height="25" width="25" />
            )}
            {/* </View> */}
            <Text style={{ color: "red", fontStyle: "italic" }}>{props.isInOffer ? `-${props.discountPercentage}%` : ""}</Text>
        </View>
    );
};

const CardMiddle = (props: { isRecommended: boolean; isBestSeller: boolean; isRecent: boolean }) => {
    return (
        <View style={styles.cardStatus}>
            <View style={styles.icons}>
                <Icon name="checkmark-circle-2" fill={!props.isRecommended ? "darkgray" : "greenyellow"} height="30" width="30" />
                <Icon name="star" fill={!props.isBestSeller ? "darkgray" : "gold"} height="30" width="30" />
                <Icon name="clock" fill={!props.isRecent ? "darkgray" : "tomato"} height="30" width="30" />
            </View>
            <View style={styles.imageLayout}>
                <Image style={styles.image} source={require("@Assets/bookstore.png")} />
            </View>
        </View>
    );
};

const CardBottom = (props: { title: string; isbn: string; author: string; price: number; stock: number }) => {
    return (
        <View style={styles.cardBody}>
            <ScrollView
                horizontal
                alwaysBounceHorizontal
                style={{ height: 20 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                fadingEdgeLength={50}
            >
                <Text style={{ fontStyle: "italic" }}>{props.title}</Text>
            </ScrollView>
            <View style={[styles.common, styles.bodyProperties]}>
                <Text style={{ fontSize: 10 }} adjustsFontSizeToFit={true}>
                    {props.isbn}
                </Text>
                <Text style={{ fontSize: 12.5 }} adjustsFontSizeToFit={true}>
                    {props.price % 1 !== 0 ? props.price.toFixed(2) : props.price} 💲
                </Text>
            </View>
            <View style={[styles.common, styles.bodyProperties]}>
                <ScrollView
                    horizontal
                    alwaysBounceHorizontal
                    style={{ height: 20 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    fadingEdgeLength={50}
                >
                    <Text style={{ fontSize: 11 }} adjustsFontSizeToFit={true}>
                        {props.author}
                    </Text>
                </ScrollView>
                <View style={{ backgroundColor: `${transparent}` }}>
                    <Text adjustsFontSizeToFit={true}> {props.stock} 📦</Text>
                </View>
            </View>
        </View>
    );
};

const ButtonIcon = () => <Icon name="settings" fill="white" height="15" width="15" />;
const CardButton = (props: { bookISBN: string }) => {
    const { vimo } = useAppViewModel()
    const navigation = useNavigation<RootNavProps>();
    return (
        <View style={[styles.common, styles.buttonLayout]}>
            <Button
                style={styles.button}
                size="small"
                status="info"
                accessoryLeft={ButtonIcon}
                onPress={() => {
                    vimo.createDraftByISBN(props.bookISBN)
                    // navigation.navigate("BookEditor", { bookISBN: props.bookISBN })
                }}
            >
                EDITAR
            </Button>
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
        <View style={styles.mainLayout}>
            {/* Card */}
            <View style={[styles.cardLayout, { backgroundColor: theme['background-basic-color-2'] }]}>
                <CardTop
                    isVisible={book.isVisible()}
                    isInOffer={book.isInOffer()}
                    discountPercentage={book.getDiscountPercentage()}
                />
                <CardMiddle isRecommended={book.isRecommended()} isBestSeller={book.isBestSeller()} isRecent={book.isRecent()} />
                <CardBottom
                    title={book.getTitle()}
                    isbn={book.getIsbn()}
                    author={book.getAuthor()}
                    price={book.getGrossPricePerUnit()}
                    stock={book.getStock()}
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
        width: '45%',
        height: 300,
        margin: 9
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
    cardHeader: {
        backgroundColor: transparent,
        width: "100%",
        height: 30,
        paddingHorizontal: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardStatus: {
        backgroundColor: "white",
        width: "100%",
        height: 140,
        flexDirection: "row",
    },
    icons: { width: "20%", justifyContent: "space-evenly" },
    imageLayout: { width: "80%", alignContent: "center" },
    image: {
        maxWidth: "80%",
        height: 140,
        resizeMode: "contain",
    },
    cardBody: {
        backgroundColor: transparent,
        width: "100%",
        height: 60,
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
    },
    button: { width: "90%" },
});