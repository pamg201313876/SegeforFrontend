import { postRequest } from "./ApiAccess"

export default class AgregarApi {

	protected relativePath: string

	constructor() {
		this.relativePath = "/agregar"
	}


	agregarPersonaIndividual = (
		body: any,
		onResponse: (response: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/persona",
				onResponse: handleResponse,
				onError
			}
		)

	}
	
}