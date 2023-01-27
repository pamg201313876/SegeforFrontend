import SistemaRepoblacionApi from 'api/catalogs/SistemaRepoblacionApi'
import React from 'react'
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	isUpward?: boolean
	width?: SemanticWIDTHS
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const sistemaRepoblacionApi = new SistemaRepoblacionApi()

export default function SistemaRepoblacionSelect({
	label="Sistema repoblación",
	name="tcSistemaRepoblacion",
	value,
	error,
	isUpward,
	width,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			isUpward={isUpward}
			width={width}
			idName="sistemaRepoblacionId"
			labelName="sistemaRepoblacionDesc"
			fetchDataFunction={sistemaRepoblacionApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
