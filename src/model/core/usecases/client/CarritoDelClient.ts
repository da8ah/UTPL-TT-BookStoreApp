import Cart from "../../entities/Cart";
import ToBuyBook from "../../entities/ToBuyBook";
import IPago from "../../ports/IPago";
import IPersistenciaCarrito from "../../ports/persistencia/IPersistenciaCarrito";

export default class GestionDelCarrito {
	public static async pagarCarritoEnCaja(iPago: IPago, cart: Cart): Promise<any> {
		throw ("Not implemented!")
	}

	public static guardarCarrito(iPersistenciaCarrito: IPersistenciaCarrito, cart: Cart): Promise<boolean> {
		return iPersistenciaCarrito.guardarCarrito(cart);
	}

	public static recuperarCarrito(iPersistenciaCarrito: IPersistenciaCarrito): Promise<Cart | null> {
		return iPersistenciaCarrito.recuperarCarrito();
	}

	public static async agregarLibroAlCarrito(cart: Cart, toBuyBook: ToBuyBook, cant: number): Promise<boolean> {
		if (cant > 0) {
			const found = cart.getToBuyBooks().find(book => book.getIsbn() === toBuyBook.getIsbn())
			if (!found) {
				toBuyBook.setCant(cant)
				cart.addToBuyBook(toBuyBook)
			} else {
				found.setCant(cant)
				cart.calculate()
			}
		}
		return cart.getToBuyBooks().includes(toBuyBook)
	}
	public static async quitarLibroDelCarrito(cart: Cart, toBuyBook: ToBuyBook): Promise<boolean> {
		const found = cart.getToBuyBooks().find(book => book.getIsbn() === toBuyBook.getIsbn())
		if (found) cart.rmToBuyBook(toBuyBook)
		return !cart.getToBuyBooks().includes(toBuyBook)
	}
}
