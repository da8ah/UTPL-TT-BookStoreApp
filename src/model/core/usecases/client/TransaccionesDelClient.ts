import crypto from "crypto";
import Card from "../../entities/Card";
import Cart from "../../entities/Cart";
import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";
import TransactionFactory from "../../entities/TransactionFactory";
import IPersistenciaClient from "../../ports/persistencia/IPersistenciaClient";
import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";

export default class TransaccionesDelClient {
	public static async registrarTransaccion(
		iPersistenciaClient: IPersistenciaClient,
		iPersistenciaTransacciones: IPersistenciaTransacciones,
		card: Card,
		client: Client,
		cart: Cart,
	): Promise<Transaction[]> {
		throw ("Not implemented!")
	}

	public static async listarMisTransacciones(iPersistenciaTransacciones: IPersistenciaTransacciones, client: Client): Promise<Transaction[]> {
		return await iPersistenciaTransacciones.obtenerTransaccionesDeClient(new Client(client.getUser(), "", "", "", ""));
	}
}
