import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

export type BottomTabParamList = {
	Home: undefined,
	BookStore: undefined,
	UserNav: undefined
}

export type TabBarHomeProps = BottomTabScreenProps<BottomTabParamList, 'Home'>
export type TabBarFlowProps = BottomTabScreenProps<BottomTabParamList, 'BookStore'>
export type TabBarUserProps = BottomTabScreenProps<BottomTabParamList, 'UserNav'>

export type RootStackParamList = {
	BottomNav: NavigatorScreenParams<BottomTabParamList>;
	CartDraft: undefined;
};
export type UserStackParamList = {
	User: undefined;
	SignIn: undefined;
	SignUp: undefined
};

export type RootNavProps = NativeStackNavigationProp<RootStackParamList, 'BottomNav'>
export type CartRouteProps = RouteProp<RootStackParamList, "CartDraft">
