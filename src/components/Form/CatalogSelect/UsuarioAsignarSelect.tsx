import React from 'react'
import CatalogSelect from './CatalogSelect'
import {tareaApi} from 'api'
import { StrictFormFieldProps } from 'semantic-ui-react'

export enum TipoUsuario {
    JURIDICO = 6,
    TECNICO = 7
}

type Props = {
	subregionId: number,
    tipoUsuario: TipoUsuario,
	name: string,
	label: string
} & StrictFormFieldProps


export default function UsuarioAsignarSelect({
	subregionId,
    tipoUsuario,
	name,
	label,
	...restProps
}: Props) {

    const getList = (onResponse: (values: any[]) => void, onError: (error: any) => void) => {
		tareaApi.getUsuarioAsignarList(subregionId, tipoUsuario, onResponse, onError)
    }

	return (
		<CatalogSelect
			label={label}
			name={name}
			idName="personaId"
			descName="personaDesc"
			fetchDataFunction={getList}
			{...restProps}
		/>
	)
}
