import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

export type BottomTabParamList = {
	Home: undefined,
	BookStore: undefined,
	UserNav: NavigatorScreenParams<UserStackParamList>
}

export type TabBarHomeProps = BottomTabScreenProps<BottomTabParamList, 'Home'>
export type TabBarFlowProps = BottomTabScreenProps<BottomTabParamList, 'BookStore'>
export type TabBarUserProps = BottomTabScreenProps<BottomTabParamList, 'UserNav'>

export type RootStackParamList = {
	BottomNav: NavigatorScreenParams<BottomTabParamList>;
	CartOrder: undefined;
	Payment: undefined;
};
export type UserStackParamList = {
	User: undefined;
	UserEditor: undefined;
	UserTransactions: undefined;
	SignIn?: { calledFromPayment: boolean };
	SignUp: undefined
};

export type RootNavProps = NativeStackNavigationProp<RootStackParamList, 'BottomNav'>
export type UserNavProps = NativeStackNavigationProp<UserStackParamList, 'User'>
export type SignInRouteProps = RouteProp<UserStackParamList, "SignIn">
