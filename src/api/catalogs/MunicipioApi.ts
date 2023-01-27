import { getRequest  } from "api/ApiAccess";
import { AxiosError, AxiosResponse } from "axios";
import CatalogApi from "../abstract/CatalogApi";


export default class MunicipioApi extends CatalogApi<any> {

	constructor(){
		super("/municipio")
	}

	getByDepartamentoId = (
		deptId: number,
		onResponse: (value: any[]) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/lista/" + deptId + "/departamento",
				onResponse: handleResponse,
				onError
			}
		)
	}

	getMunicipio = (
		municipioId: number,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		getRequest(
			{
				relativePath: this.relativePath + "/"+municipioId,
				onResponse: onResponse,
				onError
			}
		)
	}

}