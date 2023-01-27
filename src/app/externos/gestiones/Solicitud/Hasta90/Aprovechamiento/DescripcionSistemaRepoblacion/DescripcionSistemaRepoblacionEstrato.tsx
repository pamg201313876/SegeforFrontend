import NumInput from 'components/FormNumInput/NumInput'
import React, { useEffect, useState } from 'react'
import { Form, Icon, Table } from 'semantic-ui-react'
import { SistemaRepoblacion } from '../Aprovechamiento'
import DescripcionSistemaRepoblacionEspecie from './DescripcionSistemaRepoblacionEspecie'

type Props = {
	especieCatalog: any[]
	estrato: any,
	sistemasRepoblacion: SistemaRepoblacion[]
	handleSistemaUpdate: (detalleTurno: SistemaRepoblacion) => void
	handleSistemaAdd: (sistema: SistemaRepoblacion) => void
	handleSistemaDelete: (sistema: SistemaRepoblacion) => void
}

export default function DescripcionSistemaRepoblacionEstrato({
	especieCatalog,
	estrato,
	sistemasRepoblacion,
	handleSistemaUpdate,
	handleSistemaAdd,
	handleSistemaDelete
}: Props) {

	const [especieValue, setEspecieValue] = useState<any>()
	const [selectedEspecie, setSelectedEspecie] = useState<any>()
	const [sistemasEstrato, setSistemasEstrato] = useState<SistemaRepoblacion[]>([])
	const [faltante, setFaltante] = useState(0)

	const handleQuitarEspecie = (especieId: number) => {

		let sistemaRepoblacion: SistemaRepoblacion = {
			especieId: especieId,
			especie: {},
			estrato: estrato.estrato,
			anio: estrato.anio,
			area: estrato.area,
			turno: estrato.turno,
			tcSistemaRepoblacion: {
				sistemaRepoblacionId: 1
			},
			densidadInicial: 0
		}

		handleSistemaDelete(sistemaRepoblacion)
	}

	const renderRows = () => {
		let rows: any[] = []
		let key = 0;
		sistemasEstrato.forEach((e: SistemaRepoblacion) => {
			rows.push(
				<DescripcionSistemaRepoblacionEspecie
					key={"ds_" + key++}
					turno={estrato.turno}
					estrato={estrato.estrato}
					especieDetalle={e}
					detallesTurno={sistemasRepoblacion}
					handleDetalleUpdate={handleSistemaUpdate}
					handleQuitarEspecie={handleQuitarEspecie}
				/>
			)
		})
		return rows
	}

	const agregarEspecie = () => {
		console.log(selectedEspecie)
		if (selectedEspecie != null) {

			let sistemaRepoblacion: SistemaRepoblacion = {
				especieId: selectedEspecie.especieId,
				especie: selectedEspecie,
				estrato: estrato.estrato,
				anio: estrato.anio,
				area: estrato.area,
				turno: estrato.turno,
				tcSistemaRepoblacion: {
					sistemaRepoblacionId: 1
				},
				densidadInicial: 0
			}
			handleSistemaAdd(sistemaRepoblacion)
		}
	}



	const handleEspecieChange = (_e: any, { value }: any) => {
		let option: any = especieCatalog.find((x: any) => x.value === value) //obteniendo el objeto completo
		let object = option.object
		setSelectedEspecie(object)
		setEspecieValue(value)
	}

	useEffect(() => {

		if (estrato == null || sistemasRepoblacion == null) {
			return
		}

		let sisEstrato: SistemaRepoblacion[] = []

		for (let sistema of sistemasRepoblacion) {
			if (sistema.estrato === estrato.estrato) {
				sisEstrato.push(sistema)
			}
		}

		setSistemasEstrato(sisEstrato)
		setFaltante(1111)

	}, [sistemasRepoblacion, estrato])

	const handleUpdate = (e: any) => {

		let name = e.target.name
		let value = e.target.value

		if (isNaN(value)) {
			return
		}

		let numValue = Number(value)

		if(name === "anio"){
			estrato.anio = numValue
		}
	
	}

	useEffect(() => {
		let densidadTotal = 0;
		for(let sistema of sistemasEstrato){
			densidadTotal += Number(sistema.densidadInicial)
		}
		let faltante = 1111 - densidadTotal
		estrato.faltanteCalculado = faltante
		setFaltante(faltante)
	}, [sistemasEstrato])

	return (
		<>
			<Table.Row>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={sistemasEstrato.length + 2} >{estrato.turno}</Table.Cell>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={sistemasEstrato.length + 2} >
					<NumInput
						name="anio"
						value={estrato.anio}
						onBlur={handleUpdate}
					/>
				</Table.Cell>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={sistemasEstrato.length + 2} >{estrato.estrato}</Table.Cell>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={sistemasEstrato.length + 2} >{estrato.area}</Table.Cell>
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={sistemasEstrato.length + 2} >{faltante}</Table.Cell>
			</Table.Row>
			{renderRows()}
			<Table.Row  >
				<Table.Cell colSpan={4} >
					<Form.Group style={{ float: "right" }} >
						<Form.Select
							search
							options={especieCatalog ? especieCatalog : []}
							name={"tcEspecie"}
							selectOnNavigation={false}
							value={especieValue}
							onChange={handleEspecieChange}
						/>
						<Form.Button primary icon labelPosition="right" floated="right"
							onClick={agregarEspecie}>
							<Icon name="add" />
								Agregar especie
							</Form.Button>
					</Form.Group>
				</Table.Cell>
			</Table.Row>
		</>
	)
}
