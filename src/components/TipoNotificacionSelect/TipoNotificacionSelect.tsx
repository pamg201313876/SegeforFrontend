import TipoNotificacion from 'api/catalogs/TipoNotificacion'
import React from 'react'
import FormCatalogDTOSelect from 'components/FormCatalogSelect/FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void
}

const disenioCensoApi = new TipoNotificacion()

export default function TipoNotificacionSelect({
	label="Diseño de censo",
	name="tcTipoNotificacion",
	error,
	value,
	onChange
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="tipoNotificacionId"
			labelName="tipoNotificacionDesc"
			fetchDataFunction={disenioCensoApi.getList}
			value={value}
			onChange={onChange}
		/>
	)
}
