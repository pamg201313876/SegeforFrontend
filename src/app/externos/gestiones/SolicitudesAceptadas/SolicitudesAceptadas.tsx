import GestionApi from 'api/GestionApi';
import { AppDataContext } from 'app/App';
import Solicitud from 'app/externos/gestiones/Solicitud';
import { AxiosError } from 'axios';
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import PaginationTable from 'components/PaginationTable';
import React, { useContext, useState } from 'react';
import { Confirm, SemanticCOLORS } from 'semantic-ui-react';
import ActualizarAreaModal from '../ActualizarAreaModal';


const gestionApi = new GestionApi()

enum Action {
	INICIAR,
	ANULAR
}

export default function SolicitudesAceptadas() {

	const appDataContext = useContext(AppDataContext)
	const [currentAction, setCurrentAction] = useState<Action>()
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [startActivity, setStartActivity] = useState(false)
	const [refresh, setRefresh] = useState<boolean>(true)
	const [selectedGestion, setSelectedGestion] = useState<any>()
	const [openActualizarArea, setOpenActualizarArea] = useState(false)

	var verde: SemanticCOLORS = 'green';
	var rojo: SemanticCOLORS = 'red';
	const iniciarHeader = "Iniciar solicitud"
	const anularHeader = "Anular solicitud"
	const iniciarMessage = "¿Desea iniciar la elaboración del plan de manejo?"
	const anularMessage = "¿Desea anular esta solicitud?"


	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'nug' },
		{ header: "Solicitante", name: 'tcPersonaCrea.personaDesc', width: "3" },
		{ header: "Fecha solicitud", name: 'fechaRegistro', isDate: true },
		{ header: "Área ", name: 'area' },
		{ header: "Estado", name: 'tcEstado.estadoDesc', width: "2" },
		{ header: "Fecha aceptación", name: 'fechaAceptacion', isDate: true },
		{ header: "Tipo", name: 'tcTipoGestion.tipoGestionDesc', width: "3" }
	];

	const botonesBandeja: CTButton[] = [
		{ id: "iniciar", hint: "Trabajar solicitud", icon: "sign-in", color: verde },
		{ id: "anular", hint: "Anular", icon: "cancel", color: rojo },
		{ id: "modificarArea", hint: "Modificar área a intervenir", icon: 'circle', color: 'pink' },
	];

	const onButtonClick = (buttonResponse: CTButtonResponse) => {

		var tcGestion: any = buttonResponse.rowData;
		setSelectedGestion(tcGestion)

		switch (buttonResponse.id) {

			case "iniciar":
				setStartActivity(true)
				break

			case "anular":
				setCurrentAction(Action.ANULAR)
				setOpenConfirmation(true)
				break

			case "modificarArea":
				setOpenActualizarArea(true)
				break

		}


	}

	const aceptarGestion = () => {
		setStartActivity(true)
	}

	const anularGestion = () => {

		if (selectedGestion == null) {
			return
		}

		const handleResponse = () => {
			setRefresh(true)
			appDataContext.successToast('Solicitud anulada correctamente')
			setOpenConfirmation(false)
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			setOpenConfirmation(false)
		}


		gestionApi.anularGestion(selectedGestion, handleResponse, handleError)

	}

	const closeActualizarArea = () => setOpenActualizarArea(false)

	const renderList = () => {
		return (
			<>
				<Confirm
					header={currentAction === Action.INICIAR ? iniciarHeader : anularHeader}
					content={currentAction === Action.INICIAR ? iniciarMessage : anularMessage}
					open={openConfirmation}
					confirmButton="Confirmar"
					cancelButton="Cancelar"
					onConfirm={currentAction === Action.INICIAR ? aceptarGestion : anularGestion}
					onCancel={() => setOpenConfirmation(false)}
				/>
				{openActualizarArea && <ActualizarAreaModal
					open={openActualizarArea}
					closeModal={closeActualizarArea}
					gestion={selectedGestion}
				/>}
				<PaginationTable
					noAddButton
					reload={refresh}
					setReload={setRefresh}
					estadoIdToFilter={2}
					columns={encabezadoBandeja}
					buttons={botonesBandeja}
					onButtonClick={onButtonClick}
					fetchDataFunction={gestionApi.getPage}
				/>
			</>
		)
	}


	if (startActivity && selectedGestion != null) {
		return <Solicitud gestionId={selectedGestion!!.gestionId} />
	}

	else {
		return renderList()
	}


}
