import { useTheme } from "@ui-kitten/components";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import useBooks from "../../hooks/useBooks";
import StockBook from "../../model/core/entities/StockBook";
import { globalStyles as styles } from "../styles/styles";
import Bookshelf from "./layouts/Bookshelf";

export default function Home() {
    const theme = useTheme()

    const { isLoading, books, startLoading, queryBooks } = useBooks()
    const [bestSeller, setBestSeller] = useState<StockBook[]>([]);
    const [recommended, setRecommended] = useState<StockBook[]>([]);
    const [recent, setRecent] = useState<StockBook[]>([]);
    const [inOffer, setInOffer] = useState<StockBook[]>([]);

    useEffect(() => { displayDataRetrieved() }, [])

    const inOfferFiltered = useMemo(() =>
        books.filter((book) => {
            if (book.isInOffer()) return book
        }), [books])
    const bestSellerFiltered = useMemo(() =>
        books.filter((book) => {
            if (book.isBestSeller()) return book
        }), [books])
    const recommendedFiltered = useMemo(() =>
        books.filter((book) => {
            if (book.isRecommended()) return book
        }), [books])
    const recentFiltered = useMemo(() =>
        books.filter((book) => {
            if (book.isRecent()) return book
        }), [books])

    const displayDataRetrieved = () => {
        queryBooks()
        setInOffer(inOfferFiltered || [])
        setBestSeller(bestSellerFiltered || [])
        setRecommended(recommendedFiltered || [])
        setRecent(recentFiltered || [])
    }

    function debounce(callback: () => void, delay = 200) {
        let timeout: any
        return () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                callback()
            }, delay)
        }
    }

    const debouncedQuery = () => {
        startLoading()
        debounce(displayDataRetrieved)()
    }

    return <ScrollView
        style={{ position: 'relative' }}
        contentContainerStyle={[styles.common,
        inOffer.length === 0 && bestSeller.length === 0 &&
        recommended.length === 0 && recent.length === 0 &&
        styles.body
        ]}
        onScrollEndDrag={(e) => {
            if (e.nativeEvent.contentOffset.y === 0) debouncedQuery()
        }}
    >
        {isLoading && <ActivityIndicator style={{ zIndex: 1, position: 'absolute', top: 10 }} color={theme['background-alternative-color-2']} />}
        {
            inOffer.length === 0 && bestSeller.length === 0 &&
            recommended.length === 0 && recent.length === 0 &&
            <TouchableOpacity style={[styles.common, styles.body]} activeOpacity={0.3} onPress={debouncedQuery} />
        }
        {inOffer.length > 0 && <Bookshelf identifier={"inOffer"} tag={"En Oferta"} books={inOffer} refreshing={false} />}
        {bestSeller.length > 0 && <Bookshelf identifier={"bestSeller"} tag={"Más Vendido"} books={bestSeller} refreshing={false} />}
        {recommended.length > 0 && <Bookshelf identifier={"recommended"} tag={"Recomendado"} books={recommended} refreshing={false} />}
        {recent.length > 0 && <Bookshelf identifier={"recent"} tag={"Reciente"} books={recent} refreshing={false} />}
    </ScrollView >
}
