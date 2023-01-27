import OcupacionApi from 'api/catalogs/OcupacionApi'
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

const ocupacionApi = new OcupacionApi()

export default function OcupacionSelect({
	label="Ocupacion",
	name="tcOcupacion",
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
			idName="ocupacionId"
			labelName="ocupacionDesc"
			fetchDataFunction={ocupacionApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
