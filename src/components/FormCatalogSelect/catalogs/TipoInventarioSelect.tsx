import TipoInventarioApi from 'api/catalogs/TipoInventarioApi'
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

const tipoInventarioApi = new TipoInventarioApi()

export default function TipoInventarioSelect({
	label="Tipo de inventario",
	name="tcTipoInventario",
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
			idName="tipoInventarioId"
			labelName="tipoInventarioDesc"
			fetchDataFunction={tipoInventarioApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
