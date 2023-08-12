import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import SignIn from "../auth/SignIn";
import LoadingAlert from "../components/LoadingAlert";
import User from "../screens/User";
import { UserStackParamList } from "./types.nav";

const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserNav() {
    const { isAuth, tryToAuth } = useAuth()
    const [isLoadin, setLoading] = useState(true)

    const authTry = () => {
        setLoading(true)
        tryToAuth()
        setLoading(false)
    }

    useEffect(() => { authTry() }, [])

    return <>
        {isLoadin ? <LoadingAlert />
            : <Stack.Navigator initialRouteName={isAuth ? 'User' : 'SignIn'} screenOptions={{
                headerShown: false,
                animation: "fade",
                animationTypeForReplace: "pop",
                animationDuration: 0.1
            }}>
                {isAuth ? <Stack.Screen name='User' component={User} /> :
                    <Stack.Group>
                        <Stack.Screen name='SignIn' component={SignIn} />
                    </Stack.Group>}
            </Stack.Navigator>
        }
    </>
}