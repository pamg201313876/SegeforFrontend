import EstadoBosqueApi from 'api/catalogs/EstadoBosqueApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const estadoBosqueApi = new EstadoBosqueApi()

export default function EstadoBosqueSelect({
	label="Estado bosque",
	name="tcEstadoBosque",
	value,
	error,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="estadoBosqueId"
			labelName="estadoBosqueDesc"
			fetchDataFunction={estadoBosqueApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
