import { AxiosError } from 'axios'
import { getPageRequest } from 'api/ApiAccess'
import Sort from 'api/types/Sort'
import SearchItem from 'api/types/SearchItem'
import PageResponse from 'api/types/PageResponse'

export default abstract class GetPageApi {

	protected pagePath: string
	
	constructor(pagePath: string) {
		this.pagePath = pagePath
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
				relativePath: this.pagePath,
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