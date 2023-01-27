import { AxiosError, AxiosResponse } from "axios"
import NuevaGestionDTO from "dto/NuevaGestionDTO"
import GetPageApi from "./abstract/GetPageApi"
import { getFileRequest, getRequest, postRequest, putRequest } from "./ApiAccess"

export default class GestionApi extends GetPageApi {

	protected relativePath: string = "/gestion"

	constructor() {
		super("/gestion/listado") //page path
	}

	nuevaGestion = (
		body: NuevaGestionDTO,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/nuevo",
				onResponse: onResponse,
				onError
			}
		)

	}

	aceptarGestion = (
		gestionDTO: any,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {

		putRequest(
			{
				body: gestionDTO,
				relativePath: this.relativePath + "/aceptar",
				onResponse: onResponse,
				onError
			}
		)

	}

	iniciarGestion = (
		gestionDTO: any,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {

		putRequest(
			{
				body: gestionDTO,
				relativePath: this.relativePath + "/iniciar",
				onResponse: onResponse,
				onError
			}
		)

	}

	getGestionById = (
		gestionId: number,
		onResponse: (entity: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/" + gestionId,
				onResponse: handleResponse,
				onError
			}
		)

	}

	rechazarGestion = (
		gestionDTO: any,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {

		putRequest(
			{
				body: gestionDTO,
				relativePath: this.relativePath + "/rechazar",
				onResponse: onResponse,
				onError
			}
		)

	}

	anularGestion = (
		gestionDTO: any,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {

		putRequest(
			{
				body: gestionDTO,
				relativePath: this.relativePath + "/anular",
				onResponse: onResponse,
				onError
			}
		)

	}


	setPropietario = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/tipo/propietario",
				onResponse: onResponse,
				onError
			}
		)

	}


	agregarPersonaIndividual = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/persona",
				onResponse: onResponse,
				onError
			}
		)

	}


	quitarPersonaIndividual = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/quitar/persona",
				onResponse: onResponse,
				onError
			}
		)

	}

	agregarBiofisica = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/biofisica",
				onResponse: onResponse,
				onError
			}
		)
	}

	actualizarNotificacion = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {


		postRequest(
			{
				body,
				relativePath: this.relativePath + "/actualizar/notificacion",
				onResponse: onResponse,
				onError
			}
		)

	}

	agregarFinca = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/finca/gestion",
				onResponse: onResponse,
				onError
			}
		)
	}

	agregarUsoFinca = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/usofinca",
				onResponse: onResponse,
				onError
			}
		)
	}

	quitarFinca = (
		body: any,
		onResponse: (response: any) => void,
		onError: (error: AxiosError) => void

	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body,
				relativePath: this.relativePath + "/quitar/finca",
				onResponse: handleResponse,
				onError
			}
		)
	}

	agregarPropietarioFinca = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/propietario/finca",
				onResponse: onResponse,
				onError
			}
		)
	}

	quitarUsoFinca = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body,
				relativePath: this.relativePath + "/quitar/usofinca",
				onResponse: onResponse,
				onError
			}
		)
	}

	quitarPropietarioFinca = (
		bodyx: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body: bodyx,
				relativePath: this.relativePath + "/quitar/propietario/finca",
				onResponse: onResponse,
				onError
			}
		)
	}

	actualizarAreas = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body,
				relativePath: this.relativePath + "/actualizar/areas",
				onResponse: onResponse,
				onError
			}
		)
	}

	getGestionFileById = (
		gestionFileId: number,
		onResponse: (entity: any) => void,
		onError: (error: AxiosError) => void,
		fileName?: string,
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				filename: fileName,
				relativePath: this.relativePath + "/file/" + gestionFileId,
				onResponse: handleResponse,
				onError
			}
		)

	}

	actualizarFinca = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/actualizar/finca",
				onResponse: onResponse,
				onError
			}
		)
	}

	actualizarFincas = (
		body: any[],
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/actualizar/fincas",
				onResponse: onResponse,
				onError
			}
		)
	}

	agregarNotificacion = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/notificacion",
				onResponse: onResponse,
				onError
			}
		)
	}



	quitarNotificacion = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/quitar/notificacion",
				onResponse: onResponse,
				onError
			}
		)
	}


	agregarCriterioProteccion = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/criterioproteccion",
				onResponse: onResponse,
				onError
			}
		)
	}





	quitarCriterioProteccion = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body,
				relativePath: this.relativePath + "/quitar/criterioproteccion",
				onResponse: onResponse,
				onError
			}
		)
	}




	moverPanelSiguienteCriterioProteccion = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/mover/panel/siguiente",
				onResponse: onResponse,
				onError
			}
		)
	}



	agregarAnexo = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/anexo",
				onResponse: onResponse,
				onError
			}
		)
	}

	agregarProteccionHasta90 = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/proteccion/lat90",
				onResponse: onResponse,
				onError
			}
		)
	}

	agregarProteccionMayor90 = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/proteccion",
				onResponse: onResponse,
				onError
			}
		)
	}

	agregarMitigacion = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/mitigacion",
				onResponse: onResponse,
				onError
			}
		)
	}

	agregarCronograma = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/cronograma",
				onResponse: onResponse,
				onError
			}
		)
	}

	agregarFiador = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/agregar/fiador",
				onResponse: onResponse,
				onError
			}
		)
	}


	quitarFiador = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/quitar/fiador",
				onResponse: onResponse,
				onError
			}
		)
	}


	finalizarGestion = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body,
				relativePath: this.relativePath + "/finalizar/elaboracion",
				onResponse: onResponse,
				onError
			}
		)
	}

	obtenerListaSuspension = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body,
				relativePath: this.relativePath + "/suspension/lista",
				onResponse: onResponse,
				onError
			}
		)
	}
	
	mandarSolicitud = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body,
				relativePath: this.relativePath + "/enviar/solicitud",
				onResponse: handleResponse,
				onError
			}
		)
	}
	
	
	obtenerListaInvolucrado = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body,
				relativePath: this.relativePath + "/por/involucrado",
				onResponse: onResponse,
				onError
			}
		)
	}

	getRequisitoById = (
		gestionId: number,
		onResponse: (entity: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/requisito/" + gestionId + "/lista",
				onResponse: handleResponse,
				onError
			}
		)
	}

	//para manejo de tareas se solicitan estos servicios

	AnexosLista = (
		gestionId: number,		
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/anexo/"+gestionId+"/lista",
				onResponse: handleResponse,
				onError
			}
		)

	}


	SuspensionLista = (
		gestionId: number,		
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/anexo/suspension/"+gestionId+"/lista",
				onResponse: handleResponse,
				onError
			}
		)

	}

	getPadre = (
		tareaId: number,				
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/tarea/" + tareaId + "/padre",
				onResponse: handleResponse,
				onError
			}
		)

	}

	generarBoletaPDF = (
		gestionId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {
		
		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/generatePdf/" + gestionId,
				filename: 'PlanDeManejo.pdf',
				onResponse: handleResponse,
				onError
			}
		)
	}


	// descargarBoletaSistemaTecnico = (
	// 	ruta: string,
	// 	onResponse: (entity: any) => void,
	// 	onError: (error: any) => void
	// ) => {
		
	// 	const handleResponse = (res: any) => {
	// 		onResponse(res.data)
	// 	}

	// 	getFileRequest(
	// 		{
	// 			relativePath: this.relativePath + "/dictamen-tecnico/file/boleta/"+ruta,
	// 			filename: ruta+'.xlsx',
	// 			onResponse: handleResponse,
	// 			onError
	// 		}
	// 	)

	// }


	// subirArchivoEvaluacion = (
	// 	file: any,
	// 	cargaBoletaDTO: any,
	// 	onResponse: (data: any) => void,
	// 	onError: (error: AxiosError) => void

	// ) => {

	// 	const handleResponse = (res: AxiosResponse) => {
	// 		onResponse(res.data)
	// 	}

	// 	var bodyFormData = new FormData();
	// 	bodyFormData.append('file', file);

	// 	bodyFormData.append('cargarBoletaDTO', new Blob([JSON.stringify(cargaBoletaDTO)], {
	// 		type: "application/json"
	// 	}));

	// 	uploadFileRequest(
	// 		{
	// 			body: bodyFormData,
	// 			relativePath: this.relativePath + "/dictamen-tecnico/file/agregar/evaluacion",
	// 			onResponse: handleResponse,
	// 			onError
	// 		}
	// 	)

	// }

	// getRespuestaCargaEvaluacion = (
	// 	gestionID: number,				
	// 	onResponse: (entity: any) => void,
	// 	onError: (error: any) => void
	// ) => {

	// 	const handleResponse = (res: any) => {
	// 		onResponse(res.data)
	// 	}

	// 	getRequest(
	// 		{
	// 			relativePath: this.relativePath + "/dictamen-tecnico/evaluacion/"+gestionID,
	// 			onResponse: handleResponse,
	// 			onError
	// 		}
	// 	)

	// }


	resolucionEntrega = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body,
				relativePath: this.relativePath + "/resolucion/entregar",
				onResponse: onResponse,
				onError
			}
		)
	}	

	representanteLegal = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/representante/legal",
				onResponse: onResponse,
				onError
			}
		)
	}

	getListaEnmiendas = (
		gestionId: number,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		
		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/enmienda/" + gestionId + "/lista",
				onResponse: handleResponse,
				onError
			}
		)


	}

	actualizarAreaGestion = (
		ttGestion: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		
		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body: ttGestion,
				relativePath: this.relativePath + "/" + ttGestion.gestionId + "/actualizar/area",
				onResponse: handleResponse,
				onError
			}
		)


	}
	
}