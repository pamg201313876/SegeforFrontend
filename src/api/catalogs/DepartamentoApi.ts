import CatalogApi from "../abstract/CatalogApi";
import { AxiosError, AxiosResponse } from "axios";
import { getRequest } from "api/ApiAccess";


export default class DepartamentoApi extends CatalogApi<any> {

	constructor(){
		super("/departamento")
	}

	getByPaisId = (
		paisId: number,
		onResponse: (value: any[]) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/lista/" + paisId + "/pais",
				onResponse: handleResponse,
				onError
			}
		)
	}
}