import SexoApi from 'api/catalogs/SexoApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string,
	name?: string,
	error?: string | null
	value: any,
	disabled?: boolean,
	onChange: (e: any, { name, value }: any) => void
}

const sexoApi = new SexoApi()

export default function SexoSelect({
	label="Sexo",
	name="tcSexo",
	error,
	value,
	disabled,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			disabled={disabled}
			label={label}
			name={name}
			error={error}
			idName="sexoId"
			labelName="sexoDesc"
			fetchDataFunction={sexoApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
