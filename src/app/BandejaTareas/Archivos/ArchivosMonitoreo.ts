import { monitoreoApi, dictamenTecnicoApi } from "api/latifoliado";
import { DownloadRow } from "components/Downloads";



const ArchivosMonitoreo = (ttTarea: any): DownloadRow[] => {

    // 	Reasignar tarea 16
    var taskID14: DownloadRow[] =
        [
            {
                name: "Opinión Monitoreo Garantía",
                downloadFunction: (onResponse: any, onError: any) =>
                    monitoreoApi.descargarOpinionPDF(ttTarea.tareaId, onResponse, onError)
            }

        ];


    var enmienda: DownloadRow[] =
        [
            {
                name: "Enmienda",
                downloadFunction: (onResponse: any, onError: any) =>
                dictamenTecnicoApi.descargarDictamen("EnmiendaMonitoreo.pdf", ttTarea.tareaId, onResponse, onError)
            }
        ];


    switch (ttTarea.tcTask.taskId) {


        case 14:
            if (ttTarea.esEnmienda === 1) {
				return enmienda;
			}
            return taskID14;

        default:
            return []

    }

}
export default ArchivosMonitoreo;