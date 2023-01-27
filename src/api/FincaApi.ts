import { AxiosError } from "axios"
import { getPageRequest, postRequest, putRequest } from "./ApiAccess"
import PageResponse from "./types/PageResponse"
import SearchItem from "./types/SearchItem"
import Sort from "./types/Sort"

export default class FincaApi {

	protected relativePath: string

	constructor() {
		this.relativePath = "/finca"
	}

	nuevaFinca = (
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {
		postRequest(
			{
				body,
				relativePath: this.relativePath + "/add",
				onResponse: onResponse,
				onError
			}
		)
	}

	editarFinca = (
		fincaId: number,
		body: any,
		onResponse: (res: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		putRequest(
			{
				body,
				relativePath: this.relativePath + "/" + fincaId,
				onResponse: handleResponse,
				onError
			}
		)
	}

	misFincas = (
		pageNumber: number,
		size: number,
		onResponse: (pageResponse: PageResponse) => void,
		onError: (error: AxiosError) => void,
		search?: SearchItem[],
		sort?: Sort[]
	) => {

		getPageRequest({
			relativePath: this.relativePath + "/mis-fincas",
			pageNumber: pageNumber,
			size: size,
			search: search,
			sort: sort,
			onResponse: onResponse,
			onError: onError
		})

	}

	fincasMunicipio = (
		idMunicipio: number,
		pageNumber: number,
		size: number,
		onResponse: (pageResponse: PageResponse) => void,
		onError: (error: AxiosError) => void,
		search?: SearchItem[],
		sort?: Sort[],
	) => {

		getPageRequest(
			{
				relativePath: this.relativePath + "/municipio/" + idMunicipio,
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