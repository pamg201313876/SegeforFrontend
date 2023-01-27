import React from 'react'
import { Form, Table } from 'semantic-ui-react'
import { ActividadSilvicultural } from '../Aprovechamiento'

type Props = {
	actividad: ActividadSilvicultural
}

export default function PlanificacionActividadesRow({
	actividad
}: Props) {

	const handleEstablecimientoUpdate = (value: string) => {
		if(actividad.establecimiento === value){
			return
		}
		actividad.establecimiento = value
	}

	const handleMantenimiento1Update = (value: string) => {
		if(actividad.mantenimiento1 === value){
			return
		}
		actividad.mantenimiento1 = value
	}

	const handleMantenimiento2Update = (value: string) => {
		if(actividad.mantenimiento2 === value){
			return
		}
		actividad.mantenimiento2 = value
	}

	const handleMantenimiento3Update = (value: string) => {
		if(actividad.mantenimiento3 === value){
			return
		}
		actividad.mantenimiento3 = value
	}


	return (
		<>
			<Table.Row>
				<Table.Cell rowSpan={4} textAlign="center">{actividad.turno}</Table.Cell>
				<Table.Cell rowSpan={4} textAlign="center">{actividad.area}</Table.Cell>
				<Table.Cell rowSpan={4}>
					{actividad.especies.map((e, i) => (
						<div key={i} style={{ "marginBottom": "6px" }}>
							{e.nombreCientifico} 
						</div>
					))}

				</Table.Cell>
				<Table.Cell>Establecimiento</Table.Cell>
				<Table.Cell>
					<Form.TextArea
						defaultValue={actividad.establecimiento}
						onBlur={(e: any) => handleEstablecimientoUpdate(e.target.value)}
					/>
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Mantenimiento #1</Table.Cell>
				<Table.Cell>
					<Form.TextArea
						defaultValue={actividad.mantenimiento1}
						onBlur={(e: any) => handleMantenimiento1Update(e.target.value)} />
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Mantenimiento #2</Table.Cell>
				<Table.Cell >
					<Form.TextArea
						defaultValue={actividad.mantenimiento2}
						onBlur={(e: any) => handleMantenimiento2Update(e.target.value)} />
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Mantenimiento #3</Table.Cell>
				<Table.Cell>
					<Form.TextArea
						defaultValue={actividad.mantenimiento3}
						onBlur={(e: any) => handleMantenimiento3Update(e.target.value)} />
				</Table.Cell>
			</Table.Row>
		</>
	)
}
