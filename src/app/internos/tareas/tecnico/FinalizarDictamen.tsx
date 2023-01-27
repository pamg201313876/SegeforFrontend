import TareaApi from 'api/TareaApi'
import { AppDataContext } from 'app/App'
import React, { useContext, useState } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

type Props = {
    tarea: any,
    closeModal: () => void
}

const tareaApi = new TareaApi()

export default function FinalizarDictamen({
    tarea,
    closeModal
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [loading, setLoading] = useState(false)

    const finalizarTareaTecnica = () => {

        tarea.ttSeguimientoTarea = {
            tab: 9
        }

        const HandleResponse = (response: any) => {
            setLoading(false)
            if (response.status == "OK") {
                closeModal()
            }
            else {
                console.error(response.message)
                appDataContext.errorToast(response.message)
            }
        }

        const HandleError = (error: any) => {
            setLoading(false)
            console.error("error")
            appDataContext.errorToast("Error al finalizar actividad. Intentelo más tarde")
        }

        setLoading(true)
        
        tareaApi.FinalizarTareaTecnica(tarea, HandleResponse, HandleError);

    }

    return (
        <Segment placeholder>
            <Header icon >
                <Icon name='check' />
                Proceso finalizado
            </Header>
            <Button primary onClick={finalizarTareaTecnica} loading={loading} content={"Finalizar actividad"}/>
        </Segment>
    )
}
