import CodigoPerfil from 'dto/perfil/CodigoPerfil'
import React from 'react'
import GeneralesMenu from './GeneralesMenu'
import GestionesMenu from './GestionesMenu'
import LicenciasMenu from './LicenciasMenu'

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function UserMenu({
	selectedItem,
	handleClick,
	codigoPerfil
}: Props) {
	return (
		<>
			<GeneralesMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil}/>
			<LicenciasMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil} />
			<GestionesMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil} />
		</>
	)
}
