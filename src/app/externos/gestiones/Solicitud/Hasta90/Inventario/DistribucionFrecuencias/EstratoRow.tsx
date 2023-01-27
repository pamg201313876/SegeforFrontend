import NumInput from 'components/FormNumInput/NumInput'
import React from 'react'
import { Table } from 'semantic-ui-react'
import EspecieRow from './EspecieRow'

type Props = {
	estrato: any,
	especies: any[],
	pos: number,
	area: number,
	onAreaChange : (area: number, pos: number) => void 
	onlyRead?: boolean
}

export default function EstratoRow
	({
		estrato,
		especies,
		pos,
		area,
		onAreaChange,
		onlyRead
	}: Props) {

	const renderRows = () => {

		let rows: any[] = []

		let i= 0;
		especies.forEach((e: any) => {
			rows.push(
				<EspecieRow especieRow={e} key={"es" + estrato?.estrato + i++} />
			)
		})

		return rows

	}

	const handleAreaChange = (area: number) => {
		onAreaChange(area, pos)
	}

	return (
		<>
			<Table.Row  >
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={((especies.length) * 3) + 1} >{estrato.estrato}</Table.Cell>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={((especies.length) * 3) + 1} >
					<NumInput name="area" placeholder='Ingrese área...' value={area} onBlur={(e: any) => {handleAreaChange(e.target.value)}} />
				</Table.Cell>
			</Table.Row>
			{renderRows()}
		</>
	)
}
