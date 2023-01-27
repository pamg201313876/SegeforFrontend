import DisenioCensoApi from 'api/catalogs/DisenioCensoApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const disenioCensoApi = new DisenioCensoApi()

export default function DisenioCensoSelect({
	label="Diseño de censo",
	name="tcDisenioCenso",
	error,
	value,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="disenioCensoId"
			labelName="disenioCensoDesc"
			fetchDataFunction={disenioCensoApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
