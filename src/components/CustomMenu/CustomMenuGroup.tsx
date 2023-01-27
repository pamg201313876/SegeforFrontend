import React, { useState, ReactNode } from 'react'
import { Accordion, Icon, Menu } from 'semantic-ui-react'
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic'

type Props = {
	header: string,
	icon: SemanticICONS,
	isHidden?: boolean
	children: ReactNode
}

export default function CustomMenuGroup({
	header,
	icon,
	isHidden = false,
	children
}: Props) {

	const [active, setActive] = useState(true)

	if (!isHidden) {
		return (
			<Menu.Item>
				<Accordion.Title onClick={() => setActive(!active)} icon >
					<Icon name={icon} style={{ marginRight: "8px" }} />
					{header}
				</Accordion.Title>
				<Accordion.Content active={active}>
					<Menu.Menu>
						{children}
					</Menu.Menu>
				</Accordion.Content>
			</Menu.Item>
		)
	}

	else{
		return null
	}

}
