import SubtipoBosqueApi from 'api/catalogs/SubtipoBosqueApi'
import React from 'react'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const subtipoBosqueApi = new SubtipoBosqueApi()

export default function SubTipoBosqueSelect({
	label="Subtipo bosque",
	name="tcSubtipoBosque",
	value,
	error,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="subTipoBosqueId"
			labelName="subTipoBosqueDesc"
			fetchDataFunction={subtipoBosqueApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
