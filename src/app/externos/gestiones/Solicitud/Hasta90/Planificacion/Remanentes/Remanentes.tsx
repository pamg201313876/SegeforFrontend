import React from 'react'
import { Table } from 'semantic-ui-react';
import { EspecieEstratoIc } from '../Planificacion';
import EstratoRemanentesRow from './EstratoRemantesRow';

type Props = {
	analisisCortaDTO: any
	especiesEstratoIc: EspecieEstratoIc[]
}

export default function Remanentes({
	analisisCortaDTO,
	especiesEstratoIc
}: Props) {

	const renderRows = () => {
		let rows: any[] = []
		let i = 0;
		let estratos = analisisCortaDTO.estratos
		estratos.forEach((estrato: any) => {
			rows.push(<EstratoRemanentesRow key={"ke_" + i++} estrato={estrato} especiesEstratoIc={especiesEstratoIc} />)
		});
		return rows
	}

	return (
		<Table structured celled striped size="small" compact>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell textAlign="center" rowSpan={2}>Estrato</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" rowSpan={2}>Nombre científico</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" colSpan={5}>Árboles remanentes</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell collapsing textAlign="center">No. de árboles por <br/> debajo de la futura cosecha</Table.HeaderCell>
					<Table.HeaderCell collapsing textAlign="center">No. de árboles <br/> de futura cosecha</Table.HeaderCell>
					<Table.HeaderCell collapsing textAlign="center">No. de árboles <br/> por defecto de forma y fitosanidad</Table.HeaderCell>
					<Table.HeaderCell collapsing textAlign="center">No. de árboles <br/> semilleros</Table.HeaderCell>
					<Table.HeaderCell collapsing textAlign="center">No. de árboles <br/> de protección</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{renderRows()}
			</Table.Body>
		</Table>
	)
}
