import { Button, Icon } from "@ui-kitten/components";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/context/ThemeContext";

export default function ThemeModeToggle() {
    const { themeMode, toggleThemeMode } = useContext(ThemeContext);
    const SunIcon = () => <Icon name="sun" fill="white" height="30" width="30" />;
    const MoonIcon = () => <Icon name="moon" fill="white" height="30" width="30" />;
    return <Button
        activeOpacity={0.2}
        accessoryLeft={themeMode === "dark" ? SunIcon : MoonIcon}
        style={{ borderWidth: 0, borderRadius: 100, backgroundColor: 'transparent' }}
        onPress={toggleThemeMode} />
}