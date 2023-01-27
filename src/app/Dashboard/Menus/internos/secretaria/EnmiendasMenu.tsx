import CustomMenuGroup from 'components/CustomMenu/CustomMenuGroup'
import CustomMenuItem from 'components/CustomMenu/CustomMenuItem'
import CodigoPerfil from 'dto/perfil/CodigoPerfil'
import React, { useEffect, useState } from 'react'

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function EnmiendasMenu({
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
		<CustomMenuGroup header="Enmiendas" icon="th" isHidden={isGroupHidden}>
			<CustomMenuItem
					label='Recibir enmiendas'
					id='recibirenmiendas'
					icon="sliders"
					selectedItem={selectedItem}
					onClick={handleClick}
				/>
		</CustomMenuGroup>
	)
}
