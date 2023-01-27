import IdiomaApi from 'api/catalogs/IdiomaApi'
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

const idiomaApi = new IdiomaApi()

export default function IdiomaSelect({
	label="Idioma",
	name="tcIdioma",
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
			idName="idiomaId"
			labelName="idiomaDesc"
			fetchDataFunction={idiomaApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
