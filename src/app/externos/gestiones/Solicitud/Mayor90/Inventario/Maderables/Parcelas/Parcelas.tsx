import React from 'react'
import { Grid, Header, Input } from 'semantic-ui-react'

export default function Parcelas() {
	return (
		<>
			<Header as='h3'>
				Tamaño y Número de Parcelas según tamaño de la vegetación
			</Header>
			<Grid celled columns={4}>

				<Grid.Row stretched textAlign={"center"} >
					<Grid.Column>Descripción</Grid.Column>
					<Grid.Column>Tamaño de Parcela (m2)</Grid.Column>
					<Grid.Column>Número de parcelas</Grid.Column>
					<Grid.Column>Forme de la parcela</Grid.Column>

				</Grid.Row>
				<Grid.Row stretched textAlign={"center"} >
					<Grid.Column>Arboles entre ≥ 25 cm de DAP</Grid.Column>
					<Grid.Column><Input /></Grid.Column>
					<Grid.Column><Input /></Grid.Column>
					<Grid.Column><Input /></Grid.Column>
				</Grid.Row>

				<Grid.Row stretched textAlign={"center"} >
					<Grid.Column>Fustales (entre 10 y 24.9 cm de DAP)	</Grid.Column>
					<Grid.Column><Input /></Grid.Column>
					<Grid.Column><Input /></Grid.Column>
					<Grid.Column><Input /></Grid.Column>
				</Grid.Row>

				<Grid.Row stretched textAlign={"center"} >
					<Grid.Column>Latizales (≥5 y  &lt; 10 cm de DAP) </Grid.Column>
					<Grid.Column><Input /></Grid.Column>
					<Grid.Column><Input /></Grid.Column>
					<Grid.Column><Input /></Grid.Column>
				</Grid.Row>

				<Grid.Row stretched textAlign={"center"} >
					<Grid.Column>Brinzales (&gt; 30 cm de alt. Y &lt; 5 cm de DAP) </Grid.Column>
					<Grid.Column><Input /></Grid.Column>
					<Grid.Column><Input /></Grid.Column>
					<Grid.Column><Input /></Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	)
}
