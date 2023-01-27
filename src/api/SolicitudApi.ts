import { AxiosError, AxiosResponse } from "axios"
import GetPageApi from "./abstract/GetPageApi"
import { getFileRequest, getRequest, putRequest } from "./ApiAccess"

export default class SolicitudApi extends GetPageApi {

	protected relativePath: string = "/solicitud"

	constructor() {
		super("/solicitud/listado") //page path
	}

	recibirExpediente = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		putRequest(
			{
				body,
				relativePath: this.relativePath + "/recibir/expediente",
				onResponse: onResponse,
				onError
			}
		)

	}

	marcarEnmienda = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body,
				relativePath: this.relativePath + "/marcar/enmienda",
				onResponse: handleResponse,
				onError
			}
		)

	}


	getRecepcionById = (
		solicitudId: number,
		onResponse: (entity: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/" + solicitudId + "/recepcion",
				onResponse: handleResponse,
				onError
			}
		)

	}

	getRecepcionByGestionId = (
		solicitudId: number,
		onResponse: (entity: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/gestion/" + solicitudId + "/recepcion",
				onResponse: handleResponse,
				onError
			}
		)

	}

	generarPdfConstancia = (
		solicitudId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {
		
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/generatePdfConstancia/" + solicitudId,
				filename: 'Constancia.pdf',
				onResponse: handleResponse,
				onError
			}
		)
	}


	generarPdfCaratula = (
		solicitudId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {
		
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/generatePdfCaratula/" + solicitudId,
				filename: 'Caratula.pdf',
				onResponse: handleResponse,
				onError
			}
		)
	}



	getSolicitudByGestion = (
		gestionId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {
		
		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/gestion/" + gestionId + "/solicitud",				
				onResponse: handleResponse,
				onError
			}
		)
	}
}