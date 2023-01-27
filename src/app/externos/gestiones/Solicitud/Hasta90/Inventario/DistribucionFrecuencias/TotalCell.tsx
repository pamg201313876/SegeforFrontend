import React from 'react'
import { Table } from 'semantic-ui-react'

type Props = {
	verticalAlign?: "top" | "middle" | "bottom"
	textAlign?: "center" | "left" | "right"
	children: any
}

export default function TotalCell({
	verticalAlign,
	textAlign,
	children
}: Props) {
	return (
		<Table.Cell verticalAlign={verticalAlign} textAlign={textAlign}  >
			<b>
				{children}
			</b>
		</Table.Cell>
	)
}
