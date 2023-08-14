import { useNavigation } from "@react-navigation/native";
import { Icon, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { useFormState, useFormStore } from "../../hooks/useForm";
import { patterns } from "../../utils/validations";
import ActionButton from "../components/ActionButton";
import { UserNavProps } from "../routes/types.nav";
import { FormLayoutBasic, FormLayoutBilling } from "../screens/layouts/FormLayouts";
import { globalStyles as styles } from "../styles/styles";

export default function SignUp() {
    const navigation = useNavigation<UserNavProps>()
    const theme = useTheme()

    const { client, resetClient } = useFormStore()
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
        setCheck('toWhom', new RegExp(patterns.BillingInfo.TO_WHOM).test(toWhom.trim()))
        setCheck('ci', new RegExp(patterns.BillingInfo.CI).test(ci.trim()))
        setCheck('provincia', new RegExp(patterns.BillingInfo.PROVINCIA).test(provincia.trim()))
        setCheck('ciudad', new RegExp(patterns.BillingInfo.CIUDAD).test(ciudad.trim()))
        setCheck('numCasa', new RegExp(patterns.BillingInfo.NUM_CASA).test(numCasa.trim()))
        setCheck('calles', new RegExp(patterns.BillingInfo.CALLES).test(calles.trim()))
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
            onPress: () => {
                if (!isBasicValid) {
                    setBasicValidity(validateBasic())
                } else {
                    validateBillingInfo()
                }
            }
        },
    ]

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
        </View>
    )
}