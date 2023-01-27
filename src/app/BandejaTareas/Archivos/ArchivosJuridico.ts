import TareaApi from "api/TareaApi";
import { DownloadRow } from "components/Downloads";
import {juridicoApi} from 'api/latifoliado';
import { tareaApi } from "api";


const ArchivosJuridico = (task: any): DownloadRow[] => {

	if (task.esEnmienda === 0) {
		return ([
			{
				name: "Dictamen Jurídico",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(task.tareaId, "juridico", onResponse, onError)
			}

		])
	}
	else {
		return ([
			{
				name: "Enmienda",
				downloadFunction: (onResponse: any, onError: any) =>
					juridicoApi.descargarEnmiendaJuridica(task.tareaId, onResponse, onError)
			}

		])
	}

}
export default ArchivosJuridico;