import { create } from "zustand"

type ScreenCaptureStoreType = {
    isUserNav: boolean,
    setIsUserNavTo: (value: boolean) => void
}

const useScreenCapture = create<ScreenCaptureStoreType>()((set) => ({
    isUserNav: false,
    setIsUserNavTo: (value: boolean) => set({ isUserNav: value })
}))

export default useScreenCapture;