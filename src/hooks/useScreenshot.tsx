import { create } from "zustand"

type ScreenshotStoreType = {
    isScreenshotAllowed: boolean,
    setScreenshotAllowedState: (value: boolean) => void
}

const useScreenshot = create<ScreenshotStoreType>()((set) => ({
    isScreenshotAllowed: false,
    setScreenshotAllowedState: (value: boolean) => set({ isScreenshotAllowed: value })
}))

export default useScreenshot;