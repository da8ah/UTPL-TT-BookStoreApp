import * as LocalAuthentication from 'expo-local-authentication';
import { create } from "zustand";
import Client from "../model/core/entities/Client";
import GestionDeInicio from "../model/core/usecases/GestionDeInicio";
import LocalService from "../model/services/LocalService";
import RemoteService from "../model/services/RemoteService";

type AuthStoreType = {
    isLoading: boolean,
    isBioSupported: boolean,
    isBioAuth: boolean,
    isAuth: boolean,
    tryToAuth: (credentials?: { user: string, password: string }) => Promise<Client>,
    logout: () => void,
    checkBioSupport: () => void,
    requestFingerprint: () => Promise<boolean>
}

const useAuth = create<AuthStoreType>()((set) => ({
    isLoading: false,
    isBioSupported: false,
    isBioAuth: false,
    isAuth: false,
    tryToAuth: async (credentials?: { user: string, password: string }) => {
        set(() => ({ isLoading: true }))
        const service = new RemoteService()
        const storage = new LocalService()
        const client = credentials === undefined ?
            await GestionDeInicio.iniciarSesionConToken(service, storage)
            :
            await GestionDeInicio.iniciarSesionConUserPassword(service, storage, new Client(credentials.user, '', '', '', credentials.password))
        if (client !== undefined) set(() => ({ isAuth: true }))
        set(() => ({ isLoading: false }))
        return client || new Client('', '', '', '', '')
    },
    logout: async () => {
        await GestionDeInicio.cerrarSesion(new LocalService())
        set(() => ({ isLoading: false, isAuth: false }))
    },
    checkBioSupport: async () => {
        set({ isBioSupported: (await LocalAuthentication.supportedAuthenticationTypesAsync()).includes(LocalAuthentication.AuthenticationType.FINGERPRINT) })
    },
    requestFingerprint: async () => {
        const auth = await LocalAuthentication.authenticateAsync({ promptMessage: "Desbloquear PAGOS", cancelLabel: "Cancelar" })
        set({ isBioAuth: auth.success })
        return auth.success
    }
}))

export default useAuth;