import { AxiosError, AxiosResponse } from "axios"
import { getFileRequest, getRequest, postFileRequest, putRequest, uploadFileRequest } from "../ApiAccess"

export default class DictamenTecnicoApi {

    protected relativePath: string = "/gestion/dictamen-tecnico"

    descargarBoletaSistemaTecnico = (
        ruta: string,
        onResponse: (entity: any) => void,
        onError: (error: any) => void
    ) => {

        const handleResponse = (res: any) => {
            onResponse(res.data)
        }

        getFileRequest(
            {
                relativePath: this.relativePath + "/file/boleta/" + ruta,
                filename: ruta + '.xlsx',
                onResponse: handleResponse,
                onError
            }
        )

    }

    descargarDictamen = (
        filename: string, 
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
				filename: filename,
				onResponse: handleResponse,
				onError
			}
		)
	}

    descargarEnmiendaTecnicoPreview = (
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
				filename: "Enmienda.pdf",
				onResponse: handleResponse,
				onError
			}
		)
	}

    updateResumenEvaluacion = (
        gestionID: number,
        resumenDTO: any,
        onResponse: (entity: any) => void,
        onError: (error: any) => void
    ) => {

        const handleResponse = (res: any) => {
            onResponse(res.data)
        }

        putRequest(
            {
                body: resumenDTO,
                relativePath: this.relativePath + "/resumen-evaluacion/" + gestionID,
                onResponse: handleResponse,
                onError
            }
        )

    }

    getInformacionGeneral = (
        tareaId: number,
        onResponse: (entity: any) => void,
        onError: (error: any) => void
    ) => {

        const handleResponse = (res: any) => {
            onResponse(res.data)
        }

        getRequest(
            {
                relativePath: this.relativePath + "/informacion-general/" + tareaId,
                onResponse: handleResponse,
                onError
            }
        )

    }

    getResumenEvaluacion = (
        gestionID: number,
        onResponse: (entity: any) => void,
        onError: (error: any) => void
    ) => {

        const handleResponse = (res: any) => {
            onResponse(res.data)
        }

        getRequest(
            {
                relativePath: this.relativePath + "/resumen-evaluacion/" + gestionID,
                onResponse: handleResponse,
                onError
            }
        )

    }

    getEstimacion = (
        gestionID: number,
        onResponse: (entity: any) => void,
        onError: (error: any) => void
    ) => {

        const handleResponse = (res: any) => {
            onResponse(res.data)
        }

        getRequest(
            {
                relativePath: this.relativePath + "/estimacion/" + gestionID,
                onResponse: handleResponse,
                onError
            }
        )

    }


    subirArchivoEvaluacion = (
        file: any,
        cargaBoletaDTO: any,
        onResponse: (data: any) => void,
        onError: (error: AxiosError) => void

    ) => {

        const handleResponse = (res: AxiosResponse) => {
            onResponse(res.data)
        }

        var bodyFormData = new FormData();
        bodyFormData.append('file', file);

        bodyFormData.append('cargarBoletaDTO', new Blob([JSON.stringify(cargaBoletaDTO)], {
            type: "application/json"
        }));

        uploadFileRequest(
            {
                body: bodyFormData,
                relativePath: this.relativePath + "/file/agregar/evaluacion",
                onResponse: handleResponse,
                onError
            }
        )

    }

    getRespuestaCargaEvaluacion = (
        gestionID: number,
        onResponse: (entity: any) => void,
        onError: (error: any) => void
    ) => {

        const handleResponse = (res: any) => {
            onResponse(res.data)
        }

        getRequest(
            {
                relativePath: this.relativePath + "/evaluacion/" + gestionID,
                onResponse: handleResponse,
                onError
            }
        )

    }

}