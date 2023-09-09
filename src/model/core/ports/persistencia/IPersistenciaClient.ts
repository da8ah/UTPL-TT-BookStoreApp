import BillingInfo from "../../entities/BillingInfo";
import Card from "../../entities/Card";
import IPersistenciaCuenta from "./IPersistenciaCuenta";

export default interface IPersistenciaClient extends IPersistenciaCuenta {
	actualizarBillingInfo(billingInfo: BillingInfo): Promise<boolean>;
	agregarCard(card: Card): Promise<boolean>;
	eliminarCard(card: Card): Promise<boolean>;
}
