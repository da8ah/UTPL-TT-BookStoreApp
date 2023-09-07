import { Icon, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import useThemeMode from "../../../hooks/useThemeMode";
import { patterns } from "../../../utils/validations";
import FormInput from "../../components/FormInput";

export function FormLayoutBasic(props: {
    disabled?: boolean
    data: {
        userCheck: boolean
        nameCheck: boolean
        emailCheck: boolean
        mobileCheck: boolean
        passwordCheck: boolean
        passwordCopyCheck: boolean
        user: string
        name: string
        email: string
        mobile: string
        password: string
        passwordCopy: string
        setCheck: (propName: string, value: boolean) => void
        setProperty: (propName: string, value: string) => void
    }
}) {
    const { themeMode } = useThemeMode()
    const theme = useTheme()

    const {
        userCheck,
        nameCheck,
        emailCheck,
        mobileCheck,
        passwordCheck,
        passwordCopyCheck,
        user,
        name,
        email,
        mobile,
        password,
        passwordCopy,
        setCheck,
        setProperty
    } = props.data

    useEffect(() => { if (props.disabled) setSecureTextEntry(true) }, [props.disabled])

    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    }
    const PasswordVisibilityIcon = () => (
        <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={secureTextEntry ? "eye-off" : "eye"} fill={themeMode === 'dark' ? theme['color-basic-500'] : 'black'} height="22" width="22" />
        </TouchableOpacity>
    )

    return <View style={{ width: '80%' }}>
        <FormInput
            disabled={props.disabled}
            isTop
            style={{ borderRightWidth: 2, borderEndColor: !userCheck ? "red" : "mediumspringgreen" }}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="username"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Usuario"
            placeholder="Usuario"
            defaultValue={user}
            onChangeText={input => {
                setProperty('user', input)
                setCheck('user', new RegExp(patterns.User.USER).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            style={{ borderRightWidth: 2, borderEndColor: !nameCheck ? "red" : "mediumspringgreen" }}
            textContentType="name"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Nombre"
            placeholder="Nombre"
            defaultValue={name}
            onChangeText={input => {
                setProperty('name', input)
                setCheck('name', new RegExp(patterns.User.NAME).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            style={{ borderRightWidth: 2, borderEndColor: !emailCheck ? "red" : "mediumspringgreen" }}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Correo"
            placeholder="Correo"
            defaultValue={email}
            onChangeText={input => {
                setProperty('email', input)
                setCheck('email', new RegExp(patterns.User.EMAIL).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            style={{ borderRightWidth: 2, borderEndColor: !mobileCheck ? "red" : "mediumspringgreen" }}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Móvil"
            placeholder="Móvil"
            defaultValue={mobile}
            onChangeText={input => {
                setProperty('mobile', input)
                setCheck('mobile', new RegExp(patterns.User.MOBILE).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            style={{ borderRightWidth: 2, borderEndColor: !passwordCheck ? "red" : "mediumspringgreen" }}
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            keyboardType={!secureTextEntry ? "visible-password" : undefined}
            textContentType="password"
            accessoryRight={PasswordVisibilityIcon}
            secureTextEntry={secureTextEntry}
            title="Clave"
            placeholder="Nueva clave"
            defaultValue={password}
            onChangeText={input => {
                setProperty('password', input)
                setCheck('password', new RegExp(patterns.User.PASSWORD).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            isBottom
            style={{ borderRightWidth: 2, borderEndColor: !passwordCopyCheck ? "red" : "mediumspringgreen" }}
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            keyboardType={!secureTextEntry ? "visible-password" : undefined}
            textContentType="password"
            accessoryRight={PasswordVisibilityIcon}
            secureTextEntry={secureTextEntry}
            title="Clave"
            placeholder="Repetir clave"
            defaultValue={passwordCopy}
            onChangeText={input => {
                setProperty('passwordCopy', input)
            }}
        />
    </View>
}

export function FormLayoutBilling(props: {
    disabled?: boolean
    data: {
        toWhomCheck: boolean
        ciCheck: boolean
        provinciaCheck: boolean
        ciudadCheck: boolean
        numCasaCheck: boolean
        callesCheck: boolean
        toWhom: string
        ci: string
        provincia: string
        ciudad: string
        numCasa: string
        calles: string
        setCheck: (propName: string, value: boolean) => void
        setProperty: (propName: string, value: string) => void
    }
}) {
    const theme = useTheme()

    const {
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
    } = props.data

    return <View style={{ width: '80%' }}>
        <FormInput
            disabled={props.disabled}
            isTop
            capitalized
            style={{ borderRightWidth: 2, borderEndColor: !toWhomCheck ? "red" : "mediumspringgreen" }}
            keyboardType="email-address"
            textContentType="name"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Destinatario"
            placeholder="Destinatario"
            defaultValue={toWhom}
            onChangeText={input => {
                setProperty('toWhom', input)
                setCheck('toWhom', new RegExp(patterns.BillingInfo.TO_WHOM).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            style={{ borderRightWidth: 2, borderEndColor: !ciCheck ? "red" : "mediumspringgreen" }}
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="CI"
            placeholder="CI"
            defaultValue={ci}
            onChangeText={input => {
                setProperty('ci', input)
                setCheck('ci', new RegExp(patterns.BillingInfo.CI).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            capitalized
            style={{ borderRightWidth: 2, borderEndColor: !provinciaCheck ? "red" : "mediumspringgreen" }}
            textContentType="addressState"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Provincia"
            placeholder="Provincia"
            defaultValue={provincia}
            onChangeText={input => {
                setProperty('provincia', input)
                setCheck('provincia', new RegExp(patterns.BillingInfo.PROVINCIA).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            capitalized
            style={{ borderRightWidth: 2, borderEndColor: !ciudadCheck ? "red" : "mediumspringgreen" }}
            textContentType="addressCity"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Ciudad"
            placeholder="Ciudad"
            defaultValue={ciudad}
            onChangeText={input => {
                setProperty('ciudad', input)
                setCheck('ciudad', new RegExp(patterns.BillingInfo.CIUDAD).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            capitalized
            style={{ borderRightWidth: 2, borderEndColor: !numCasaCheck ? "red" : "mediumspringgreen" }}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Nro. casa"
            placeholder="Nro. de casa"
            defaultValue={numCasa}
            onChangeText={input => {
                setProperty('numCasa', input)
                setCheck('numCasa', new RegExp(patterns.BillingInfo.NUM_CASA).test(input.trimEnd()))
            }}
        />
        <FormInput
            disabled={props.disabled}
            isBottom
            capitalized
            style={{ borderRightWidth: 2, borderEndColor: !callesCheck ? "red" : "mediumspringgreen" }}
            textContentType="fullStreetAddress"
            formMarginVertical={5}
            formColor={theme['background-basic-color-2']}
            title="Calles"
            placeholder="Calles"
            defaultValue={calles}
            onChangeText={input => {
                setProperty('calles', input)
                setCheck('calles', new RegExp(patterns.BillingInfo.CALLES).test(input.trimEnd()))
            }}
        />
    </View>
}