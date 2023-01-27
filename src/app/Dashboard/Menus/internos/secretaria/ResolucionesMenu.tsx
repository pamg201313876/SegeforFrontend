import React, { useState, useEffect } from 'react'
import CustomMenuGroup from 'components/CustomMenu/CustomMenuGroup'
import CustomMenuItem from 'components/CustomMenu/CustomMenuItem'
import CodigoPerfil from 'dto/perfil/CodigoPerfil'

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function ResolucionesMenu({
	selectedItem,
	handleClick,
	codigoPerfil
}: Props) {

	const [isGroupHidden, setIsGroupHidden] = useState(true)

	useEffect(() => {
		switch (codigoPerfil) {
			case CodigoPerfil.Secretaria:
				setIsGroupHidden(false)
				break;

			default:
				setIsGroupHidden(true)
				break;

		}
	}, [codigoPerfil])

	return (
		<CustomMenuGroup header="Resoluciones" icon="info" isHidden={isGroupHidden}>
			<CustomMenuItem
					label='Lista'
					id='lista'
					icon="tasks"
					selectedItem={selectedItem}
					onClick={handleClick}
				/>
		</CustomMenuGroup>
	)
}
