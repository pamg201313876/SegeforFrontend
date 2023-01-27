import { AxiosError, AxiosResponse } from "axios";
import CreateUpdateSolicitudDTO from "dto/solicitud/CreateUpdateSolicitudDTO";
import SolicitudDTO from "dto/solicitud/SolicitudDTO";
import CrudApi from "./abstract/CrudApi";
import { getRequest, putRequest } from "./ApiAccess";


export default class SolicitudesApi extends CrudApi<SolicitudDTO, CreateUpdateSolicitudDTO> {	

    constructor(){        
        super("/solicitudes")
        this.addAllPath = false;
	}

	getMisPendientesElaborador = (
		onResponse: (entity: any) => void,
        onError: (error: AxiosError) => void
        
	) => {

		const handleResponse = (res: AxiosResponse) => {
            onResponse(res.data)            
		}

		getRequest(
			{
				relativePath: this.relativePath+"/elaborador/espera-aceptacion",
				onResponse: handleResponse,
				onError
			}
		)

	}

	getMisAceptadasElaborador = (
		onResponse: (entity: any) => void,
        onError: (error: AxiosError) => void
        
	) => {

		const handleResponse = (res: AxiosResponse) => {
            onResponse(res.data)            
		}

		getRequest(
			{
				relativePath: this.relativePath+"/elaborador/aceptadas",
				onResponse: handleResponse,
				onError
			}
		)
	}


	aceptarSolicitud = (
		onResponse: (entity: any) => void,
        onError: (error: AxiosError) => void,
        codigo_solicitud : number
	) => {

		console.log(this.relativePath+"/elaborador/aceptar/"+codigo_solicitud)

		const handleResponse = (res: AxiosResponse) => {
            onResponse(res.data)            
		}

		putRequest(
			{
				relativePath: this.relativePath+"/elaborador/aceptar/"+codigo_solicitud,
				body : {},
				onResponse: handleResponse,
				onError
			}
		)

	}
	
}