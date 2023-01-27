import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import FormModal from 'components/FormModal'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

type Props = {
	gestion: any
}

const gestionApi = new GestionApi()

export default function FinalizarHasta90({
	gestion
}: Props) {

	const dataContext = useContext(AppDataContext)
	const history = useHistory()
	const [openDialog, setOpenDialog] = useState(false)
	const [loading, setLoading] = useState(false)

	const finalizarElaboracion = () => {

		const handleResponseAceptarSolicitud = (res: any) => {
			setOpenDialog(false)
			if (res.data.status === "OK") {
				dataContext.successToast("Elaboración finalizada correctamente")
				history.push("/bandeja_solicitudes")
			}
			else {
				dataContext.errorToast(res.data.message)
			}
			setLoading(false)
		}

		const handleErrorAceptarSolicitud = (error: AxiosError) => {
			setLoading(false)
			console.error(error)
			setOpenDialog(false)
			dataContext.errorToast("Acción no pude ser realizada. Intentelo de nuevo.")
		}

		setLoading(true)
		gestionApi.finalizarGestion(gestion, handleResponseAceptarSolicitud, handleErrorAceptarSolicitud)

	}

	const handleClick = () => {
		setOpenDialog(true)
	}

	const closeModal = () => {
		setOpenDialog(false)
	}

	return (
		<Segment textAlign="center" placeholder style={{ height: "100%" }}>
			<Header icon>
				<Icon name='flag' />
					Completado plan de manejo
				</Header>
			<Segment.Inline>
				<Button primary icon labelPosition="right" size="big" onClick={handleClick}>
					<Icon name="check" />
						Finalizar
					</Button>
			</Segment.Inline>
			<FormModal open={openDialog} closeModal={closeModal} header="Finalizar plan de manejo" onSave={finalizarElaboracion} loading={loading} >
				<Segment basic>
					<Header size="medium" textAlign="center" icon>
						<Icon name="warning" color="yellow" />
				¿Está seguro de finalizar la elaboración del plan y notificar al solicitante que puede proceder a su revisión y/o envío al INAB?
			</Header>
					<Header size="small" >
						<div>Asegúrese que:</div>
						<div>1. Los datos presentados sean correctos</div>
						<div>2. haber anexado todos los documentos solicitados</div>
						<div>El no hacerlo le ocasionará inconvenientes.</div>
					</Header>
				</Segment>
			</FormModal>
			{/* <Confirm
				header="Finalizar elaboración"
				content="¿Finalizar elaboración de plan de manejo? Revise bien la información ingresada antes de continuar."
				confirmButton="Confirmar"
				cancelButton="Cancelar"
				open={openDialog}
				onConfirm={finalizarElaboracion}
				onCancel={closeModal}
			/> */}
		</Segment>
	)
}
