import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { SafeAreaView, View } from 'react-native';
import useThemeMode from "./src/hooks/useThemeMode";
import MainFrame from "./src/view/MainFrame";
import ModalDisplay from "./src/view/components/ModalDisplay";
import ModalAlert from "./src/view/screens/layouts/ModalAlert";
import { globalStyles as styles } from "./src/view/styles/styles";
import customTheme from "./src/view/styles/theme.json";

export default function App() {
  const { themeMode } = useThemeMode()
  const [modalVisibility, setModalVisibility] = useState(true)
  const [isWarning, setWarning] = useState(false)

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva[themeMode], ...customTheme.basic, ...customTheme[themeMode] }}>
        <View style={{ height: 25, backgroundColor: '#272729' }} />
        <SafeAreaView style={[styles.common, { flex: 1 }]}>
          <MainFrame />
          {modalVisibility && <ModalDisplay
            visible={modalVisibility}
            onBackdropPress={() => {
              if (!isWarning) setWarning(true)
              else setModalVisibility(false)
            }}
          >
            {!isWarning ?
              <ModalAlert
                modalType="success"
                data={{ title: 'Iniciando Demo', message: 'El Servidor demora de 2 a 5 min en iniciar' }}
                onButtonPress={() => setWarning(true)}
              />
              :
              <ModalAlert
                modalType="failed"
                data={{ title: '¡Aviso Importante!', message: 'Esta app NO usa transacciones reales', iconName: 'alert-triangle-outline' }}
                onButtonPress={() => setModalVisibility(false)}
              />
            }
          </ModalDisplay>}
          <StatusBar style="auto" />
        </SafeAreaView>
      </ApplicationProvider>
    </>
  )
}
