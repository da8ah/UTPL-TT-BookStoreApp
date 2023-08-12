import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import useThemeMode from "./src/hooks/useThemeMode";
import MainFrame from "./src/view/MainFrame";
import { globalStyles as styles } from "./src/view/styles/styles";
import customTheme from "./src/view/styles/theme.json";

export default function App() {
  const { themeMode } = useThemeMode()
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva[themeMode], ...customTheme.basic, ...customTheme[themeMode] }}>
        <View style={{ height: 25, backgroundColor: '#272729' }} />
        <SafeAreaView style={[styles.common, { flex: 1 }]}>
          <MainFrame />
          <StatusBar style="auto" />
        </SafeAreaView>
      </ApplicationProvider>
    </>
  )
}
