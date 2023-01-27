import { AxiosError } from "axios"
import UpdateEspecieProteger from "dto/gestion/latifoliado/UpdateEspecieProtegerDTO"
import { getRequest, putRequest} from "../ApiAccess"

export default class EspeciesProtegerApi {

	private getBaseUrl = (
		gestionId: number
	): string => {
		return "gestiones/" + gestionId + "/latifoliado/especies-proteger"
	}

	updateEspeciesProteger = (
		gestionId: number,
		updateList: UpdateEspecieProteger[],
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

	getEspeciesProteger = (
		gestionId: number,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.getBaseUrl(gestionId) ,
				onResponse: handleResponse,
				onError
			}
		)


	}

}