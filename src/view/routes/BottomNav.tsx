import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Icon, Text, useTheme } from "@ui-kitten/components";
import { Keyboard } from "react-native";
import useKeyboard from "../../hooks/useKeyboard";
import useThemeMode from "../../hooks/useThemeMode";
import BookStore from "../screens/BookStore";
import Home from "../screens/Home";
import UserNav from "./UserNav";
import { BottomTabParamList } from "./types.nav";
import { allowScreenCaptureAsync, preventScreenCaptureAsync } from "expo-screen-capture";

const UiKittenBottomTabNav = ({ navigation, state }: BottomTabBarProps) => {
    const [isKeyboardVisible] = useKeyboard()
    const { themeMode } = useThemeMode()
    const theme = useTheme()
    const indicatorColor = theme['background-alternative-color-1']

    const HomeIcon = () => <Icon name="home" fill={indicatorColor} height="30" width="30" />;
    const BookStoreIconOpen = () => <Icon name="book-open" fill={indicatorColor} height="30" width="30" />;
    const BookStoreIconClose = () => <Icon name="book" fill={indicatorColor} height="30" width="30" />;
    const UserIcon = () => <Icon name="person" fill={indicatorColor} height="30" width="30" />;

    const HomeTitle = () => <Text style={{ color: indicatorColor, fontSize: 10 }}>Inicio</Text>;
    const BookStoreTitle = () => <Text style={{ color: indicatorColor, fontSize: 10 }}>Librería</Text>;
    const UserTitle = () => <Text style={{ color: indicatorColor, fontSize: 10 }}>Usuario</Text>;

    return (
        <BottomNavigation
            style={{ display: isKeyboardVisible ? 'none' : 'flex', backgroundColor: theme['tab-basic-color'], paddingVertical: 2 }}
            indicatorStyle={{ backgroundColor: themeMode === 'dark' ? theme['color-info-500'] : indicatorColor, height: 2 }}
            selectedIndex={state.index}
            onSelect={async (index) => {
                if (index === 2) {
                    await preventScreenCaptureAsync()
                    if (Keyboard.isVisible()) {
                        Keyboard.dismiss();
                        setTimeout(() => {
                            if (!Keyboard.isVisible()) navigation.navigate(state.routeNames[index])
                        }, 100)
                    }
                } else await allowScreenCaptureAsync()
                navigation.navigate(state.routeNames[index])
            }}
        >
            <BottomNavigationTab
                icon={<HomeIcon />}
                title={HomeTitle}
            />
            <BottomNavigationTab
                icon={state.index === 1 ? <BookStoreIconOpen /> : <BookStoreIconClose />}
                title={BookStoreTitle}
            />
            <BottomNavigationTab
                icon={<UserIcon />}
                title={UserTitle}
            />
        </BottomNavigation>
    );
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomNav() {
    return (
        <Tab.Navigator initialRouteName="Home" tabBar={(props) => <UiKittenBottomTabNav {...props} />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="BookStore" component={BookStore} />
            <Tab.Screen name="UserNav" component={UserNav} />
        </Tab.Navigator>
    )
}
