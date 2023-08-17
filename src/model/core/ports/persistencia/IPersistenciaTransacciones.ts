import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";

export default interface IPersistenciaTransacciones {
	guardarTransaccionDeClient(transaction: Transaction): Promise<Transaction[]>;
	obtenerTransaccionesDeClient(client: Client): Promise<Transaction[]>;
}
