import TurnosApi from 'api/latifoliado/TurnosApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import UpdateTurnoDTO from 'dto/gestion/latifoliado/UpdateTurnoDTO'
import React, { useContext } from 'react'
import { Table, Segment, Header, Icon, Form } from 'semantic-ui-react'
import { ActividadSilvicultural } from '../Aprovechamiento'
import PlanificacionActividadesRow from './PlanificacionActividadesRow'

type Props = {
	gestion: any
	actividadesSilviculturales: ActividadSilvicultural[]
}

const turnoApi = new TurnosApi()

export default function PlanificacionActividades({
	gestion,
	actividadesSilviculturales
}: Props) {

	const dataContext = useContext(AppDataContext);

	const handleResponse = (res: any) => {
		dataContext.desactivateLoading()
		if (res.status === "OK") {
			dataContext.successToast("Datos guardados satisfactoriamente")
		}
		else {
			dataContext.errorToast("Error al guardar informacion")
		}
	}

	const handleError = (axiosError: AxiosError) => {
		dataContext.errorToast("Error guardar la información.")
		console.error(axiosError)
		dataContext.desactivateLoading()
	}

	const handleUpdate = () => {
		
		let updateList : UpdateTurnoDTO[] = []

		for (let actividad of actividadesSilviculturales) {
			let updateDTO : UpdateTurnoDTO = {
				turno: actividad.turno,
				establecimiento: actividad.establecimiento,
				mantenimiento1: actividad.mantenimiento1,
				mantenimiento2: actividad.mantenimiento2,
				mantenimiento3: actividad.mantenimiento3
			}
			updateList.push(updateDTO)
		}

		dataContext.activateLoading()
		turnoApi.updateTurnos(gestion.gestionId, updateList, handleResponse, handleError)

	}

	const renderRows = () => {
		let rows: any[] = []
		let key = 0
		for (let actividad of actividadesSilviculturales) {
			rows.push(
				<PlanificacionActividadesRow
					key={"a_" + key++}
					actividad={actividad}
				/>
			)
		}
		return rows
	}

	const renderTable = () => {
		return (
			<Table celled structured compact striped size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign="center" collapsing>Turno</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" collapsing>Área (ha)</Table.HeaderCell>
						<Table.HeaderCell width="4" textAlign="center" collapsing>Especies</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" collapsing>Fase de compromiso</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Actividades silviculturales</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{renderRows()}
				</Table.Body>
			</Table>
		)
	}


	return (
		<Segment raised clearing>
			<Header size="small">
				7.3.2. Planificación de actividades silviculturales del compromiso (por cada turno)
			</Header>
			{renderTable()}
			<Form.Button icon primary floated="right" labelPosition='right' onClick={handleUpdate} >
				Guardar
				<Icon name="save" />
			</Form.Button>
		</Segment>

	)
}
