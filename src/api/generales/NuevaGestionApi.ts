import UpdateGarantiaGestionDTO from "dto/gestion/UpdateGarantiaGestionDTO"
import CambioUltimoPanelDTO from "dto/solicitud/CambioUltimoPanelDTO"
import { putRequest } from "../ApiAccess"

export default class NuevaGestionApi {

	private baseURL = "gestion"

	cambiarPosicion = (
		body: CambioUltimoPanelDTO,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		putRequest({
			body,
			relativePath: this.baseURL + "/cambio-panel",
			onResponse,
			onError
		})

	}

	updateGarantiaGestion = (
		gestionId: number,
		body: UpdateGarantiaGestionDTO,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		putRequest({
			body,
			relativePath: this.baseURL + "/" + gestionId +"/garantia",
			onResponse,
			onError
		})

	}

	addRegente = (
		gestionId: number,
		regente: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) =>{
			onResponse(res.data)
		}

		putRequest(
			{
				body: regente,
				relativePath: this.baseURL + "/" + gestionId + "/regente",
				onResponse: handleResponse,
				onError
			}
		)
	}
}