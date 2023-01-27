import React, { useState, useContext } from 'react'
import GestionApi from 'api/GestionApi';
import { AppDataContext } from 'app/App';
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import PaginationTable from 'components/PaginationTable';
import EstadoGestion from 'enums/EstadoGestion';
import EnviarSolicitud from './EnviarSolicitud';
import { AxiosError } from 'axios';
import PlanManejoDownload from 'components/Downloads/PlanManejoDownload';
import DescargaAnexos from 'components/Anexos/DescargaAnexos';
import Solicitud from '../Solicitud';
import { Confirm } from 'semantic-ui-react';
import EnmiendasSolicitudModal from '../EnmiendasSolicitudModal';

const gestionApi = new GestionApi()

export default function MisGestiones() {
	const dataContext = useContext(AppDataContext);
	const [refresh, setRefresh] = useState<boolean>(true)
	const [selectedGestion, setSelectedGestion] = useState<any>()
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [startActivity, setStartActivity] = useState(false)
	const [currentAction, setCurrentAction] = useState<Action>()
	const [confirmHeader, setConfirmHeader] = useState("")
	const [confirmMessage, setConfirmMessage] = useState("")
	const [openEnmienda, setOpenEnmienda] = useState<boolean>(false)



	//Dialogs
	const [enviarOpen, setEnviarOpen] = useState(false)
	const closeEnviar = () => setEnviarOpen(false)
	const [anexosOpen, setAnexosOpen] = useState(false)
	const closeAnexos = () => setAnexosOpen(false)
	const [downloadsOpen, setDownloadsOpen] = useState(false)
	const closeDownloads = () => setDownloadsOpen(false)

	enum Action {
		EDITAR,
		ANULAR,
		ACEPTAR,
		RECHAZAR
	}

	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'nug' },
		{ header: "Elaborador", name: 'tcElaborador.personaDesc', width: "3" },
		{ header: "Fecha solicitud", name: 'fechaRegistro', isDate: true },
		{ header: "Área ", name: 'area' },
		{ header: "Estado", name: 'tcEstado.estadoDesc', width: "2" },
		{ header: "Fecha aceptación", name: 'fechaAceptacion', isDate: true },
		{ header: "Tipo", name: 'tcTipoGestion.tipoGestionDesc', width: "3" }
	];

	const isImprimirYAnexosEnabled = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			//No se muestra impresión en cualquiera de estos
			case EstadoGestion.Anulado:
			case EstadoGestion.SolicitadoParaElaborar:
			case EstadoGestion.AceptadoParaElaborar:
			case EstadoGestion.Rechazado: //TODO validar en rechazados
				return false
			default:
				return true
		}
	}


	const isEnviarEnabled = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			case EstadoGestion.PlanElaborado:
				return true
			default:
				return false
		}
	}

	const isAvanceEnabled = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			case EstadoGestion.EnTramite:
				return true
			default:
				return false
		}
	}

	const isOpcionesEnabled = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			case EstadoGestion.Finalizado:
				return true
			default:
				return false
		}
	}

	const isEditarCancelar = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			case EstadoGestion.AceptadoParaElaborar:
				if (dataContext.tokenData?.personaId === gestion.tcElaborador.personaId) {
					return true
				}
				return false
			default:
				return false
		}
	}

	const isAceptarRechazar = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			case EstadoGestion.SolicitadoParaElaborar: {
				if (dataContext.tokenData?.personaId === gestion.tcElaborador.personaId) {
					return true
				}
				return false
			}
			default:
				return false
		}
	}

	const isEnmiendaEnabled = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			case EstadoGestion.EsperandoEnmienda:
				return true
			default:
				return false
		}
	}

	const botonesBandeja: CTButton[] = [
		{ id: "imprimir", hint: "Imprimir plan", icon: "print", color: 'olive', isEnabled: isImprimirYAnexosEnabled },
		{ id: "anexos", hint: "Ver anexos", icon: 'file', color: 'blue', isEnabled: isImprimirYAnexosEnabled },
		{ id: "enviar", hint: "Enviar solicitud a INAB", icon: 'send', color: 'green', isEnabled: isEnviarEnabled },
		{ id: "avance", hint: "Ver avance", icon: 'list', color: 'green', isEnabled: isAvanceEnabled },
		{ id: "opciones", hint: "Opciones sobre la gestión", icon: 'cog', color: 'yellow', isEnabled: isOpcionesEnabled },
		{ id: "editar", hint: "Editar solicitud", icon: 'edit', color: 'green', isEnabled: isEditarCancelar },
		{ id: "cancelar", hint: "Cancelar la gestión", icon: 'x', color: 'red', isEnabled: isEditarCancelar },
		{ id: "aceptar", hint: "Aceptar", icon: "check", color: 'green', isEnabled: isAceptarRechazar },
		{ id: "rechazar", hint: "Rechazar", icon: "cancel", color: 'red', isEnabled: isAceptarRechazar },
		{ id: "enmienda", hint: "Enmienda", icon: 'first aid', color: 'red', isEnabled: isEnmiendaEnabled }
	];

	const onButtonClick = (buttonResponse: CTButtonResponse) => {

		let gestion = buttonResponse.rowData
		setSelectedGestion(gestion)

		switch (buttonResponse.id) {

			case "imprimir":
				onImprimirClick(gestion)
				break;

			case "anexos":
				onAnexosClick(gestion)
				break;

			case "enviar":
				onEnviarClick(gestion)
				break;

			case "avance":
				onAvanceClick(gestion)
				break;

			case "opciones":
				onOpcionesClick(gestion)
				break;

			case "editar":
				onEditarClick(gestion)
				break;

			case "cancelar":
				onCancelarClick(gestion)
				break;

			case "aceptar":
				onAceptarClick(gestion)
				break;

			case "rechazar":
				onRechazarClick(gestion)
				break;

			case "enmienda":
				setOpenEnmienda(true)
				break
		}
	}

	const onImprimirClick = (gestion: any) => {
		setDownloadsOpen(true)
	}

	const onAnexosClick = (gestion: any) => {
		setAnexosOpen(true)
	}

	const onEnviarClick = (gestion: any) => {
		setEnviarOpen(true)
	}

	const onAvanceClick = (gestion: any) => {

	}

	const onOpcionesClick = (gestion: any) => {

	}

	const onEditarClick = (gestion: any) => {
		setCurrentAction(Action.EDITAR)
		setOpenConfirmation(true)
		setConfirmHeader("Trabjajar solicitud")
		setConfirmMessage("¿Desea elaborar el plan de manejo?")
	}

	const onCancelarClick = (gestion: any) => {
		setCurrentAction(Action.ANULAR)
		setOpenConfirmation(true)
		setConfirmHeader("Anular solicitud")
		setConfirmMessage("¿Desea anular esta solicitud?")
	}

	const onAceptarClick = (gestion: any) => {
		setCurrentAction(Action.ACEPTAR)
		setOpenConfirmation(true)
		setConfirmHeader("Aceptar solicitud")
		setConfirmMessage("¿Desea aceptar la solicitud?")
	}

	const onRechazarClick = (gestion: any) => {
		setCurrentAction(Action.RECHAZAR)
		setOpenConfirmation(true)
		setConfirmHeader("¿Desea rechazar esta solicitud?")
		setConfirmMessage("Rechazar solicitud")
	}

	const refreshTable = () => {
		setRefresh(true)
	}

	const editarGestion = () => {
		setStartActivity(true)
	}

	const anularGestion = () => {

		if (selectedGestion == null) {
			return
		}

		const handleResponse = () => {
			setRefresh(true)
			dataContext.successToast('Solicitud anulada correctamente')
			setOpenConfirmation(false)
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			setOpenConfirmation(false)
		}


		gestionApi.anularGestion(selectedGestion, handleResponse, handleError)

	}

	const aceptarGestion = () => {


		if (selectedGestion == null) {
			return
		}

		const handleResponseAceptarSolicitud = () => {
			setRefresh(true)
			dataContext.successToast("Solicitud aceptada exitosamente")
			setOpenConfirmation(false)
		}

		const handleErrorAceptarSolicitud = (error: AxiosError) => {
			console.error(error)
			setOpenConfirmation(false)
		}


		gestionApi.aceptarGestion(selectedGestion, handleResponseAceptarSolicitud, handleErrorAceptarSolicitud)

	}

	const rechazarGestion = () => {

		if (selectedGestion == null) {
			return
		}

		const handleResponseAceptarSolicitud = () => {
			setRefresh(true)
			dataContext.successToast('Solicitud rechazada correctamente')
			setOpenConfirmation(false)
		}

		const handleErrorAceptarSolicitud = (error: AxiosError) => {
			console.error(error)
			setOpenConfirmation(false)
			dataContext.errorToast("Error al rechazar gestión")
		}


		gestionApi.rechazarGestion(selectedGestion, handleResponseAceptarSolicitud, handleErrorAceptarSolicitud)

	}

	const closeEnmienda = () => setOpenEnmienda(false)

	const renderList = () => (
		<>
			<Confirm
				header={confirmHeader}
				content={confirmMessage}
				open={openConfirmation}
				confirmButton="Confirmar"
				cancelButton="Cancelar"
				onConfirm={
					currentAction === Action.EDITAR ?
						editarGestion :
						currentAction === Action.ANULAR ?
							anularGestion :
							currentAction === Action.ACEPTAR ?
								aceptarGestion :
								rechazarGestion}
				onCancel={() => setOpenConfirmation(false)}
			/>
			<DescargaAnexos open={anexosOpen} closeModal={closeAnexos} gestion={selectedGestion} />
			<EnviarSolicitud open={enviarOpen} closeModal={closeEnviar} gestion={selectedGestion} refresh={refreshTable} />
			<PlanManejoDownload
				open={downloadsOpen}
				closeModal={closeDownloads}
				gestion={selectedGestion}
			/>
			{
				openEnmienda && <EnmiendasSolicitudModal
					open={openEnmienda}
					closeModal={closeEnmienda}
					ttGestion={selectedGestion}
				/>
			}
			<PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={-1}
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={gestionApi.getPage}
				elaboradorIdToFilter={0}
				personaIdToFilter={dataContext.tokenData?.personaId}
			/>
		</>
	)

	if (startActivity && selectedGestion != null) {
		return <Solicitud gestionId={selectedGestion!!.gestionId} />
	}

	else {
		return renderList()
	}
}
