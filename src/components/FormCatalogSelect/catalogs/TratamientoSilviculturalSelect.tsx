import TratamientoSilviculturalApi from 'api/catalogs/TratamientoSilviculturalApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const tratamientoSilviculturalApi = new TratamientoSilviculturalApi()

export default function CulturaSelect({
	label="Tratamiento silvicultural",
	name="tcTratamientoSilvicultural",
	error,
	value,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="tratamientoSilviculturalId"
			labelName="tratamientoSilviculturalDesc"
			fetchDataFunction={tratamientoSilviculturalApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
