import { create } from "zustand";
import Cart from "../model/core/entities/Cart";
import ToBuyBook from "../model/core/entities/ToBuyBook";
import GestionDelCarrito from "../model/core/usecases/client/CarritoDelClient";
import PaymentService from "../model/services/PaymentService";
import LocalService from "../model/services/LocalService";

type CartStoreType = {
    isCartOpen: boolean,
    isPaymentOpen: boolean,
    toggleCart: () => void,
    togglePayment: () => void,
    myCart: Cart,
    transactionResult: { clientSecret?: string, codeStatus?: string },
    addBookToCart: (toBuyBook: ToBuyBook, cant: number) => void,
    rmBookFromCart: (toBuyBook: ToBuyBook) => void,
    queryPublishableKey: (username: string) => Promise<string | undefined>,
    sendPaymentToServer: () => void,
    sendTransactionToServer: () => Promise<boolean>
}

const useCart = create<CartStoreType>()((set) => ({
    isCartOpen: false,
    isPaymentOpen: false,
    toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
    togglePayment: () => set(state => ({ isPaymentOpen: !state.isPaymentOpen })),
    myCart: new Cart([]),
    transactionResult: {},
    addBookToCart: (toBuyBook, cant) => set(state => {
        GestionDelCarrito.agregarLibroAlCarrito(state.myCart, toBuyBook, cant)
        return { myCart: state.myCart }
    }),
    rmBookFromCart: (toBuyBook) => set(state => {
        GestionDelCarrito.quitarLibroDelCarrito(state.myCart, toBuyBook)
        return { myCart: state.myCart }
    }),
    queryPublishableKey: async (username) => {
        const token = await new LocalService().obtenerTokenAlmacenado()
        return new PaymentService(token, username).queryPaymentKey()
    },
    sendPaymentToServer: async () => {
        const token = await new LocalService().obtenerTokenAlmacenado()
        set(state => {
            return { transactionResult: GestionDelCarrito.pagarCarritoEnCaja(new PaymentService(token), state.myCart) as {} }
        })
    },
    sendTransactionToServer: async () => {
        return true
    }
}))

export default useCart;