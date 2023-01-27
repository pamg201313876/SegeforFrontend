import { AxiosError } from "axios"
import SaveAreasInventarioDTO from "dto/gestion/latifoliado/hasta90/inventario/SaveAreasInventarioDTO"
import SaveDescripcionDTO from "dto/gestion/latifoliado/hasta90/inventario/SaveDescripcionDTO"
import SaveTipoInventarioDTO from "dto/gestion/latifoliado/hasta90/inventario/SaveTipoInventarioDTO"
import { getRequest, putRequest } from "../../ApiAccess"

export default class InventarioApi {

	private getBaseUrl = (
		gestionId: number
	): string => {
		return "gestiones/" + gestionId + "/latifoliado/hasta-90/inventario"
	}

	saveTipoInventario = (
		gestionId: number,
		saveTipoInventario: SaveTipoInventarioDTO,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/tipo",
				body: saveTipoInventario,
				onResponse: handleResponse,
				onError
			}
		)
	}

	saveAreasInventario = (
		gestionId: number,
		saveAreasInventario: SaveAreasInventarioDTO,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/areas",
				body: saveAreasInventario,
				onResponse: handleResponse,
				onError
			}
		)
	}

	saveDescripcionInventario = (
		gestionId: number,
		saveDescripcion: SaveDescripcionDTO,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/descripcion",
				body: saveDescripcion,
				onResponse: handleResponse,
				onError
			}
		)
	}

	getCalculos = (
		gestionId: number,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/calculos",
				onResponse: handleResponse,
				onError
			}
		)


	}

}