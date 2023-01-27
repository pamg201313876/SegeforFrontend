import TipoPropietarioApi from 'api/catalogs/TipoPropietarioApi'
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

const tipoPropetarioApi = new TipoPropietarioApi()

export default function TipoPropietarioSelect({
	label="TipoPropietario",
	name="tcTipoPropietario",
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
			idName="tipoPropietarioId"
			labelName="tipoPropietarioDesc"
			fetchDataFunction={tipoPropetarioApi.getList}
			value={value}
			onChange={onChange}
			width={width}
		/>
	)
}
