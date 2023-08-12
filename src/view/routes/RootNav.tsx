import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import CartOrder from "../screens/CartOrder";
import { globalStyles as styles } from "../styles/styles";
import BottomNav from "./BottomNav";
import { RootStackParamList } from "./types.nav";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNav() {
	return <View testID="root-nav" style={[styles.common, styles.body, { alignItems: 'stretch', backgroundColor: 'transparent' }]}>
		<Stack.Navigator initialRouteName='BottomNav' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='BottomNav' component={BottomNav} />
			<Stack.Screen name='CartOrder' component={CartOrder} options={{ animation: 'fade', animationTypeForReplace: 'pop' }} />
		</Stack.Navigator>
	</View>
}
