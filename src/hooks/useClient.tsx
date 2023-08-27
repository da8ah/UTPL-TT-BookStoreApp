import { create } from "zustand";
import Client from "../model/core/entities/Client";
import GestionDeCuentaClient from '../model/core/usecases/client/GestionDeCuentaClient';
import TransaccionesDelClient from "../model/core/usecases/client/TransaccionesDelClient";
import LocalService from "../model/services/LocalService";
import RemoteService from "../model/services/RemoteService";

type ClientStoreType = {
    client: Client,
    postSignIn: () => void,
    updateClient: (client?: Client) => void,
    deleteClient: () => void
}

const useClient = create<ClientStoreType>()((set, get) => ({
    client: new Client('', '', '', '', ''),
    postSignIn: async () => {
        const storage = new LocalService()
        get().client.setTransactions((await TransaccionesDelClient.listarMisTransacciones(new RemoteService(await storage.obtenerTokenAlmacenado(), get().client.getUser()), get().client)).reverse())
        set({ client: get().client })
    },
    updateClient: (client?: Client) => set(state => ({ client: client || state.client })),
    deleteClient: async () => {
        const token = await new LocalService().obtenerTokenAlmacenado()
        if (await GestionDeCuentaClient.eliminarCuenta(new RemoteService(token, get().client.getUser())))
            set({ client: new Client('', '', '', '', '') })
    }
}))

export default useClient;