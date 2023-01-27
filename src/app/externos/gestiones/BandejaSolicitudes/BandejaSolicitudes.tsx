import React, { useCallback, useContext, useState } from 'react'
import { Confirm, SemanticCOLORS } from 'semantic-ui-react'
import { AxiosError } from 'axios'
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import GestionApi from 'api/GestionApi';
import PaginationTable from 'components/PaginationTable';
import { AppDataContext } from 'app/App';
import 'react-toastify/dist/ReactToastify.css';

const gestionApi = new GestionApi()

enum Action {
	ACEPTAR,
	RECHAZAR
}

export default function BandejaSolicitudes() {
	
	const dataContext = useContext(AppDataContext);
	const [currentAction, setCurrentAction] = useState<Action>()
	const [currentData, setCurrentData] = useState<any>()
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [refresh, setRefresh] = useState<boolean>(true)
  const successToast = useCallback(dataContext.successToast, [])

	var verde: SemanticCOLORS = 'green';
	var rojo: SemanticCOLORS = 'red';
	const aceptarHeader = "Aceptar solicitud"
	const rechazarHeader = "Rechazar solicitud"
	const aceptarMessage = "¿Desea aceptar la solicitud?"
	const rechazarMessage = "¿Desea rechazar esta solicitud?"


	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'nug' },
		{ header: "Solicitante", name: 'tcPersonaCrea.personaDesc', width:"3" },
		{ header: "Fecha solicitud", name: 'fechaRegistro', isDate: true },
		{ header: "Área ", name: 'area' },
		{ header: "Estado", name: 'tcEstado.estadoDesc', width:"2" },
		{ header: "Tipo", name: 'tcTipoGestion.tipoGestionDesc', width:"3" }
	];

	const botonesBandeja : CTButton[] = [
		{ id: "boton_aceptar", label: "Aceptar", icon:"check", color: verde },
		{ id: "boton_rechazar", label: "Rechazar", icon:"cancel", color: rojo },
	];

	const onButtonClick = (buttonResponse: CTButtonResponse) => {

		var tcGestion: any = buttonResponse.rowData;
		setCurrentData(tcGestion)

		if (buttonResponse.id === "boton_aceptar") {
			setCurrentAction(Action.ACEPTAR)
		} else {
			setCurrentAction(Action.RECHAZAR)
		}

		setOpenConfirmation(true)
	}

	const aceptarGestion = () => {

		
		if(currentData == null){
			return
		}

		const handleResponseAceptarSolicitud = () => {
			setRefresh(true)
			successToast("Solicitud aceptada exitosamente")
			setOpenConfirmation(false)
		}

		const handleErrorAceptarSolicitud = (error: AxiosError) => {
			console.error(error)
			setOpenConfirmation(false)
		}


		gestionApi.aceptarGestion(currentData, handleResponseAceptarSolicitud, handleErrorAceptarSolicitud)

	}

	const rechazarGestion = () => {

		if(currentData == null){
			return
		}

		const handleResponseAceptarSolicitud = () => {
			setRefresh(true)
			alert('Solicitud rechazada correctamente')
			setOpenConfirmation(false)
		}

		const handleErrorAceptarSolicitud = (error: AxiosError) => {
			console.error(error)
			setOpenConfirmation(false)
		}


		gestionApi.rechazarGestion(currentData, handleResponseAceptarSolicitud, handleErrorAceptarSolicitud)

	}

	return (
		<>
			<Confirm
				header={currentAction === Action.ACEPTAR ? aceptarHeader : rechazarHeader }
				content={currentAction === Action.ACEPTAR ? aceptarMessage : rechazarMessage}
				open={openConfirmation}
				confirmButton="Confirmar"
				cancelButton="Cancelar"
				onConfirm={currentAction === Action.ACEPTAR ? aceptarGestion : rechazarGestion}
				onCancel={() => setOpenConfirmation(false)}
			/>
			<PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={1}
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={gestionApi.getPage}
			/>
		</>
	)

}
