import Axios, { AxiosResponse, AxiosError } from 'axios'
import Sort from './Sort'
import SearchItem from './SearchItem'
import PageResponse from './PageResponse'

type GetPageProps = {
	/** Path del recurso */
	relativePath: string
	/** Número de página */
	pageNumber: number
	/** Número de elementos a solicitar */
	size: number
	/** Enlace a función que será ejecutado cuando se reciba una respuesta
	*  correcta del servicio a acceder. El parametro 'res' almacena la información de respuesta de la solicitud.  */
	onResponse: (pageRes: PageResponse) => void
	/** Enlace a función que será ejecutado en caso exista un error en la solicitud. 
	*  El parametro 'error' almacena la información correspondiente al error */
	onError: (error: AxiosError) => void
	/** Parámetros de ordenamiento */
	sort?: Sort[]
	/** Items que representan una busqueda en rsql.  */
	search?: SearchItem[]
	/** Parametros del url. Opcional. */
	params?: URLSearchParams
}

export default GetPageProps