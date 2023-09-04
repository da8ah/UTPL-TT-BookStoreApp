import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { allowScreenCaptureAsync, preventScreenCaptureAsync } from "expo-screen-capture";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useClient from "../../hooks/useClient";
import { useFormState, useFormStore } from "../../hooks/useForm";
import useKeyboard from "../../hooks/useKeyboard";
import { patterns } from "../../utils/validations";
import ActionButton from "../components/ActionButton";
import ModalDisplay from "../components/ModalDisplay";
import { UserNavProps } from "../routes/types.nav";
import { globalStyles as styles } from "../styles/styles";
import { FormLayoutBasic, FormLayoutBilling } from "./layouts/FormLayouts";
import ModalAlert, { ModalAlertProps } from "./layouts/ModalAlert";
import ModalConfirmation from "./layouts/ModalConfirmation";

type confirmationType = "actualizar" | "eliminar"
type alertType = "bio" | "actualizar" | "eliminar"

export default function UserEditor() {
    const navigation = useNavigation<UserNavProps>()
    const theme = useTheme()
    const [isKeyboardVisible] = useKeyboard()
    const { isAuth, isBioAuth, isBioSupported, checkBioSupport, requestFingerprint, logout } = useAuth()
    const { client, deleteClient } = useClient()
    const { resetClient } = useFormStore()

    const [isEditorEnabled, setEditorState] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [confirmationType, setConfirmationType] = useState<confirmationType>('actualizar')
    const [codeStatus, setCodeStatus] = useState<alertType>('bio')
    const [isAlertVisible, setAlertState] = useState(false)

    const {
        userCheck,
        nameCheck,
        emailCheck,
        mobileCheck,
        passwordCheck,
        user,
        name,
        email,
        mobile,
        password,

        toWhomCheck,
        ciCheck,
        provinciaCheck,
        ciudadCheck,
        numCasaCheck,
        callesCheck,
        toWhom,
        ci,
        provincia,
        ciudad,
        numCasa,
        calles,

        setCheck,
        setProperty
    } = useFormState()
    const [isBasicOrBilling, setBasicState] = useState(true)

    useEffect(() => {
        checkBioSupport()

        setProperty('user', client.getUser())
        setProperty('name', client.getName())
        setProperty('email', client.getEmail())
        setProperty('mobile', client.getMobile())
        setProperty('password', client.getPassword())
        setProperty('toWhom', client.getBillingInfo().getToWhom())
        setProperty('ci', client.getBillingInfo().getCi())
        setProperty('provincia', client.getBillingInfo().getProvincia())
        setProperty('ciudad', client.getBillingInfo().getCiudad())
        setProperty('numCasa', client.getBillingInfo().getNumCasa())
        setProperty('calles', client.getBillingInfo().getCalles())

        return () => {
            resetClient();
            (async () => { await preventScreenCaptureAsync('user') })()
        }
    }, [])

    const validateBasic = () => {
        const userCheck = new RegExp(patterns.User.USER).test(user.trim())
        const nameCheck = new RegExp(patterns.User.NAME).test(name.trim())
        const emailCheck = new RegExp(patterns.User.EMAIL).test(email.trim())
        const mobileCheck = new RegExp(patterns.User.MOBILE).test(mobile.trim())
        const passwordCheck = new RegExp(patterns.User.PASSWORD).test(password)
        setCheck('user', userCheck)
        setCheck('name', nameCheck)
        setCheck('email', emailCheck)
        setCheck('mobile', mobileCheck)
        setCheck('password', passwordCheck)
        return userCheck && nameCheck && emailCheck && mobileCheck && passwordCheck
    }
    const validateBillingInfo = () => {
        const toWhomCheck = new RegExp(patterns.BillingInfo.TO_WHOM).test(toWhom.trim())
        const ciCheck = new RegExp(patterns.BillingInfo.CI).test(ci.trim())
        const provinciaCheck = new RegExp(patterns.BillingInfo.PROVINCIA).test(provincia.trim())
        const ciudadCheck = new RegExp(patterns.BillingInfo.CIUDAD).test(ciudad.trim())
        const numCasaCheck = new RegExp(patterns.BillingInfo.NUM_CASA).test(numCasa.trim())
        const callesCheck = new RegExp(patterns.BillingInfo.CALLES).test(calles.trim())
        setCheck('toWhom', toWhomCheck)
        setCheck('ci', ciCheck)
        setCheck('provincia', provinciaCheck)
        setCheck('ciudad', ciudadCheck)
        setCheck('numCasa', numCasaCheck)
        setCheck('calles', callesCheck)
        return toWhomCheck && ciCheck && provinciaCheck && ciudadCheck && numCasaCheck && callesCheck
    }

    const bottomButtons = [
        {
            iconName: "edit",
            disabled: isEditorEnabled,
            backgroundColor: theme['color-warning-500'],
            onPress: async () => {
                if (!isBioSupported) {
                    setCodeStatus('bio')
                    setAlertState(true)
                    setModalVisibility(true)
                    return
                }
                if (!(isBioAuth || await requestFingerprint("Desbloquear EDITOR"))) return

                await allowScreenCaptureAsync('user')
                setEditorState(true)
            }
        },
        {
            iconName: "slash",
            disabled: !isEditorEnabled,
            backgroundColor: theme['color-warning-500'],
            onPress: async () => {
                await preventScreenCaptureAsync('user')
                setEditorState(false)
            }
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
        }
    ]

    function getModalProps(confirmationType: confirmationType): {
        title: string,
        status: 'success' | 'danger',
        onButtonPress: () => void
    } {
        switch (confirmationType) {
            case 'eliminar': return {
                title: "¿Eliminar Cuenta? 😨",
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
                onButtonPress: () => {
                    if (validateBasic()) setBasicState(false)
                    if (validateBillingInfo()) console.log('updated')
                    setModalVisibility(false)
                }
            }
        }
    }

    function getModalAlertProps(codeStatus: alertType): ModalAlertProps {
        switch (codeStatus) {
            case 'bio': return {
                modalType: "failed",
                data: {
                    title: "Huella Dactilar REQUERIDA",
                    message: "NO es posible EDITAR"
                },
                onButtonPress: () => {
                    setModalVisibility(false)
                    setAlertState(false)
                }
            }
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
        {!isKeyboardVisible && <>
            <View style={{ width: '100%', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    size="small"
                    status="warning"
                    accessoryLeft={() => <Icon name="arrow-back" fill="white" height="30" width="30" />}
                    onPress={() => navigation.navigate("User")}
                />
                <Text
                    style={{ fontSize: 20, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}
                >
                    {client.getUser()}
                </Text>
                <Button
                    size="small"
                    status="info"
                    accessoryLeft={() => <Icon name="flip-2" fill="white" height="30" width="30" />}
                    onPress={() => setBasicState(prev => !prev)}
                />
            </View>
            <View style={styles.common}>
                {isBasicOrBilling ?
                    <Icon name="person-outline" fill={theme['background-alternative-color-4']} height="80" width="80" />
                    :
                    <Icon name="pin-outline" fill={theme['background-alternative-color-4']} height="70" width="70" />
                }
            </View>
        </>}
        <KeyboardAvoidingView pointerEvents={isEditorEnabled ? 'auto' : 'none'} style={{ width: "100%", alignItems: "center" }} behavior="padding">
            {isBasicOrBilling ?
                <FormLayoutBasic
                    disabled={!isEditorEnabled}
                    data={{
                        userCheck,
                        nameCheck,
                        emailCheck,
                        mobileCheck,
                        passwordCheck,
                        user,
                        name,
                        email,
                        mobile,
                        password,
                        setCheck,
                        setProperty
                    }} />
                :
                <FormLayoutBilling
                    disabled={!isEditorEnabled}
                    data={{
                        toWhomCheck,
                        ciCheck,
                        provinciaCheck,
                        ciudadCheck,
                        numCasaCheck,
                        callesCheck,
                        toWhom,
                        ci,
                        provincia,
                        ciudad,
                        numCasa,
                        calles,
                        setCheck,
                        setProperty
                    }} />
            }
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
