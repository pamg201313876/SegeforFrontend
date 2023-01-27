import React from 'react'
import { Table } from 'semantic-ui-react'
import { EspecieEstratoIc } from '../Planificacion'
import EspecieRemantesRow from './EspecieRemantesRow'

type Props = {
	estrato: any
	especiesEstratoIc: EspecieEstratoIc[]
}

export default function EstratoRemanentesRow({
	estrato,
	especiesEstratoIc
}: Props) {

	const getEspecieEstrato = (especieId: number, estratoId: number,) => {
		for (let e of especiesEstratoIc) {
			if (e.especieId === especieId && e.estratoId === estratoId) {
				return e;
			}
		}
	}

	const renderRows = () => {
		let rows: any[] = []
		let i = 0;
		estrato.especies.forEach((especie: any) => {
			let especieEstratoIc = getEspecieEstrato(especie.tcEspecie.especieId, estrato.estrato);
			rows.push(
				<EspecieRemantesRow key={"ek_" + i++} especie={especie} especieEstratoIc={especieEstratoIc!} />
			)
		})
		return rows
	}

	return (
		<>
			<Table.Row  >
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={((estrato.especies.length)) + 1} >{estrato.estrato}</Table.Cell>
			</Table.Row>
			{renderRows()}
		</>
	)
}
