import { useState } from "react"

export default function useModal<ModalAttributes>() {
    const [modalAttributes, setModalAttributes] = useState<ModalAttributes>()
    const [modalVisibility, setModalVisibility] = useState(false)
    return [modalAttributes, setModalAttributes, modalVisibility, setModalVisibility] as const
}