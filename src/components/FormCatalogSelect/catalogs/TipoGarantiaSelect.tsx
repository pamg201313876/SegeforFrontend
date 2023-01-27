import TipoGarantiaApi from 'api/catalogs/TipoGarantiaApi'
import React from 'react'
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	width?: SemanticWIDTHS,
	onChange: (e: any, { name, value }: any) => void
}

const tipoGarantiaApi = new TipoGarantiaApi()

export default function TipoGarantiaSelect({
	label="Tipo garantía",
	name="tcTipoGarantia",
	value,
	error,
	width,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			width={width}
			idName="tipoGarantiaId"
			labelName="tipoGarantiaDesc"
			fetchDataFunction={tipoGarantiaApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
