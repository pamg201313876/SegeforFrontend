import React from 'react'
import { Icon, Menu, SemanticICONS } from 'semantic-ui-react'

type Props = {
	id: string
	label: string
	icon: SemanticICONS
	selectedItem: string
	onClick: any
	isHidden?: boolean
}

export default function CustomMenuItem({
	id,
	label,
	icon,
	selectedItem,
	onClick,
	isHidden = false
}: Props) {

	if (!isHidden) {
		return (
			<Menu.Item
				name={id}
				active={selectedItem === id}
				onClick={onClick}
			>
				<Icon name={icon} />
				{label}
			</Menu.Item>
		)
	}

	else{
		return null
	}

}
