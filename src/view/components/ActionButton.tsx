import { Button, ButtonProps, Text } from "@ui-kitten/components";
import { ColorValue } from "react-native";

export type ActionButtonProps = Omit<ButtonProps, 'title' | 'color'> & {
    children?: JSX.Element | string,
    height?: string | number,
    width?: string | number,
    rounded?: number,
    activeOpacity?: number,
    backgroundColor?: ColorValue,
    icon?: () => JSX.Element
}

export default function ActionButton(props: ActionButtonProps) {
    return <Button
        {...props}
        accessoryLeft={props.icon}
        activeOpacity={props.activeOpacity || 0.7}
        style={[
            { borderRadius: props.rounded || 5, height: props.height || 50, width: props.width || 80, backgroundColor: props.disabled ? 'darkgray' : props.backgroundColor, borderWidth: 0, opacity: props.disabled ? 0.3 : 1 },
            {
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: props.icon === undefined ? 'row' : 'column'
            }
        ]}
    >
        <>
            {props.children && (<Text>{props.children}</Text>)}
        </>
    </Button>
}