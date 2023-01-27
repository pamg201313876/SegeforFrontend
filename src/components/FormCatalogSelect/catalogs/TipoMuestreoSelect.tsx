import TipoInventarioApi from 'api/catalogs/TipoInventarioApi'
import TipoMuestreoApi from 'api/catalogs/TipoMuestreoApi'
import React from 'react'
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	disabled?: boolean,
	onChange: (e: any, { name, value }: any) => void
	width?: SemanticWIDTHS
}

const tipoMuestreoApi = new TipoMuestreoApi()

export default function TipoMuestreoSelect({
	label="Tipo muestreo",
	name="tcTipoMuestreo",
	value,
	error,
	disabled,
	onChange,
	width
}: Props) {
	return (
		<FormCatalogDTOSelect
			disabled={disabled}
			label={label}
			name={name}
			error={error}
			idName="tipoMuestreoId"
			labelName="tipoMuestreoDesc"
			fetchDataFunction={tipoMuestreoApi.getList}
			value={value}
			width={width}
			onChange={onChange}
		/>
	)
}
