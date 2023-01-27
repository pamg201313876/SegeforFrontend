import React, { useState, useEffect } from 'react'
import CustomMenuGroup from 'components/CustomMenu/CustomMenuGroup'
import CustomMenuItem from 'components/CustomMenu/CustomMenuItem'
import CodigoPerfil from 'dto/perfil/CodigoPerfil'

type Props = {
	selectedItem: string
	handleClick: any
	codigoPerfil: CodigoPerfil
}

export default function CatalogosMenu({
	selectedItem,
	handleClick,
	codigoPerfil
}: Props) {

	const [isHidden, setHidden] = useState(false)

	useEffect(() => {
		if(codigoPerfil === CodigoPerfil.Elaborador){
			setHidden(false)
		}
		else{
			setHidden(true)
		}
	}, [codigoPerfil])

	return (
		<CustomMenuGroup header="Catálogos" icon="grid layout" isHidden={isHidden}>
			<CustomMenuItem 
				label='Mis fincas'
				id='misFincas'
				icon="home"
				selectedItem={selectedItem}
				onClick={handleClick}
			/>
		</CustomMenuGroup>
	)
}
