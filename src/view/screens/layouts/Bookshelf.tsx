import { Icon, List, Text, useTheme } from "@ui-kitten/components";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import StockBook from "../../../model/core/entities/StockBook";
import BookCard from "./BookCard";

const styles = StyleSheet.create({
    shelf: {
        flex: 1,
        width: '100%',
        marginVertical: 20
    }
});

export default function Bookshelf(props: { tag: string; identifier: string; books: StockBook[]; refreshing: boolean }) {
    const theme = useTheme()

    return <View style={[styles.shelf]}>
        <View style={{ flexDirection: "row" }}>
            <Text style={{ paddingLeft: 20, fontWeight: "bold", fontStyle: "italic" }}>{props.tag}</Text>
            <Icon name="arrow-right" fill={theme['background-alternative-color-2']} height="20" width="20" />
        </View>
        {props.refreshing ? (
            <ActivityIndicator color="black" />
        ) : (
            <List
                bounces={false}
                horizontal
                scrollEnabled
                key={props.identifier}
                contentContainerStyle={{ flexDirection: 'row' }}
                initialNumToRender={5}
                data={props.books}
                extraData={props.books}
                renderItem={BookCard}
            />
        )}
    </View>
}