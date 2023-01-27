import React from 'react'
import { Icon, Table, Button } from 'semantic-ui-react'
import { EspecieProteger } from '../Planificacion'
import { TextArea } from 'components/TextArea'

type Props = {
	pos: number
	especie: EspecieProteger
	onEspecieDelete: (especieProteger: EspecieProteger) => void
}


export default function ProteccionRow({pos,
	especie,
	onEspecieDelete
}: Props) {

	const handleJustificacionUpdate = (value: any) => {
		if(especie.justificacion !== value){
			especie.justificacion = value
		}		
	}

	return (
		<Table.Row>
			<Table.Cell textAlign="center">{pos}</Table.Cell>
			<Table.Cell>{especie.codigo}</Table.Cell>
			<Table.Cell>{especie.nombreCientifico}</Table.Cell>
			<Table.Cell>{especie.nombreComun}</Table.Cell>
			<Table.Cell>
				<TextArea 
					defaultValue={especie.justificacion}
					onBlur={(e: any) => {
						handleJustificacionUpdate(e.target.value)
					}}
				/>
			</Table.Cell>
			<Table.Cell textAlign="center">
				<Button color="red" icon onClick={() => onEspecieDelete(especie)}>
					<Icon name="x" />
				</Button>
			</Table.Cell>
		</Table.Row>
	)
}
