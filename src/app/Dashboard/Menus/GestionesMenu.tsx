import CodigoPerfil from 'dto/perfil/CodigoPerfil'
import React from 'react'
import { Header, Menu } from 'semantic-ui-react'
import MisGestionesMenu from './elaborador/MisGestionesMenu'
import EnmiendasMenu from './internos/secretaria/EnmiendasMenu'
import ResolucionesMenu from './internos/secretaria/ResolucionesMenu'
import SolicitudMenu from './internos/secretaria/SolicitudMenu'
import TareasMenu from './internos/TareasMenu'

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function GestionesMenu({
	selectedItem,
	handleClick,
	codigoPerfil
}: Props) {
	return (
		<>
			<Menu.Item active>
			  <Header size="small" inverted>Gestiones</Header>	
			</Menu.Item>
			<MisGestionesMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil} />
			<TareasMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil}/>
			<SolicitudMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil}/>
			<EnmiendasMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil}/>
			<ResolucionesMenu selectedItem={selectedItem} handleClick={handleClick} codigoPerfil={codigoPerfil}/>
		</>
	)
}
