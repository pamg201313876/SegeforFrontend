import DictamenTecnicoApi from 'api/latifoliado/DictamenTecnicoApi';
import { DownloadRow } from 'components/Downloads'

const dictamenTecnicoApi = new DictamenTecnicoApi()

const ArchivosTecnico = (task: any): DownloadRow[] => {

	let name = "Dictamen"
	let fileName = "DictamenTecnico.pdf"
	if(task.esEnmienda === 1){
		name = "Enmienda";
		fileName = "Enmienda.pdf"
	}

	return ([
		{
			name: name,
			downloadFunction: (onResponse: any, onError: any) =>
			dictamenTecnicoApi.descargarDictamen(fileName, task.tareaId, onResponse, onError)
		}

	])

}
export default ArchivosTecnico;