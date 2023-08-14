import { useState } from "react";
import { create } from "zustand";
import Client from "../model/core/entities/Client";

type CartStoreType = {
    client: Client,
    resetClient: () => void
}

export const useFormStore = create<CartStoreType>()((set) => ({
    client: new Client('', '', '', '', ''),
    resetClient: () => set(() => ({ client: new Client('', '', '', '', '') }))
}))

export const useFormState = () => {
    const { client } = useFormStore()
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
        client.setUser('')
        client.setName('')
        client.setEmail('')
        client.setMobile('')
        client.setPassword('')
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
        client.getBillingInfo().setToWhom('')
        client.getBillingInfo().setCi('')
        client.getBillingInfo().setProvincia('')
        client.getBillingInfo().setCiudad('')
        client.getBillingInfo().setNumCasa('')
        client.getBillingInfo().setCalles('')
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
                client.setUser(value)
                break;
            case 'name':
                setName(value)
                client.setName(value)
                break;
            case 'email':
                setEmail(value)
                client.setEmail(value)
                break;
            case 'mobile':
                setMobile(value)
                client.setMobile(value)
                break;
            case 'password':
                setPassword(value)
                client.setPassword(value)
                break;
            case 'toWhom':
                setToWhom(value)
                client.getBillingInfo().setToWhom(value)
                break;
            case 'ci':
                setCi(value)
                client.getBillingInfo().setCi(value)
                break;
            case 'provincia':
                setProvincia(value)
                client.getBillingInfo().setProvincia(value)
                break;
            case 'ciudad':
                setCiudad(value)
                client.getBillingInfo().setCiudad(value)
                break;
            case 'numCasa':
                setNumCasa(value)
                client.getBillingInfo().setNumCasa(value)
                break;
            case 'calles':
                setCalles(value)
                client.getBillingInfo().setCalles(value)
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
