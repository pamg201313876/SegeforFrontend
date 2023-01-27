import React from 'react'
import { Table } from 'semantic-ui-react'

type Props = {
	especieResumen: any
}

export default function EspecieResumenRow({
	especieResumen
}: Props) {

	return (
		<Table.Row >
			<Table.Cell textAlign="center" >{especieResumen.tcEspecie.nombreCientifico}</Table.Cell>
			<Table.Cell textAlign="center">{especieResumen.tcEspecie.especieDesc}</Table.Cell>
			<Table.Cell textAlign="center">{especieResumen.numeroArboles}</Table.Cell>
			<Table.Cell textAlign="center">{especieResumen.areaBasal}</Table.Cell>
			<Table.Cell textAlign="center">{especieResumen.volumen}</Table.Cell>
		</Table.Row>
	)
}
