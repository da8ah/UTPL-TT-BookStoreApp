import { create } from "zustand";
import Cart from "../model/core/entities/Cart";
import ToBuyBook from "../model/core/entities/ToBuyBook";
import GestionDelCarrito from "../model/core/usecases/client/CarritoDelClient";

type CartStoreType = {
    isCartOpen: boolean,
    isPaymentOpen: boolean,
    toggleCart: () => void,
    togglePayment: () => void,
    myCart: Cart,
    addBookToCart: (toBuyBook: ToBuyBook, cant: number) => void,
    rmBookFromCart: (toBuyBook: ToBuyBook) => void
}

const useCart = create<CartStoreType>()((set) => ({
    isCartOpen: false,
    isPaymentOpen: false,
    toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
    togglePayment: () => set(state => ({ isPaymentOpen: !state.isPaymentOpen })),
    myCart: new Cart([]),
    addBookToCart: (toBuyBook, cant) => set(state => {
        GestionDelCarrito.agregarLibroAlCarrito(state.myCart, toBuyBook, cant)
        return { myCart: state.myCart }
    }),
    rmBookFromCart: (toBuyBook) => set(state => {
        GestionDelCarrito.quitarLibroDelCarrito(state.myCart, toBuyBook)
        return { myCart: state.myCart }
    })
}))

export default useCart;