import TareaListadoAsignarUsuario from 'api/catalogs/TareaListadoAsignarUsuario'
import React from 'react'
import FormCatalogDTOSelect from 'components/FormCatalogSelect/FormCatalogDTOSelect'

type Props = {
	label?: string
	name?: string
	error?: string | null
	value: any
	onChange: (e: any, { name, value }: any) => void,
	perfilId: number,
	subregionId: number,
	disabled?: boolean 
}

export default function PersonaAsignarTareaSelect({
	label="Selección Persona",
	name="tcPersona",
	error,
	value,
	onChange,
	perfilId,
	subregionId,
	disabled
}: Props) {
	return (
		<FormCatalogDTOSelect
			label={label}
			error={error}
			name={name}
			idName="personaId"
			labelName="personaDesc"
			fetchDataFunction={ new TareaListadoAsignarUsuario(perfilId,subregionId).getListAsignar}
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
	)
}
