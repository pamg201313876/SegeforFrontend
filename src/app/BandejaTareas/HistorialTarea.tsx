import SolicitudApi from 'api/SolicitudApi';
import TareaApi from 'api/TareaApi';
import { AxiosError } from 'axios';
import FormModal from 'components/FormModal';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Table } from 'semantic-ui-react';


type Props = {
    open: boolean
    historialData: any[]
    closeModal: () => void
}

const tareaApi = new TareaApi();
const solicitudApi = new SolicitudApi();

export default function HistorialTarea(props: Props) {
 
    const getDescarga = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {

        console.log(event.currentTarget.id)

        const handleResponseInicializadora = (entity: any) => {
            window.navigator.msSaveOrOpenBlob(entity)
        }

        const handleErrorInicializadora = (error: AxiosError) => {
            console.log(error)
            console.log("Error")
        }
        solicitudApi.getRecepcionByGestionId(parseInt(event.currentTarget.id), handleResponseInicializadora, handleErrorInicializadora)

    }

    const renderBodyTable = () => {
        let list: JSX.Element[] = []
        let counter = 0;
        props.historialData.forEach((tarea: any) => {
            counter++;
            console.log(tarea)
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

        if (props.historialData) {
            for (var x = 0; x < props.historialData.length; x++) {
                let tareaActual = props.historialData[x]
                if (tareaActual && tareaActual.tcTask.taskId === (tipoDocumentoId)) {
                    return tareaActual.tareaId;
                }
            }
        }


    }

    function renderBotonDescarga(tareaActual: any) {
        switch (tareaActual.tcTask.taskId) {
            case 1:
                return <Form.Button icon="download" id={getFileId(tareaActual.tcTask.taskId)} color={"green"} onClick={getDescarga} />;
            case 2:
                return <Form.Button icon="download" id={getFileId(tareaActual.tcTask.taskId)} color={"green"} onClick={getDescarga} />;
            case 3:
                return <Form.Button icon="download" id={getFileId(tareaActual.tcTask.taskId)} color={"green"} onClick={getDescarga} />;
            case 4:
                return <Form.Button icon="download" id={getFileId(tareaActual.tcTask.taskId)} color={"green"} onClick={getDescarga} />;
            case 5:
                return <Form.Button icon="download" id={getFileId(tareaActual.tcTask.taskId)} color={"green"} onClick={getDescarga} />;
            case 9:
                return <Form.Button icon="download" id={getFileId(tareaActual.tcTask.taskId)} color={"green"} onClick={getDescarga} />;
            case 16:
                return <Form.Button icon="download" id={getFileId(tareaActual.tcTask.taskId)} color={"green"} onClick={getDescarga} />;
    
                
        }
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <FormModal cancelLabel="Salir" header="Historial de la gestión" open={props.open} closeModal={props.closeModal} noConfirmButton confirmLabel="Aceptar" size='large' >
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
        </>
    )
}
