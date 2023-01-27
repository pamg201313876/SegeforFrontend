import NumInput from 'components/FormNumInput/NumInput'
import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'

type Props = {
	especieDetalle: any
}

export default function DetalleIntervencionEspecie({
	especieDetalle
}: Props) {

	const [porcentaje, setPorcentaje] = useState(especieDetalle.porcentajeTroza)
	const [volumenTotal] = useState(especieDetalle.volumenTotal)
	const [troza, setTroza] = useState(0)
	const [lenia, setLenia] = useState(0)

	const handlePorcentajeTrozaChange = (value: any) => {

		if(isNaN(value)){
			return
		}

		setPorcentaje(value)
		let numValue = Number(value)
		especieDetalle.porcentajeTroza = numValue

	}

	useEffect(() => {
		let troza = (volumenTotal * (porcentaje / 100))
		let lenia = volumenTotal - troza
		setTroza(troza)
		setLenia(lenia)
	}, [porcentaje, volumenTotal])

	return (
		<Table.Row >
			<Table.Cell textAlign="center" >{especieDetalle.tcEspecie.nombreCientifico}</Table.Cell>
			<Table.Cell textAlign="center">{especieDetalle.arbolesExtraer}</Table.Cell>
			<Table.Cell textAlign="center">
				<NumInput name="troza" minValue={0} maxValue={100} value={porcentaje} onBlur={(e:any) => handlePorcentajeTrozaChange(e.target.value)} />
			</Table.Cell>
			<Table.Cell textAlign="center">{troza.toFixed(3)}</Table.Cell>
			<Table.Cell textAlign="center">{lenia.toFixed(3)}</Table.Cell>
			<Table.Cell textAlign="center">{especieDetalle.volumenTotal}</Table.Cell>
		</Table.Row>
	)
}
