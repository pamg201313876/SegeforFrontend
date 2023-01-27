import FincaApi from 'api/FincaApi'
import PageResponse from 'api/types/PageResponse'
import SearchItem from 'api/types/SearchItem'
import Sort from 'api/types/Sort'
import { AxiosError } from 'axios'
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable'
import DepartamentoMunicipioSelect from 'components/DepartamentoMunicipioSelect'
import SimplePaginationTable from 'components/PaginationTable/SimplePaginationTable'
import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'


const fincaApi = new FincaApi()

const columns: CTColumn[] = [
	{
		header: "Finca",
		name: "fincaDesc"
	},
	{
		header: "Aldea/Caserío/Cantón",
		name: "direccion"
	},
	{
		header: "GTM X",
		name: "gtmX"
	},
	{
		header: "GTM Y",
		name: "gtmY"
	},
	{
		header: "Área",
		name: "area"
	}
]

const buttons: CTButton[] = [
	{
		id: "agregar",
		icon: "add"
	}
]

type Props = {
	onFincaAdded: (finca: any) => void
}

export default function BuscarFincas({
	onFincaAdded
}: Props) {

	const [reload, setReload] = useState<boolean>(false)
	const [municipio, setMunicipio] = useState<any>()

	const handleChange = (_e: any, { object }: any) => {
		setMunicipio(object)
	}

	const handleButtonClick = (buttonResponse: CTButtonResponse) => {
		onFincaAdded(buttonResponse.rowData)
	}

	const fetchFincas = (
		pageNumber: number,
		size: number,
		onResponse: (pageResponse: PageResponse) => void,
		onError: (error: AxiosError) => void,
		search?: SearchItem[],
		sort?: Sort[]
	) => {
		if (municipio != null && municipio.municipioId != null) {
			fincaApi.fincasMunicipio(municipio.municipioId, pageNumber, size, onResponse, onError, search, sort)
		}
	}


	return (
		<Form>
			<Form.Group>
				<DepartamentoMunicipioSelect
					municipioValue={municipio}
					onChange={handleChange}
				/>
			</Form.Group>
			<SimplePaginationTable
				columns={columns}
				buttons={buttons}
				reload={reload}
				setReload={setReload}
				fetchDataFunction={fetchFincas}
				onButtonClick={handleButtonClick}
				noAddButton
			/>
		</Form>
	)
}
