import React, { useEffect, useState } from 'react'
import NumInput from 'components/FormNumInput/NumInput'
import { TextArea } from 'components/TextArea'
import { Checkbox, CheckboxProps, Table } from 'semantic-ui-react'
import { isBlankString } from 'utils/UtilFunctions'
import { EspecieDMC } from '../Planificacion'

type Props = {
	pos: number
	especie: EspecieDMC
	// onEspeciesDmcUpdate: (especieDmc: EspecieDMC, esJustificacion?: boolean) => void
	// onEspeciesDmcDelete: (especieDmc: EspecieDMC) => void
}

export default function EspeciesAprovecharRow({
	pos,
	especie,
	// onEspeciesDmcDelete,
	// onEspeciesDmcUpdate
}: Props) {

	const [checked, setChecked] = useState<boolean>(false)
	
	const handleDmcUpdate = (value: any) => {

		if(isNaN(value)){
			return
		}

		let numValue = 0

		if(!isBlankString(value)){
			numValue = Number(value)
		}

		if(numValue !== especie.dmc){
			especie.dmc = numValue
		}

	}

	const handleJustificacionUpdate = (value: any) => {

		if(especie.justificacion !== value){
			especie.justificacion = value
		}

	}

	const handleCheckedChange = (_e: any, data: CheckboxProps) => {
		especie.habilitado = data.checked!!
		setChecked(data.checked!!)
	}

	useEffect(() => {
		setChecked(especie.habilitado)
	}, [especie])

	return (
		<Table.Row>
			<Table.Cell textAlign="center">{pos}</Table.Cell>
			<Table.Cell>{especie.nombreCientifico}</Table.Cell>
			<Table.Cell>{especie.nombreComun}</Table.Cell>
			<Table.Cell textAlign="center" collapsing>
				<NumInput 
					name="dmc"
					style={{ width:"60px" }}
					minValue={0}
					value={especie.dmc}
					onBlur={(e: any) => {
						handleDmcUpdate(e.target.value)
					}}
				/>
			</Table.Cell>
			<Table.Cell>
				<TextArea 
					defaultValue={especie.justificacion}
					onBlur={(e: any) => {
						handleJustificacionUpdate(e.target.value)
					}}
				/>
			</Table.Cell>
			<Table.Cell>
				<Checkbox
					toggle 
					checked={checked}
					onChange={handleCheckedChange}
				/>
			</Table.Cell>
		</Table.Row>
	)
}
