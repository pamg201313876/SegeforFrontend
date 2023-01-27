import { postRequest, putRequest, getRequest, postFileRequest, getFileRequest } from "./ApiAccess"
import GetPageApi from "./abstract/GetPageApi"

export default class TareaApi extends GetPageApi {

	protected relativePath: string = "/tarea"

	constructor() {
		super("/tarea/listado") //page path
	}

	HistorialGestion = (
		tareaId: number,
		gestionId: number,
		estadoId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/historial/" + tareaId + "/" + gestionId + "/" + estadoId + "/lista",
				onResponse: handleResponse,
				onError
			}
		)

	}


	ListaTask = (
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/task/lista",
				onResponse: handleResponse,
				onError
			}
		)

	}



	RecibirTarea = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/recibir",
				onResponse: handleResponse,
				onError
			}
		)

	}



	AdmitirExpediente = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/admitir",
				onResponse: handleResponse,
				onError
			}
		)

	}

	OpinionJuridica = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/opinion/juridica",
				onResponse: handleResponse,
				onError
			}
		)

	}

	OpinionJuridicaPreview = (
		pBody: any,
		contexto: string,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postFileRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/previewPdf/" + contexto,
				filename: 'Juridico.pdf',
				onResponse: handleResponse,
				onError
			}
		)
	}

	descargarArchivoTarea = (
		tareaId: number,
		contexto: string,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/generatePdf/" + contexto + "/" + tareaId,
				filename: contexto+'.pdf',
				onResponse: handleResponse,
				onError
			}
		)
	}


	Providencia = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/asignar/providencia",
				onResponse: handleResponse,
				onError
			}
		)

	}

	asignarSubregional = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/asignar/subregional",
				onResponse: handleResponse,
				onError
			}
		)
	}

	getTareaData = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/data/" + tareaId,
				onResponse: handleResponse,
				onError
			}
		)

	}


	agregar = (
		body: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postRequest(
			{
				body: body,
				relativePath: this.relativePath + "/suspension/agregar",
				onResponse: handleResponse,
				onError
			}
		)

	}


	ActualizarTecnico = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/actualizar/tecnico",
				onResponse: handleResponse,
				onError
			}
		)

	}

	FinalizarTareaTecnica = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/opinion/tecnica",
				onResponse: handleResponse,
				onError
			}
		)

	}

	NotificarResolucionTarea = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}
		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/notificar/resolucion",
				onResponse: handleResponse,
				onError
			}
		)
	}


	putDictamenSubregional = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/opinion/subregional",
				onResponse: handleResponse,
				onError
			}
		)
	}






	getDictamen = (
		gestionId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/gestion/" + gestionId + "/dictamen",
				onResponse: handleResponse,
				onError
			}
		)

	}

	putEnmienda = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/enmienda",
				onResponse: handleResponse,
				onError
			}
		)

	}

	putDictamenRegional = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/opinion/regional",
				onResponse: handleResponse,
				onError
			}
		)

	}

	putRecibirEnmienda = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/recibir/enmienda",
				onResponse: handleResponse,
				onError
			}
		)

	}




	postRatificacionTarea = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/asignar/providencia/ratificacion",
				onResponse: handleResponse,
				onError
			}
		)

	}

	postEnmiendaTarea = (
		pBody: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: pBody,
				relativePath: this.relativePath + "/enmienda",
				onResponse: handleResponse,
				onError
			}
		)

	}



	getTareaPadreEnmienda = (
		tareaPadreId: number,		
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/padre/" + tareaPadreId + "/enmienda",
				onResponse: handleResponse,
				onError
			}
		)

	}

	solicitarAval = (
		ttTarea: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: ttTarea,
				relativePath: this.relativePath + "/solicitar/aval",
				onResponse: handleResponse,
				onError
			}
		)

	}

	getUsuarioAsignarList = (
		subregionId: number,
		tipoUsuario: number,		
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/" + subregionId + "/" + tipoUsuario + "/lista/asignar",
				onResponse: handleResponse,
				onError
			}
		)
	}

	providenciaEnmienda = (
		ttTarea: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postRequest(
			{
				body: ttTarea,
				relativePath: this.relativePath + "/asignar/providencia/enmienda",
				onResponse: handleResponse,
				onError
			}
		)

	}


	opinionMonitoreoAval = (
		ttTarea: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: ttTarea,
				relativePath: this.relativePath + "/opinion/monitoreo",
				onResponse: handleResponse,
				onError
			}
		)

	}

	descargarOficioEnmienda = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/oficio-enmienda/" + tareaId,
				filename: "Oficio.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}

}