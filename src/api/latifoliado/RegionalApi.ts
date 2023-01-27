import { getRequest, getFileRequest, postFileRequest } from "../ApiAccess"

export default class RegionalApi {

    protected relativePath: string = "/gestion/regional"   

	descargarDictamenPreview = (
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
				relativePath: this.relativePath + "/emitirDictamenRegional/preview",
				filename: "RegionalDictamen.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}	
    

    descargarDictamenPDF = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/emitirDictamenRegional/" + tareaId,
				filename: "RegionalDictamen.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}



}