import GestionApi from 'api/GestionApi';
import ResolucionApi from 'api/ResolucionApi';
import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios';
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import FormModal from 'components/FormModal';
import React, { useCallback, useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { SemanticCOLORS } from 'semantic-ui-react';
import PaginationResolucionesTable from './PaginationTable/PaginationResolucionesTable';

export default function CargaInicialExento() {

	const appDataContext = useContext(AppDataContext);
	const [refresh, setRefresh] = useState<boolean>(true)
    const [loading, setLoading] = useState(false)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const resolucionApi = new ResolucionApi ()
    const gestionApi = new GestionApi ()
	var verde: SemanticCOLORS = 'green';
    const [estadoIdFilter, setEstadoIdFilter] = useState<number>(1)
	const [currentData, setCurrentData] = useState<any>()
    
    const successToast = useCallback(appDataContext.successToast, [])
    const errorToast = useCallback(appDataContext.errorToast, [])

	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'ttGestion.nug' },
		{ header: "Solicitante", name: 'ttGestion.tcPersonaCrea.personaDesc' },
		{ header: "Fecha entrega", name: 'fechaEntrega', isDate: true },
		{ header: "Expediente", name: 'ttGestion.expediente' },
		{ header: "Gestión", name: 'ttGestion.tcTipoGestion.tipoGestionDesc' },
        { header: "Estado", name: 'estadoId' }
	];

    const entregaResolucion = (resolucion: any): boolean => {
		if (resolucion.estadoId === 1) {
			return true
		}
		return false
	}

	const botonesBandeja: CTButton[] = [
		{ id: "boton_confirmar", icon: "paper plane", color: verde, isEnabled: entregaResolucion },
	];

    
    const onSave = () => { 
        let resolucion = {
            estado: currentData.estadoId,
            fechaEntrega: currentData.fechaEntrega,
            fechaRegistro: currentData.fechaRegistro,
            notificacionResolucionId: currentData.notificacionResolucionId,
            tareaId: currentData.tareaId,
            tcPersonaEntrega: currentData.tcPersonaEntrega,
            ttGestion: currentData.ttGestion
        }

        const handleResponse = (data :any) => {
			console.log(data)	
            setOpenConfirmDialog(false)
			setLoading(false)

            if( data.data.status === "OK"){
                successToast(data.data.message)
			}else{
				errorToast( data.data.message)
            }
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			errorToast('Error al enviar solicitud. Intente de nuevo')
			setOpenConfirmDialog(false)
            setLoading(false)
		}

        setLoading(true)
		gestionApi.resolucionEntrega(resolucion, handleResponse, handleError);
    }

    const closeConfirmDialog = () => { 
        setOpenConfirmDialog(false)
    }

	const onButtonClick = (buttonResponse: CTButtonResponse) => {
		var resolucion: any = buttonResponse.rowData;

		if (buttonResponse.id === "boton_confirmar") {
            setOpenConfirmDialog(true)
        }
		setCurrentData(resolucion)
	}

	return (
		<>
            <FormModal
                header="Confirmación" 
                open={openConfirmDialog} 
                closeModal={closeConfirmDialog} 
                confirmLabel="Aceptar" 
                onSave={onSave}
            >
                <h4>¿Está segura (o) de marcar como: resolución entregada al solicitante?
                Esta acción no se podrá reversar</h4>
            </FormModal>
        
			<PaginationResolucionesTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={estadoIdFilter}
				elaboradorIdToFilter={1}
                columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={resolucionApi.getPage}
			/>

		</>
	)

}
