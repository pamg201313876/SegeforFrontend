import { getFileRequest, postFileRequest } from "api/ApiAccess"

export default class JuridicoApi {

    protected relativePath: string = "/gestion/juridico"

    descargarEnmiendaJuridica = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/documento/" + tareaId,
				filename: 'Enmienda.pdf',
				onResponse: handleResponse,
				onError
			}
		)
	}

    descargarEnmiendaJuridicaPreview = (
		ttTarea: any,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		postFileRequest(
			{
                body: ttTarea,
				relativePath: this.relativePath + "/documentoEnmienda/preview",
				filename: "EnmiendaJuridica.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}

}