import React from 'react'
import { Header, Table } from 'semantic-ui-react'
import TotalCell from './TotalCell'

type Props = {
	totalRow: any
}

export default function TotalRow({
	totalRow
}: Props) {
	return (
		<>
			<Table.Row >
				<Table.Cell verticalAlign="middle" textAlign="center" rowSpan={4} colSpan={3}><Header>Total: </Header></Table.Cell>
			</Table.Row>
			<Table.Row positive>
				<TotalCell textAlign="center">N</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase10 !== 0 ? totalRow.numeroArboles.clase10 : ""}</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase20 !== 0 ? totalRow.numeroArboles.clase20 : ""}</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase30 !== 0 ? totalRow.numeroArboles.clase30 : ""}</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase40 !== 0 ? totalRow.numeroArboles.clase40 : ""}</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase50 !== 0 ? totalRow.numeroArboles.clase50 : ""}</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase60 !== 0 ? totalRow.numeroArboles.clase60 : ""}</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase70 !== 0 ? totalRow.numeroArboles.clase70 : ""}</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase80 !== 0 ? totalRow.numeroArboles.clase80 : ""}</TotalCell>
				<TotalCell>{totalRow.numeroArboles.clase90 !== 0 ? totalRow.numeroArboles.clase90 : ""}</TotalCell>
				<TotalCell   >{totalRow.numeroArboles.total}</TotalCell>
			</Table.Row>
			<Table.Row positive>
				<TotalCell textAlign="center">G</TotalCell>
				<TotalCell>{totalRow.ab.clase10 !== 0 ? totalRow.ab.clase10 : ""}</TotalCell>
				<TotalCell>{totalRow.ab.clase20 !== 0 ? totalRow.ab.clase20 : ""}</TotalCell>
				<TotalCell>{totalRow.ab.clase30 !== 0 ? totalRow.ab.clase30 : ""}</TotalCell>
				<TotalCell>{totalRow.ab.clase40 !== 0 ? totalRow.ab.clase40 : ""}</TotalCell>
				<TotalCell>{totalRow.ab.clase50 !== 0 ? totalRow.ab.clase50 : ""}</TotalCell>
				<TotalCell>{totalRow.ab.clase60 !== 0 ? totalRow.ab.clase60 : ""}</TotalCell>
				<TotalCell>{totalRow.ab.clase70 !== 0 ? totalRow.ab.clase70 : ""}</TotalCell>
				<TotalCell>{totalRow.ab.clase80 !== 0 ? totalRow.ab.clase80 : ""}</TotalCell>
				<TotalCell>{totalRow.ab.clase90 !== 0 ? totalRow.ab.clase90 : ""}</TotalCell>
				<TotalCell   >{totalRow.ab.total}</TotalCell>
			</Table.Row>
			<Table.Row positive>
				<TotalCell textAlign="center">V</TotalCell>
				<TotalCell>{totalRow.vol.clase10 !== 0 ? totalRow.vol.clase10 : ""}</TotalCell>
				<TotalCell>{totalRow.vol.clase20 !== 0 ? totalRow.vol.clase20 : ""}</TotalCell>
				<TotalCell>{totalRow.vol.clase30 !== 0 ? totalRow.vol.clase30 : ""}</TotalCell>
				<TotalCell>{totalRow.vol.clase40 !== 0 ? totalRow.vol.clase40 : ""}</TotalCell>
				<TotalCell>{totalRow.vol.clase50 !== 0 ? totalRow.vol.clase50 : ""}</TotalCell>
				<TotalCell>{totalRow.vol.clase60 !== 0 ? totalRow.vol.clase60 : ""}</TotalCell>
				<TotalCell>{totalRow.vol.clase70 !== 0 ? totalRow.vol.clase70 : ""}</TotalCell>
				<TotalCell >{totalRow.vol.clase80 !== 0 ? totalRow.vol.clase80 : ""}</TotalCell>
				<TotalCell >{totalRow.vol.clase90 !== 0 ? totalRow.vol.clase90 : ""}</TotalCell>
				<TotalCell >{totalRow.vol.total}</TotalCell>
			</Table.Row>
		</>
	)
}
