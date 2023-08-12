import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import SignIn from "../auth/SignIn";
import LoadingAlert from "../components/LoadingAlert";
import User from "../screens/User";
import { UserStackParamList } from "./types.nav";


const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserNav() {
    // const { themeMode } = useContext(ThemeContext);
    // const { isAuth, tryToAuth } = useContext(AuthContext)
    const themeMode = 'dark'
    const isAuth = false
    const [isLoadin, setLoading] = useState(true)

    const authTry = async () => {
        setLoading(true)
        // await tryToAuth()
        setLoading(false)
    }

    useEffect(() => { authTry() }, [])

    return <>
        {isLoadin ? <LoadingAlert />
            : <Stack.Navigator initialRouteName={isAuth ? 'User' : 'SignIn'} screenOptions={{
                headerShown: false,
                animation: "fade_from_bottom",
                animationTypeForReplace: "pop",
                animationDuration: 0.1
            }}>
                <Stack.Screen name='User' component={User} />
                <Stack.Screen name='SignIn' component={SignIn} />
            </Stack.Navigator>
        }
    </>
}