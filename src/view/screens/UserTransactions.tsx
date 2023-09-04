import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { Button, Icon, Text } from "@ui-kitten/components"
import { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import useClient from "../../hooks/useClient"
import CardTransaction from "../../model/core/entities/CardTransaction"
import { UserNavProps } from "../routes/types.nav"
import { globalStyles as styles } from "../styles/styles"
import TransactionCard from "./layouts/TransactionCard"

export default function UserTransactions() {
    const navigation = useNavigation<UserNavProps>()
    const { client, postSignIn } = useClient()
    const [isLoading, setLoadingState] = useState(false)
    const [transactions, setTransactions] = useState<CardTransaction[]>([])
    const [counter, setCounter] = useState(1)

    const allTransactions = useMemo(() => [...client.getTransactions()] as CardTransaction[], [client.getTransactions()])
    const loadTransactions = () => {
        setLoadingState(true)
        setTransactions(allTransactions.slice(0, counter * 10))
        setTimeout(() => {
            setLoadingState(false)
        }, 200)

        setCounter(counter => counter + 1)
    }

    useEffect(() => {
        loadTransactions()
        postSignIn()
    }, [])

    return <View style={[styles.common, styles.body]}>
        <View style={{ width: '100%', padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
                size="small"
                status="success"
                accessoryLeft={() => <Icon name="arrow-back" fill="white" height="30" width="30" />}
                onPress={() => navigation.navigate("User")}
            />
            <View style={{ width: '80%', paddingHorizontal: 5 }}>
                <Text category="h2">Mis Compras</Text>
            </View>
        </View>
        <View style={{ flex: 1, width: '100%' }}>
            <FlashList
                scrollEnabled
                key={"transactions"}
                contentContainerStyle={{ backgroundColor: "transparent" }}
                estimatedItemSize={250}
                refreshing={isLoading}
                data={transactions}
                renderItem={TransactionCard}
                onEndReachedThreshold={0.1}
                onEndReached={loadTransactions}
            />
        </View>
    </View>
}
