import { create } from "zustand";

type CartStoreType = {
    isCartOpen: boolean,
    toggleCart: () => void
}

const useCart = create<CartStoreType>()((set) => ({
    isCartOpen: false,
    toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen }))
}))

export default useCart;