import TipoBosqueApi from 'api/catalogs/TipoBosqueApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const tipoBosqueApi = new TipoBosqueApi()

export default function TipoBosqueSelect({
	label="Tipo bosque",
	name="tcTipoBosque",
	value,
	error,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="tipoBosqueId"
			labelName="tipoBosqueDesc"
			fetchDataFunction={tipoBosqueApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
