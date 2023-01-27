import FormNumInput from 'components/FormNumInput'
import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'

export default function CaminosTable() {

	const [primarios, setPrimarios] = useState<number>(0)
	const [primariosPor, setPrimariosPor] = useState<number>(0)
	const [secundarios, setSecundarios] = useState<number>(0)
	const [secundariosPor, setSecundariosPor] = useState<number>(0)
	const [otros, setOtros] = useState<number>(0)
	const [otrosPor, setOtrosPor] = useState<number>(0)


	return (
		<Table celled structured>
			<Table.Header>
				<Table.HeaderCell>Clase de camino</Table.HeaderCell>
				<Table.HeaderCell>Existentes (km.)</Table.HeaderCell>
				<Table.HeaderCell>Por construir</Table.HeaderCell>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell textAlign="center"><b>Primarios</b></Table.Cell>
					<Table.Cell textAlign="center"><FormNumInput name="primarios"  value={primarios} onBlur={(e:any) => setPrimarios(e.target.value)}/></Table.Cell>
					<Table.Cell textAlign="center"><FormNumInput name="primariosPor" value={primariosPor} onBlur={(e:any) => setPrimariosPor(e.target.value)}/></Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell textAlign="center"><b>Secundarios</b></Table.Cell>
					<Table.Cell textAlign="center"><FormNumInput name="secundarios" value={secundarios} onBlur={(e:any) => setSecundarios(e.target.value)}/></Table.Cell>
					<Table.Cell textAlign="center"><FormNumInput name="secundariosPor" value={secundariosPor} onBlur={(e:any) => setSecundariosPor(e.target.value)}/></Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell textAlign="center"><b>Otros</b></Table.Cell>
					<Table.Cell textAlign="center"><FormNumInput name="otros" value={otros} onBlur={(e:any) => setOtros(e.target.value)}/></Table.Cell>
					<Table.Cell textAlign="center"><FormNumInput name="otrosPor" value={otrosPor} onBlur={(e:any) => setOtrosPor(e.target.value)}/></Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell textAlign="center"><b>Totales</b></Table.Cell>
					<Table.Cell textAlign="center">{Number(+primarios + +secundarios + +otros)}</Table.Cell>
					<Table.Cell textAlign="center">{Number(+primariosPor + +secundariosPor + +otrosPor)} </Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	)
}