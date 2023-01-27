import React from 'react'
import { gestionApi } from 'api'
import { Form, Modal, NumInput } from 'components/Form'
import { requiredNumber, SchemaOf, object } from 'components/Yup'
import { Header } from 'semantic-ui-react'


type Props = {
    open: boolean,
    closeModal: () => void,
    gestion: any
}

type nuevaArea = {
    area: number
}

const validationSchema: SchemaOf<nuevaArea> = object({
    area: requiredNumber()
})

export default function ActualizarAreaModal({
    open,
    closeModal,
    gestion
}: Props) {

    const onSubmit = (data: nuevaArea, onResponse: (res: any) => void, onError: (error: any) => void) => {
        gestion.area = data.area
        gestionApi.actualizarAreaGestion(gestion, onResponse, onError)
    }

    const onSuccess = () => {
        closeModal()
    }

    return (
        <Modal open={open} closeModal={closeModal} header="Confirmación">
            <Form validationSchema={validationSchema} onSubmit={onSubmit} onSuccess={onSuccess} >
                <Header size="small" content={"¿Está seguro de cambiar el área de la solicitud de Licencia de aprovechamiento forestal con fines de producción? El área actual es: " + gestion?.area + "."} />
                <NumInput
                    name="area"
                    label="Área nueva"
                />
            </Form>
        </Modal>
    )
}
