import { List, ListProps } from "@ui-kitten/components";
import { useEffect, useMemo, useState } from "react";
import { Keyboard, View } from "react-native";
import useAppViewModel, { BooksObserver } from "../../hooks/context/useAppViewModel";
import StockBook from "../../model/core/entities/StockBook";
import SearchBar, { EmptyIcon } from "../components/SearchBar";
import { globalStyles as styles } from "../styles/styles";
import BookCard from "./layouts/BookCard";

const BookStore = (props: { books: StockBook[] } & Omit<ListProps, 'data' | 'renderItem'>) => {
    const books = props.books
    useEffect(() => { }, [books]);

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

export default function Home() {
    const { vimo } = useAppViewModel()
    const [query, setQuey] = useState('')
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const forceUpdateAfterBookModification: BooksObserver = () => queryData()
    useEffect(() => {
        vimo.attach(forceUpdateAfterBookModification);
        return () => vimo.detach();
    }, [])

    useEffect(() => { }, [query])
    const books = useMemo(() => {
        return vimo.getBooks().filter((book) => {
            return book.getAuthor().toLowerCase().includes(query.toLowerCase())
        })
    }, [vimo.getBooks(), query])

    const queryData = async () => {
        setRefreshing(true);
        await vimo.queryBooksFromService()
        setRefreshing(false);
    };

    const CloseIcon = (<EmptyIcon onPress={() => setQuey('')} />)
    return <View style={[styles.common, styles.body]}>
        {/* <BookStore
            testID='books'
            books={books}
            refreshing={refreshing}
            onRefresh={queryData}
            onScroll={() => Keyboard.dismiss()}
        /> */}
    </View>
}
