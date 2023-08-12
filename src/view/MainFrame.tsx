import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import { View, ViewProps } from "react-native";
import useThemeMode from "../hooks/useThemeMode";
import CartToggle from "./components/CartToggle";
import ThemeModeToggle from "./components/ThemeModeToggle";
import RootNav from "./routes/RootNav";
import NetworkError from "./screens/NetworkError";
import { darkNavTheme, lightNavTheme, globalStyles as styles } from "./styles/styles";


export default function MainFrame() {
    const { isConnected } = useNetInfo()
    const { themeMode } = useThemeMode()

    return <Layout style={[styles.common, { flex: 1 }]}>
        <NavigationContainer theme={themeMode === 'dark' ? darkNavTheme : lightNavTheme}>
            <Header isConnected={isConnected || false} style={[styles.common, styles.header, { backgroundColor: '#272729' }]} />
            {!isConnected ? <NetworkError /> : <RootNav />}
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
};
