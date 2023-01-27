import { getRequest } from "./ApiAccess"

export default class UsuarioSubregionApi {

	protected relativePath: string = "/usuariosubregion"
	
	getSubregion = (
		subregionId: number,				
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/subregion/" + subregionId,
				onResponse: handleResponse,
				onError
			}
		)

	}
		
}