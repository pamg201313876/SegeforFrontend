import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import FormModal from 'components/FormModal'
import React, { useContext, useState } from 'react'
import { Header, Icon, Segment, Table } from 'semantic-ui-react'

type Props = {
	open: boolean
	closeModal: () => void
	gestion: any,
	refresh: () => void
}

const gestionApi = new GestionApi()

export default function EnviarSolicitud({
	open,
	closeModal,
	gestion,
	refresh
}: Props) {

	const appDataContext = useContext(AppDataContext)
	const [requisitos, setRequisitos] = useState<any[]>([])
	const [mostrarRequisitos, setMostrarRequisitos] = useState<boolean>(false)
	const [loading, setLoading] = useState(false)

	const enviarSolicitud = () => {

		if (gestion == null) {
			return
		}

		const handleResponse = (res: any) => {
			refresh()
			if (res.status === "OK") {

				let requisitos = []

				for (var z = 0; z < res.data.length; z++) {
					requisitos.push(res.data[z])
				}
				setRequisitos(requisitos)
				setMostrarRequisitos(true)
				appDataContext.successToast("Solicitud enviada correctamente")

			} else {
				appDataContext.errorToast(res.data.message)
			}

			setLoading(false)
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			appDataContext.errorToast('Error al enviar solicitud. Intente de nuevo')
			setLoading(false)
			closeModal()
		}

		setLoading(true)
		gestionApi.mandarSolicitud(gestion, handleResponse, handleError)

	}

	const handleClose = () => {
		setMostrarRequisitos(false)
		closeModal()
	}

	const renderConfirmacion = () => {
		return (
			<>
				<Header size="medium" textAlign="center" icon>
					<Icon name="warning" color="yellow" />
				</Header>
				<Header textAlign="left">
					{"Está seguro que desea envíar la solicitud " + gestion.tcTipoGestion.tipoGestionDesc + " con un área de " + gestion.area +
						" a las oficinas de INAB? Esta acción no se podrá reversar."}
				</Header>
			</>
		)
	}

	const renderRows = () => {
		let rows = []

		let i = 1;
		for (let r of requisitos) {
			rows.push(<Table.Row><Table.Cell>{i++}</Table.Cell><Table.Cell>{r.requisitoDesc}</Table.Cell></Table.Row>)
		}

		return rows
	}

	const renderRequisitos = () => {

		return (
			<>
				<Header textAlign="left">
					{"Su solicitud se encuentra en la bandeja de la Subregión: Metropolitana. Acerquese a las oficinas con los siguientes requisitos para el inicio de su trámite: "}
				</Header>
				<Table celled>
					<Table.Body>
						{renderRows()}
					</Table.Body>
				</Table>
			</>
		)

	}

	if (open) {
		return (
			<FormModal open={open} closeModal={handleClose} header="Enviar solicitud a INAB" onSave={enviarSolicitud} noConfirmButton={mostrarRequisitos} loading={loading} >
				<Segment basic>
					{mostrarRequisitos ? renderRequisitos() : renderConfirmacion()}
				</Segment>
			</FormModal>
		)
	}
	return null
}
