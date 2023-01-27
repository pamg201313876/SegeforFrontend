import { AxiosError, AxiosResponse } from "axios"
import CreateSolicitanteDTO from "dto/usuario/CreateSolicitanteDTO"
import CreateUsuarioDTO from "dto/usuario/CreateUsuarioDTO"
import { getRequest, postRequest, putRequest } from "./ApiAccess"

export default class PersonaApi {

	protected relativePath: string

	constructor() {
		this.relativePath = "/persona"
	}


	registrarNuevoUsuario = (
		body: CreateSolicitanteDTO,
		onResponse: (response: AxiosResponse) => void,
		onError: (error: AxiosError) => void

	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/registrar",
				onResponse: handleResponse,
				onError
			}
		)

	}
	

	getMiUsuario = (
		usuarioId: number,
		onResponse: (entity: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/" + usuarioId,
				onResponse: handleResponse,
				onError
			}
		)

	}

	agregarPersona = (
		body: any,
		onResponse: (response: any) => void,
		onError: (error: AxiosError) => void

	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/add",
				onResponse: handleResponse,
				onError
			}
		)
	}
	

	actualizarUsuario = (
		usuarioId: number,
		body: CreateUsuarioDTO,
		onResponse: (response: AxiosResponse) => void,
		onError: (error: AxiosError) => void

	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}


		putRequest(
			{
				body,
				relativePath: this.relativePath + "/" + usuarioId,
				onResponse: handleResponse,
				onError
			}
		)

	}


	buscarPersona = (
		body: any,
		onResponse: (response: any) => void,
		onError: (error: AxiosError) => void

	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postRequest(
			{
				body,
				relativePath: this.relativePath + "/busqueda",
				onResponse: handleResponse,
				onError
			}
		)
	}


	

}