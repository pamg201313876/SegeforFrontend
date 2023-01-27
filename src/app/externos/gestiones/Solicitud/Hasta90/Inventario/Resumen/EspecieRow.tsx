import React from 'react'
import { Table } from 'semantic-ui-react'

type Props = {
	especieCenso: any
}


export default function EspecieRow({
	especieCenso
}: Props) {
	return (
		<Table.Row textAlign="center" >
			<Table.Cell>{especieCenso.numero}</Table.Cell>
			<Table.Cell>{especieCenso.codigo}</Table.Cell>
			<Table.Cell>{especieCenso.nombreCientifico}</Table.Cell>
			<Table.Cell>{especieCenso.numeroArboles}</Table.Cell>
			<Table.Cell>{especieCenso.areaBasal}</Table.Cell>
			<Table.Cell>{especieCenso.volumen}</Table.Cell>
		</Table.Row>
	)
}
