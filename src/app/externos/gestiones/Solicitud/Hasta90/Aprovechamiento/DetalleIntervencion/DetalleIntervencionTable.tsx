import React from 'react'
import { Table } from 'semantic-ui-react'
import DetalleIntervencionEstrato from './DetalleIntervencionEstrato'

type Props = {
	detalleIntervencion: any
}

export default function DetalleIntervencionTable({
	detalleIntervencion
}: Props) {

	const renderRows = () => {
		let rows: any[] = []
		let i = 0;
		detalleIntervencion.estratos.forEach((estrato: any) => {
			rows.push(
				<DetalleIntervencionEstrato
					key={"ac_" + i++}
					estratoDetalle={estrato} />)
		});
		return rows
	}


	return (
		<Table celled structured compact striped size="small">
			<Table.Header>
				<Table.Row>
				<Table.HeaderCell textAlign="center" >Turno</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">Año</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">Estrato</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">Área</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">Especie</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">No. árboles a extraer</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">% Troza</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">Troza (m3)</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">Leña (m3)</Table.HeaderCell>
				<Table.HeaderCell textAlign="center">Volumen total (m3)</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{renderRows()}
			</Table.Body>
			<Table.Footer>
			</Table.Footer>
		</Table>
	)
}
