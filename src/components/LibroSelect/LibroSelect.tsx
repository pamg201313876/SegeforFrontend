import LibroApi from 'api/catalogs/Libros'
import React from 'react'
import FormCatalogDTOSelect from 'components/FormCatalogSelect/FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const disenioCensoApi = new LibroApi()

export default function CulturaSelect({
	label="Diseño de censo",
	name="tcLibro",
	error,
	value,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="libroId"
			labelName="libroDesc"
			fetchDataFunction={disenioCensoApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
