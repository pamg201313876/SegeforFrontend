import { AxiosError } from 'axios'
import { getPageRequest } from '../ApiAccess'
import Sort from '../types/Sort'
import SearchItem from '../types/SearchItem'
import PageResponse from '../types/PageResponse'
import ObjFiltro from 'dto/ObjFiltro'
import { formatDate } from 'utils/UtilFunctions'

export default abstract class GetPageApi {

	protected pagePath: string
	
	constructor(pagePath: string) {
		this.pagePath = pagePath
	}
	
	getPage = (
		filter: ObjFiltro,
		pageNumber: number,
		size: number,
		onResponse: (pageResponse: PageResponse) => void,
		onError: (error: AxiosError) => void,
		search?: SearchItem[],
		sort?: Sort[],
	) => {

		var params = new URLSearchParams();
    for (var [key, value] of Object.entries(filter)) {
        var dateFields = ["fechaIni", "fechaFin"];
        if(dateFields.includes(key)) {
            params.set(key, formatDate(String(value)));
        } else {
            params.set(key, String(value));
        }
    }

		getPageRequest(
			{
				relativePath: this.pagePath,
				pageNumber: pageNumber,
				size: size,
				search: search,
				sort: sort,
				onResponse: onResponse,
				onError: onError,
				params: params
			}
		)

	}

}