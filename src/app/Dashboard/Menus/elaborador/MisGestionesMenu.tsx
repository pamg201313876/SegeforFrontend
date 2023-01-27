import React, { useEffect, useState } from 'react'
import CustomMenuGroup from 'components/CustomMenu/CustomMenuGroup'
import CustomMenuItem from 'components/CustomMenu/CustomMenuItem'
import CodigoPerfil from 'dto/perfil/CodigoPerfil'

type Props = {
	selectedItem: string
	handleClick: any,
	codigoPerfil: CodigoPerfil
}

export default function MisGestionesMenu({
	selectedItem,
	handleClick,
	codigoPerfil
}: Props) {

	const [isGroupHidden, setIsGroupHidden] = useState(true)
	const [isBandejaHidden, setIsBandejaHidden] = useState(true)

	useEffect(() => {
		switch (codigoPerfil) {
			case CodigoPerfil.Solicitante:
				setIsGroupHidden(false)
				setIsBandejaHidden(true)
				break;

			case CodigoPerfil.Elaborador:
				setIsGroupHidden(false)
				setIsBandejaHidden(false)
				break;

			default:
				setIsGroupHidden(true)
				setIsBandejaHidden(true)
				break;

		}
	}, [codigoPerfil])

	return (
		<CustomMenuGroup header="Gestiones" icon="inbox" isHidden={isGroupHidden}>
			<CustomMenuItem
				label='Mis Gestiones'
				id='misgestiones'
				icon="sort amount down"
				selectedItem={selectedItem}
				onClick={handleClick}
			/>
			<CustomMenuItem
				label='Bandeja de Solicitudes'
				id='bandejasolicitudes'
				icon="inbox"
				selectedItem={selectedItem}
				onClick={handleClick}
				isHidden={isBandejaHidden}
			/>
			<CustomMenuItem
				label='Solicitudes Aceptadas'
				id='solicitudesok'
				icon="check square"
				selectedItem={selectedItem}
				onClick={handleClick}
				isHidden={isBandejaHidden}
			/>
			<CustomMenuItem
				label='Solicitudes Finalizadas'
				id='solicitudesfinish'
				icon="flag checkered"
				selectedItem={selectedItem}
				onClick={handleClick}
				isHidden={isBandejaHidden}
			/>
		</CustomMenuGroup>
	)
}
