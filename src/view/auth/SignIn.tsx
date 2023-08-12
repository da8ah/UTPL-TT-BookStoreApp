import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, View } from "react-native";
import { AuthContext } from "../../hooks/context/AuthContext";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import FormInput from "../components/FormInput";
import LoadingAlert from "../components/LoadingAlert";
import { globalStyles as styles } from "../styles/styles";

export default function SignIn() {
    const { tryToAuth } = useContext(AuthContext)
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme();
    const [isLoading, setLoading] = useState(false)
    useEffect(() => { }, [isLoading])

    const [user, setUser] = useState<string>('tiber');
    const [password, setPassword] = useState<string>('tiber');
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
                        <Icon name="people" fill={theme['background-alternative-color-4']} height="100" width="100" />
                        <Text style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic" }}>Admin</Text>
                    </View>
                    <KeyboardAvoidingView style={{ flex: 2, width: "100%", alignItems: "center" }} behavior="padding">
                        <View style={{ width: '80%' }}>
                            <FormInput
                                disabled
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
                                disabled
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
                                accessoryRight={() => <Icon name="log-in" fill="white" height="20" width="20" />}
                                style={[{ width: '70%', backgroundColor: theme['color-info-500'], borderWidth: 0 }]}
                                onPress={async () => {
                                    setLoading(true)
                                    await tryToAuth({ user, password })
                                    setLoading(false)
                                }}
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