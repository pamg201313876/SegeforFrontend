import CodigoPerfil from 'dto/perfil/CodigoPerfil'
import React, { useEffect, useState } from 'react'
import { Header, Menu } from 'semantic-ui-react'
import AprovechamientoMenu from './elaborador/AprovechamientoMenu'

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function LicenciasMenu({
	selectedItem,
	handleClick,
	codigoPerfil
}: Props) {

	const [isHidden, setIsHidden] = useState(false)

	useEffect(() => {
		switch (codigoPerfil) {
			case CodigoPerfil.Elaborador:
			case CodigoPerfil.Solicitante:
				setIsHidden(false)
				break
			default:
				setIsHidden(true)
				break
		}
	}, [codigoPerfil])

	if (!isHidden) {
		return (
			<>
				<Menu.Item active>
					<Header size="small" inverted>Licencias</Header>
				</Menu.Item>
				<AprovechamientoMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil} />
			</>
		)
	}

	else {
		return null
	}


}
