import { AxiosError, AxiosResponse } from "axios"
import { getRequest } from "./ApiAccess"

export default class UsoFincaApi {

	protected relativePath: string

	constructor() {
		this.relativePath = "/usofinca"
	}

	obtenerListaUsoFinca = (
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