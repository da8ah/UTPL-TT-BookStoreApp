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
    updateClientAccount: (client: Client) => Promise<boolean>,
    deleteClientAccount: () => void
}

const useClient = create<ClientStoreType>()((set, get) => ({
    client: new Client('', '', '', '', ''),
    postSignIn: async () => {
        if (get().client.getUser() === '') return

        const token = await new LocalService().obtenerTokenAlmacenado()
        get().client.setTransactions(
            (await TransaccionesDelClient.listarMisTransacciones(
                new RemoteService(token, get().client.getUser()), get().client)
            ).reverse()
        )
        set({ client: get().client })
    },
    updateClient: (client?: Client) => set(state => ({ client: client || state.client })),
    updateClientAccount: async (client: Client) => {
        const token = await new LocalService().obtenerTokenAlmacenado()
        return await GestionDeCuentaClient.actualizarCuenta(new RemoteService(token, get().client.getUser()), client)
    },
    deleteClientAccount: async () => {
        const token = await new LocalService().obtenerTokenAlmacenado()
        if (await GestionDeCuentaClient.eliminarCuenta(new RemoteService(token, get().client.getUser())))
            set({ client: new Client('', '', '', '', '') })
    }
}))

export default useClient;