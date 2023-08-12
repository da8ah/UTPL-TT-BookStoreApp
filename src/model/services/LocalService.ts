import * as SecureStore from "expo-secure-store";
import { IPersistenciaCuentaLocal } from "../core/ports/persistencia/IPersistenciaCuenta";

export default class LocalService implements IPersistenciaCuentaLocal {
    private AUTH_KEY = 'authTokenSaved'
    async almacenarTokenEnLocal(token: string): Promise<boolean> {
        if (!await SecureStore.isAvailableAsync()) return false

        try {
            await SecureStore.setItemAsync(this.AUTH_KEY, token)
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }
    async obtenerTokenAlmacenado(): Promise<string | undefined> {
        if (!await SecureStore.isAvailableAsync()) return

        try {
            return await SecureStore.getItemAsync(this.AUTH_KEY) || undefined
        } catch (error) {
            console.error(error);
            return
        }
    }
    async eliminarTokenAlmacenado(): Promise<boolean> {
        if (!await SecureStore.isAvailableAsync()) return false

        try {
            await SecureStore.deleteItemAsync(this.AUTH_KEY)
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }
}