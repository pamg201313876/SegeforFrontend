import { AxiosError } from "axios"
import UpdateDmcDTO from "dto/gestion/latifoliado/hasta90/planificacion/UpdateDmcDTO"
import UpdateIcEstratoDTO from "dto/gestion/latifoliado/hasta90/planificacion/UpdateIcEstratoDTO"
import UpdateSistemaYCicloDTO from "dto/gestion/latifoliado/hasta90/planificacion/UpdateSistemaYCicloDTO"
import { getRequest, putRequest } from "../../ApiAccess"

export default class PlanificacionApi {

	private getBaseUrl = (
		gestionId: number
	): string => {
		return "gestiones/" + gestionId + "/latifoliado/hasta-90/planificacion"
	}

	updateSistemaYCiclo = (
		gestionId: number,
		updateSistemaYCiclo: UpdateSistemaYCicloDTO,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/sistema-ciclo",
				body: updateSistemaYCiclo,
				onResponse: handleResponse,
				onError
			}
		)
	}

	updateDmc = (
		gestionId: number,
		updateDmcList: UpdateDmcDTO[],
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/dmc",
				body: updateDmcList,
				onResponse: handleResponse,
				onError
			}
		)
	}

	updateIc = (
		gestionId: number,
		updateIcEstratoList: UpdateIcEstratoDTO[],
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/ic",
				body: updateIcEstratoList,
				onResponse: handleResponse,
				onError
			}
		)
	}

	getCalculos = (
		gestionId: number,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/calculos",
				onResponse: handleResponse,
				onError
			}
		)


	}

	

}