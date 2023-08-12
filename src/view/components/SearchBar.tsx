import { Icon, Input, InputProps, useTheme } from "@ui-kitten/components";
import { TouchableOpacity, View } from "react-native";
import useThemeMode from "../../hooks/useThemeMode";
import { globalStyles as styles } from "../styles/styles";

export const EmptyIcon = (props: { onPress: () => any }) => {
    const { themeMode } = useThemeMode()
    const theme = useTheme()
    return <TouchableOpacity onPress={props.onPress}>
        <Icon name={themeMode === 'dark' ? 'close-square' : 'close-square-outline'} fill={theme['background-alternative-color-4']} height="25" width="25" />
    </TouchableOpacity>
};

export default function SearchBar(props: { placeholder: string } & InputProps) {
    const { themeMode } = useThemeMode()
    const theme = useTheme()
    const SearchIcon = () => <Icon name="search-outline" fill={themeMode === 'dark' ? 'white' : 'black'} height="30" width="30" />;
    return (
        <View style={[styles.common, { paddingVertical: 10 }]}>
            <Input
                {...props}
                accessoryLeft={SearchIcon}
                inputMode="search"
                selectionColor={themeMode === 'dark' ? theme['color-info-500'] : undefined}
                cursorColor={themeMode === 'dark' ? theme['color-info-500'] : 'gray'}
                style={{
                    width: "95%",
                    backgroundColor: themeMode === 'dark' ? 'transparent' : 'white',
                    borderColor: themeMode === 'dark' ? 'gray' : 'white',
                    borderRadius: themeMode === 'dark' ? 20 : 5
                }}
                placeholder={props.placeholder}
            />
        </View>
    );
};
