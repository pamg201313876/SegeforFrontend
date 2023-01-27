import React from 'react'
import { Table } from 'semantic-ui-react'
import EstratoRow from './EstratoRow'
import TotalRow from './TotalRow'

type Props = {
	estratos: any[],
	total: any,
	areasEstrato: number[],
	onAreaUpdate: (area: number, pos: number) => void
	onlyRead?: boolean
}

export default function DistribucionFrecuencias({
	estratos,
	total,
	areasEstrato,
	onAreaUpdate,
	onlyRead
}: Props) {

	const renderRows = () => {

		const estratosRows: any[] = []
		let i = 0;
		estratos.forEach((estrato: any) => {
			estratosRows.push(
				<EstratoRow key={"e_" + i} pos={i} area={areasEstrato[i]} onlyRead={onlyRead} onAreaChange={onAreaUpdate} estrato={estrato} especies={estrato.especies} />
			)
			i++
		});
		return estratosRows;

	}


	// useEffect(() => {
	// 	if(distribucionFrecuencias != null){
	// 		let total = 0
	// 		distribucionFrecuencias.estratos.forEach((estrato: any) => {
	// 				total += Number(estrato.area)
	// 		});
	// 		setTotalArea(total)
	// 	}
	// }, [distribucionFrecuencias, setTotalArea])

	return (
		<Table celled structured compact striped size="small">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell textAlign="center" rowSpan='2' >Estrato</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" width="2" rowSpan='2'>Área (Ha)</Table.HeaderCell>
					<Table.HeaderCell collapsing textAlign="center" rowSpan='2'>Nombre científico</Table.HeaderCell>
					<Table.HeaderCell collapsing textAlign="center" rowSpan='2'>Parámetro</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" colSpan="9" >Clase diamétrica</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" rowSpan='2'>Total</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell textAlign="center"  >10-19.9</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >20-29.9</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >30-39.9</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >40-49.9</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >50-59.9</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >60-69.9</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >70-79.9</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >80-89.9</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >&gt;= 90</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body >
				{renderRows()}
			</Table.Body>
			<Table.Footer style={{ "borderTop": "solid 1px" }} >
				<TotalRow totalRow={total} />
			</Table.Footer>
		</Table>
	)
}
