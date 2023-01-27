import React from 'react'
import { Table } from 'semantic-ui-react'
import { EspecieEstratoIc } from '../Planificacion'

type Props = {
	especie: any
	especieEstratoIc: EspecieEstratoIc
}

export default function EspecieRemantesRow({
	especie,
	especieEstratoIc
}: Props) {

	return (
		<Table.Row >
			<Table.Cell textAlign="center" >{especie.tcEspecie.nombreCientifico}</Table.Cell>
			<Table.Cell textAlign="center">{especie.n.debajoFuturaCosecha}</Table.Cell>
			<Table.Cell textAlign="center">{especie.n.futuraCosecha}</Table.Cell>
			<Table.Cell textAlign="center">{especie.n.decrepitos}</Table.Cell>
			<Table.Cell textAlign="center">{especie.n.semilleros}</Table.Cell>
			<Table.Cell textAlign="center">{especie.n.proteccion}</Table.Cell>
		</Table.Row>
	)
}
