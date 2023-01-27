import { AxiosError } from "axios"
import { getRequest } from "../../ApiAccess"

export default class ResumenApi {

	private getBaseUrl = (
		gestionId: number
	): string => {
		return "gestiones/" + gestionId + "/latifoliado/hasta-90/resumen"
	}

	getResumen = (
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

}