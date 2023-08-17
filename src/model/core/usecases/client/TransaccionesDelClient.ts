import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";
import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";

export default class TransaccionesDelClient {
	public static async registrarTransaccion(iPersistenciaTransacciones: IPersistenciaTransacciones, transaction: Transaction): Promise<Transaction[]> {
		return iPersistenciaTransacciones.guardarTransaccionDeClient(transaction)
	}

	public static async listarMisTransacciones(iPersistenciaTransacciones: IPersistenciaTransacciones, client: Client): Promise<Transaction[]> {
		return iPersistenciaTransacciones.obtenerTransaccionesDeClient(new Client(client.getUser(), "", "", "", ""));
	}
}
