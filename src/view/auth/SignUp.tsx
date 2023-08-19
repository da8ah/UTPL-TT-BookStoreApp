import { useNavigation } from "@react-navigation/native";
import { Icon, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";
import { useFormState, useFormStore } from "../../hooks/useForm";
import { patterns } from "../../utils/validations";
import ActionButton from "../components/ActionButton";
import ModalDisplay from "../components/ModalDisplay";
import { UserNavProps } from "../routes/types.nav";
import ModalAlert, { ModalAlertProps } from "../screens/layouts/ModalAlert";
import { FormLayoutBasic, FormLayoutBilling } from "../screens/layouts/FormLayouts";
import { globalStyles as styles } from "../styles/styles";

export default function SignUp() {
    const navigation = useNavigation<UserNavProps>()
    const theme = useTheme()
    const [modalVisibility, setModalVisibility] = useState(false)
    const [codeStatus, setCodeStatus] = useState('')

    const { newClient, resetClient, saveNewClient } = useFormStore()
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
        setProperty,
        cleanBasic,
        cleanBillingInfo
    } = useFormState()
    const [isBasicValid, setBasicValidity] = useState(false)

    useEffect(() => {
        setProperty('user', newClient.getUser())
        setProperty('name', newClient.getName())
        setProperty('email', newClient.getEmail())
        setProperty('mobile', newClient.getMobile())
        setProperty('password', newClient.getPassword())
        setProperty('toWhom', newClient.getBillingInfo().getToWhom())
        setProperty('ci', newClient.getBillingInfo().getCi())
        setProperty('provincia', newClient.getBillingInfo().getProvincia())
        setProperty('ciudad', newClient.getBillingInfo().getCiudad())
        setProperty('numCasa', newClient.getBillingInfo().getNumCasa())
        setProperty('calles', newClient.getBillingInfo().getCalles())
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
            iconName: "arrow-circle-left",
            backgroundColor: theme['color-warning-500'],
            onPress: () => {
                if (!isBasicValid) {
                    navigation.navigate('SignIn')
                } else {
                    setBasicValidity(false)
                }

            }
        },
        {
            iconName: "trash-2",
            backgroundColor: theme['color-danger-500'],
            onPress: !isBasicValid ? cleanBasic : cleanBillingInfo,
            onLongPress: () => { resetClient(); cleanBasic(); cleanBillingInfo(); setBasicValidity(false) }
        },
        {
            iconName: "save",
            backgroundColor: !isBasicValid ? theme['color-info-500'] : theme['color-success-500'],
            onPress: async () => {
                if (!isBasicValid) {
                    setBasicValidity(validateBasic())
                } else {
                    if (validateBillingInfo()) {
                        setCodeStatus(await saveNewClient())
                        setModalVisibility(true)
                    }
                }
            }
        },
    ]

    function getModalAlertProps(codeStatus: string): ModalAlertProps {
        switch (codeStatus) {
            case ":400": return {
                modalType: "failed",
                data: {
                    title: "Datos NO válidos",
                    iconName: "alert-triangle-outline",
                    message: "Verifique los datos"
                },
                onButtonPress: () => setModalVisibility(false)
            }
            case "400": return {
                modalType: "failed",
                data: {
                    title: "Falló la operación",
                    message: "Verifique los datos"
                },
                onButtonPress: () => setModalVisibility(false)
            }
            case "303": return {
                modalType: "failed",
                data: {
                    title: "Falló la operación",
                    iconName: "alert-triangle-outline",
                    message: "Registro duplicado"
                },
                onButtonPress: () => {
                    setModalVisibility(false)
                    navigation.navigate("SignIn")
                }
            }
            case "201": return {
                modalType: "success",
                data: {
                    title: "Registrado exitosamente",
                    message: "Iniciar sesión"
                },
                onButtonPress: () => {
                    setModalVisibility(false)
                    navigation.navigate("SignIn")
                }
            }
            default:
                return {
                    modalType: "failed",
                    data: {
                        title: "Fuera de servicio",
                        message: "Servidor ocupado, intente más tarde"
                    },
                    onButtonPress: () => setModalVisibility(false)
                }
        }
    }

    return (
        <View testID="test-signin" style={[styles.common, styles.body]}>
            <View style={[styles.common, { marginVertical: 10 }]}>
                <Icon name="person-add" fill={theme['background-alternative-color-4']} height="100" width="100" />
            </View>
            <KeyboardAvoidingView style={{ width: "100%", alignItems: "center" }} behavior="padding">
                {!isBasicValid ?
                    <FormLayoutBasic data={{
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
                    <FormLayoutBilling data={{
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
            <View style={[styles.common, { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 30 }]}>
                {bottomButtons.map((button, index) => {
                    return <ActionButton key={`user-action-button-${index}`}
                        icon={() => <Icon name={button.iconName} fill="white" height="30" width="30" />}
                        backgroundColor={button.backgroundColor}
                        onPress={button.onPress}
                        onLongPress={button.onLongPress}
                    />
                })}
            </View>
            <ModalDisplay
                visible={modalVisibility}
                onBackdropPress={() => {
                    if (Keyboard.isVisible()) Keyboard.dismiss()
                    getModalAlertProps(codeStatus).onButtonPress()
                }}
            >
                <ModalAlert {...getModalAlertProps(codeStatus)} />
            </ModalDisplay>
        </View>
    )
}