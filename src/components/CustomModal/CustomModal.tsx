import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Message, Modal, ModalProps } from 'semantic-ui-react'

type Props = {
    open: boolean
    closeModal: () => void
    apiFunction: (onResponse: (response: any) => void, onError: (error: AxiosError) => void) => boolean
    onSuccessResponse?: (response: any) => void
    successMessage?: string
    disableSuccessMessage?: boolean
    children: any
    cancelLabel?: string
    confirmLabel?: string
    scrollable?: boolean
} & ModalProps

export default function CustomModal({
    open,
    closeModal,
    apiFunction,
    onSuccessResponse,
    successMessage = "Datos almacenados correctamente",
    disableSuccessMessage = false,
    children,
    cancelLabel = "Cancelar",
    confirmLabel = "Confirmar",
    scrollable,
    ...restProps
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const onResponse = (response: any) => {
        setLoading(false)
        if (response.status === "OK") {
            onSuccessResponse?.(response)
            if (!disableSuccessMessage) {
                appDataContext.successToast(successMessage)
            }
            closeModal()
        }
        else {
            setError(response.message)
        }
    }

    const onError = (error: AxiosError) => {
        setError("Error al envíar la información. Intente más tarde")
        setLoading(false)
    }

    const handleClick = () => {
        if (!loading) {
            setError(null)
            let isOk = apiFunction(onResponse, onError)
            if(isOk){
                setLoading(true)
            }
        }
    }

    return (
        <Modal open={open} {...restProps}>
            <Modal.Content scrolling={scrollable}>
                <Message
                    hidden={error == null}
                    error
                    content={error}
                />
                <Modal.Description>
                    {children}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={closeModal} >
                    {cancelLabel}
                </Button>
                <Button primary onClick={handleClick} loading={loading}>
                    {confirmLabel}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
