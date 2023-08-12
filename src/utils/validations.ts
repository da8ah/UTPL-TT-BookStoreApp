import BillingInfo from "../model/core/entities/BillingInfo";
import User from "../model/core/entities/User";

export const patterns = {
	User: {
		USER: /^[A-Za-z]((\_|\.)?[A-Za-z0-9]){5,19}$/,
		NAME: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){1,4}$/,
		EMAIL: /^([\w\.\-]+){1,3}@([\w\-]+)((\.(\w){2,3})+)$/,
		MOBILE: /^(\+593)?\s?(\d{10}|\d{9})$/,
		PASSWORD: /^[\w\W\s]{5,}$/,
	},
	BillingInfo: {
		TO_WHOM: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){1,4}$/,
		CI: /^\d{10}$/,
		PROVINCIA: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\.)?(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){0,4}$/,
		CIUDAD: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\.)?(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){0,4}$/,
		NUM_CASA: /^\d((\-|\s)?\d){1,10}$/,
		CALLES: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]{1,15}((\.|\-|\,)?\s?[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]{1,15}){3,10}$/,
	}
};

export class InputValidator {
	public static validateUser(user: User): boolean {
		if (!new RegExp(patterns.User.USER).test(user.getUser())) return false;
		if (!new RegExp(patterns.User.NAME).test(user.getName())) return false;
		if (!new RegExp(patterns.User.EMAIL).test(user.getEmail())) return false;
		if (!new RegExp(patterns.User.MOBILE).test(user.getMobile())) return false;
		if (!new RegExp(patterns.User.PASSWORD).test(user.getPassword())) return false;
		return true;
	}
	public static validateBillingInfo(billingInfo: BillingInfo): boolean {
		if (!new RegExp(patterns.BillingInfo.TO_WHOM).test(billingInfo.getToWhom())) return false;
		if (!new RegExp(patterns.BillingInfo.CI).test(billingInfo.getCi())) return false;
		if (!new RegExp(patterns.BillingInfo.PROVINCIA).test(billingInfo.getProvincia())) return false;
		if (!new RegExp(patterns.BillingInfo.CIUDAD).test(billingInfo.getCiudad())) return false;
		if (!new RegExp(patterns.BillingInfo.NUM_CASA).test(billingInfo.getNumCasa())) return false;
		if (!new RegExp(patterns.BillingInfo.CALLES).test(billingInfo.getCalles())) return false;
		return true;
	}
}
