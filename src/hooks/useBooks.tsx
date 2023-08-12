import { create } from "zustand"
import StockBook from "../model/core/entities/StockBook"
import GestionDeInicio from "../model/core/usecases/GestionDeInicio"
import RemoteService from "../model/services/RemoteService"

type BooksStoreType = {
    isLoading: boolean,
    books: StockBook[],
    queryBooks: () => void,
}

const useBooks = create<BooksStoreType>()((set) => ({
    isLoading: false,
    books: [],
    queryBooks: async () => {
        set(() => ({ isLoading: true }))
        const books = await GestionDeInicio.listarCatalogoDeLibrosVisibles(new RemoteService())
        if (books.length > 0) set(() => ({ books }))
        set(() => ({ isLoading: false }))
    }
}))

export default useBooks;