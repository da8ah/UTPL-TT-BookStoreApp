import { List, ListProps } from "@ui-kitten/components";
import { useMemo, useState } from "react";
import { Keyboard, View } from "react-native";
import useBooks from "../../hooks/useBooks";
import StockBook from "../../model/core/entities/StockBook";
import SearchBar, { EmptyIcon } from "../components/SearchBar";
import { globalStyles as styles } from "../styles/styles";
import BookCard from "./layouts/BookCard";

const BookStoreList = (props: { books: StockBook[] } & Omit<ListProps, 'data' | 'renderItem'>) => {
    const books = props.books

    return (
        <View style={{ flex: 1 }}>
            <List
                {...props}
                scrollEnabled
                key={"books"}
                style={{ backgroundColor: "transparent" }}
                contentContainerStyle={{ backgroundColor: "transparent" }}
                columnWrapperStyle={[styles.common, { justifyContent: books.length <= 1 ? 'flex-end' : 'flex-start', flexDirection: books.length <= 1 ? 'row-reverse' : 'row' }]}
                numColumns={2}
                initialNumToRender={books.length}
                data={books}
                extraData={books}
                renderItem={BookCard}
            />
        </View>
    );
};

export default function BookStore() {
    const { isLoading, books, queryBooks } = useBooks()
    const [query, setQuey] = useState('')

    const data = useMemo(() => {
        return books.filter((book) => {
            return book.getAuthor().toLowerCase().includes(query.toLowerCase())
        })
    }, [books, query])

    const CloseIcon = (<EmptyIcon onPress={() => setQuey('')} />)
    return <View style={[styles.common, styles.body]}>
        <SearchBar
            placeholder="Buscar por coincidencia o ISBN"
            accessoryRight={query.length > 0 ? CloseIcon : undefined}
            value={query}
            onChangeText={input => setQuey(input)}
        />
        <BookStoreList
            testID='books'
            books={data}
            refreshing={isLoading}
            onRefresh={queryBooks}
            onScroll={() => Keyboard.dismiss()}
        />
    </View>
}