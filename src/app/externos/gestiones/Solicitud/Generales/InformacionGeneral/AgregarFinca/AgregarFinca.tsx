import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import FormModal from 'components/FormModal'
import React, { useContext, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import BuscarFincas from './BuscarFincas'
import FincaForm from './FincaForm'

const gestionApi = new GestionApi()

enum Actividad {
	BUSCAR,
	INGRESAR
}

type Props = {
	open: boolean,
	closeModal: () => void,
	onFincaAdded: (finca: any) => void,
	gestion: any
}
export default function AgregarFinca({
	open,
	closeModal,
	onFincaAdded,
	gestion
}: Props) {

	const context = useContext(AppDataContext)
	const [actividad, setActividad] = useState<Actividad>(Actividad.BUSCAR)
	const [error, setError] = useState<string | null>(null)


	const handleFincaAdded = (finca: any) => {

		let fincaGestion = {
			tcFinca: {
				fincaId: finca.fincaId
			},
			ttGestion: gestion
		}

		const handleResponse = (response: any) => {
			if (response.data.status === "OK") {
				let f = response.data.data[0]
				onFincaAdded(f)
				closeModal()
			} else {
				if (actividad === Actividad.BUSCAR) {
					setError(response.data.message)
				}
				else {
					context.errorToast("Finca creada pero no fue posible agregarla a la gestión: "
						+ response.data.message)
					closeModal()
				}
			}
		}

		const handleError = (error: any) => {
			setError("Error al agregar finca, intentelo más tarde.")
			console.error(error)
		}

		setError(null)
		gestionApi.agregarFinca(fincaGestion, handleResponse, handleError)
	}

	const handleClick = () => {
		if (actividad === Actividad.BUSCAR) {
			setActividad(Actividad.INGRESAR)
		}
		else {
			setActividad(Actividad.BUSCAR)
		}
	}

	const renderActividad = () => {
		if (actividad === Actividad.BUSCAR) {
			return (
				<>
					<Button style={{ marginBottom: "16px" }} color="blue" icon labelPosition="right" onClick={handleClick} >
						<Icon name="add" />
						Nueva finca
					</Button>
					<BuscarFincas onFincaAdded={handleFincaAdded} />
				</>
			)
		}
		return (
			<>
				<Button style={{ marginBottom: "16px" }} color="blue" icon labelPosition="right" onClick={handleClick} >
					<Icon name="search" />
					Buscar finca
				</Button>
				<FincaForm onFincaCreated={handleFincaAdded} />
			</>
		)
	}

	if (open) {
		return (
			<FormModal scrollable error={error} size="fullscreen" header="Agregar finca" open={open} closeModal={closeModal} noConfirmButton>
				{renderActividad()}
			</FormModal>
		)
	}

	return null
}
