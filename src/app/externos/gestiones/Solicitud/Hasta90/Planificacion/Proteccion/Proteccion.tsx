import EspecieSelect from 'components/FormCatalogSelect/catalogs/EspecieSelect'
import React, { useState } from 'react'
import { Form, Header, Icon, Table } from 'semantic-ui-react'
import { EspecieProteger } from '../Planificacion'
import ProteccionRow from './ProteccionRow'

type Props = {
	especiesProteger: EspecieProteger[]
	onEspecieProtegerAdd: (especieProteger: EspecieProteger) => void
	onEspecieProtegerDelete: (especieProteger: EspecieProteger) => void
}

export default function ({
	especiesProteger,
	onEspecieProtegerAdd,
	onEspecieProtegerDelete
}: Props) {

	const [selectedEspecie, setSelectedEspecie] = useState<any>()

	const handleAddEspecieProteger = () => {
		if (selectedEspecie != null) {
			let nuevaEspecie: EspecieProteger = {
				nombreCientifico: selectedEspecie.nombreCientifico,
				nombreComun: selectedEspecie.especieDesc,
				codigo: selectedEspecie.codigo,
				especieId: selectedEspecie.especieId,
				justificacion: ""
			}
			onEspecieProtegerAdd(nuevaEspecie)
			setSelectedEspecie(null)
		}
	}

	const renderRows = () => {
		if (especiesProteger.length === 0) {
			return <Table.Row textAlign="center" >
				<Table.Cell colSpan={6}><Header>Sin especies agregadas</Header></Table.Cell>
			</Table.Row>
		}
		else {
			let rows: any = []
			let i = 1;
			especiesProteger.forEach((e: EspecieProteger) => {
				rows.push(
					<ProteccionRow key={"ep_" + i} pos={i++} especie={e} onEspecieDelete={onEspecieProtegerDelete} />
				)
			})
			return rows
		}
	}

	return (
		<div>
			<Form>
				<Form.Group>
					<EspecieSelect
						value={selectedEspecie}
						onChange={(e: any, { value }: any) => setSelectedEspecie(value)}
					/>
					<Form.Button
						label="‌‌ "
						onClick={handleAddEspecieProteger}
						primary
						icon
					>
						<Icon name="add" />
					</Form.Button>
				</Form.Group>
			</Form>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell collapsing>No.</Table.HeaderCell>
						<Table.HeaderCell collapsing >Código</Table.HeaderCell>
						<Table.HeaderCell>Nombre científico</Table.HeaderCell>
						<Table.HeaderCell>Nombre común</Table.HeaderCell>
						<Table.HeaderCell>Justificación</Table.HeaderCell>
						<Table.HeaderCell>Eliminar</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{renderRows()}
				</Table.Body>
			</Table>
		</div>
	)
}
