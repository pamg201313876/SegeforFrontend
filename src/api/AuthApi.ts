import { AxiosError, AxiosResponse } from "axios"
import LoginDTO from "dto/auth/LoginDTO"
import Cookies from "universal-cookie/es6"
import { deleteRequest, getRequest, postRequestNo401 } from "./ApiAccess"

const cookies = new Cookies();

export default class AuthApi {

	auth = (
		loginDTO: LoginDTO,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const URL = "usuario/login"

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		} 

		postRequestNo401({
			body: loginDTO,
			relativePath: URL,
			onResponse: handleResponse,
			onError: onError
		})

	}

	logout = (
		onSuccess: () => void,
		onError: (error: AxiosError) => void
	) => {

		const URL = "usuario/logout"

		const handleResponse = () => {
			localStorage.removeItem("tokenData")
			localStorage.removeItem("token")
			onSuccess()
		}

		deleteRequest({
			relativePath: URL,
			onResponse: handleResponse,
			onError: onError
		})

	}

	validarLlave = (
		key: string,
		onSuccess: (response: any) => void,
		onError: (error: AxiosError) => void
	) => {

		const URL = "/persona/validar/" + key

		const handleResponse = (res: any) => {
			onSuccess(res.data)
		}

		getRequest({
			relativePath: URL,
			onResponse: handleResponse,
			onError: onError
		})

	}

	// refreshToken = (
	// 	onResponse: (tokenResponseDTO: TokenResponseDTO) => void,
	// 	onError: (error: AxiosError) => void
	// ) => {

	// 	const URL = "/refresh-token"

	// 	const handleResponse = (res: AxiosResponse) => {
	// 		let tokenResponseDTO: TokenResponseDTO = {
	// 			nombre: res.data.nombre,
	// 			perfil: res.data.perfil,
	// 			usuario: res.data.usuario
	// 		}
	// 		onResponse(tokenResponseDTO)
	// 	}

	//   putRequestNo401({
	// 		body: {},
	// 		relativePath: URL,
	// 		onResponse: handleResponse,
	// 		onError: onError
	// 	})

	// }

}