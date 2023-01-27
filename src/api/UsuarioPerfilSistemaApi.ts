import { AxiosError, AxiosResponse } from "axios";
import ElaboradorDTO from "dto/ElaboradorDTO";
import UsuarioPerfilSistemaDTO from "dto/perfil/UsuarioPerfilSistemaDTO";
import GetApi from "./abstract/GetApi";
import { getRequest, putRequest } from "./ApiAccess";

export default class UsuarioPerfilSistemaApi extends GetApi<UsuarioPerfilSistemaDTO> {

	constructor () {
		super("/usuarioperfilsistema")
	}

	getElaboradores = (
		onResponse: (elaboradores: ElaboradorDTO[]) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data.data)
		}

		getRequest({
			relativePath: this.relativePath + "/lista/elaboradores",
			onResponse: handleResponse,
			onError
		})

	}


	cambiarAElaborador = (
		usuarioPerfilSistemaDTO: UsuarioPerfilSistemaDTO,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res)
		}

		putRequest(
			{
				body: usuarioPerfilSistemaDTO,
				relativePath: this.relativePath + "/regente",
				onResponse: handleResponse,
				onError
			}
		)
	}

}