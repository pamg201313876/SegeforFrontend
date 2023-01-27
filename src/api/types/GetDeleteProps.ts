import { AxiosResponse, AxiosError } from 'axios'

export type GetDeleteProps = {
	/** Path relativo al dominio (Ej: /users, /logIn)  */
	relativePath: string;
	/** Parametros del url. Opcional. */
	params?: URLSearchParams;
	/** Enlace a función que será ejecutado cuando se reciba una respuesta
	*  correcta del servicio a acceder. El parametro 'res' almacena la información de respuesta de la solicitud.  */
	onResponse: (res: AxiosResponse) => void;
	/** Enlace a función que será ejecutado en caso exista un error en la solicitud. 
	*  El parametro 'error' almacena la información correspondiente al error */
	onError: (error: AxiosError) => void;
}

export default GetDeleteProps;