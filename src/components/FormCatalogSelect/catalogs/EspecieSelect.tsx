import EspecieApi from 'api/catalogs/EspecieApi'
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

const especieApi = new EspecieApi()

export default function EspecieSelect({
	label="Especie",
	name="tcEspecie",
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
			idName="especieId"
			labelName="nombreCientifico"
			fetchDataFunction={especieApi.getList}
			placeholder={"Seleccione especie"}
			value={value}
			onChange={onChange}
		/>
	)
}
