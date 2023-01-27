import { AxiosError } from "axios"
import UpdateActividadesDTO from "dto/gestion/latifoliado/hasta90/aprovechamiento/UpdateActividadesDTO"
import UpdateDetalleIntervencionEstratoDTO from "dto/gestion/latifoliado/hasta90/aprovechamiento/UpdateDetalleIntervencionEstratoDTO"
import UpdatePropuestaDTO from "dto/gestion/latifoliado/hasta90/aprovechamiento/UpdatePropuestaDTO"
import { getRequest, putRequest} from "../../ApiAccess"

export default class AprovechamientoApi {

	private getBaseUrl = (
		gestionId: number
	): string => {
		return "gestiones/" + gestionId + "/latifoliado/hasta-90/aprovechamiento"
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

	updatePropuesta = (
		gestionId: number,
		updatePropuestaDTO: UpdatePropuestaDTO,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/propuesta",
				body: updatePropuestaDTO,
				onResponse: handleResponse,
				onError
			}
		)
	}
	
	updateActividades = (
		gestionId: number,
		updateActividadesDTO: UpdateActividadesDTO,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/actividades",
				body: updateActividadesDTO,
				onResponse: handleResponse,
				onError
			}
		)
	}

	updateDetalleIntervencion = (
		gestionId: number,
		listDetallesEstrato: UpdateDetalleIntervencionEstratoDTO[],
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/detalle-intervencion",
				body: listDetallesEstrato,
				onResponse: handleResponse,
				onError
			}
		)
	}

	updateAnioEstablecimiento = (
		gestionId: number,
		updateList: any[],
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/anio-establecimiento",
				body: updateList,
				onResponse: handleResponse,
				onError
			}
		)
	}

	updateSistemaRepoblacion = (
		gestionId: number,
		updateDTO: any,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				relativePath: this.getBaseUrl(gestionId) + "/sistema-repoblacion",
				body: updateDTO,
				onResponse: handleResponse,
				onError
			}
		)
	}

}