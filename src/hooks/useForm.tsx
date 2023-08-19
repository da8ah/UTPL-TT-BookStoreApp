import { useState } from "react";
import { create } from "zustand";
import Client from "../model/core/entities/Client";
import GestionDeInicio from "../model/core/usecases/GestionDeInicio";
import RemoteService from "../model/services/RemoteService";

type CartStoreType = {
    newClient: Client,
    resetClient: () => void,
    saveNewClient: () => Promise<string>
}

export const useFormStore = create<CartStoreType>()((set, get) => ({
    newClient: new Client('', '', '', '', ''),
    resetClient: () => set(() => ({ newClient: new Client('', '', '', '', '') })),
    saveNewClient: async () => await GestionDeInicio.crearCuenta(new RemoteService(), get().newClient)
}))

export const useFormState = () => {
    const { newClient } = useFormStore()
    const [userCheck, setUserCheck] = useState<boolean>(true)
    const [nameCheck, setNameCheck] = useState<boolean>(true)
    const [emailCheck, setEmailCheck] = useState<boolean>(true)
    const [mobileCheck, setMobileCheck] = useState<boolean>(true)
    const [passwordCheck, setPasswordCheck] = useState<boolean>(true)
    const [user, setUser] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [mobile, setMobile] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [toWhomCheck, setToWhomCheck] = useState<boolean>(true)
    const [ciCheck, setCiCheck] = useState<boolean>(true)
    const [provinciaCheck, setProvinciaCheck] = useState<boolean>(true)
    const [ciudadCheck, setCiudadCheck] = useState<boolean>(true)
    const [numCasaCheck, setNumCasaCheck] = useState<boolean>(true)
    const [callesCheck, setCallesCheck] = useState<boolean>(true)
    const [toWhom, setToWhom] = useState<string>('')
    const [ci, setCi] = useState<string>('')
    const [provincia, setProvincia] = useState<string>('')
    const [ciudad, setCiudad] = useState<string>('')
    const [numCasa, setNumCasa] = useState<string>('')
    const [calles, setCalles] = useState<string>('')

    function cleanBasic() {
        setUserCheck(true)
        setNameCheck(true)
        setEmailCheck(true)
        setMobileCheck(true)
        setPasswordCheck(true)
        setUser('')
        setName('')
        setEmail('')
        setMobile('')
        setPassword('')
        newClient.setUser('')
        newClient.setName('')
        newClient.setEmail('')
        newClient.setMobile('')
        newClient.setPassword('')
    }
    function cleanBillingInfo() {
        setToWhomCheck(true)
        setCiCheck(true)
        setProvinciaCheck(true)
        setCiudadCheck(true)
        setNumCasaCheck(true)
        setCallesCheck(true)
        setToWhom('')
        setCi('')
        setProvincia('')
        setCiudad('')
        setNumCasa('')
        setCalles('')
        newClient.getBillingInfo().setToWhom('')
        newClient.getBillingInfo().setCi('')
        newClient.getBillingInfo().setProvincia('')
        newClient.getBillingInfo().setCiudad('')
        newClient.getBillingInfo().setNumCasa('')
        newClient.getBillingInfo().setCalles('')
    }

    function setCheck(propName: string, value: boolean) {
        switch (propName) {
            case 'user':
                setUserCheck(value)
                break;
            case 'name':
                setNameCheck(value)
                break;
            case 'email':
                setEmailCheck(value)
                break;
            case 'mobile':
                setMobileCheck(value)
                break;
            case 'password':
                setPasswordCheck(value)
                break;
            case 'toWhom':
                setToWhomCheck(value)
                break;
            case 'ci':
                setCiCheck(value)
                break;
            case 'provincia':
                setProvinciaCheck(value)
                break;
            case 'ciudad':
                setCiudadCheck(value)
                break;
            case 'numCasa':
                setNumCasaCheck(value)
                break;
            case 'calles':
                setCallesCheck(value)
                break;
        }
    }
    function setProperty(propName: string, value: string) {
        switch (propName) {
            case 'user':
                setUser(value)
                newClient.setUser(value.trimEnd())
                break;
            case 'name':
                setName(value)
                newClient.setName(value.trimEnd())
                break;
            case 'email':
                setEmail(value)
                newClient.setEmail(value.trimEnd())
                break;
            case 'mobile':
                setMobile(value)
                newClient.setMobile(value.trimEnd())
                break;
            case 'password':
                setPassword(value)
                newClient.setPassword(value) // Avoid Trim
                break;
            case 'toWhom':
                setToWhom(value)
                newClient.getBillingInfo().setToWhom(value.trimEnd())
                break;
            case 'ci':
                setCi(value)
                newClient.getBillingInfo().setCi(value.trimEnd())
                break;
            case 'provincia':
                setProvincia(value)
                newClient.getBillingInfo().setProvincia(value.trimEnd())
                break;
            case 'ciudad':
                setCiudad(value)
                newClient.getBillingInfo().setCiudad(value.trimEnd())
                break;
            case 'numCasa':
                setNumCasa(value)
                newClient.getBillingInfo().setNumCasa(value.trimEnd())
                break;
            case 'calles':
                setCalles(value)
                newClient.getBillingInfo().setCalles(value.trimEnd())
                break;
        }
    }

    return {
        userCheck,
        nameCheck,
        emailCheck,
        mobileCheck,
        passwordCheck,
        user,
        name,
        email,
        mobile,
        password,

        toWhomCheck,
        ciCheck,
        provinciaCheck,
        ciudadCheck,
        numCasaCheck,
        callesCheck,
        toWhom,
        ci,
        provincia,
        ciudad,
        numCasa,
        calles,

        setCheck,
        setProperty,
        cleanBasic,
        cleanBillingInfo
    }
}
