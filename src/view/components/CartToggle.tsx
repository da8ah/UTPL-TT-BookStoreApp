import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import useAppViewModel from "../../hooks/useAppViewModel";
import useCart from "../../hooks/useCart";
import { RootNavProps } from "../routes/types.nav";
import RoundButton from "./RoundButton";

export default function CartToggle() {
    const { vimo } = useAppViewModel()
    const { isCartOpen, toggleCart } = useCart()
    const navigation = useNavigation<RootNavProps>()
    const theme = useTheme()

    return <>
        {isCartOpen ?
            <RoundButton
                size="tiny"
                icon={() => <Icon name="close" fill="black" height="30" width="30" />}
                backgroundColor={theme['color-warning-500']}
                onPress={() => {
                    toggleCart()
                    if (navigation.canGoBack()) navigation.goBack()
                    else navigation.navigate('BottomNav', { screen: 'Home' })
                }}
            /> :
            <CartButton />}
    </>
}

const CartButton = () => {
    const navigation = useNavigation<RootNavProps>()
    const { isCartOpen, toggleCart } = useCart()
    return <Button
        status="basic"
        appearance="ghost"
        style={{ position: 'relative', borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => {
            // if (!isEditorOpen) vimo.createDraft()
            toggleCart()
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