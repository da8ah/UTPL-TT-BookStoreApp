import { List, Text } from "@ui-kitten/components";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import StockBook from "../../../model/core/entities/StockBook";
import BookCard from "./BookCard";

const styles = StyleSheet.create({
    shelf: {
        flex: 1,
        marginVertical: 20
    }
});

export default function Bookshelf(props: { tag: string; identifier: string; books: StockBook[]; refreshing: boolean }) {
    return <View style={[styles.shelf]}>
        <View>
            <Text style={{ paddingLeft: 20, fontWeight: "bold", fontStyle: "italic" }}>{props.tag}</Text>
        </View>
        {props.refreshing ? (
            <ActivityIndicator color="black" />
        ) : (
            <List
                bounces={false}
                horizontal
                scrollEnabled
                key={props.identifier}
                // style={{ backgroundColor: 'red' }}
                // columnWrapperStyle={{ padding: 2 }}
                contentContainerStyle={{ flexDirection: 'row' }}
                initialNumToRender={5}
                data={props.books}
                extraData={props.books}
                renderItem={BookCard}
            />
        )}
    </View>
}