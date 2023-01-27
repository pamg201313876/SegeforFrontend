import React, { useState } from 'react'
import FincaApi from 'api/FincaApi'
import { CTButton, CTColumn, CTButtonResponse } from 'components/CustomTable'
import PaginationTable from 'components/PaginationTable/SimplePaginationTable';
import EdicionFinca from './EdicionFinca';

const columns: CTColumn[] = [
	{
		header: "Finca",
		name: "tcFinca.fincaDesc"
	},
	{
		header: "Municipio",
		name: "tcFinca.tcMunicipio.municipioDesc"
	},
	{
		header: "Departamento",
		name: "tcFinca.tcMunicipio.tcDepartamento.departamentoDesc"
	},
	{
		header: "Aldea/Caserío/Cantón",
		name: "tcFinca.direccion"
	},
	{
		header: "GTM X",
		name: "tcFinca.gtmX"
	},
	{
		header: "GTM Y",
		name: "tcFinca.gtmY"
	},
	{
		header: "Documento",
		name: "tcFinca.tcTipoPropiedad.tipoPropiedadDesc"
	},
	{
		header: "No. ",
		name: "tcFinca.numeroDocumento"
	},
	{
		header: "Activo",
		name: "estadoId",
		isBool: true
	}
]
const buttons: CTButton[] = [
	{
		id: "editar",
		icon: "edit",
		color: "green"
	}
]

let api = new FincaApi()

export default function MisFincas() {

	const [refresh, setRefresh] = useState<boolean>(true)
	const [open, setOpen] = useState<boolean>(false)
	const [selectedFinca, setSelectedFinca] = useState<any>(null)

	const onButtonClick = (buttonResponse: CTButtonResponse) => {
		let fincaData = buttonResponse?.rowData?.tcFinca
		if (fincaData != null) {
			setSelectedFinca(fincaData)
			setOpen(true)
		}
		else{
			console.error("No tiene datos de finca")
		}
	}

	const closeModal = () => {
		setSelectedFinca(null)
		setOpen(false)
		setRefresh(true)
	}

	return (
		<>
			<PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				columns={columns}
				buttons={buttons}
				onButtonClick={onButtonClick}
				fetchDataFunction={api.misFincas}
			/>
			{selectedFinca != null ? <EdicionFinca open={open} closeModal={closeModal} fincaData={selectedFinca} /> : null}
		</>
	)
}
