import { useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import useBooks from "../../hooks/useBooks";
import StockBook from "../../model/core/entities/StockBook";
import { globalStyles as styles } from "../styles/styles";
import Bookshelf from "./layouts/Bookshelf";

export default function Home() {
    const theme = useTheme()

    const { isLoading, books, queryBooks } = useBooks()
    const [bestSeller, setBestSeller] = useState<StockBook[]>([]);
    const [recommended, setRecommended] = useState<StockBook[]>([]);
    const [recent, setRecent] = useState<StockBook[]>([]);
    const [inOffer, setInOffer] = useState<StockBook[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setRefreshing(true)
        setTimeout(async () => {
            displayDataRetrieved()
            setRefreshing(false)
        }, 2000)
    }, [])

    useEffect(() => { }, [isLoading, books, bestSeller, recommended, recent, inOffer])

    const displayDataRetrieved = () => {
        queryBooks()
        const inOffer = books.filter((book) => {
            if (book.isInOffer()) return book;
        });
        const bestSeller = books.filter((book) => {
            if (book.isBestSeller()) return book;
        });
        const recommended = books.filter((book) => {
            if (book.isRecommended()) return book;
        });
        const recent = books.filter((book) => {
            if (book.isRecent()) return book;
        });

        setInOffer(inOffer || [new StockBook('', '', '', '', '', '', '', 0)])
        setBestSeller(bestSeller || [new StockBook('', '', '', '', '', '', '', 0)])
        setRecommended(recommended || [new StockBook('', '', '', '', '', '', '', 0)])
        setRecent(recent || [new StockBook('', '', '', '', '', '', '', 0)])
    }

    return <ScrollView style={{ position: 'relative' }} contentContainerStyle={styles.common} onScrollEndDrag={(e) => { if (e.nativeEvent.contentOffset.y === 0) displayDataRetrieved() }}>
        {isLoading && <ActivityIndicator style={{ zIndex: 1, position: 'absolute', top: 10 }} color={theme['background-alternative-color-2']} />}
        <Bookshelf identifier={"inOffer"} tag={"En Oferta"} books={inOffer} refreshing={refreshing} />
        <Bookshelf identifier={"bestSeller"} tag={"Más Vendido"} books={bestSeller} refreshing={refreshing} />
        <Bookshelf identifier={"recommended"} tag={"Recomendado"} books={recommended} refreshing={refreshing} />
        <Bookshelf identifier={"recent"} tag={"Reciente"} books={recent} refreshing={refreshing} />
    </ScrollView >
}
