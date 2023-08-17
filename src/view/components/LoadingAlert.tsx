import { Text } from "@ui-kitten/components";
import { ActivityIndicator, View } from "react-native";

export default function LoadingAlert(props: { title?: string }) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 2 }} />
        <View style={{ flex: 1 }}>

            <Text status='info' appearance='hint' style={{ fontSize: 10, fontStyle: "italic", textTransform: "uppercase" }}>
                {props.title || "BookStore"}
            </Text>
            <ActivityIndicator />
        </View>
        <View style={{ flex: 2 }} />
    </View>
}