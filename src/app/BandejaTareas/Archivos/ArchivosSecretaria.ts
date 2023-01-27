import SolicitudApi from 'api/SolicitudApi';
import { DownloadRow } from 'components/Downloads'


const solicitudAPi = new SolicitudApi();

const ArchivosSecretaria = (gestionId: number): DownloadRow[] => {

	const descargarConstancia = (onResponse: (entity: any) => void, onError: (error: any) => void) => {
		console.log(gestionId)
		if (gestionId != null) {
			solicitudAPi.generarPdfConstancia(gestionId, onResponse, onError)
		}
	}

	const descargarCaratula = (onResponse: (entity: any) => void, onError: (error: any) => void) => {
		if (gestionId != null) {
			solicitudAPi.generarPdfCaratula(gestionId, onResponse, onError)
		}
	}

	return ([
		{
			name: "Constancia de recepción de expediente",
			downloadFunction: descargarConstancia
		}
		,
		{
			name: "Caratula",
			downloadFunction: descargarCaratula
		}

	])

}

export default ArchivosSecretaria;