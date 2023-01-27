import React, { useContext, useEffect, useState } from 'react'
import FormModal from 'components/FormModal'
import { Form, Table } from 'semantic-ui-react'
import { solicitudApi, tareaApi } from 'api';
import { DownloadButton } from 'components/Downloads';
import { AppDataContext } from 'app/App';


type Props = {
    open: boolean
    ttTarea: any
    closeModal: () => void
}


export default function HistorialTarea({
    open,
    ttTarea,
    closeModal
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [historialData, setHistorialData] = useState<any[]>([])

    const renderBodyTable = () => {
        let list: JSX.Element[] = []
        let counter = 0;
        historialData.forEach((tarea: any) => {
            counter++;
            list.push(
                <Table.Row>
                    <Table.Cell>{counter}</Table.Cell>
                    <Table.Cell>
                        {tarea.tcTask.taskDesc}
                    </Table.Cell>
                    <Table.Cell>
                        {tarea.tcPersonaAsignada.personaDesc}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        {new Date(tarea.fechaFinalizacion).toLocaleDateString("es-GT")}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        {renderBotonDescarga(tarea)}
                    </Table.Cell>
                </Table.Row>
            )
        });
        return list;
    }

    function getFileId(tipoDocumentoId: number) {

        if (!tipoDocumentoId) {
            return -1;
        }

        if (historialData) {
            for (var x = 0; x < historialData.length; x++) {
                let tareaActual = historialData[x]
                if (tareaActual && tareaActual.tcTask.taskId === (tipoDocumentoId)) {
                    return tareaActual.tareaId;
                }
            }
        }


    
    }

    function renderBotonDescarga(tareaActual: any) {

        let taskId = tareaActual.tcTask.taskId

        switch (tareaActual.tcTask.taskId) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 9:
                return <DownloadButton downloadFunction={(onResponse, onError) => solicitudApi.getRecepcionByGestionId(getFileId(taskId), onResponse, onError)} />;
        }
    }


    useEffect(() => {
        const handleData = (res: any) => {
            if (res.status === "OK") {
                setHistorialData(res.data)
            } else {
                appDataContext.errorToast(res.message)
            }
        }

        const errorData = (error: any) => {
            console.error(error)
            appDataContext.errorToast('Error al obtener historial de tarea')
        }
        tareaApi.HistorialGestion(ttTarea.tareaId, ttTarea.ttGestion.gestionId, 1 /*subregionReplace*/, handleData, errorData)
    }, [ttTarea])

    return (
        <FormModal cancelLabel="Salir" header="Historial de la gestióny" open={open} closeModal={closeModal} noConfirmButton confirmLabel="Aceptar" size='large' >
            <Form>
                <Table key="requisitosAdicionalesTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1} textAlign="center" > No. </Table.HeaderCell>
                            <Table.HeaderCell width={3} textAlign="center" > Actividad </Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign="center" > Encargado (a) </Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign="center" > Fecha </Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign="center" > Opción </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {renderBodyTable()}
                    </Table.Body>
                </Table>
            </Form>
        </FormModal>

    )
}
