import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useThemeMode from "../../hooks/useThemeMode";
import FormInput from "../components/FormInput";
import LoadingAlert from "../components/LoadingAlert";
import { globalStyles as styles } from "../styles/styles";

export default function SignUp() {
    const { isLoading, tryToAuth } = useAuth()
    const { themeMode } = useThemeMode()
    const theme = useTheme();

    const [user, setUser] = useState<string>('da8ah.tiber');
    const [password, setPassword] = useState<string>('tibernuncamuere');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    const PasswordVisibilityIcon = () => (
        <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
            <Icon name={secureTextEntry ? "eye-off" : "eye"} fill={themeMode === 'dark' ? theme['color-basic-500'] : 'black'} height="22" width="22" />
        </TouchableWithoutFeedback>
    );

    return (
        <View testID="test-signin" style={[styles.common, styles.body]}>
            {isLoading ?
                <LoadingAlert /> :
                <>
                    <View style={[styles.common, { flex: 1, paddingVertical: 50 }]}>
                        <Icon name="person-add" fill={theme['background-alternative-color-4']} height="100" width="100" />
                        <Text style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic" }}>Regístrate</Text>
                    </View>
                    <KeyboardAvoidingView style={{ flex: 2, width: "100%", alignItems: "center" }} behavior="padding">
                        <View style={{ width: '80%' }}>
                            <FormInput
                                isTop
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                formColor={theme['background-basic-color-2']}
                                title="Usuario"
                                placeholder="Usuario"
                                defaultValue={user}
                                onChangeText={input => setUser(input)}
                            />
                            <FormInput
                                isBottom
                                formColor={theme['background-basic-color-2']}
                                textContentType="password"
                                accessoryRight={PasswordVisibilityIcon}
                                secureTextEntry={secureTextEntry}
                                title="Clave"
                                placeholder="Clave"
                                defaultValue={password}
                                onChangeText={input => setPassword(input)}
                            />
                        </View>
                        <View style={[styles.common, { justifyContent: 'flex-start', width: '100%', marginVertical: 30 }]}>
                            <Button
                                testID="button-auth"
                                activeOpacity={0.7}
                                accessoryRight={() => <Icon name="log-in" fill="white" height="20" width="20" />}
                                style={[{ width: '70%', backgroundColor: theme['color-info-500'], borderWidth: 0 }]}
                                onPress={() => tryToAuth({ user, password })}
                            >
                                INICIAR SESIÓN
                            </Button>
                        </View>
                    </KeyboardAvoidingView>
                </>
            }
        </View>
    )
}