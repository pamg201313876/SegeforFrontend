import { AxiosError, AxiosResponse } from 'axios'
import { getPageRequest, getRequest } from '../ApiAccess'
import PageResponse from '../types/PageResponse'
import SearchItem from '../types/SearchItem'
import Sort from '../types/Sort'

export default abstract class GetApi<T extends object> {
	protected relativePath: string
	/**
	 * Add path "/lista" at the end of the relativePath on getList, if the service use it.
	 * Default value is true.
	 */
	protected addAllPath: boolean = true

	constructor(relativePath: string, addAllPath?: boolean) {
		this.relativePath = relativePath
		if(addAllPath != null){
			this.addAllPath = addAllPath
		}
	}

	get = (
		id: number,
		onResponse: (value: T) => void,
		onError: (error: AxiosError) => void
	) => {

		const handleResponse = (res: AxiosResponse) => {
			onResponse(res.data.data[0])
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

		let url = this.relativePath

		if (this.addAllPath) {
			url += "/lista"
		}

		getRequest(
			{
				relativePath: url,
				onResponse: handleResponse,
				onError
			}
		)
	}

	getPage = (
		pageNumber: number,
		size: number,
		onResponse: (pageResponse: PageResponse) => void,
		onError: (error: AxiosError) => void,
		search?: SearchItem[],
		sort?: Sort[],
	) => {

		getPageRequest(
			{
				relativePath: this.relativePath,
				pageNumber: pageNumber,
				size: size,
				search: search,
				sort: sort,
				onResponse: onResponse,
				onError: onError
			}
		)

	}

}