import { Text } from "@ui-kitten/components";
import { ActivityIndicator, View } from "react-native";

export default function LoadingAlert() {
    return <View>
        <Text status='info' appearance='hint' style={{ fontSize: 10, fontStyle: "italic", textTransform: "uppercase" }}>
            BookStore
        </Text>
        <ActivityIndicator />
    </View>
}