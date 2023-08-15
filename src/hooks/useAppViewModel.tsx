import { useState } from "react";
import Admin from "../model/core/entities/Admin";
import CardTransaction from "../model/core/entities/CardTransaction";
import StockBook from "../model/core/entities/StockBook";
import GestionDeAdmin from "../model/core/usecases/admin/GestionDeAdmin";
import GestionDeLibros from "../model/core/usecases/admin/GestionDeLibros";
import GestionDeTransacciones from "../model/core/usecases/admin/GestionDeTransacciones";
import LocalService from "../model/services/LocalService";
import RemoteService from "../model/services/RemoteService";
import ObjectCloner from "../utils/cloner";

export default function useAppViewModel() {
    const [vimo] = useState<AppViewModel>(AppViewModel.getInstance());
    return { vimo }
}

export type BooksObserver = () => void;

class AppViewModel {
    private observer: BooksObserver | null = null;
    public attach(observer: BooksObserver) {
        this.observer = observer;
    }
    public detach() {
        this.observer = null;
    }
    public async forceBooksUpdate() {
        await this.queryBooksFromService()
        this.observer && this.observer()
    }

    // Singleton
    private static instance: AppViewModel | null = null;
    static getInstance() {
        if (!AppViewModel.instance) AppViewModel.instance = new AppViewModel();
        return AppViewModel.instance;
    }

    // STATE
    private draft = new StockBook('', '', '', '', '', '', '');
    private books: StockBook[] = []
    private transactions: CardTransaction[] = []
    private user: Admin = new Admin('', '', '', '', '');

    public createDraft() {
        const date = Intl.DateTimeFormat("ec", {
            day: "2-digit", month: "2-digit", year: "numeric",
        }).format(new Date())
        this.draft = new StockBook('', '', '', '', date, date, '')
    }

    public createDraftByISBN(isbn: string) {
        const book = this.books.find((book) => book.getIsbn() === isbn)
        if (book !== undefined) this.draft = ObjectCloner.stockBook(book)
    }

    public getDraft() {
        this.draft.setImgRef('https://azure.blob.png')
        return this.draft
    }

    public getBooks() {
        return this.books
    }

    public getTransactions() {
        return this.transactions
    }

    public getUser() {
        return this.user
    }

    // SERVICES
    private localService: LocalService = new LocalService()
    private remoteService: RemoteService = new RemoteService()
    private constructor() {
        this.setService()
    }
    public async setService() {
        const token = await this.localService.obtenerTokenAlmacenado()
        token && this.remoteService.setToken(token)
    }

    async login(admin?: Admin) {
        try {
            const user = admin === undefined ?
                await GestionDeAdmin.iniciarSesionConToken(this.remoteService, this.localService)
                :
                await GestionDeAdmin.iniciarSesionConUserPassword(this.remoteService, this.localService, new Admin(admin.getUser(), '', '', '', admin.getPassword()))
            if (user !== undefined) {
                this.user = user
                await this.setService()
                await this.queryBooksFromService()
                return true
            }
            return false
        } catch (error) {
            console.error(error)
            return false
        }
    }
    async logout() {
        try {
            return await GestionDeAdmin.cerrarSesion(this.localService)
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async queryBooksFromService() {
        if (this.remoteService === undefined) return
        this.books = await GestionDeLibros.listarCatalogoDeLibrosEnStock(this.remoteService)
    }
    async queryTransactionsFromService() {
        if (this.remoteService === undefined) return
        this.transactions = (await GestionDeTransacciones.listarTodasLasTransacciones(this.remoteService)) as CardTransaction[]
    }

    async saveBook() {
        if (this.remoteService === undefined) return
        return GestionDeLibros.crearLibro(this.remoteService, this.draft)
    }
    async updateBook(bookISBN: string) {
        if (this.remoteService === undefined) return

        if (bookISBN === this.draft.getIsbn())
            return GestionDeLibros.actualizarLibro(this.remoteService, this.draft)

        return GestionDeLibros.actualizarLibro(this.remoteService, this.draft, bookISBN)
    }
    async deleteBook(bookISBN: string) {
        if (this.remoteService === undefined) return
        const book = this.books.find(book => book.getIsbn() === bookISBN)
        return book && GestionDeLibros.eliminarLibro(this.remoteService, book)
    }
}
