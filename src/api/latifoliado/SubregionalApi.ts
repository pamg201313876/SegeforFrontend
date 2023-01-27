import { getRequest, getFileRequest, postFileRequest } from "../ApiAccess"

export default class SubregionalApi {

    protected relativePath: string = "/gestion/subregional"

    getAvalGarantia = (
        tareaId: number,
        onResponse: (entity: any) => void,
        onError: (error: any) => void
    ) => {

        const handleResponse = (res: any) => {
            onResponse(res.data)
        }

        getRequest(
            {
                relativePath: this.relativePath + "/aval/" + tareaId,
                onResponse: handleResponse,
                onError
            }
        )

    }

    descargarDictamenSubregional = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/documento/" + tareaId,
				filename: "DictamenSubregional.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}

    descargarEnmiendaSubregional = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/documentoEnmienda/" + tareaId,
				filename: "Enmienda.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}

    descargarEnmiendaSubregionalPreview = (
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
				relativePath: this.relativePath + "/documentoEnmienda/preview",
				filename: "EnmiendaSubregional.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarProvidenciarEnmiendas = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/providenciaEnmiendas/" + tareaId,
				filename: "ProvidenciarEnmiendas.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarProvidenciarEnmiendasPreview = (
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
				relativePath: this.relativePath + "/providenciaEnmiendas/preview",
				filename: "ProvidenciarEnmiendas.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}



	descargarAvalPreview = (
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
				relativePath: this.relativePath + "/avalGarantia/preview",
				filename: "AvalGarantia.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarAvalPDF = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/avalGarantia/" + tareaId,
				filename: "AvalGarantia.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarDictamenSubPreview = (
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
				relativePath: this.relativePath + "/emitirDictamenSubregional/preview",
				filename: "DictamenSubregional.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarDictamenSubPDF = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/emitirDictamenSubregional/" + tareaId,
				filename: "DictamenSubregional.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarCedulaPreview = (
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
				relativePath: this.relativePath + "/cedula/preview",
				filename: "Cedula.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarCedulaPDF = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/cedula/" + tareaId,
				filename: "Cedula.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}

	descargarNotificacionPreview = (
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
				relativePath: this.relativePath + "/notificacion/preview",
				filename: "Notificacion.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}


	descargarNotificacion = (
		tareaId: number,
		onResponse: (entity: any) => void,
		onError: (error: any) => void
	) => {

		const handleResponse = (res: any) => {
			onResponse(res.data)
		}

		getFileRequest(
			{
				relativePath: this.relativePath + "/notificacion/" + tareaId,
				filename: "Notificacion.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}

    
}