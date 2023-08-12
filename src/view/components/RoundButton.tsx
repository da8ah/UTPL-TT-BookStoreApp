import ActionButton, { ActionButtonProps } from "./ActionButton";

type RoundButtonProps = {
    size?: 'tiny' | 'small' | 'medium' | 'big'
}

export default function RoundButton(props: Omit<ActionButtonProps, 'size'> & RoundButtonProps) {
    const size: {
        height: number,
        width: number
    } = { height: 0, width: 0 }
    switch (props.size) {
        case 'tiny':
            size.height = 50
            size.width = 50
            break;
        case 'small':
            size.height = 65
            size.width = 65
            break;
        case 'medium':
            size.height = 80
            size.width = 80
            break;
        case 'big':
            size.height = 100
            size.width = 100
            break;
        default:
            size.height = 80
            size.width = 80
            break;
    }
    return <ActionButton {...props} height={size.height} width={size.width} rounded={100}>
        {props.children}
    </ActionButton>
}