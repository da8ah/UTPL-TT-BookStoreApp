import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboard() {
    const [isKeyboardVisible, setKeyboardVisibility] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisibility(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisibility(false));

        return () => {
            keyboardDidHideListener.remove(); keyboardDidShowListener.remove();
        };
    }, []);
    return [isKeyboardVisible, setKeyboardVisibility] as const
}