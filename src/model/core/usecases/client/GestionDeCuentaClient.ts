import BillingInfo from "../../entities/BillingInfo";
import Card from "../../entities/Card";
import Client from "../../entities/Client";
import IPersistenciaClient from "../../ports/persistencia/IPersistenciaClient";

export default class GestionDeCuentaClient {
	public static actualizarCuenta(iPersistenciaClient: IPersistenciaClient, client: Client): Promise<boolean> {
		return iPersistenciaClient.actualizarCuenta(client);
	}

	public static actualizarBillingInfo(iPersistenciaClient: IPersistenciaClient, billingInfo: BillingInfo): Promise<boolean> {
		return iPersistenciaClient.actualizarBillingInfo(billingInfo);
	}
	public static agregarCard(iPersistenciaClient: IPersistenciaClient, card: Card): Promise<boolean> {
		return iPersistenciaClient.agregarCard(card);
	}
	public static eliminarCard(iPersistenciaClient: IPersistenciaClient, card: Card): Promise<boolean> {
		return iPersistenciaClient.eliminarCard(card);
	}

	public static eliminarCuenta(iPersistenciaClient: IPersistenciaClient): Promise<boolean> {
		return iPersistenciaClient.eliminarCuenta();
	}
}
