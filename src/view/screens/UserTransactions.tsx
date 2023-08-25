import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { Button, Icon, Text } from "@ui-kitten/components"
import { View } from "react-native"
import useClient from "../../hooks/useClient"
import CardTransaction from "../../model/core/entities/CardTransaction"
import { UserNavProps } from "../routes/types.nav"
import { globalStyles as styles } from "../styles/styles"
import TransactionCard from "./layouts/TransactionCard"
import Cart from "../../model/core/entities/Cart"
import ToBuyBook from "../../model/core/entities/ToBuyBook"

export default function UserTransactions() {
    const navigation = useNavigation<UserNavProps>()
    const { client } = useClient()
    const transactions = client.getTransactions().reverse() as CardTransaction[]

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
        <View style={{ width: '100%', height: 500 }}>
            <FlashList
                scrollEnabled
                key={"transactions"}
                contentContainerStyle={{ backgroundColor: "transparent" }}
                estimatedItemSize={250}
                data={transactions}
                extraData={transactions}
                renderItem={TransactionCard}
            />
        </View>
    </View>
}
