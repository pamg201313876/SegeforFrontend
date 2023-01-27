import RegenteDTO from "dto/bridge/RegenteDTO"
import ValidarElaboradorDTO from "dto/bridge/ValidarElaboradorDTO"
import { postRequest, getRequest} from "./ApiAccess"

export default class BridgeApi {

	protected relativePath: string

	constructor() {
		this.relativePath = "/bridge"
	}

    validarElaborador = (
		body: ValidarElaboradorDTO,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/validar/perfil",
				onResponse: onResponse,
				onError
			}
		)
	}

	getListaRegentes = (
		onResponse: (entity: RegenteDTO[]) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/regente/todos/lista",
				onResponse: handleResponse,
				onError
			}
		)

	}

    getListaProfesionales = (
		onResponse: (entity: RegenteDTO[]) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/regente/profesional/lista",
				onResponse: handleResponse,
				onError
			}
		)

	}


}