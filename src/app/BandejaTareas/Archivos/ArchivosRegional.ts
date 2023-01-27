import { tareaApi } from "api";
import { regionalApi } from "api/latifoliado";
import { DownloadRow } from "components/Downloads";


const ArchivosRegional = (tareaId: number): DownloadRow[] => {

	return ([
		{
			name: "Licencia",
			downloadFunction: (onResponse: any, onError: any) =>
				regionalApi.descargarDictamenPDF(tareaId, onResponse, onError)
		},
		{
			name: "Providencia",
			downloadFunction: (onResponse: any, onError: any) =>
				tareaApi.descargarArchivoTarea(tareaId, "providenciaregional", onResponse, onError)
		}

	])

}
export default ArchivosRegional;