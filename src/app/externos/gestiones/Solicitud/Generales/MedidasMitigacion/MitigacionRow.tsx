import React from 'react'
import { Radio, Table } from 'semantic-ui-react'
import Medida from './Medida'

type Props = {
	medida: Medida,
	setMedida: Function
}

export default function MitigacionRow({
	medida,
	setMedida
}: Props) {

	const handleCheckChange = (value: boolean) => {
		setMedida({
			name: medida.name,
			value: value
		})
	}


	return (
		<Table.Row>
			<Table.Cell>{medida.name}</Table.Cell>
			<Table.Cell textAlign="center"><Radio checked={medida.value} onChange={() => handleCheckChange(true)} /></Table.Cell>
			<Table.Cell textAlign="center"><Radio checked={!medida.value} onChange={() => handleCheckChange(false)} /></Table.Cell>
		</Table.Row>
	)
}
