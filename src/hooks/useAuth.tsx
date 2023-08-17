import * as LocalAuthentication from 'expo-local-authentication';
import { create } from "zustand";
import Client from "../model/core/entities/Client";
import GestionDeInicio from "../model/core/usecases/GestionDeInicio";
import TransaccionesDelClient from "../model/core/usecases/client/TransaccionesDelClient";
import LocalService from "../model/services/LocalService";
import RemoteService from "../model/services/RemoteService";


type AuthStoreType = {
    isLoading: boolean,
    isBioSupported: boolean,
    isBioAuth: boolean,
    isAuth: boolean,
    client: Client,
    updateClient: () => void,
    tryToAuth: (credentials?: { user: string, password: string }) => void,
    logout: () => void,
    checkBioSupport: () => void,
    requestFingerprint: () => Promise<boolean>
}

const useAuth = create<AuthStoreType>()((set) => ({
    isLoading: false,
    isBioSupported: false,
    isBioAuth: false,
    isAuth: false,
    client: new Client('', '', '', '', ''),
    updateClient: () => set(state => ({ client: state.client })),
    tryToAuth: async (credentials?: { user: string, password: string }) => {
        set(() => ({ isLoading: true }))
        const service = new RemoteService()
        const storage = new LocalService()
        const client = credentials === undefined ?
            await GestionDeInicio.iniciarSesionConToken(service, storage)
            :
            await GestionDeInicio.iniciarSesionConUserPassword(service, storage, new Client(credentials.user, '', '', '', credentials.password))

        if (client !== undefined) client.setTransactions(await TransaccionesDelClient.listarMisTransacciones(new RemoteService(await storage.obtenerTokenAlmacenado(), client.getUser()), client))
        if (client !== undefined) set(() => ({ isAuth: true, client }))
        set(() => ({ isLoading: false }))
    },
    logout: async () => {
        await GestionDeInicio.cerrarSesion(new LocalService())
        set(() => ({ isLoading: false, isAuth: false, client: new Client('', '', '', '', '') }))
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