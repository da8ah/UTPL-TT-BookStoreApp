import { create } from "zustand";
import CardTransaction from "../model/core/entities/CardTransaction";
import Cart from "../model/core/entities/Cart";
import Client from "../model/core/entities/Client";
import ToBuyBook from "../model/core/entities/ToBuyBook";
import GestionDelCarrito from "../model/core/usecases/client/CarritoDelClient";
import TransaccionesDelClient from "../model/core/usecases/client/TransaccionesDelClient";
import LocalService from "../model/services/LocalService";
import PaymentService from "../model/services/PaymentService";
import RemoteService from "../model/services/RemoteService";

type CartStoreType = {
    isCartOpen: boolean,
    isPaymentOpen: boolean,
    toggleCart: () => void,
    togglePayment: () => void,
    myCart: Cart,
    username: string,
    setUserToCart: (username: string) => void,
    addBookToCart: (toBuyBook: ToBuyBook, cant: number) => void,
    rmBookFromCart: (toBuyBook: ToBuyBook) => void,
    emptyCart: () => void,
    publishableKey: string,
    queryPublishableKey: () => void,
    sendPaymentToServer: () => Promise<{} | undefined>,
    sendTransactionToServer: (client: Client) => Promise<boolean>
}

const useCart = create<CartStoreType>()((set, get) => ({
    isCartOpen: false,
    isPaymentOpen: false,
    toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
    togglePayment: () => set(state => ({ isPaymentOpen: !state.isPaymentOpen })),
    myCart: new Cart([]),
    username: '',
    setUserToCart: (username) => set({ username }),
    addBookToCart: (toBuyBook, cant) => set(state => {
        GestionDelCarrito.agregarLibroAlCarrito(state.myCart, toBuyBook, cant)
        return { myCart: state.myCart }
    }),
    rmBookFromCart: (toBuyBook) => set(state => {
        GestionDelCarrito.quitarLibroDelCarrito(state.myCart, toBuyBook)
        return { myCart: state.myCart }
    }),
    emptyCart: () => set({ myCart: new Cart([]) }),
    publishableKey: '',
    queryPublishableKey: async () => {
        if (get().publishableKey !== '') return

        const token = await new LocalService().obtenerTokenAlmacenado()
        set({ publishableKey: await new PaymentService(token, get().username).queryPaymentKey() || '' })
    },
    sendPaymentToServer: async () => {
        const token = await new LocalService().obtenerTokenAlmacenado()
        return GestionDelCarrito.pagarCarritoEnCaja(new PaymentService(token, get().username), get().myCart.getToBuyBooks())
    },
    sendTransactionToServer: async (client: Client) => {
        const token = await new LocalService().obtenerTokenAlmacenado()
        const transactions = await TransaccionesDelClient.registrarTransaccion(new RemoteService(token, get().username),
            new CardTransaction(
                undefined,
                client.getCards().at(0)?.getCardNumber(),
                client.getUser(),
                client.getName(),
                client.getEmail(),
                client.getMobile(),
                new Date().toLocaleDateString("ec"),
                get().myCart.getTotalPrice(),
                get().myCart
            )
        )
        client.setTransactions(transactions)
        return transactions.length > 0
    }
}))

export default useCart;