import React, { useContext, useEffect, useState } from 'react'
import { tareaApi } from 'api/index'
import { Task } from './TareasRecibidas'
import AvalGarantia from './subregional/aval/AvalGarantia'
import { AppDataContext } from 'app/App'
import { Button, Header, Segment } from 'semantic-ui-react'
import TrasladoASubregional from './secretario/TrasladoASubregional'
import ExpedienteProvidenciaNotifica from './subregional/expedienteProvidencia/ExpedienteProvidenciaNotifica'
import PanelTecnico from './tecnico/PanelTecnico'
import ExpedienteDictamenJuridico from './juridico/ExpedienteDictamenJuridico'
import GarantiaFiduciaria from './monitoreo/GarantiaFiduciaria'
import ExpedienteDictamenSubregional from './subregional/dictamen/ExpedienteDictamenSubregional'
import EnmiendaSubregional from './subregional/enmienda/EnmiendaSubregional'
import ProvidenciarEnmienda from './subregional/enmienda/ProvidenciarEnmienda'
import ExpedienteDictamenRegional from './Regional/ExpedienteDictamenRegional'
import CedulaNotificacion from './subregional/cedula/CedulaNotificacion'

type props = {
    closeActivity: () => void,
    ttTarea: any
}

export default function ActividadTarea({
    closeActivity,
    ttTarea: propTarea
}: props) {

    const appDataContext = useContext(AppDataContext)
    const [tarea, setTarea] = useState<any | null>(null)
    const [header, setHeader] = useState<string | null>(null)
    const [subHeader, setSubHeader] = useState<string | null>(null)

    const close = () => {
        setTarea(null)
        setHeader(null)
        closeActivity()
    }

    useEffect(() => {
        if (propTarea != null) {
            const HandleResponse = (res: any) => {
                if (res.status === "OK") {
                    setTarea(res.data[0])
                }
                else {
                    console.error(res.message)
                    appDataContext.errorToast(res.message)
                }
            }
            const HandleError = (error: any) => {
                console.log("error")
                appDataContext.errorToast("Error al descargar la información de la tarea. Intente más tarede")
            }
            tareaApi.getTareaData(propTarea.tareaId, HandleResponse, HandleError);
        }
    }, [propTarea])

    const renderActividad = () => {

        if (tarea == null) {
            return
        }

        let task = tarea.tcTask.taskId

        console.log(task)

        switch (task) {
            case Task.ConfirmacionSecretario:
                return <TrasladoASubregional ttTarea={tarea} closeActivity={closeActivity} />
            case Task.ProvidenciaSubregional:
                return <ExpedienteProvidenciaNotifica ttTarea={tarea} closeActivity={closeActivity} />
            case Task.DictamenTecnico:
                return <PanelTecnico tareaData={tarea} setTareaData={setTarea} setClose={closeActivity} />
            case Task.DictamenJuridico:
                return <ExpedienteDictamenJuridico tareaData={tarea} closeActivity={closeActivity} />
            case Task.DictamenSubregional:
                return <ExpedienteDictamenSubregional tareaData={tarea} setClose={closeActivity} />
            case Task.DictamenRegional:
                return <ExpedienteDictamenRegional tareaData={tarea} setClose={closeActivity} />
            case Task.EnmiendaSubregional:
                return <EnmiendaSubregional tareaData={tarea} setClose={closeActivity} />
            case Task.CedulaNotificacion:
                return <CedulaNotificacion tareaData={tarea} closeActivity={closeActivity} />
            case Task.ProvidenciarEnmiendas:
                return <ProvidenciarEnmienda ttTarea={tarea} closeActivity={closeActivity} />
            case Task.GarantiaFiduciaria:
                return <GarantiaFiduciaria ttTarea={tarea} closeActivity={closeActivity} />
            case Task.AvalGarantia:
                return <AvalGarantia ttTarea={tarea} closeActivity={closeActivity} />
        }

        return null
    }

    useEffect(() => {
        if (tarea != null) {
            console.log(tarea)
            let header = tarea?.tcTask?.taskDesc
            if (header != null) {
                setHeader(header)
            }
            setSubHeader("Expediente: " + tarea?.ttGestion?.expediente)
        }
    }, [tarea])

    return (
        <div>
            <div style={{ "width": "100%", "display": "inline-flex", "justifyContent": "space-between" }}>
                <Header size="large" style={{ "order": "-1" }} content={header} />
                <Button labelPosition="left" icon="arrow left" color="vk" style={{ "marginTop": "-8px" }} content="Regresar a lista de tareas" onClick={close} />
            </div>
            <div>
                <Header size="small" content={subHeader} style={{ "marginBottom": "16px" }} />
            </div>
            <Segment clearing>
                {renderActividad()}
            </Segment>
        </div>
    )
}
