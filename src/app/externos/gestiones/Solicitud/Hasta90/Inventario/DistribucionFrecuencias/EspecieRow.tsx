import React from 'react'
import { Table } from 'semantic-ui-react'

type Props = {
	especieRow: any
}

export default function EspecieRow({
	especieRow
}: Props) {

	return (
		<>
			<Table.Row >
				<Table.Cell rowSpan={3}><b>{especieRow.nombre}</b></Table.Cell>
				<Table.Cell textAlign="center">N</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase10 !== 0 ? especieRow.numeroArboles.clase10 : ""}</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase20 !== 0 ? especieRow.numeroArboles.clase20 : ""}</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase30 !== 0 ? especieRow.numeroArboles.clase30 : ""}</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase40 !== 0 ? especieRow.numeroArboles.clase40 : ""}</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase50 !== 0 ? especieRow.numeroArboles.clase50 : ""}</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase60 !== 0 ? especieRow.numeroArboles.clase60 : ""}</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase70 !== 0 ? especieRow.numeroArboles.clase70 : ""}</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase80 !== 0 ? especieRow.numeroArboles.clase80 : ""}</Table.Cell>
				<Table.Cell>{especieRow.numeroArboles.clase90 !== 0 ? especieRow.numeroArboles.clase90 : ""}</Table.Cell>
				<Table.Cell positive>{especieRow.numeroArboles.total}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell textAlign="center">G</Table.Cell>
				<Table.Cell>{especieRow.ab.clase10 !== 0 ? especieRow.ab.clase10 : ""}</Table.Cell>
				<Table.Cell>{especieRow.ab.clase20 !== 0 ? especieRow.ab.clase20 : ""}</Table.Cell>
				<Table.Cell>{especieRow.ab.clase30 !== 0 ? especieRow.ab.clase30 : ""}</Table.Cell>
				<Table.Cell>{especieRow.ab.clase40 !== 0 ? especieRow.ab.clase40 : ""}</Table.Cell>
				<Table.Cell>{especieRow.ab.clase50 !== 0 ? especieRow.ab.clase50 : ""}</Table.Cell>
				<Table.Cell>{especieRow.ab.clase60 !== 0 ? especieRow.ab.clase60 : ""}</Table.Cell>
				<Table.Cell>{especieRow.ab.clase70 !== 0 ? especieRow.ab.clase70 : ""}</Table.Cell>
				<Table.Cell>{especieRow.ab.clase80 !== 0 ? especieRow.ab.clase80 : ""}</Table.Cell>
				<Table.Cell>{especieRow.ab.clase90 !== 0 ? especieRow.ab.clase90 : ""}</Table.Cell>
				<Table.Cell positive>{especieRow.ab.total}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell textAlign="center">V</Table.Cell>
				<Table.Cell>{especieRow.vol.clase10 !== 0 ? especieRow.vol.clase10 : ""}</Table.Cell>
				<Table.Cell>{especieRow.vol.clase20 !== 0 ? especieRow.vol.clase20 : ""}</Table.Cell>
				<Table.Cell>{especieRow.vol.clase30 !== 0 ? especieRow.vol.clase30 : ""}</Table.Cell>
				<Table.Cell>{especieRow.vol.clase40 !== 0 ? especieRow.vol.clase40 : ""}</Table.Cell>
				<Table.Cell>{especieRow.vol.clase50 !== 0 ? especieRow.vol.clase50 : ""}</Table.Cell>
				<Table.Cell>{especieRow.vol.clase60 !== 0 ? especieRow.vol.clase60 : ""}</Table.Cell>
				<Table.Cell>{especieRow.vol.clase70 !== 0 ? especieRow.vol.clase70 : ""}</Table.Cell>
				<Table.Cell>{especieRow.vol.clase80 !== 0 ? especieRow.vol.clase80 : ""}</Table.Cell>
				<Table.Cell>{especieRow.vol.clase90 !== 0 ? especieRow.vol.clase90 : ""}</Table.Cell>
				<Table.Cell positive>{especieRow.vol.total}</Table.Cell>
			</Table.Row>
		</>
	)
}
