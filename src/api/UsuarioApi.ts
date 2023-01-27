import { AxiosError, AxiosResponse } from "axios";
import CreateUpdateClaveUsuarioDTO from 'dto/usuario/CreateUpdateClaveUsuarioDTO';
import CreateUpdateUsuarioDTO from "dto/usuario/CreateUpdateUsuarioDTO";
import UsuarioDTO from "dto/usuario/UsuarioDTO";
import CrudApi from "./abstract/CrudApi";
import { getRequest, putRequest } from "./ApiAccess";


export default class UsuarioApi extends CrudApi<UsuarioDTO, CreateUpdateUsuarioDTO> {

	

	constructor(){
		super("/mi-usuario")
	}

	getMiUsuario = (
		onResponse: (entity: UsuarioDTO) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath ,
				onResponse: handleResponse,
				onError
			}
		)

	}


	updateMiusuario = (		
		body: CreateUpdateUsuarioDTO,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {
		putRequest(
			{
				relativePath: this.relativePath,
				body,
				onResponse,
				onError
			}
		)
	}

	cambiarClave = (		
		body: CreateUpdateClaveUsuarioDTO,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {
		putRequest(
			{
				relativePath: "/usuario/cambiarclave",
				body,
				onResponse,
				onError
			}
		)
	}
	
}