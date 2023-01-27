import React, { useState, useEffect } from 'react'
import CustomMenuGroup from 'components/CustomMenu/CustomMenuGroup'
import CustomMenuItem from 'components/CustomMenu/CustomMenuItem'
import CodigoPerfil from 'dto/perfil/CodigoPerfil'

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function AprovechamientoMenu({
	selectedItem,
	handleClick,
	codigoPerfil
}: Props) {

	const [isGroupHidden, setIsGroupHidden] = useState(true)
	const [isNuevoHidden, setIsNuevoHidden] = useState(true)

	useEffect(() => {
		switch (codigoPerfil) {
			case CodigoPerfil.Elaborador:
			case CodigoPerfil.Solicitante:
				setIsGroupHidden(false)
				setIsNuevoHidden(false)
				break
			default:
				setIsGroupHidden(true)
				setIsNuevoHidden(true)
				break
		}
	}, [codigoPerfil])

	return (
		<CustomMenuGroup header="Aprov. Forestal" icon="tree" isHidden={isGroupHidden}>
			<CustomMenuItem
				label='Nuevo'
				id='licNuevo'
				icon="add"
				selectedItem={selectedItem}
				onClick={handleClick}
				isHidden={isNuevoHidden}
			/>
		</CustomMenuGroup>
	)
}
