import { AxiosError, AxiosResponse } from "axios"
import CargarBoletaDTO from "dto/boleta/CargarBoletaDTO"
import { deleteRequest, getFileRequest, uploadFileRequest } from "../../ApiAccess"


export default class BoletaCensoApi {

	private getBaseUrl = (
		gestionId: number
	) : string => {
		return "gestiones/" + gestionId + "/latifoliado/hasta-90/archivo-gestion/"
	}

	getFile = (
		gestionId: number,
		filename: string,
		onResponse: (data: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				filename: filename,
				relativePath: this.getBaseUrl(gestionId),
				onResponse: handleResponse,
				onError
			}
		)


	}

	removeFile = (
		gestionId: number,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		
		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		deleteRequest({
			relativePath: this.getBaseUrl(gestionId),
			onResponse: handleResponse,
			onError: onError
		})

	}


	uploadFile = (
		gestionId: number,
		file: any,
		cargaBoletaDTO: CargarBoletaDTO,
		onResponse: (data: any) => void,
		onError: (error: AxiosError) => void

	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		var bodyFormData = new FormData();
		bodyFormData.append('file', file);

		bodyFormData.append('cargarBoletaDTO', new Blob([JSON.stringify(cargaBoletaDTO)], {
			type: "application/json"
		}));

		uploadFileRequest(
			{
				body: bodyFormData,
				relativePath: this.getBaseUrl(gestionId),
				onResponse: handleResponse,
				onError
			}
		)

	}

}