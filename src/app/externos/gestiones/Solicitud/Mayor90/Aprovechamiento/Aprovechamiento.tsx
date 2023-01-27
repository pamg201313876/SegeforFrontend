import React from 'react'
import { Form, Header } from 'semantic-ui-react'
import CaminosTable from './CaminosTable'

export default function Aprovechamiento() {
	return (
		<Form>
			<Header size="medium" >
				Descripción de actividades de aprovechamiento para productos maderables
			</Header>
			<Form.TextArea label="Actividades de pre-aprovechamiento" />
			<Form.TextArea label="Actividades de aprovechamiento" />
			<Form.TextArea label="Actividades de post-aprovechamiento" />
			<Header size="medium" >
				Red de caminos
			</Header>
			<CaminosTable/>
			<Form.TextArea label="Descripción del tipo de maquinaria a utilizar"/>
			<Header size="medium" >
				Descripción de actividades de aprovechamiento para productos maderables
			</Header>
			<Form.TextArea label="Actividades de pre-aprovechamiento" />
			<Form.TextArea label="Actividades de aprovechamiento" />
			<Form.TextArea label="Actividades de post-aprovechamiento" />
		</Form>
	)
}