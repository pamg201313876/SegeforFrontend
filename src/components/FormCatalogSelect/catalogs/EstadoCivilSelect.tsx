import EstadoCivilApi from 'api/catalogs/EstadoCivilApi'
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

const estadoCivilApi = new EstadoCivilApi()

export default function EstadoCivilSelect({
	label="Estado civil",
	name="tcEstadoCivil",
	value,
	error,
	disabled,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			disabled={disabled}
			label={label}
			error={error}
			name={name}
			idName="estadoCivilId"
			labelName="estadoCivilDesc"
			fetchDataFunction={estadoCivilApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
