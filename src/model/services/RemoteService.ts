import { BookConverter, ClientConverter, TransactionConverter } from "../../utils/json.casts";
import BillingInfo from "../core/entities/BillingInfo";
import Card from "../core/entities/Card";
import CardTransaction from "../core/entities/CardTransaction";
import Client from "../core/entities/Client";
import StockBook from "../core/entities/StockBook";
import Transaction from "../core/entities/Transaction";
import IPersistenciaClient from "../core/ports/persistencia/IPersistenciaClient";
import IPersistenciaLibro from "../core/ports/persistencia/IPersistenciaLibro";
import IPersistenciaTransacciones from "../core/ports/persistencia/IPersistenciaTransacciones";

export default class RemoteService implements IPersistenciaClient, IPersistenciaLibro, IPersistenciaTransacciones {

    private token: string
    private username: string
    private base = 'https://utpl-tt-bookstore.azurewebsites.net'
    private api = `${this.base}/api`
    private apiBooks = `${this.api}/books`
    private apiClient: string
    private apiTransactions: string

    constructor(token: string = '', username: string = '') {
        this.token = token
        this.username = username
        this.apiClient = `${this.api}/clients/${this.username}`
        this.apiTransactions = `${this.apiClient}/transactions`
    }

    actualizarBillingInfo(client: Client, billingInfo: BillingInfo): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    agregarCard(client: Client, card: Card): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    eliminarCard(client: Client, card: Card): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    agregarTransaction(client: Client, transaction: Transaction): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    // USER
    async iniciarSesion(client: Client): Promise<{ user: Client; token: string; } | undefined> {
        try {
            let user, token
            const httpContent = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: client.getUser(), password: client.getPassword() })
            };
            await fetch(`${this.base}/signin`, httpContent)
                .then((res) => {
                    token = res.headers.get("set-cookie")?.split(";")[0].split("=")[1];
                    return res.json();
                })
                .then((body) => (user = ClientConverter.jsonToClient(body)));
            return token && { token, user }
        } catch (error) {
            console.error(error)
            return
        }
    }

    async iniciarSesionConToken(): Promise<Client | undefined> {
        try {
            if (this.token === '' || this.username === '') throw Error('Unauthorized, must signin!')

            let user
            const httpContent = {
                method: "GET",
                headers: {
                    Authorization: this.token,
                },
            };
            await fetch(`${this.api}/clients/signin`, httpContent)
                .then((res) => res.json())
                .then((body) => (user = ClientConverter.jsonToClient(body)));
            return user
        } catch (error) {
            console.log(error)
            return
        }
    }
    async actualizarCuenta(client: Client, originalClientToChangeUsername?: Client | undefined): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async eliminarCuenta(client: Client): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async obtenerLibrosVisibles(): Promise<StockBook[]> {
        try {
            let data: StockBook[] = await fetch(this.apiBooks)
                .then((res) => res.json())
                .then((body) => body.map((item: StockBook) => BookConverter.jsonToBook(item)));
            return data;
        } catch (error) {
            console.error(error)
            return [];
        }
    }

    // TRANSACTIONS
    async obtenerTransaccionesDeClient(): Promise<CardTransaction[]> {
        try {
            if (this.token === '' || this.username === '') throw Error('Unauthorized, must signin!')

            const httpContent = {
                method: "GET",
                headers: {
                    Authorization: this.token
                },
            };
            let data: CardTransaction[] = await fetch(`${this.apiTransactions}`, httpContent)
                .then((res) => res.json())
                .then((body) => body.map((item: CardTransaction) => TransactionConverter.jsonToCardTransaction(item)));

            return data;
        } catch (error) {
            console.error(error)
            return [];
        }
    }
    async guardarTransaccionDeClient(transaction: Transaction): Promise<CardTransaction[]> {
        try {
            if (this.token === '' || this.username === '') throw Error('Unauthorized, must signin!')

            const httpContent = {
                method: "POST",
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transaction)
            };
            let data: CardTransaction[] = await fetch(`${this.apiTransactions}`, httpContent)
                .then((res) => res.json())
                .then((body) => body.map((item: CardTransaction) => TransactionConverter.jsonToCardTransaction(item)));

            return data
        } catch (error) {
            console.error(error)
            return []
        }
    }
}