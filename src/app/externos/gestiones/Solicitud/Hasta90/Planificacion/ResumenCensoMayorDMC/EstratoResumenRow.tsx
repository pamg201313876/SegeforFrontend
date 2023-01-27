import React from 'react'
import { Table } from 'semantic-ui-react'
import EspecieResumenRow from './EspecieResumenRow'

type Props = {
	estratoResumen: any
}

export default function EstratoResumenRow({
	estratoResumen
}: Props) {


	const renderRows = () => {
		let rows: any[] = []
		let i = 0;
		estratoResumen.especiesResumen.forEach((especieResumen: any) => {
			rows.push(
				<EspecieResumenRow key={"ek_" + i++} especieResumen={especieResumen} />
			)
		})
		return rows
	}

	return (
		<>
			<Table.Row  >
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={((estratoResumen.especiesResumen.length)) + 1} >{estratoResumen.estrato}</Table.Cell>
			</Table.Row>
			{renderRows()}
		</>
	)
}
