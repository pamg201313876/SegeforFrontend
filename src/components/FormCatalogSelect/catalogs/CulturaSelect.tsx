import CulturaApi from 'api/catalogs/CulturaApi'
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

const culturaApi = new CulturaApi()

export default function CulturaSelect({
	label="Cultura",
	name="tcCultura",
	error,
	value,
	disabled,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			disabled={disabled}
			label={label}
			error={error}
			name={name}
			idName="culturaId"
			labelName="culturaDesc"
			fetchDataFunction={culturaApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
