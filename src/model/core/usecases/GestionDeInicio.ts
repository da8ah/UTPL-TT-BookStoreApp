import { InputValidator } from "../../../utils/validations";
import Client from "../entities/Client";
import StockBook from "../entities/StockBook";
import IPersistenciaCuenta, { IPersistenciaCuentaLocal } from "../ports/persistencia/IPersistenciaCuenta";
import IPersistenciaLibro from "../ports/persistencia/IPersistenciaLibro";

export default class GestionDeInicio {
	public static listarCatalogoDeLibrosVisibles(iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook[]> {
		return iPersistenciaLibro.obtenerLibrosVisibles();
	}
	public static async iniciarSesionConUserPassword(iPersistenciaCuenta: IPersistenciaCuenta, iPersistenciaCuentaLocal: IPersistenciaCuentaLocal, client: Client): Promise<Client | undefined> {
		const result = await iPersistenciaCuenta.iniciarSesion(new Client(client.getUser(), "", "", "", client.getPassword()));
		if (result === undefined) return
		const isTokenSaved = await iPersistenciaCuentaLocal.almacenarTokenEnLocal(result.token)
		if (!isTokenSaved) return
		return result.user
	}

	public static async iniciarSesionConToken(iPersistenciaCuenta: IPersistenciaCuenta, iPersistenciaCuentaLocal: IPersistenciaCuentaLocal): Promise<Client | undefined> {
		const token = await iPersistenciaCuentaLocal.obtenerTokenAlmacenado()
		return await iPersistenciaCuenta.iniciarSesionConToken(token)
	}
	public static async crearCuenta(iPersistenciaCuenta: IPersistenciaCuenta, client: Client): Promise<string> {
		if (!(InputValidator.validateUser(client) || InputValidator.validateBillingInfo(client.getBillingInfo()))) return ':400'
		return iPersistenciaCuenta.crearNevaCuenta(client)
	}

	public static async cerrarSesion(iPersistenciaCuentaLocal: IPersistenciaCuentaLocal): Promise<boolean> {
		return iPersistenciaCuentaLocal.eliminarTokenAlmacenado()
	}
}
