import CodigoPerfil from 'dto/perfil/CodigoPerfil'
import React, { useState, useEffect } from 'react'
import CustomMenuGroup from 'components/CustomMenu/CustomMenuGroup'
import CustomMenuItem from 'components/CustomMenu/CustomMenuItem'

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function SolicitudMenu({
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
		<CustomMenuGroup header="Solicitudes" icon="inbox" isHidden={isGroupHidden}>
			<CustomMenuItem
				label='Ingresar licencia'
				id='ingresarLicencia'
				icon="add"
				selectedItem={selectedItem}
				onClick={handleClick}
			/>
			<CustomMenuItem
				label='Licencias Recibidas'
				id='licenciasRecibidas'
				icon="inbox"
				selectedItem={selectedItem}
				onClick={handleClick}
			/>
			<CustomMenuItem
				label='Suspender trámite'
				id='suspenderTramite'
				icon="cancel"
				selectedItem={selectedItem}
				onClick={handleClick}
			/>
		</CustomMenuGroup>
	)
}
