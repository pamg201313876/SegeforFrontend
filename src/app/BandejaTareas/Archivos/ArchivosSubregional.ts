import { tareaApi } from 'api';
import { subregionalApi, monitoreoApi } from 'api/latifoliado'
import MonitoreoApi from 'api/latifoliado/MonitoreoApi';
import { DownloadRow } from 'components/Downloads'



const ArchivosSubregional = (ttTarea: any): DownloadRow[] => {

	let tareaId = ttTarea.tareaId
	let task = ttTarea.tcTask.taskId
	console.log(ttTarea)

	//Admisión de expediente, realizar providencia, notifica a técnico y/o jurídico = 2
	var taskID2: DownloadRow[] =
		[
			{
				name: "Admisión",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(tareaId, "admision", onResponse, onError)
			},
			{
				name: "Providencia",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(tareaId, "providencia", onResponse, onError)
			}

		];


	//Generar cédula de notificación, realizar la notificación de la resolución 7

	var taskID7: DownloadRow[] =
		[
			{
				name: "Cedula",
				downloadFunction: (onResponse: any, onError: any) =>
					subregionalApi.descargarCedulaPDF(tareaId, onResponse, onError)
			},
			{
				name: "Notificación",
				downloadFunction: (onResponse: any, onError: any) =>
					subregionalApi.descargarNotificacion(tareaId, onResponse, onError)
			}
			,
			// {
			// 	name: "Poliza",
			// 	downloadFunction: (onResponse: any, onError: any) =>
			// 		tareaApi.descargarArchivoTarea(tareaId, "poliza", onResponse, onError)
			// }

		];

	// 	Analizar dictamen jurídico y técnico, notifica enmienda o emite dictamen 5
	var taskID5: DownloadRow[] =
		[
			{
				name: "Dictamen",
				downloadFunction: (onResponse: any, onError: any) =>
					subregionalApi.descargarDictamenSubregional(tareaId, onResponse, onError)
			},
		];

	// 	Reasignar tarea 25
	var taskID9: DownloadRow[] =
		[
			{
				name: "Enmienda",
				downloadFunction: (onResponse: any, onError: any) =>
					subregionalApi.descargarEnmiendaSubregional(tareaId, onResponse, onError)
			}

		];

	// 	POA Resolucion 12
	var taskID12: DownloadRow[] =
		[
			{
				name: "POA Resolución",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(tareaId, "poaresolucion", onResponse, onError)
			}
			,
			{
				name: "Notificación de la Resolución del POA a DIPRONA",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(tareaId, "notificaciondiprona", onResponse, onError)
			}
			,
			{
				name: "NOtificacion REgional",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(tareaId, "notificacion", onResponse, onError)
			}
			,
			{
				name: "Cédula",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(tareaId, "cedula", onResponse, onError)
			},
			{
				name: "Notificación de Documento de Garantía",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(tareaId, "notificaciongarantia", onResponse, onError)
			}
		];



	// 	Reasignar tarea 25
	var taskID25: DownloadRow[] =
		[
			{
				name: "Providencia",
				downloadFunction: (onResponse: any, onError: any) =>
					tareaApi.descargarArchivoTarea(tareaId, "providencia", onResponse, onError)
			}

		];

	var taskID15: DownloadRow[] =
		[
			{
				name: "Providencia",
				downloadFunction: (onResponse: any, onError: any) =>
					subregionalApi.descargarProvidenciarEnmiendas(tareaId, onResponse, onError)
			}

		];

	// 	Reasignar tarea 16
	var taskID16: DownloadRow[] =
		[
			{
				name: "Aval de Garantía",
				downloadFunction: (onResponse: any, onError: any) =>
					subregionalApi.descargarAvalPDF(tareaId, onResponse, onError)
			}

		];



	switch (task) {



		case 2:
			return taskID2;

		case 7:
			return taskID7;

		case 5:
			if (ttTarea.esEnmienda === 1) {
				return taskID9;
			}
			return taskID5;

		case 12:
			return taskID12;

		case 15:
			return taskID15;

		case 9:
			return taskID9;

		case 25:
			return taskID25;

		case 16:
			return taskID16;

		default:
			return []

	}

}

export default ArchivosSubregional;