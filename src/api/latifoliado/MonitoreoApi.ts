import { getRequest, getFileRequest, postFileRequest } from "../ApiAccess"

export default class MonitoreoApi {

    protected relativePath: string = "/gestion/monitoreo"   

	descargarOpinionPreview = (
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
				relativePath: this.relativePath + "/opinionGarantia/preview",
				filename: "opinionGarantia.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarOpinionPDF = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/opinionGarantia/" + tareaId,
				filename: "opinionGarantia.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}
    
}