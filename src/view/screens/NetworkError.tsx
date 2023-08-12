import { View } from "react-native";
import { globalStyles as styles } from "../styles/styles";
import { Text, useTheme } from "@ui-kitten/components";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/context/ThemeContext";

export default function NetworkError() {
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()
    return <View pointerEvents={'none'} style={[styles.common, styles.body, { backgroundColor: themeMode === 'dark' ? theme['background-basic-color-3'] : 'white' }]}>
        <Text>No tienes conexión a Internet <Text style={{ fontSize: 20 }}>😱</Text></Text>
    </View>
}