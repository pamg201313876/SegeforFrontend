import GestionApi from 'api/GestionApi'
import { AxiosError } from 'axios'
import Downloads, { DownloadRow } from 'components/Downloads'
import React, { useEffect, useState } from 'react'

type Props = {
	open: boolean,
	closeModal: () => void,
	gestion: any
}

const gestionApi = new GestionApi()

export default function DescargaAnexos({
	open,
	closeModal,
	gestion
}: Props) {

	const [anexos, setAnexos] = useState<DownloadRow[]>([])

	const downloadAnexo = (anexoId: string, nombre: string,  onResponse: any, onError: any) => {
		gestionApi.getGestionFileById(Number(anexoId), onResponse, onError, nombre);
	}

	useEffect(() => {
		if (gestion != null) {
			const handleResponse = (res: any) => {
				if (res.status === "OK") {
					let anexos: DownloadRow[] = []
					for (let anexo of res.data) {
						let row: DownloadRow = {
							name: anexo.tcTipoAnexo.tipoAnexoDesc,
							downloadFunction: (onResponse: any, onError: any) => downloadAnexo(anexo.anexoGestionId, anexo.tcTipoAnexo.tipoAnexoDesc, onResponse, onError)
						}
						anexos.push(row)
					}
					setAnexos(anexos)
				}
				else {
					console.error(res.message)
				}
			}
	
			const handleError = (error: AxiosError) => {
				console.error(error)
			}
	
			gestionApi.AnexosLista(gestion.gestionId, handleResponse, handleError)
		}
	}, [gestion])


	if (open && gestion != null) {
		return (
			<Downloads
				header="Descargar anexos"
				open={open}
				closeModal={closeModal}
				downloads={anexos}
			/>
		)
	}

	return null;
}
