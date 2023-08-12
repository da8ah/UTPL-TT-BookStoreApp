import { create } from "zustand";
import Client from "../model/core/entities/Client";
import GestionDeInicio from "../model/core/usecases/GestionDeInicio";
import LocalService from "../model/services/LocalService";
import RemoteService from "../model/services/RemoteService";

type AuthStoreType = {
    isAuth: boolean,
    client: Client,
    tryToAuth: (credentials?: { user: string, password: string }) => void,
    logout: () => void
}

const useAuth = create<AuthStoreType>()((set) => ({
    isAuth: false,
    client: new Client('', '', '', '', ''),
    tryToAuth: async (credentials?: { user: string, password: string }) => {
        const client = credentials === undefined ?
            await GestionDeInicio.iniciarSesionConToken(new RemoteService(), new LocalService())
            :
            await GestionDeInicio.iniciarSesionConUserPassword(new RemoteService(), new LocalService(), new Client(credentials.user, '', '', '', credentials.password))
        if (client !== undefined) set(() => ({ isAuth: true, client }))
    },
    logout: async () => {
        await GestionDeInicio.cerrarSesion(new LocalService())
        set(() => ({ isAuth: false, client: new Client('', '', '', '', '') }))
    }
}))

export default useAuth;