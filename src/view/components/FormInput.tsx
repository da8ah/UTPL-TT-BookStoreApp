import { Input, InputProps, Text, useTheme } from "@ui-kitten/components";
import { ColorValue, StyleSheet, View } from "react-native";
import useThemeMode from "../../hooks/useThemeMode";

type BorderTop = {
    isTop?: boolean;
    isBottom?: never;
};

type BorderBottom = {
    isTop?: never;
    isBottom?: boolean;
};

type FormInputProps = (BorderTop | BorderBottom) & {
    title: string
    capitalized?: boolean
    formColor?: ColorValue
}

export default function FormInput(props: InputProps & FormInputProps) {
    const { themeMode } = useThemeMode()
    const theme = useTheme()
    return <View style={styles.inputLayout}>
        <View style={[styles.inputTitle, props.isTop && styles.top, props.isBottom && styles.bottom, props.formColor !== undefined && { backgroundColor: props.formColor }]}>
            <Text adjustsFontSizeToFit style={{ textTransform: props.capitalized ? "capitalize" : "uppercase" }}>{props.title}</Text>
        </View>
        <Input
            {...props}
            selectionColor={themeMode === 'dark' ? theme['color-info-500'] : undefined}
            cursorColor={themeMode === 'dark' ? theme['color-info-500'] : 'gray'}
            style={[styles.input, props.style, props.formColor !== undefined && { borderBottomColor: props.formColor }]} />
    </View>
}

const styles = StyleSheet.create({
    inputLayout: { backgroundColor: 'transparent', width: "100%", height: 40, maxHeight: 40, flexDirection: "row", justifyContent: "center", marginVertical: 10 },
    inputTitle: { backgroundColor: "darkgrey", width: "30%", justifyContent: "center", alignItems: "center" },
    input: {
        width: "70%",
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: "darkgrey"
    },
    top: { borderTopLeftRadius: 10 },
    bottom: { borderBottomLeftRadius: 10 }
})