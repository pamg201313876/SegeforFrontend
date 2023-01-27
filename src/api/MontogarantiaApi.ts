import { getRequest } from "./ApiAccess"

export default class MontogarantiaApi {

	protected relativePath: string = "/montogarantia"
	
	getTipogarantia = (
		tipogarantiaId: number,				
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/lista/tipogarantia/" + tipogarantiaId,
				onResponse: handleResponse,
				onError
			}
		)

	}
		
}