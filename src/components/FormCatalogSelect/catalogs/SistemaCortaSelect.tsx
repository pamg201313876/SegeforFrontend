import SistemaCortaApi from 'api/catalogs/SistemaCortaApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const sistemaCortaApi = new SistemaCortaApi()

export default function CulturaSelect({
	label="Sistema silvicultural",
	name="tcSistemaCorta",
	error,
	value,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="sistemaCortaId"
			labelName="sistemaCortaDesc"
			fetchDataFunction={sistemaCortaApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
