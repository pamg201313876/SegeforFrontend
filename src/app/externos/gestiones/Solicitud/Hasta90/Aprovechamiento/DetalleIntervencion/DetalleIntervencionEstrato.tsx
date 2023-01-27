import NumInput from 'components/FormNumInput/NumInput'
import React from 'react'
import { Table } from 'semantic-ui-react'
import DetalleIntervencionEspecie from './DetalleIntervencionEspecie'

type Props = {
	estratoDetalle: any,
}

export default function DetalleIntervencionEstrato({
	estratoDetalle
}: Props) {


	const renderRows = () => {
		let rows: any[] = []
		let i = 0;
		estratoDetalle.especies.forEach((e: any) => {
			if (e.volumenTotal > 0) {
				rows.push(
					<DetalleIntervencionEspecie
						key={"dt_" + i++}
						especieDetalle={e}
					/>
				)
			}
		})
		return rows
	}

	const handleUpdate = (e: any) => {

		let name = e.target.name
		let value = e.target.value

		if (isNaN(value)) {
			return
		}

		let numValue = Number(value)

		if(name === "turno"){
			estratoDetalle.turno = numValue
		}

		else if(name === "anio"){
			estratoDetalle.anio = numValue
		}
	
	}

	return (
		<>
			<Table.Row>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={estratoDetalle.especies.length + 1} >
					<NumInput
						name="turno"
						value={estratoDetalle.turno}
						onBlur={handleUpdate}
					/>
				</Table.Cell>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={estratoDetalle.especies.length + 1}>
					<NumInput
						name="anio"
						value={estratoDetalle.anio}
						onBlur={handleUpdate}
					/>
				</Table.Cell>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={estratoDetalle.especies.length + 1}  >
					<div style={{ marginTop: "6px" }}>
						{estratoDetalle.estrato}
					</div>
				</Table.Cell>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={estratoDetalle.especies.length + 1} >
					<div style={{ marginTop: "6px" }}>
						{estratoDetalle.area}
					</div>
				</Table.Cell>
			</Table.Row>
			{renderRows()}
		</>
	)
}
