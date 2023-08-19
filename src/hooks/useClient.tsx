import { create } from "zustand";
import Client from "../model/core/entities/Client";
import GestionDeCuentaClient from '../model/core/usecases/client/GestionDeCuentaClient';
import LocalService from "../model/services/LocalService";
import RemoteService from "../model/services/RemoteService";

type ClientStoreType = {
    client: Client,
    updateClient: (client?: Client) => void,
    deleteClient: () => void
}

const useClient = create<ClientStoreType>()((set, get) => ({
    client: new Client('', '', '', '', ''),
    updateClient: (client?: Client) => set(state => ({ client: client || state.client })),
    deleteClient: async () => {
        const token = await new LocalService().obtenerTokenAlmacenado()
        if (await GestionDeCuentaClient.eliminarCuenta(new RemoteService(token, get().client.getUser())))
            set({ client: new Client('', '', '', '', '') })
    }
}))

export default useClient;