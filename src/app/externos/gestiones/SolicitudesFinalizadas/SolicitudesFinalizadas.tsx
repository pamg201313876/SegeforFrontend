import React, { useState } from 'react'
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import GestionApi from 'api/GestionApi';
import PaginationTable from 'components/PaginationTable';
import EstadoGestion from 'enums/EstadoGestion';
import Solicitud from 'app/externos/gestiones/Solicitud';
import PlanManejoDownload from 'components/Downloads/PlanManejoDownload';
import EnmiendasSolicitudModal from '../EnmiendasSolicitudModal';
import ActualizarAreaModal from '../ActualizarAreaModal';

const gestionApi = new GestionApi()

const encabezadoBandeja: CTColumn[] = [
	{ header: "NUG", name: 'nug' },
	{ header: "Solicitante", name: 'tcPersonaCrea.personaDesc', width: "3" },
	{ header: "Fecha solicitud", name: 'fechaRegistro', isDate: true },
	{ header: "Área ", name: 'area' },
	{ header: "Estado", name: 'tcEstado.estadoDesc', width: "2" },
	{ header: "Fecha aceptación", name: 'fechaAceptacion', isDate: true },
	{ header: "Tipo", name: 'tcTipoGestion.tipoGestionDesc', width: "3" }
];

export default function SolicitudesFinalizadas() {

	const [refresh, setRefresh] = useState<boolean>(true)
	const [selectedGestion, setSelectedGestion] = useState<any>()
	const [startActivity, setStartActivity] = useState(false)
	const [openDownload, setOpenDownload] = useState(false)
	const [openEnmienda, setOpenEnmienda] = useState<boolean>(false)
	const [openActualizarArea, setOpenActualizarArea] = useState(false)

	const isDescargarEnabled = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			case EstadoGestion.Rechazado:
				return false
			default:
				return true
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

	const isEditarEnabled = (gestion: any): boolean => {
		switch (gestion.tcEstado.estadoId) {
			case EstadoGestion.PlanElaborado:
			case EstadoGestion.Solicitado:
			case EstadoGestion.EsperandoEnmienda:
				return true
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

	const isModificarAreaEnabled = (gestion: any): boolean => {
		return isEditarEnabled(gestion) || isEnmiendaEnabled(gestion)
	}

	const botonesBandeja: CTButton[] = [
		{ id: "descargar", hint: "Descargar plan de manejo", icon: "print", color: 'olive', isEnabled: isDescargarEnabled },
		{ id: "avance", hint: "Enviar solicitud", icon: 'list', color: 'green', isEnabled: isAvanceEnabled },
		{ id: "editar", hint: "Editar solicitud", icon: 'edit', color: 'blue', isEnabled: isEditarEnabled },
		{ id: "enmienda", hint: "Enmienda", icon: 'first aid', color: 'red', isEnabled: isEnmiendaEnabled },
		{ id: "modificarArea", hint: "Modificar área a intervenir", icon: 'circle', color: 'pink', isEnabled: isModificarAreaEnabled },
	];

	const onButtonClick = (buttonResponse: CTButtonResponse) => {

		var tcGestion: any = buttonResponse.rowData;
		setSelectedGestion(tcGestion)

		switch (buttonResponse.id) {

			case "descargar":
				setOpenDownload(true)
				break

			case "avance":
				break

			case "editar":
				setStartActivity(true)
				break

			case "enmienda":
				setOpenEnmienda(true)
				break

			case "modificarArea":
				setOpenActualizarArea(true)
				break

		}
	}

	const closeEnmienda = () => setOpenEnmienda(false)
	const closeDownloads = () => setOpenDownload(false)
	const closeActualizarArea = () => setOpenActualizarArea(false)

	const renderList = () => {
		return (
			<>
				{openDownload && <PlanManejoDownload
					open={openDownload}
					closeModal={closeDownloads}
					gestion={selectedGestion}
				/>}
				{openActualizarArea && <ActualizarAreaModal
					open={openActualizarArea}
					closeModal={closeActualizarArea}
					gestion={selectedGestion}
				/>}
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
					estadoIdToFilter={3}
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
