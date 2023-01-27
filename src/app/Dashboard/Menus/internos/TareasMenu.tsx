import React, { useEffect, useState } from 'react'
import CustomMenuGroup from 'components/CustomMenu/CustomMenuGroup'
import CustomMenuItem from 'components/CustomMenu/CustomMenuItem'
import CodigoPerfil from 'dto/perfil/CodigoPerfil';

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function TareasMenu({
	selectedItem,
	handleClick,
	codigoPerfil
}: Props) {

	const [isGroupHidden, setIsGroupHidden] = useState(false);

	useEffect(() => {
		switch (codigoPerfil) {
			case CodigoPerfil.Elaborador:
			case CodigoPerfil.Solicitante:
				setIsGroupHidden(true)
				break;

			default:
				setIsGroupHidden(false)
				break;

		}
	}, [codigoPerfil])

	return (
		<CustomMenuGroup header="Tareas" icon="cog" isHidden={isGroupHidden}>
			<CustomMenuItem
				label='Asignadas'
				id='asignadas'
				icon="pencil alternate"
				selectedItem={selectedItem}
				onClick={handleClick}
			/>
			<CustomMenuItem
				label='Finalizadas'
				id='finalizadas'
				icon="check"
				selectedItem={selectedItem}
				onClick={handleClick}
			/>
		</CustomMenuGroup>
	)
}
