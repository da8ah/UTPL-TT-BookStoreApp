import { create } from "zustand";
import Client from "../model/core/entities/Client";
import GestionDeInicio from "../model/core/usecases/GestionDeInicio";
import LocalService from "../model/services/LocalService";
import RemoteService from "../model/services/RemoteService";
import TransaccionesDelClient from "../model/core/usecases/client/TransaccionesDelClient";

type AuthStoreType = {
    isLoading: boolean,
    isAuth: boolean,
    client: Client,
    updateClient: () => void,
    tryToAuth: (credentials?: { user: string, password: string }) => void,
    logout: () => void
}

const useAuth = create<AuthStoreType>()((set) => ({
    isLoading: false,
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
    }
}))

export default useAuth;