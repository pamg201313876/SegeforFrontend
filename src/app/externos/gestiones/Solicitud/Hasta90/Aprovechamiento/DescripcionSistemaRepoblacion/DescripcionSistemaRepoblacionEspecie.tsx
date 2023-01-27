import SistemaRepoblacionSelect from 'components/FormCatalogSelect/catalogs/SistemaRepoblacionSelect'
import NumInput from 'components/FormNumInput/NumInput'
import React, { useState } from 'react'
import { Form, Icon, Table } from 'semantic-ui-react'
import { SistemaRepoblacion } from '../Aprovechamiento'

type Props = {
	turno: number
	estrato: number
	especieDetalle: SistemaRepoblacion
	detallesTurno: SistemaRepoblacion[]
	handleDetalleUpdate: (detalleTurno: SistemaRepoblacion) => void
	handleQuitarEspecie: (especieId: number) => void
}

export default function DetalleIntervencionEspecie({
	turno,
	estrato,
	especieDetalle,
	detallesTurno,
	handleDetalleUpdate,
	handleQuitarEspecie
}: Props) {

	const [tcSistemaRepoblacion, setTcSistemaRepoblacion] = useState<any>(especieDetalle.tcSistemaRepoblacion)

	const getIndex = (): number => {
		let index = detallesTurno.findIndex(element =>
			element.estrato === estrato
			&& element.turno === turno
			&& element.especieId === especieDetalle.especieId)

		return index
	}

	const handleDensidadChange = (value: any) => {

		if (isNaN(value)) {
			return
		}

		let index = getIndex()

		if (index !== -1) {

			let numValue = Number(value)

			if (detallesTurno[index].densidadInicial === numValue) {
				return
			}

			detallesTurno[index].densidadInicial = value
			handleDetalleUpdate(detallesTurno[index])
		}

	}

	const handleSistemaRepoblacionChange = (value: any) => {

		let index = getIndex()

		if (index !== -1) {
			setTcSistemaRepoblacion(value)
			detallesTurno[index].tcSistemaRepoblacion = value
			handleDetalleUpdate(detallesTurno[index])
		}

	}

	const quitarEspecie = () => {
		let especieId = especieDetalle.especieId
		handleQuitarEspecie(especieId)
	}


	return (
		<Table.Row >
			<Table.Cell textAlign="center" >{especieDetalle.especie.nombreCientifico}</Table.Cell>
			<Table.Cell textAlign="center">
				<NumInput
					name="densidadInicial"
					value={especieDetalle.densidadInicial}
					onBlur={(e: any) => handleDensidadChange(e.target.value)}
				/>
			</Table.Cell>
			<Table.Cell textAlign="center">
				<SistemaRepoblacionSelect name="tcSistemaRepoblacion"
					value={tcSistemaRepoblacion}
					onChange={(_e, { value }: any) => handleSistemaRepoblacionChange(value)}
				/>
			</Table.Cell>
			<Table.Cell textAlign="center">
				<Form.Button color="red" icon 
					onClick={quitarEspecie}>
					<Icon name="x" />
				</Form.Button>
			</Table.Cell>
		</Table.Row >
	)
}
