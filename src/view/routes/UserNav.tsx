import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import User from "../screens/User";
import { UserStackParamList } from "./types.nav";
import UserEditor from "../screens/UserEditor";

const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserNav() {
    const { isAuth, tryToAuth } = useAuth()

    useEffect(() => { tryToAuth() }, [])

    return <Stack.Navigator initialRouteName={isAuth ? 'User' : 'SignIn'} screenOptions={{
        headerShown: false,
        animation: "fade",
        animationTypeForReplace: "pop",
        animationDuration: 0.1
    }}>
        {isAuth ?
            <Stack.Group>
                <Stack.Screen name='User' component={User} />
                <Stack.Screen name='UserEditor' component={UserEditor} options={{ animation: "slide_from_right" }} />
            </Stack.Group>
            :
            <Stack.Group>
                <Stack.Screen name='SignIn' component={SignIn} />
                <Stack.Screen name='SignUp' component={SignUp} options={{ animation: "slide_from_right" }} />
            </Stack.Group>}
    </Stack.Navigator>
}