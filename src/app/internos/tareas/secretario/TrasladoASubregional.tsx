import FormModal from 'components/FormModal'
import React, { useContext, useState } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { tareaApi } from 'api'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'

type Props = {
    ttTarea: any
    closeActivity: () => void
}

export default function TrasladoASubregional({
    ttTarea,
    closeActivity
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [openConfirmacion, setOpenConfirmacion] = useState(false)
    const [loading, setLoading] = useState(false)

    const closeConfirmacion = () => setOpenConfirmacion(false)

    const confirmTraslado = () => {

        ttTarea.ttGestion.personaAnulaId = appDataContext.tokenData?.tcPersona.personaId
    
        const handleResponse = (res: any) => {
            if (res.status === "OK") {
                appDataContext.successToast(res.message)
                closeActivity()
            }
            else {
                appDataContext.errorToast(res.message)
            }
            setLoading(false)
        }

        const handleError = (error: AxiosError) => {
            setLoading(false)
            appDataContext.errorToast("Error. Intentelo de nuevo más tarde.")
            console.error(error)
        }

        setLoading(true)
        tareaApi.asignarSubregional(ttTarea, handleResponse, handleError)

    }

    return (

        <Segment placeholder style={{ "height": "100%" }}>
            <FormModal
                header='Confirmación'
                open={openConfirmacion}
                closeModal={closeConfirmacion}
                onSave={confirmTraslado}
                loading={loading}
            >
                <Header>¿Está seguro (a) de trasladar el expediente a la Dirección Subregional?
                    Esta acción no se podrá reversar?</Header>
            </FormModal>
            <Header icon>
                <Icon name='question circle' />
                <div>
                    El siguiente paso es trasladar el expediente a la Dirección Subregional.
                </div>
                <div>
                    Si lo quiere realizar ahora presione "Continuar". En caso contrarío
                    presione "Regresar a lista de tareas".
                </div>
            </Header>
            <Button primary content="Continuar" onClick={() => setOpenConfirmacion(true)} />
        </Segment>

    )
}
