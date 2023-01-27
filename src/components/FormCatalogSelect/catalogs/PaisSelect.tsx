import PaisApi from 'api/catalogs/PaisApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string,
	name?: string,
	error?: string | null
	value: any,
	onChange: (e: any, { name, value }: any) => void
}

const paisApi = new PaisApi()

export default function PaisSelect({
	label="Pais",
	name="tcPais",
	value,
	error,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			name={name}
			error={error}
			idName="paisId"
			labelName="paisDesc"
			fetchDataFunction={paisApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
