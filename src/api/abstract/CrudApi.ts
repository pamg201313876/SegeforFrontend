import { AxiosError, AxiosResponse } from 'axios'
import { deleteRequest, postRequest, putRequest } from '../ApiAccess'
import GetApi from './GetApi'

export default abstract class CrudApi<T extends object ,C extends object> extends GetApi<T> {
	
	create = (
		body: C,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {
		postRequest(
			{
				relativePath: this.relativePath,
				body,
				onResponse,
				onError
			}
		)
	}

	update = (
		id: number,
		body: C,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {
		putRequest(
			{
				relativePath: this.relativePath + "/" + id,
				body,
				onResponse,
				onError
			}
		)
	}

	delete = (
		id: number,
		onResponse: (res: AxiosResponse) => void,
		onError: (error: AxiosError) => void
	) => {
		deleteRequest(
			{
				relativePath: this.relativePath + "/" + id,
				onResponse,
				onError
			}
		)
	}


}