import { AxiosError } from 'axios'
import FormModal from 'components/FormModal'
import InformationTable, { InformationRow } from 'components/InformationTable'
import React, { useEffect, useState } from 'react'
import DownloadButton from './DownloadButton'

export type DownloadRow = {
	name: string,
	downloadFunction: (onResponse: () => void, onError: (error: AxiosError) => void) => void
}


type Props = {
	open: boolean,
	closeModal: () => void,
	downloads: DownloadRow[],
	header?: string
}

export default function Downloads({
	open,
	closeModal,
	downloads,
	header = "Documentos a descargar"
}: Props) {

	
	const [rows, setRows] = useState<InformationRow[]>([])

	useEffect(() => {

		let rowList : InformationRow[] = []

		for(let d of downloads){
			let informationRow : InformationRow = {
				header: d.name,
				value: <DownloadButton downloadFunction={d.downloadFunction} />
			}
			rowList.push(informationRow)
		}

		setRows(rowList)

	}, [downloads])

	return (
		<FormModal 
			size="small" 
			header={header} 
			open={open} 
			cancelLabel="Salir" 
			closeModal={closeModal} 
			noConfirmButton>
			<InformationTable
				collapseRight
				rows={rows}
			/>
		</FormModal>
	)
}
