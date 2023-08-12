import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { globalStyles as styles } from "../styles/styles";
import BottomNav from "./BottomNav";
import { RootStackParamList } from "./types.nav";
import CartOrder from "../screens/CartOrder";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNav() {
	return <View testID="root-nav" style={[styles.common, styles.body, { alignItems: 'stretch', backgroundColor: 'transparent' }]}>
		<Stack.Navigator initialRouteName='BottomNav' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='BottomNav' component={BottomNav} />
			<Stack.Screen name='CartOrder' component={CartOrder} />
		</Stack.Navigator>
	</View>
}
