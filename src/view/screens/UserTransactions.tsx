import { useNavigation } from "@react-navigation/native"
import { Icon, List } from "@ui-kitten/components"
import { View } from "react-native"
import useClient from "../../hooks/useClient"
import CardTransaction from "../../model/core/entities/CardTransaction"
import RoundButton from "../components/RoundButton"
import { UserNavProps } from "../routes/types.nav"
import { globalStyles as styles } from "../styles/styles"
import TransactionCard from "./layouts/TransactionCard"

export default function UserTransactions() {
    const navigation = useNavigation<UserNavProps>()
    const { client } = useClient()
    const transactions = client.getTransactions().reverse() as CardTransaction[]

    return <View style={[styles.common, styles.body]}>
        <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <RoundButton size="small" backgroundColor="black" icon={() => <Icon name="arrow-back" fill="white" height="30" width="30" />} onPress={() => navigation.navigate("User")} />
        </View>
        <View style={[styles.common, { flex: 1 }]}>
            <List
                scrollEnabled
                key={"transactions"}
                style={{ backgroundColor: "transparent" }}
                contentContainerStyle={{ backgroundColor: "transparent" }}
                initialNumToRender={transactions.length}
                data={transactions}
                extraData={transactions}
                renderItem={TransactionCard}
            />
        </View>
    </View>
}
