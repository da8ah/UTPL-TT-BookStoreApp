import { create } from 'zustand';

type ThemeStoreType = {
    themeMode: 'dark' | 'light',
    toggleThemeMode: () => void
}

const currentTime = new Date()
const useThemeMode = create<ThemeStoreType>()((set) => ({
    themeMode: currentTime.getHours() >= 8 && currentTime.getHours() <= 18 ? 'light' : 'dark',
    toggleThemeMode: () => set(state => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' }))
}))

export default useThemeMode;