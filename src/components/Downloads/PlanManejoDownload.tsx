import GestionHasta90Api from 'api/latifoliado/hasta90/GestionHasta90Api'
import React from 'react'
import Downloads, { DownloadRow } from './Downloads'

type Props = {
	open: boolean,
	closeModal: () => void,
	gestion: any
}

const gestionHasta90 = new GestionHasta90Api()

export default function PlanManejoDownload({
	open,
	closeModal,
	gestion
}: Props) {

	const descargarPlanHasta90 = (onResponse: (entity: any) => void, onError: (error: any) => void) => {
		if (gestion != null) {
			gestionHasta90.descargarPlanManejoPDF(gestion.gestionId, onResponse, onError)
		}
	}

	const descargarCronograma = (onResponse: (entity: any) => void, onError: (error: any) => void) => {
		if (gestion != null) {
			gestionHasta90.descargarCronogramaPDF(gestion.gestionId, onResponse, onError)
		}
	}

	const downloadList: DownloadRow[] = [
		{
			name: "Plan de manejo",
			downloadFunction: descargarPlanHasta90
		},
		{
			name: "Cronograma",
			downloadFunction: descargarCronograma
		}
	]

	if (open && gestion != null) {
		return (
			<Downloads
				header="Descarga de plan de manejo"
				open={open}
				closeModal={closeModal}
				downloads={downloadList}
			/>
		)
	}

	return null;
}
