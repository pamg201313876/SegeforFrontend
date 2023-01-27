import { AxiosResponse, AxiosError } from 'axios'
import { getRequest } from '../ApiAccess'

export default abstract class Catalog<T extends object> {
	protected relativePath: string

	constructor(relativePath: string) {
		this.relativePath = relativePath
	}


	get = (
		id: number,
		onResponse: (value: T) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/" + id,
				onResponse: handleResponse,
				onError
			}
		)
	}

	getList = (
		onResponse: (value: T[]) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/lista/activa",
				onResponse: handleResponse,
				onError
			}
		)
	}


	getListAsignar = (
		onResponse: (value: T[]) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data.data)
		}

		getRequest(
			{
				relativePath: this.relativePath + "/lista/asignar",
				onResponse: handleResponse,
				onError
			}
		)
	}

}