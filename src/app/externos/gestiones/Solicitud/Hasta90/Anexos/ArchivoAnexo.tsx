import FileApi from 'api/FileApi';
import GestionApi from 'api/GestionApi';
import { AppContextInterface } from 'app/App';
import { AxiosError } from 'axios';
import UploadButton from 'components/UploadButton/UploadButton';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
	gestion: any,
	// label: string,
	// name: string,
	numAnexo: number,
	dataContext: AppContextInterface
}

const gestionApi = new GestionApi()
const fileApi = new FileApi();

export default function ArchivoAnexo({
	gestion,
	numAnexo,
	dataContext
}: Props) {

	const [anexoId, setAnexoId] = useState<number>(-1)
	// const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false)

	const handleUploadSuccess = (response: any) => {
		addAnexo(response.data[0], numAnexo)
	}

	const handleUploadError = (error: any) => {

	}

	const addAnexo = (e: any, numero_anexo: number) => {
		let anexo = {
			extension: e.extension,
			nombre: e.nombre,
			ruta: e.rutaArchivo,
			size: e.size,
			tcTipoAnexo: {
				tipoAnexoId: numero_anexo
			},
			tipoAnexoId: numero_anexo,
			ttGestion: {
				estadoId: gestion.estadoId,
				gestionId: gestion.gestionId,
				personaAnulaId: gestion.personaAnulaId,
				tcElaborador: gestion.tcElaborador,
				tcPersonaCrea: gestion.tcPersonaCrea,
				tcTipoBosque: gestion.tcTipoBosque,
				tcTipoGestion: gestion.tcTipoGestion,
				ttTipoPropietarioGestion: gestion.ttTipoPropietarioGestion
			}
		};

		const handleResponse = (res: any) => {
			res = res.data
			if (res.status === "OK") {
				dataContext.successToast("Anexo agregado exitosamente")
				let nuevoAnexo = res.data[0]
					setAnexoId(nuevoAnexo.anexoGestionId)
			}
			else {
				dataContext.errorToast(res.data.message)
			}
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			dataContext.errorToast("Error al agregar anexo. Intentelo de nuevo.")
		}

		gestionApi.agregarAnexo(anexo, handleResponse, handleError)
	}


	const getDescarga = (onResponse: (response: any) => void, onError: (error: AxiosError) => void) => {
		console.log(anexoId)
		gestionApi.getGestionFileById(anexoId, onResponse, onError);
	}

	const getFileId = (): number => {

		if (gestion.anexo) {
			for (var x = 0; x < gestion.anexo.length; x++) {
				let anexoActual = gestion.anexo[x]
				if (anexoActual && anexoActual.tcTipoAnexo.tipoAnexoId === numAnexo) {
					return anexoActual.anexoGestionId;
				}
			}
		}
		return -1;
	}

	const getFileIdCallback = useCallback(getFileId, [gestion, numAnexo])

	useEffect(() => {
		let fileId = getFileIdCallback()
		if (fileId !== -1) {
			setAnexoId(fileId)
			// setIsFileLoaded(true)
		}
	}, [getFileIdCallback])
	

	return (
		<UploadButton
			onFileLoad={fileApi.cargarArchivo}
			onFileDownload={getDescarga}
			onUploadSuccess={handleUploadSuccess}
			onUploadError={handleUploadError}
			isFileLoaded={anexoId !== -1}
		/>
	)
}
