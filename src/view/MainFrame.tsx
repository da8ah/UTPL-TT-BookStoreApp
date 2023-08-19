import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { View, ViewProps } from "react-native";
import useAuth from "../hooks/useAuth";
import useBooks from "../hooks/useBooks";
import useClient from "../hooks/useClient";
import useThemeMode from "../hooks/useThemeMode";
import CartToggle from "./components/CartToggle";
import LoadingAlert from "./components/LoadingAlert";
import ThemeModeToggle from "./components/ThemeModeToggle";
import RootNav from "./routes/RootNav";
import NetworkError from "./screens/NetworkError";
import { darkNavTheme, lightNavTheme, globalStyles as styles } from "./styles/styles";


export default function MainFrame() {
    const { themeMode } = useThemeMode()
    const { isConnected } = useNetInfo()
    const { tryToAuth } = useAuth()
    const { updateClient } = useClient()
    const { queryBooks } = useBooks()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        (async () => updateClient(await tryToAuth()))()
        queryBooks()
        const timeout = setTimeout(async () => {
            setLoading(false)
        }, 2000)
        return () => { clearTimeout(timeout) }
    }, [])

    return <Layout style={[styles.common, { flex: 1 }]}>
        <NavigationContainer theme={themeMode === 'dark' ? darkNavTheme : lightNavTheme}>
            <Header isConnected={isConnected || false} style={[styles.common, styles.header, { backgroundColor: '#272729' }]} />
            {isLoading ? <LoadingAlert /> :
                !isConnected ? <NetworkError /> : <RootNav />
            }
        </NavigationContainer>
    </Layout>
}

const Header = (props: ViewProps & { isConnected: boolean }) => {
    return (
        <View {...props}>
            <View style={[styles.common, { width: '20%' }]}>
                <ThemeModeToggle />
            </View>
            <View style={[styles.common, { width: '60%' }]}>
                <Text category='h1' status="info" style={{ fontSize: 32 }}>
                    BOOKSTORE
                </Text>
                <Text category="h2" style={{ color: 'white', fontSize: 14, fontFamily: "serif", fontStyle: "italic" }}>
                    ¡Bienvenidos!
                </Text>
            </View>
            <View style={[styles.common, { width: '20%' }]}>
                {props.isConnected && <CartToggle />}
            </View>
        </View>
    )
}
