import { Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import useThemeMode from "../../hooks/useThemeMode";
import { globalStyles as styles } from "../styles/styles";

export default function NetworkError() {
    const { themeMode } = useThemeMode()
    const theme = useTheme()
    return <View pointerEvents={'none'} style={[styles.common, styles.body, { backgroundColor: themeMode === 'dark' ? theme['background-basic-color-3'] : 'white' }]}>
        <Text>No tienes conexión a Internet <Text style={{ fontSize: 20 }}>😱</Text></Text>
    </View>
}