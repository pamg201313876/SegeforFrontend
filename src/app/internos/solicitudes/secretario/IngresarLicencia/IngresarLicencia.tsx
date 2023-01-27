import GestionApi from 'api/GestionApi';
import SolicitudApi from 'api/SolicitudApi';
import DescargaAnexos from 'components/Anexos/DescargaAnexos';
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import PlanManejoDownload from 'components/Downloads/PlanManejoDownload';
import PaginationTable from 'components/PaginationTable';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import FaltantesExpediente from './FaltantesExpediente';
import RequisitosExpediente from './RequisitosExpediente';
import RequisitosExpedienteFormError, { newRequisitosExpedienteFormError } from './RequisitosExpedienteFormError';

enum Tipo {
	RECIBIR_EXPEDIENTE,
	ENVIAR_ENMIENDA
}

const solicitudApi = new SolicitudApi()

export default function CargaInicialExento() {

	const [refresh, setRefresh] = useState<boolean>(true)
	const [formDataRequisitosExpediente, setFormDataRequisitosExpediente] = useState<any>({})
	const [formErrorRequisitosExpediente, setFormErrorRequisitosExpediente] = useState<RequisitosExpedienteFormError>(newRequisitosExpedienteFormError())
	const [tipoRequisito, setTipoRequisito] = useState<Tipo>(Tipo.RECIBIR_EXPEDIENTE)
	const [openAnexos, setOpenAnexos] = useState<boolean>(false)
	const [openDownloads, setOpenDownloads] = useState<boolean>(false)
	const closeDownloads = () => {setOpenDownloads(false)}
	const [openRequisitosExpediente, setOpenRequisitosExpediente] = useState<boolean>(false)
	const [openFaltantes, setOpenFaltantes] = useState<boolean>(false)
	const [currentData, setCurrentData] = useState<any>()

	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'ttGestion.nug' },
		{ header: "Solicitante", name: 'ttGestion.tcPersonaCrea.personaDesc' },
		{ header: "Fecha solicitud", name: 'fechaRegistro', isDate: true },
		{ header: "Área", name: 'ttGestion.area' },
		{ header: "Gestión", name: 'ttGestion.tcTipoGestion.tipoGestionDesc' }
	];

	const botonesBandeja: CTButton[] = [
		{ id: "boton_descargar", icon: "tasks", color: 'green', hint:"Marcar requisitos" },
		{ id: "boton_marcar_incompleto", icon: "file pdf", color: 'yellow', hint: "Marcar como expediente incompleto y generar notificación de completación" },
		{ id: "boton_imprimir", icon: "print", color: 'olive', hint: "Imprimir plan de manejo" },
		{ id: "boton_anexos", icon: "file archive", color: 'blue', hint:"Ver anexos" },
	];

	const onButtonClick = (buttonResponse: CTButtonResponse) => {
		var solicitud: any = buttonResponse.rowData;
		setCurrentData(solicitud)
		if (buttonResponse.id === "boton_descargar") {
			setFormDataRequisitosExpediente({})
			setTipoRequisito(Tipo.RECIBIR_EXPEDIENTE)
			setOpenRequisitosExpediente(true)
		}
		else if (buttonResponse.id === "boton_marcar_incompleto") {
			setFormDataRequisitosExpediente({})
			setOpenFaltantes(true)
		}
		else if (buttonResponse.id === "boton_imprimir") {
			setOpenDownloads(true)
		}
		else if (buttonResponse.id === "boton_anexos") {
			setOpenAnexos(true)
		}
	}

	
	const closeRequisitosExpedienteDialog = () => {
		setOpenRequisitosExpediente(false)
		setRefresh(true)
	}

	const closeFaltantesExpediente = () => {
		setOpenFaltantes(false)
		setRefresh(true)
	}

	return (
		<>
			{currentData != null && openDownloads && <PlanManejoDownload gestion={currentData.ttGestion} open={openDownloads} closeModal={closeDownloads} />}
			{currentData != null && openRequisitosExpediente &&  <RequisitosExpediente tipo={tipoRequisito} open={openRequisitosExpediente} closeModal={closeRequisitosExpedienteDialog} setFormData={setFormDataRequisitosExpediente} formData={formDataRequisitosExpediente} formError={formErrorRequisitosExpediente} setFormError={setFormErrorRequisitosExpediente} solicitud={currentData} />}
			{currentData != null && openFaltantes &&  <FaltantesExpediente open={openFaltantes} closeModal={closeFaltantesExpediente} setFormData={setFormDataRequisitosExpediente} solicitud={currentData} />}
			{currentData != null && openAnexos &&  <DescargaAnexos open={openAnexos} closeModal={() => setOpenAnexos(false)} gestion={currentData.ttGestion}  /> } 
			<PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={1}
				personaIdToFilter={ 1 }//subRegionReplace
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={solicitudApi.getPage}
			/>
		</>
	)

}
