import { AppDataContext } from 'app/App'
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable'
import React, { useContext, useState } from 'react'
import PaginationTable from 'components/PaginationTable';
import { tareaApi } from 'api'
import ActividadTarea from './ActividadTarea';
import RecibirTarea from './RecibirTarea';
import DescargarBoleta from './DescargarBoleta';
import DescargaAnexos from 'components/Anexos/DescargaAnexos';
import PlanManejoDownload from 'components/Downloads/PlanManejoDownload';
import HistorialTarea from './HistorialTarea';

export enum Task {
    ConfirmacionSecretario = 1,
    ProvidenciaSubregional = 2,
    DictamenJuridico = 3,
    DictamenTecnico = 4,
    DictamenSubregional = 5,
    DictamenRegional = 6,
    CedulaNotificacion = 7,
    EnmiendaSubregional = 9,
    GarantiaFiduciaria = 14,
    ProvidenciarEnmiendas = 15,
    AvalGarantia = 16
}


export default function TareasRecibidas() {

    enum ActionId {
        Recibir = "RECIBIR",
        Realizar = "REALIZAR",
        DescargarBoletaInventario = "DESCARGAR_BOLETA_INVENTARIO",
        ImprimirPlan = "IMPRIMIR_PLAN",
        Anexos = "ANEXOS",
        Historial = "HISTORIAL"
    }

    const appDataContext = useContext(AppDataContext)
    const [refresh, setRefresh] = useState<boolean>(true)
    const [selectedTarea, setSelectedTarea] = useState<any>(null)
    const [currentAction, setCurrentAction] = useState<ActionId | null>(null)

    const encabezadoBandeja: CTColumn[] =
        [
            { header: "NUG", name: 'ttGestion.nug' },
            { header: "Solicitante", name: 'ttGestion.tcPersonaCrea.personaDesc' },
            { header: "Expediente", name: 'ttGestion.expediente' },
            { header: "Fecha Asignación", name: 'fechaRegistro', isDate: true },
            { header: "Fecha Vencimiento", name: 'fechaVencimiento', isDate: true },
            { header: "Tarea ", name: 'tcTask.taskDesc' },
        ]

    const recibido = (tarea: any): boolean => {
        if (tarea.recibido === 0) {
            return true
        }
        return false
    }

    const realizar = (tarea: any): boolean => {
        return !recibido(tarea)
    }

    const boletaInventario = (tarea: any): boolean => {
        return tarea.tcTask.taskId === Task.DictamenTecnico
    }

    const noVerHistorialSecretaria = (tarea: any): boolean => {
        return tarea.tcTask.taskId !== Task.ConfirmacionSecretario;
    }

    const botonesBandeja: CTButton[] = [
        { id: ActionId.Recibir, icon: "download", color: "red", hint: "Recibir Tarea", isEnabled: recibido },
        { id: ActionId.Realizar, icon: "play", color: "blue", hint: "Realizar Tarea", isEnabled: realizar },
        { id: ActionId.DescargarBoletaInventario, icon: "database", color: "grey", hint: "Descargar boleta de inventario", isEnabled: boletaInventario },
        { id: ActionId.ImprimirPlan, icon: "print", color: "green", hint: "Imprimir plan de manejo" },
        { id: ActionId.Anexos, icon: "file", color: "red", hint: "Ver anexos" },
        { id: ActionId.Historial, icon: "list", color: "yellow", hint: "Ver historial", isEnabled: noVerHistorialSecretaria },
    ]

    const onButtonClick = (buttonResponse: CTButtonResponse) => {
        let tarea = buttonResponse.rowData
        setSelectedTarea(tarea)
        setCurrentAction(buttonResponse.id as ActionId)
    }

    const closeAction = () => {
        setCurrentAction(null)
        setSelectedTarea(null)
    }

    const closeActionRefresh = () => {
        closeAction()
        setRefresh(true)
    }

    if (currentAction === ActionId.Realizar) {
        return (
            <ActividadTarea ttTarea={selectedTarea} closeActivity={closeActionRefresh} />
        )
    }

    return (
        <>
            {currentAction === ActionId.Recibir &&
                <RecibirTarea open={currentAction === ActionId.Recibir} closeModal={closeActionRefresh} tareaData={selectedTarea} />}
            {currentAction === ActionId.DescargarBoletaInventario &&
                <DescargarBoleta open={currentAction === ActionId.DescargarBoletaInventario} closeModal={closeAction} tarea={selectedTarea} />}
            {currentAction === ActionId.ImprimirPlan &&
                <PlanManejoDownload gestion={selectedTarea.ttGestion} open={currentAction === ActionId.ImprimirPlan} closeModal={closeAction} />}
            {currentAction === ActionId.Anexos &&
                <DescargaAnexos open={currentAction === ActionId.Anexos} closeModal={closeAction} gestion={selectedTarea.ttGestion} />}
            {currentAction === ActionId.Historial &&
                <HistorialTarea open={currentAction === ActionId.Historial} closeModal={closeAction} ttTarea={selectedTarea} />}


            <PaginationTable
                noAddButton
                reload={refresh}
                setReload={setRefresh}
                estadoIdToFilter={1}
                personaIdToFilter={appDataContext.tokenData?.personaId}
                columns={encabezadoBandeja}
                buttons={botonesBandeja}
                onButtonClick={onButtonClick}
                fetchDataFunction={tareaApi.getPage}
            />
        </>
    )
}
