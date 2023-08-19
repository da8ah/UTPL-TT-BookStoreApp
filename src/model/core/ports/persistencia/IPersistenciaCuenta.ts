import Client from "../../entities/Client";

export type IPersistenciaCuentaLocal = {
	almacenarTokenEnLocal(token: string): Promise<boolean>;
	obtenerTokenAlmacenado(): Promise<string | undefined>;
	eliminarTokenAlmacenado(): Promise<boolean>;
}

export default interface IPersistenciaCuenta {
	iniciarSesion(client: Client): Promise<{ user: Client, token: string } | undefined>;
	iniciarSesionConToken(token?: string): Promise<Client | undefined>;
	crearNevaCuenta(client: Client): Promise<string>;
	actualizarCuenta(client: Client, originalClientToChangeUsername?: Client): Promise<boolean>;
	eliminarCuenta(): Promise<boolean>;
}
