import { AxiosError, AxiosResponse } from "axios"
import { getRequest } from "./ApiAccess"

export default class CriterioProteccionApi {

	protected relativePath: string

	constructor() {
		this.relativePath = "/criterioproteccion"
	}

	obtenerListaCriterioProteccion = (
		onResponse: (data: any[]) => void,
		onError: (error: AxiosError) => void

	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/lista/activa",
				onResponse: handleResponse,
				onError
			}
		)

	}
}