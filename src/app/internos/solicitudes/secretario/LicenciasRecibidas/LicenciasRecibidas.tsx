import SolicitudApi from 'api/SolicitudApi';
import { AppDataContext } from 'app/App';
import DescargaAnexos from 'components/Anexos/DescargaAnexos';
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import PlanManejoDownload from 'components/Downloads/PlanManejoDownload';
import PaginationTable from 'components/PaginationTable';
import React, { useCallback, useContext, useState } from 'react';

export default function LicenciasRecibidas() {

	const appDataContext = useContext(AppDataContext);
	const [refresh, setRefresh] = useState<boolean>(true)
	const solicitudApi = new SolicitudApi()
	const [openImprimirPlan, setOpenImprimirPlan] = useState(false)
	const [openAnexos, setOpenAnexos] = useState<boolean>(false)
	const [currentData, setCurrentData] = useState<any>()

	const activateLoading = useCallback(appDataContext.activateLoading, [])
	const desactivateLoading = useCallback(appDataContext.desactivateLoading, [])
	const errorToast = useCallback(appDataContext.errorToast, [])
	const successToast = useCallback(appDataContext.successToast, [])
	const closeImprimirPlan = () => setOpenImprimirPlan(false)
	const closeAnexos = () => setOpenAnexos(false)

	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'ttGestion.nug' },
		{ header: "Solicitante", name: 'ttGestion.tcPersonaCrea.personaDesc' },
		{ header: "Fecha solicitud", name: 'fechaRegistro', isDate: true },
		{ header: "Área", name: 'ttGestion.area' },
		{ header: "Gestión", name: 'ttGestion.tcTipoGestion.tipoGestionDesc' }
	];

	const botonesBandeja: CTButton[] =
		[
			{ id: "imprimirPlan", icon: "print", color: 'green', hint: "Imprimir plan de manejo" },
			{ id: "imprimir", icon: "file pdf", color: 'pink', hint: "Imprimir constancia" },
			{ id: "anexos", icon: "list", color: 'blue', hint: "Ver anexos" },
		]

	const onButtonClick = (buttonResponse: CTButtonResponse) => {
		var solicitud: any = buttonResponse.rowData;
		setCurrentData(solicitud)

		if (buttonResponse.id === "imprimirPlan") {
			setOpenImprimirPlan(true)
		}
		else if (buttonResponse.id === "imprimir") {
			generatePdfConstancia(buttonResponse.rowData)
		}
		else if (buttonResponse.id === "anexos") {
			setOpenAnexos(true)
		}
		setCurrentData(solicitud)
	}

	const generatePdfConstancia = (data: any) => {
		const handleGeneratePdf = () => {
			successToast(`Constancia descargada exitosamente.`)
			generatePdfCaratula(data)
			desactivateLoading()
		}

		const errorGeneratePdf = (error: any) => {
			errorToast("Error al generar documento de constancia.")
			desactivateLoading()
		}
		activateLoading("Descargando...")
		solicitudApi.generarPdfConstancia(data.solicitudId, handleGeneratePdf, errorGeneratePdf);
	}


	const generatePdfCaratula = (data: any) => {
		const handleGeneratePdf = () => {
			successToast('Carátula descargada exitosamente.')
			desactivateLoading()
		}

		const errorGeneratePdf = (error: any) => {
			errorToast("Error al generar documento de caratula.")
			desactivateLoading()
		}
		activateLoading("Descargando...")
		solicitudApi.generarPdfCaratula(data.solicitudId, handleGeneratePdf, errorGeneratePdf);
	}
	

	return (
		<>

			{currentData != null && <PlanManejoDownload gestion={currentData.ttGestion} open={openImprimirPlan} closeModal={closeImprimirPlan} />}
			{currentData != null && <DescargaAnexos open={openAnexos} closeModal={closeAnexos} gestion={currentData.ttGestion} />}

			<PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={2}
				personaIdToFilter={1} //subRegionReplace
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={solicitudApi.getPage}
			/>
		</>
	)

}
