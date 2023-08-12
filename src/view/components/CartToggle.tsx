import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import useAppViewModel from "../../hooks/context/useAppViewModel";
import { RootNavProps } from "../routes/types.nav";
import RoundButton from "./RoundButton";
import { View } from "react-native";
import ActionButton from "./ActionButton";

export default function CartToggle() {
    const { vimo } = useAppViewModel()
    // const { isEditorOpen } = useContext(EditorContext)
    const isEditorOpen = false
    const navigation = useNavigation<RootNavProps>()
    const theme = useTheme()

    return <>
        {isEditorOpen ?
            <RoundButton
                size="tiny"
                icon={() => <Icon name="close" fill="black" height="30" width="30" />}
                backgroundColor={theme['color-warning-500']}
                onPress={() => {
                    if (navigation.canGoBack()) navigation.goBack()
                    else navigation.navigate('BottomNav', { screen: 'Home' })
                }}
            /> :
            <CartButton isEditorOpen={isEditorOpen} />}
    </>
}

const CartButton = (props: { isEditorOpen: boolean }) => {
    const navigation = useNavigation<RootNavProps>()
    const { isEditorOpen } = props
    return <Button
        status="basic"
        appearance="ghost"
        style={{ position: 'relative', borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => {
            // if (!isEditorOpen) vimo.createDraft()
            navigation.navigate('CartOrder')
        }}
    >
        <>
            <Icon name="shopping-cart" fill="white" height="30" width="30" />
            <Text
                style={{
                    backgroundColor: 'black',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    fontSize: 10,
                    height: 20,
                    width: 20,
                    borderRadius: 100,
                    textAlign: 'center',
                    verticalAlign: 'middle'
                }}>1</Text>
        </>
    </Button>
}