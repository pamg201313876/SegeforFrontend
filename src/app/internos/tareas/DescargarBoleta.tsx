import React from 'react'
import { boletaCensoApi } from 'api/latifoliado/hasta90'
import Downloads, { DownloadRow } from 'components/Downloads'

type Props = {
	open: boolean,
	closeModal: () => void
	tarea: any
}

export default function DescargarBoleta({
	open,
	closeModal,
	tarea
}: Props) {

	const boletaDonwload : DownloadRow[] = [
        {
            name: "Boleta de inventario",
				downloadFunction: (onResponse: any, onError: any) =>
                boletaCensoApi.getFile(tarea.ttGestion.gestionId, "Boleta Inventario", onResponse, onError)
        }
    ]

	if (open) {
		return (
			<Downloads
				open={open}
				closeModal={closeModal}
				downloads={boletaDonwload}
			/>
		)
	}
	return null;
}
