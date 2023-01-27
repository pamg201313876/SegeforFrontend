import { AxiosError } from "axios"
import UpdateTurnoDTO from "dto/gestion/latifoliado/UpdateTurnoDTO"
import UpdateTurnoEstratoDTO from "dto/gestion/latifoliado/UpdateTurnoEstratoDTO"
import { getRequest, putRequest } from "../ApiAccess"

export default class TurnosApi {

	private getBaseUrl = (
		gestionId: number
	): string => {
		return "gestiones/" + gestionId + "/latifoliado/turnos"
	}

	getTurnosActividades = (
		gestionId: number,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: any) => {
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

	updateTurnos = (
		gestionId: number,
		updateList: UpdateTurnoDTO[],
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId),
				body: updateList,
				onResponse: handleResponse,
				onError
			}
		)


	}

	updateTurnosEstrato = (
		gestionId: number,
		updateList: UpdateTurnoEstratoDTO[],
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/estratos",
				body: updateList,
				onResponse: handleResponse,
				onError
			}
		)


	}

	

}