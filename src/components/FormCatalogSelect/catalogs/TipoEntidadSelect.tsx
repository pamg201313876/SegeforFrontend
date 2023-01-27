import TipoEntidadApi from 'api/catalogs/TipoEntidadApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	disabled?: boolean,
	onChange: (e: any, { name, value }: any) => void
}

const tipoPropetarioApi = new TipoEntidadApi()

export default function TipoEntidadSelect({
	label="TipoEntidad",
	name="tcTipoEntidad",
	value,
	error,
	disabled,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			disabled={disabled}
			label={label}
			name={name}
			error={error}
			idName="tipoEntidadId"
			labelName="tipoEntidadDesc"
			fetchDataFunction={tipoPropetarioApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
