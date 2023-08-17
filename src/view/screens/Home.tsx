import { useTheme } from "@ui-kitten/components";
import { useEffect, useMemo, useState } from "react";
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

    useEffect(() => { displayDataRetrieved() }, [])

    const inOfferFiltered = useMemo(() =>
        books.filter((book) => {
            if (book.isInOffer()) return book
        }), [])
    const bestSellerFiltered = useMemo(() =>
        books.filter((book) => {
            if (book.isBestSeller()) return book
        }), [])
    const recommendedFiltered = useMemo(() =>
        books.filter((book) => {
            if (book.isRecommended()) return book
        }), [])
    const recentFiltered = useMemo(() =>
        books.filter((book) => {
            if (book.isRecent()) return book
        }), [])

    const displayDataRetrieved = () => {
        queryBooks()
        setInOffer(inOfferFiltered)
        setBestSeller(bestSellerFiltered)
        setRecommended(recommendedFiltered)
        setRecent(recentFiltered)
    }

    function debounce(callback: () => void, delay = 100) {
        let timeout: any
        return () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                callback()
            }, delay)
        }
    }

    return <ScrollView style={{ position: 'relative' }} contentContainerStyle={styles.common} onScrollEndDrag={(e) => { if (e.nativeEvent.contentOffset.y === 0) debounce(displayDataRetrieved)() }}>
        {isLoading && <ActivityIndicator style={{ zIndex: 1, position: 'absolute', top: 10 }} color={theme['background-alternative-color-2']} />}
        {inOffer.length > 0 && <Bookshelf identifier={"inOffer"} tag={"En Oferta"} books={inOffer} refreshing={false} />}
        {bestSeller.length > 0 && <Bookshelf identifier={"bestSeller"} tag={"Más Vendido"} books={bestSeller} refreshing={false} />}
        {recommended.length > 0 && <Bookshelf identifier={"recommended"} tag={"Recomendado"} books={recommended} refreshing={false} />}
        {recent.length > 0 && <Bookshelf identifier={"recent"} tag={"Reciente"} books={recent} refreshing={false} />}
    </ScrollView >
}
