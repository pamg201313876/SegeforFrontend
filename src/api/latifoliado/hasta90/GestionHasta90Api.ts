import { getFileRequest, getRequest } from "api/ApiAccess"
import { AxiosError, AxiosResponse } from "axios"

export default class GestionHasta90Api {

	private getBaseUrl = (
		gestionId: number
	) : string => {
		return "gestiones/" + gestionId + "/latifoliado/hasta-90"
	}

	getGestion = (
		gestionId: number,
		onResponse: (entity: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.getBaseUrl(gestionId),
				onResponse: handleResponse,
				onError
			}
		)

	}

	descargarPlanManejoPDF = (
		gestionId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {
		
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/plan-manejo",
				filename: 'PlanDeManejo.pdf',
				onResponse: handleResponse,
				onError
			}
		)
	}

	descargarCronogramaPDF = (
		gestionId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {
		
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/cronograma",
				filename: 'Cronograma.pdf',
				onResponse: handleResponse,
				onError
			}
		)
	}

}