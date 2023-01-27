import AprovechamientoApi from 'api/latifoliado/hasta90/AprovechamientoApi'
import TurnosApi from 'api/latifoliado/TurnosApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import UpdateDetalleIntervencionEspecieDTO from 'dto/gestion/latifoliado/hasta90/aprovechamiento/UpdateDetalleIntervencionEspecieDTO'
import UpdateDetalleIntervencionEstratoDTO from 'dto/gestion/latifoliado/hasta90/aprovechamiento/UpdateDetalleIntervencionEstratoDTO'
import UpdateTurnoEstratoDTO from 'dto/gestion/latifoliado/UpdateTurnoEstratoDTO'
import React, { useContext } from 'react'
import { Header, Segment, Form, Icon } from 'semantic-ui-react'
import DetalleIntervencionTable from './DetalleIntervencionTable'

type Props = {
	gestion: any
	detalleIntervencion: any
	getCalculos: () => void
}

const turnosApi = new TurnosApi()
const aprovechamientoApi = new AprovechamientoApi()

export default function DetalleIntervencion({
	gestion,
	detalleIntervencion,
	getCalculos
}: Props){

	const dataContext = useContext(AppDataContext);

	const handleResponse = (res: any, onSuccess: () => void) => {
		if (res.status === "OK") {
			onSuccess()
		}
		else {
			dataContext.errorToast("Error al guardar informacion")
		}
	}

	const handleSuccess = () => {
		dataContext.successToast("Datos guardados satisfactoriamente")
		getCalculos()
	}

	const handleTurnosResponse = (res: any) => {
		handleResponse(res, handleSuccess)
	}

	const handleDetalleResponse = (res: any) => {
		handleResponse(res, updateTurnosEstrato)
	}

	const handleError = (axiosError: AxiosError) => {
		dataContext.errorToast("Error al descargar datos.")
		console.error(axiosError)
	}

	const updateTurnosEstrato = () => {

		let turnosEstratoList : UpdateTurnoEstratoDTO[] = []

		for(let estratoDetalle of detalleIntervencion.estratos){

			let turnoEstratoDTO : UpdateTurnoEstratoDTO = {
				turno: estratoDetalle.turno,
				estrato: estratoDetalle.estrato,
			}

			turnosEstratoList.push(turnoEstratoDTO)

		}

		turnosApi.updateTurnosEstrato(gestion.gestionId, turnosEstratoList, handleTurnosResponse, handleError)

	}



	const updateDetalleIntervencion = () => {

		let estratos: UpdateDetalleIntervencionEstratoDTO[] = []

		for(let estratoDetalle of detalleIntervencion.estratos){

			let especies : UpdateDetalleIntervencionEspecieDTO[] = []

			for(let especieDetalle of estratoDetalle.especies){
					let especieDTO : UpdateDetalleIntervencionEspecieDTO = {
						especieId: especieDetalle.tcEspecie.especieId,
						porcentajeTroza: especieDetalle.porcentajeTroza
					}
					especies.push(especieDTO)
			}

			let updateDto : UpdateDetalleIntervencionEstratoDTO = {
				estrato: estratoDetalle.estrato,
				anio: estratoDetalle.anio,
				especies: especies
			}

			estratos.push(updateDto)

		}

		aprovechamientoApi.updateDetalleIntervencion(gestion.gestionId, estratos, handleDetalleResponse, handleError)

	}

	

	const handleUpdate = () => {
		updateDetalleIntervencion()
	}

	return (
		<Segment raised clearing>
			<Header>7.1. Detalle de intervención</Header>
			{detalleIntervencion != null ?
				<DetalleIntervencionTable
					detalleIntervencion={detalleIntervencion}/>
				: null
			}
			<Form.Button icon primary floated="right" labelPosition='right' onClick={handleUpdate} >
				Guardar
				<Icon name="save" />
			</Form.Button>
		</Segment>
	)
}
