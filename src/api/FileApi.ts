import { AxiosError, AxiosResponse } from "axios"
import { uploadFileRequest } from "./ApiAccess"

export default class FileApi {

	protected relativePath: string

	constructor() {
		this.relativePath = "/file"
	}

	cargarArchivo = (
        file: any,
		onResponse: (data: any[]) => void,
		onError: (error: AxiosError) => void

	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data)
		}

        var bodyFormData = new FormData();
		bodyFormData.append('file', file );

		uploadFileRequest(
			{
				body: bodyFormData,
				relativePath: this.relativePath + "/upload",
				onResponse: handleResponse,
				onError
			}
        )
	}
}