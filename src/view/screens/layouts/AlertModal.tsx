import { Button, Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { globalStyles as styles } from "../../styles/styles";
import { AlertFactory as AlertModalProps } from "./AlertFactory";

const status = {
    failed: 'danger',
    success: 'success'
}

const iconName = {
    failed: 'alert-circle-outline',
    success: 'checkmark-circle-outline'
}

const iconColor = {
    failed: 'darkred',
    success: 'darkgreen'
}

export default function AlertModal(props: AlertModalProps) {
    const {
        modalType,
        data,
        onButtonPress
    } = props

    return <View style={[styles.common, { backgroundColor: 'white', padding: 20, borderRadius: 20 }]}>
        <View style={[styles.common, { paddingVertical: 5 }]}>
            <Text style={{ color: 'black', textTransform: "uppercase" }}>{data.title}</Text>
            <Icon name={data.iconName !== undefined ? data.iconName : iconName[modalType]} fill={data.iconName !== undefined ? 'gold' : iconColor[modalType]} height="30" width="30" />
            <Text style={{ color: 'black', fontSize: 12, paddingVertical: 5 }}>({data.message})</Text>
        </View>
        <Button size="small" status={data.iconName !== undefined ? 'warning' : status[modalType]} style={{ width: "50%", paddingTop: 10 }} onPress={() => onButtonPress()}>
            Ok
        </Button>
    </View>
}