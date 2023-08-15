import { useNavigation } from "@react-navigation/native";
import { Icon, Text, useTheme } from "@ui-kitten/components";
import { KeyboardAvoidingView, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useKeyboard from "../../hooks/useKeyboard";
import ActionButton from "../components/ActionButton";
import FormInput from "../components/FormInput";
import RoundButton from "../components/RoundButton";
import { UserNavProps } from "../routes/types.nav";
import { globalStyles as styles } from "../styles/styles";

export default function UserEditor() {
    const navigation = useNavigation<UserNavProps>()
    const [isKeyboardVisible] = useKeyboard()
    const { client } = useAuth()
    const theme = useTheme()

    const topButtons = [
        {
            iconName: "arrow-back",
            backgroundColor: theme['color-warning-500'],
            onPress: () => navigation.navigate("User")
        }
    ]
    const bottomButtons = [
        {
            iconName: "edit",
            disabled: true,
            backgroundColor: theme['color-warning-500']
        },
        {
            iconName: "slash",
            disabled: true,
            backgroundColor: theme['color-warning-500']
        },
        {
            iconName: "trash-2",
            disabled: true,
            backgroundColor: theme['color-danger-500']
        },
        {
            iconName: "save",
            disabled: true,
            backgroundColor: theme['color-success-500']
        },
    ]

    return <View style={[styles.common, { flex: 1 }]}>
        <View style={{ display: isKeyboardVisible ? 'none' : 'flex', flex: 1, width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {topButtons.map((button, index) => {
                return <RoundButton key={`user-round-button-${index}`}
                    size="small"
                    icon={() => <Icon name={button.iconName} fill="black" height="40" width="40" />}
                    backgroundColor={button.backgroundColor}
                    onPress={button.onPress}
                />
            })}
        </View>
        <View style={styles.common}>
            <Icon name="person-outline" fill={theme['background-alternative-color-4']} height="100" width="100" />
            <Text
                style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}
            >
                {client.getUser()}
            </Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 2, width: '80%' }}>
            <FormInput isTop disabled showSoftInputOnFocus={false} formColor={theme['background-basic-color-2']} title="Nombre" placeholder="Nombre" textStyle={{ textTransform: "capitalize" }} value={client.getName()} />
            <FormInput disabled showSoftInputOnFocus={false} formColor={theme['background-basic-color-2']} inputMode="email" title="Email" placeholder="Email" value={client.getEmail()} />
            <FormInput isBottom disabled showSoftInputOnFocus={false} formColor={theme['background-basic-color-2']} title="Móvil" placeholder="Móvil" value={client.getMobile()} />
        </KeyboardAvoidingView>
        <View style={{ display: isKeyboardVisible ? 'none' : 'flex', flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            {bottomButtons.map((button, index) => {
                return <ActionButton key={`user-action-button-${index}`}
                    disabled={button.disabled}
                    icon={() => <Icon name={button.iconName} fill="white" height="30" width="30" />}
                    backgroundColor={button.backgroundColor}
                />
            })}
        </View>
    </View>
}
