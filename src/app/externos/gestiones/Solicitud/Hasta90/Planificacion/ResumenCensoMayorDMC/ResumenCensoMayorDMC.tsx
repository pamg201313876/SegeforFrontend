import React from 'react'
import { Table } from 'semantic-ui-react';
import { formatDouble } from 'utils/UtilFunctions';
import EstratoResumenRow from './EstratoResumenRow';

type Props = {
	resumenCensoMayorDmc: any
}

export default function ResumenCensoMayorDMC({
	resumenCensoMayorDmc
}: Props) {

	const renderRows = () => {
		let rows: any[] = []
		let i = 0;
		resumenCensoMayorDmc.resumenesPorEstrato.forEach((estratoResumen: any) => {
			rows.push(<EstratoResumenRow key={"ke_" + i++} estratoResumen={estratoResumen} />)
		});
		return rows
	}

	return (
		<Table structured celled striped size="small" compact>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell textAlign="center" rowSpan={2}>Estrato</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" rowSpan={2}>Nombre científico</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" rowSpan={2}>Nombre común</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" colSpan={3}>Total &gt;= DMC</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell textAlign="center">Número de árboles</Table.HeaderCell>
					<Table.HeaderCell textAlign="center">Área basal (m2)</Table.HeaderCell>
					<Table.HeaderCell textAlign="center">Volúmen (m3)</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{renderRows()}
			</Table.Body>
			<Table.Footer style={{ "borderTop": "solid 1px" }}>
				<Table.Row >
					<Table.Cell verticalAlign="top" textAlign="center" colSpan={3} >Total: </Table.Cell>
					<Table.Cell textAlign="center">{formatDouble(resumenCensoMayorDmc.totalResumenCenso.numeroArboles)}</Table.Cell>
					<Table.Cell textAlign="center">{formatDouble(resumenCensoMayorDmc.totalResumenCenso.areaBasal)}</Table.Cell>
					<Table.Cell textAlign="center">{formatDouble(resumenCensoMayorDmc.totalResumenCenso.volumen)}</Table.Cell>
				</Table.Row>
			</Table.Footer>
		</Table>
	)
}
