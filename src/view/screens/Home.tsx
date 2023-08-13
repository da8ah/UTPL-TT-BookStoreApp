import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { BooksObserver } from "../../hooks/useAppViewModel";
import useBooks from "../../hooks/useBooks";
import StockBook from "../../model/core/entities/StockBook";
import { globalStyles as styles } from "../styles/styles";
import Bookshelf from "./layouts/Bookshelf";

export default function Home() {
    const { isLoading, books, queryBooks } = useBooks()
    const [bestSeller, setBestSeller] = useState<StockBook[]>();
    const [recommended, setRecommended] = useState<StockBook[]>();
    const [recent, setRecent] = useState<StockBook[]>();
    const [inOffer, setInOffer] = useState<StockBook[]>();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => { displayDataRetrieved() }, [])
    useEffect(() => { }, [inOffer, bestSeller, recommended, recent])

    const displayDataRetrieved: BooksObserver = () => {
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

        setInOffer(inOffer)
        setBestSeller(bestSeller)
        setRecommended(recommended)
        setRecent(recent)
    };

    return <ScrollView style={[styles.body, { position: 'relative', height: '110%' }]} contentContainerStyle={styles.common} onScrollEndDrag={(e) => { if (e.nativeEvent.contentOffset.y === 0) displayDataRetrieved() }}>
        {isLoading && <ActivityIndicator style={{ zIndex: 1, position: 'absolute', top: 10 }} color="black" />}
        {inOffer && <Bookshelf identifier={"inOffer"} tag={"En Oferta"} books={inOffer} refreshing={refreshing} />}
        {bestSeller && <Bookshelf identifier={"bestSeller"} tag={"Más Vendido"} books={bestSeller} refreshing={refreshing} />}
        {recommended && <Bookshelf identifier={"recommended"} tag={"Recomendado"} books={recommended} refreshing={refreshing} />}
        {recent && <Bookshelf identifier={"recent"} tag={"Reciente"} books={recent} refreshing={refreshing} />}
    </ScrollView>
}
