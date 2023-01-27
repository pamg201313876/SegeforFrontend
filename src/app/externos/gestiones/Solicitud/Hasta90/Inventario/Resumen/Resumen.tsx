import React from 'react'
import { Header, Table } from 'semantic-ui-react'
import EspecieRow from './EspecieRow'

type Props = {
	censo: any
}

export default function Resumen({
	censo
}: Props) {

	const renderRows = () => {

		let rows: any[] = []

		censo.especiesCenso.forEach((especieCenso: any) => {
			rows.push(
				<EspecieRow especieCenso={especieCenso} key={especieCenso?.numero}  />
			)
		})

		return rows

	}


	return (
		<Table celled structured striped size="small">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell textAlign="center"  >No. </Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >Código MIRASILV</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" width="6"  >Nombre científico</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >Número de árboles</Table.HeaderCell>
					<Table.HeaderCell textAlign="center"  >Área basal (m2)</Table.HeaderCell>
					<Table.HeaderCell textAlign="center" >Volúmen (m3)</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body  >
				{renderRows()}
			</Table.Body>
			<Table.Footer style={{ "borderTop": "solid 1px" }} >
				<Table.Row textAlign="center" >
					<Table.Cell colSpan="3"><Header size="medium">Total: </Header></Table.Cell>
					<Table.Cell positive >{censo.total.numeroArboles}</Table.Cell>
					<Table.Cell positive>{censo.total.areaBasal}</Table.Cell>
					<Table.Cell positive>{censo.total.volumen}</Table.Cell>
				</Table.Row>
			</Table.Footer>
		</Table>
	)
}
