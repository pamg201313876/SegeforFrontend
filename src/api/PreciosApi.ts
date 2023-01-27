import { AxiosError } from "axios"
import { getRequest } from "./ApiAccess"

export default class PreciosApi {

	protected relativePath: string

	constructor() {
		this.relativePath = "/gestion/dictamen-tecnico"
	}

	// save = (
	// 	saveAprovechamientoDTO: SaveAprovechamientoDTO,
	// 	onResponse: (res: any) => void,
	// 	onError: (error: AxiosError) => void
	// ) => {
	// 	const handleResponse = (res: any) => {
	// 		onResponse(res.data)
	// 	}

	// 	postRequest(
	// 		{
	// 			relativePath: this.relativePath,
	// 			body: saveAprovechamientoDTO,
	// 			onResponse: handleResponse,
	// 			onError
	// 		}
	// 	)
	// }

	// saveSistemasRepoblacion = (
	// 	saveSistemaRepoblacionDTO: any,
	// 	onResponse: (res: any) => void,
	// 	onError: (error: AxiosError) => void
	// ) => {
	// 	const handleResponse = (res: any) => {
	// 		onResponse(res.data)
	// 	}

	// 	postRequest(
	// 		{
	// 			relativePath: this.relativePath + "/sistemas-repoblacion",
	// 			body: saveSistemaRepoblacionDTO,
	// 			onResponse: handleResponse,
	// 			onError
	// 		}
	// 	)
	// }

	// getCalculos = (
	// 	gestionId: number,
	// 	onResponse: (res: any) => void,
	// 	onError: (error: AxiosError) => void
	// ) => {

	// 	const handleResponse = (res: any) => {
	// 		onResponse(res.data)
	// 	}

	// 	getRequest(
	// 		{
	// 			relativePath: this.relativePath + "/calculos/" + gestionId,
	// 			onResponse: handleResponse,
	// 			onError: onError
	// 		}
	// 	)


	// }


	getPrecios = (
		gestionId: number,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/precios-maderas/" + gestionId,
				onResponse: handleResponse,
				onError: onError
			}
		)


	}

}