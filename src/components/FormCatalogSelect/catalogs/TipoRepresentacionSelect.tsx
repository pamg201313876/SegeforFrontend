import TipoInventarioApi from 'api/catalogs/TipoInventarioApi'
import TipoRepresentacionApi from 'api/catalogs/TipoRepresentacion'
import React from 'react'
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic'
import FormCatalogDTOSelect from '../FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	width?: SemanticWIDTHS
	disabled?: boolean,
	onChange: (e: any, { name, value }: any) => void
}

const tipoRepresentacion = new TipoRepresentacionApi()

export default function TipoRepresentacionSelect({
	label="Documento de representacion",
	name="tcTipoRepresentacion",
	value,
	width,
	error,
	disabled,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			disabled={disabled}
			label={label}
			name={name}
			error={error}
			width={width}
			idName="tipoRepresentacionId"
			labelName="tipoRepresentacionDesc"
			fetchDataFunction={tipoRepresentacion.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
