import { ModalAttributes } from "../../components/ModalDisplay"
import AlertModal from "./AlertModal"

interface FailedType extends ModalAttributes {
    modalType: 'failed',
    data: {
        title: string,
        iconName?: string,
        message: string
    }
}
interface SuccessType extends ModalAttributes {
    modalType: 'success',
    data: {
        title: string,
        iconName?: string,
        message: string
    }
}

export type AlertAttributes = (FailedType | SuccessType | undefined)
export type AlertCallback = { onButtonPress: () => void }
export type AlertFactory = AlertAttributes & AlertCallback

export default function AlertFactory(props: AlertFactory) {
    switch (props.modalType) {
        case 'failed':
            return <AlertModal {...props} />
        case 'success':
            return <AlertModal {...props} />
        default:
            return <></>
    }
}
