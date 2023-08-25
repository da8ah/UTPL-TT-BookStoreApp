import { useNavigation } from "@react-navigation/native";
import { Icon, Text, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useClient from "../../hooks/useClient";
import useKeyboard from "../../hooks/useKeyboard";
import ActionButton from "../components/ActionButton";
import FormInput from "../components/FormInput";
import ModalDisplay from "../components/ModalDisplay";
import RoundButton from "../components/RoundButton";
import { UserNavProps } from "../routes/types.nav";
import { globalStyles as styles } from "../styles/styles";
import ModalConfirmation from "./layouts/ModalConfirmation";
import ModalAlert, { ModalAlertProps } from "./layouts/ModalAlert";

type confirmationType = "actualizar" | "eliminar"
type alertType = "actualizar" | "eliminar"

export default function UserEditor() {
    const navigation = useNavigation<UserNavProps>()
    const [isKeyboardVisible] = useKeyboard()
    const { isAuth, logout } = useAuth()
    const { client, deleteClient } = useClient()
    const theme = useTheme()
    const [isEditorEnabled, setEditorState] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [confirmationType, setConfirmationType] = useState<confirmationType>('actualizar')
    const [codeStatus, setCodeStatus] = useState<alertType>('actualizar')
    const [isAlertVisible, setAlertState] = useState(false)

    const bottomButtons = [
        {
            iconName: "edit",
            disabled: isEditorEnabled,
            backgroundColor: theme['color-warning-500'],
            onPress: () => setEditorState(true)
        },
        {
            iconName: "slash",
            disabled: !isEditorEnabled,
            backgroundColor: theme['color-warning-500'],
            onPress: () => setEditorState(false)
        },
        {
            iconName: "trash-2",
            disabled: !isEditorEnabled,
            backgroundColor: theme['color-danger-500'],
            onPress: () => {
                setConfirmationType("eliminar")
                setModalVisibility(true)
            }
        },
        {
            iconName: "save",
            disabled: !isEditorEnabled,
            backgroundColor: theme['color-success-500'],
            onPress: () => {
                setConfirmationType("actualizar")
                setModalVisibility(true)
            }
        },
    ]

    function getModalProps(confirmationType: confirmationType): {
        title: string,
        status: 'success' | 'danger',
        onButtonPress: () => void
    } {
        switch (confirmationType) {
            case 'eliminar': return {
                title: "Eliminar cuenta",
                status: "danger",
                onButtonPress: () => {
                    deleteClient()
                    setCodeStatus("eliminar")
                    setAlertState(true)
                }
            }
            case 'actualizar': return {
                title: "Actualizar información",
                status: "success",
                onButtonPress: () => setModalVisibility(false)
            }
        }
    }

    function getModalAlertProps(codeStatus: alertType): ModalAlertProps {
        switch (codeStatus) {
            case 'eliminar': return {
                modalType: "success",
                data: {
                    title: "Eliminado correctamente",
                    message: "Iniciar sesión"
                },
                onButtonPress: () => {
                    logout()
                    if (!isAuth) navigation.navigate("SignIn")
                    setModalVisibility(false)
                    setAlertState(false)
                }
            }
            case 'actualizar': return {
                modalType: "success",
                data: {
                    title: "Actualizado correctamente",
                    message: "Registro actualizado"
                },
                onButtonPress: () => {
                    setModalVisibility(false)
                    setAlertState(false)
                }
            }
        }
    }

    return <View style={[styles.common, { flex: 1 }]}>
        <View style={{ display: isKeyboardVisible ? 'none' : 'flex', flex: 1, width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <RoundButton size="small" backgroundColor="black" icon={() => <Icon name="close" fill="white" height="30" width="30" />} onPress={() => navigation.navigate("User")} />
        </View>
        <View style={styles.common}>
            <Icon name="person-outline" fill={theme['background-alternative-color-4']} height="100" width="100" />
            <Text
                style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}
            >
                {client.getUser()}
            </Text>
        </View>
        <KeyboardAvoidingView pointerEvents={!isEditorEnabled ? 'none' : 'auto'} style={{ flex: 2, width: '80%' }}>
            <FormInput isTop disabled={!isEditorEnabled} selectTextOnFocus formColor={theme['background-basic-color-2']} title="Nombre" placeholder="Nombre" textStyle={{ textTransform: "capitalize" }} value={client.getName()} />
            <FormInput disabled={!isEditorEnabled} selectTextOnFocus formColor={theme['background-basic-color-2']} inputMode="email" title="Email" placeholder="Email" value={client.getEmail()} />
            <FormInput isBottom disabled={!isEditorEnabled} selectTextOnFocus formColor={theme['background-basic-color-2']} title="Móvil" placeholder="Móvil" value={client.getMobile()} />
        </KeyboardAvoidingView>
        <View style={{ display: isKeyboardVisible ? 'none' : 'flex', flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            {bottomButtons.map((button, index) => {
                return <ActionButton key={`user-action-button-${index}`}
                    disabled={button.disabled}
                    icon={() => <Icon name={button.iconName} fill="white" height="30" width="30" />}
                    backgroundColor={button.backgroundColor}
                    onPress={button.onPress}
                />
            })}
        </View>
        <ModalDisplay
            visible={modalVisibility}
            onBackdropPress={() => {
                if (Keyboard.isVisible()) Keyboard.dismiss()
                if (isAlertVisible) getModalAlertProps(codeStatus).onButtonPress()
                setModalVisibility(false)
            }}
        >
            {isAlertVisible ?
                <ModalAlert {...getModalAlertProps(codeStatus)} />
                :
                <ModalConfirmation {...getModalProps(confirmationType)} />
            }
        </ModalDisplay>
    </View>
}
