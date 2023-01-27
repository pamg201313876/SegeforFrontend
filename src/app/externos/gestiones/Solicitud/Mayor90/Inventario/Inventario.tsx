import CustomTable from 'components/CustomTable'
import InformationTable from 'components/InformationTable'
import React, { useState } from 'react'
import { Form, Grid, Header, Table } from 'semantic-ui-react'
import Maderables from './Maderables/Maderables'

export default function Inventario() {

	const [tipoMuestreo, setTipoMuestreo] = useState<any>()

	return (
		<div>
			<Maderables  tipoMuestreo={tipoMuestreo} setTipoMuestreo={setTipoMuestreo}/>

			<br></br>


			<Header as='h3'>
				Intensidad de muestreo
				</Header>




			<Grid celled columns={2}>

				<Grid.Row stretched textAlign={"center"} >
					<Grid.Column>Descripción</Grid.Column>
					<Grid.Column>Intensidad</Grid.Column>

				</Grid.Row>
				<Grid.Row stretched textAlign={"center"} >
					<Grid.Column>Arboles entre ≥25 cm de DAP</Grid.Column>
					<Grid.Column></Grid.Column>
				</Grid.Row>

				<Grid.Row stretched textAlign={"center"} >
					<Grid.Column>Fustales (entre 10 y 24.9 cm de DAP)</Grid.Column>
					<Grid.Column></Grid.Column>
				</Grid.Row>

			</Grid>

			<br></br>
			{tipoMuestreo == null || tipoMuestreo.tipoMuestreoId > 2 ? null :
			<>
			<Header as='h3'>
				Análisis Estadístico Simple del Inventario
				</Header>


			<CustomTable
				columns={[
					{ header: "Estrato", name: 'nombre' },
					{ header: "Área", name: 'cui' },
					{ header: "No. Parcelas", name: 'sexo' },
					{ header: "Vol./ha (m3)", name: 'sexo' },
					{ header: "Desviación Estándar", name: 'sexo' },
					{ header: "Coeficiente de variación (%)", name: 'sexo' },
					{ header: "Error estándar de la media", name: 'sexo' },
					{ header: "Error de muestreo absoluto", name: 'sexo' },
					{ header: "Error de muestreo en %", name: 'sexo' },
					{ header: "Limite Inferior Confianza", name: 'sexo' },
					{ header: "Limite Superior Confianza", name: 'sexo' },
				]}

				data={[]}
			/>
			<br></br>
			</>
}

			{tipoMuestreo == null || tipoMuestreo.tipoMuestreoId < 3 ? null :
				<>
					<Header as='h3'>
						Análisis Estadístico estratificado del inventario
				</Header>


					<CustomTable
						columns={[
							{ header: "Estrato", name: 'nombre' },
							{ header: "Área", name: 'cui' },
							{ header: "xj", name: 'sexo' },
							{ header: "Sj", name: 'sexo' },
							{ header: "njr", name: 'sexo' },
							{ header: "Nj", name: 'sexo' },
							{ header: "Pj", name: 'sexo' },
							{ header: "Xj*Nj", name: 'sexo' },
							{ header: "Sj2*Pj", name: 'sexo' },
							{ header: "Según área", name: 'sexo' },
							{ header: "Según variabilidad", name: 'sexo' },
						]}

						data={[]}
					/>

					<br />

					<InformationTable

						rows={[
							{
								header: "Volumen promedio (m³/ha)",
								value: ""
							},
							{
								header: "Desviación estándar (%)",
								value: ""
							},
							{
								header: "Error estándar (m³/ha)",
								value: ""
							},
							{
								header: "Error de muestreo (m³/ha)",
								value: ""
							},
							{
								header: "Error de muestreo como porcentaje (%)",
								value: ""
							},
							{
								header: "Limite de confianza superior (m³/ha)",
								value: ""
							},
							{
								header: "Limite de confianza inferior (m³/ha)",
								value: ""
							},
							{
								header: "Número total de parcelas a levantar",
								value: ""
							}
						]}

					/>
				</>
			}



			<Form style={{ marginTop: "14px" }}>
				<Form.TextArea

					label="Discusión de la información estadística del inventario"
				/>
			</Form>



			<Header as='h3'>Resultados de inventario de productos maderables</Header>


			<Table celled structured compact striped size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign="center"  >Estrato</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" width="2" >Área (Ha)</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" >Número árboles</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" >Área basal</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >Volúmen Total (m3/ha)</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >Volúmen Comercial (m3/ha</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body >
				</Table.Body>
				<Table.Footer style={{ "borderTop": "solid 1px" }} >
				</Table.Footer>
			</Table>

			<br />

			<Form>
				<Form.TextArea
					label="Composición florística"
				/>
			</Form>

			<h4>Agrupación de Especies por tipo madera</h4>

			<Form>
				<Form.Select width="3" fluid label={"Preciosas"} options={
					[
						{ key: 1, text: 'Preciosas1', value: "d1" },
						{ key: 2, text: 'Preciosas2', value: "d2" },
						{ key: 2, text: 'Preciosas3', value: "d3" },
						{ key: 2, text: 'Preciosas4', value: "d4" }
					]
				} />
				<Form.Select width="3" fluid label={"Semipreciosas"} options={
					[
						{ key: 1, text: 'Semipreciosas1', value: "d1" },
						{ key: 2, text: 'Semipreciosas2', value: "d2" },
						{ key: 2, text: 'Semipreciosas3', value: "d3" },
						{ key: 2, text: 'Semipreciosas4', value: "d4" }
					]
				} />
				<Form.Select width="3" fluid label={"Secundarias"} options={
					[
						{ key: 1, text: 'Secundarias1', value: "d1" },
						{ key: 2, text: 'Secundarias2', value: "d2" },
						{ key: 2, text: 'Secundarias3', value: "d3" },
						{ key: 2, text: 'Secundarias4', value: "d4" }
					]
				} />
			</Form>




			<Header as='h3'>
				Resultados del inventario por tipos de madera
				</Header>




			<Header as='h4'>
				Distribución diametrica (cm) del numero de árboles, área basal y volumen de las especies con maderas PRECIOSAS por estrato
				</Header>

			<Table celled structured compact striped size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign="center" rowSpan='2' >Estrato</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" width="2" rowSpan='2'>Área (Ha)</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" rowSpan='2'>Nombre científico</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" rowSpan='2'>Parámetro</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" colSpan="9" >Clase diamétrica</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" rowSpan='2'>Total</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell textAlign="center"  >10-19.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >20-29.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >30-39.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >40-49.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >50-59.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >60-69.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >70-79.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >80-89.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >&gt;= 90</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body >
				</Table.Body>
				<Table.Footer style={{ "borderTop": "solid 1px" }} >
				</Table.Footer>
			</Table>


			<Header as='h4'>
				Distribución diametrica (cm) del numero de árboles, área basal y volumen de las especies con maderas SEMIPRECIOSAS por estrato	</Header>


			<Table celled structured compact striped size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign="center" rowSpan='2' >Estrato</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" width="2" rowSpan='2'>Área (Ha)</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" rowSpan='2'>Nombre científico</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" rowSpan='2'>Parámetro</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" colSpan="9" >Clase diamétrica</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" rowSpan='2'>Total</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell textAlign="center"  >10-19.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >20-29.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >30-39.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >40-49.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >50-59.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >60-69.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >70-79.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >80-89.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >&gt;= 90</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body >
				</Table.Body>
				<Table.Footer style={{ "borderTop": "solid 1px" }} >
				</Table.Footer>
			</Table>


			<Header as='h4'>
				Distribución diametrica (cm) del numero de árboles, área basal y volumen de las especies con maderas SECUNDARIAS por estrato	</Header>

			<Table celled structured compact striped size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign="center" rowSpan='2' >Estrato</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" width="2" rowSpan='2'>Área (Ha)</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" rowSpan='2'>Nombre científico</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" rowSpan='2'>Parámetro</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" colSpan="9" >Clase diamétrica</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" rowSpan='2'>Total</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell textAlign="center"  >10-19.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >20-29.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >30-39.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >40-49.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >50-59.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >60-69.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >70-79.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >80-89.9</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >&gt;= 90</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body >
				</Table.Body>
				<Table.Footer style={{ "borderTop": "solid 1px" }} >
				</Table.Footer>
			</Table>


			<Header as='h3'>
				Inventario de la Regneración Natural
				</Header>


			<CustomTable
				columns={[
					{ header: "Estrato", name: 'nombre' },
					{ header: "Grupo Comercial", name: 'cui' },
					{ header: "Nombre Científico", name: 'sexo' },
					{ header: "Brinzales/ha", name: 'sexo' },
					{ header: "Latizales / ha", name: 'sexo' },
					{ header: "Total ha", name: 'sexo' },

				]}

				data={[]}
			/>

			<br />


			<Form>
				<Form.TextArea
					label="Discusión de la información estadística del inventario"
				/>
			</Form>

			<br />



			<Header as='h3'>
				INVENTARIO DE PRODUCTOS NO MADERABLES
				</Header>


			<Header as='h4'>
				Producto No madreable A</Header>


			<Table celled structured compact striped size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign="center"  >Estrato</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" width="2" >Área (Ha)</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" >Número árboles</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" >Área basal</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >Volúmen Total (m3/ha)</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >Volúmen Comercial (m3/ha</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body >
				</Table.Body>
				<Table.Footer style={{ "borderTop": "solid 1px" }} >
				</Table.Footer>
			</Table>

			<br />

			<Form>
				<Form.TextArea
					label="Discusión de resultados"
				/>
			</Form>




			<Header as='h4'>
				Producto no maderables B</Header>


			<Table celled structured compact striped size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign="center"  >Estrato</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" width="2" >Área (Ha)</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" >Número árboles</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign="center" >Área basal</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >Volúmen Total (m3/ha)</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >Volúmen Comercial (m3/ha</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body >
				</Table.Body>
				<Table.Footer style={{ "borderTop": "solid 1px" }} >
				</Table.Footer>
			</Table>

			<br />

			<Form>
				<Form.TextArea
					label="Discusión de resultados"
				/>
			</Form>



		</div>
	)
}