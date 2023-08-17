import { Button, Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { ModalAttributes } from "../../components/ModalDisplay";
import { globalStyles as styles } from "../../styles/styles";


interface FailedType extends ModalAttributes {
    modalType: 'failed',
    data: {
        title: string,
        iconName?: string,
        message: string
    }
}
interface SuccessType extends ModalAttributes {
    modalType: 'success',
    data: {
        title: string,
        iconName?: string,
        message: string
    }
}

export type AlertAttributes = (FailedType | SuccessType | undefined)
export type AlertCallback = { onButtonPress: () => void }
export type AlertModalProps = AlertAttributes & AlertCallback

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

    return <View style={[styles.common, { backgroundColor: 'white', paddingVertical: 20, borderRadius: 20 }]}>
        <View style={[styles.common, { paddingVertical: 5 }]}>
            <Text style={{ color: 'black', textTransform: "uppercase" }}>{data.title}</Text>
            <Icon name={data.iconName !== undefined ? data.iconName : iconName[modalType]} fill={data.iconName !== undefined ? 'gold' : iconColor[modalType]} height="30" width="30" />
            <Text style={{ color: 'black', fontSize: 12, paddingVertical: 10 }}>({data.message})</Text>
        </View>
        <Button
            size="small"
            status={status[modalType] && data.iconName !== undefined ? 'warning' : status[modalType]}
            style={{ width: "50%", paddingTop: 10 }}
            onPress={onButtonPress}
        >
            Ok
        </Button>
    </View>
}