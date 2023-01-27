import AprovechamientoApi from 'api/latifoliado/hasta90/AprovechamientoApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import FormNumInput from 'components/FormNumInput'
import UpdateActividadesDTO from 'dto/gestion/latifoliado/hasta90/aprovechamiento/UpdateActividadesDTO'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Segment, Icon, Header } from 'semantic-ui-react'

type Props = {
	gestion: any
}

const aprovechamientoApi = new AprovechamientoApi()

export default function ActividadesAprovechamiento({
	gestion
}: Props) {

	const dataContext = useContext(AppDataContext);
	const [preAprovechamiento, setPreAprovechamiento] = useState<string>("")
	const [aprovechamiento, setAprovechamiento] = useState<string>("")
	const [tiempoEjecucionPrimerTurno, setTiempoEjecucionPrimerTurno] = useState<number>(0)
	const [postAprovechamiento, setPostAprovechamiento] = useState<string>("")

	const handleBlur = (e: any) => {

		let name = e.target.name
		let value = e.target.value

		switch (name) {

			case "preAprovechamiento":
				setPreAprovechamiento(value)
				break

			case "aprovechamiento":
				setAprovechamiento(value)
				break

			case "tiempoEjecucionPrimerTurno":
				setTiempoEjecucionPrimerTurno(Number(value))
				break

			case "postAprovechamiento":
				setPostAprovechamiento(value)
				break

		}
	}

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
		dataContext.errorToast("Error al descargar datos.")
		console.error(axiosError)
		dataContext.desactivateLoading()
	}

	const update = () => {

		let updateDto: UpdateActividadesDTO = {
			preAprovechamiento: preAprovechamiento,
			aprovechamiento: aprovechamiento,
			tiempoEjecucionPrimerTurno: tiempoEjecucionPrimerTurno,
			postAprovechamiento: postAprovechamiento
		}

		dataContext.activateLoading()
		aprovechamientoApi.updateActividades(gestion.gestionId, updateDto, handleResponse, handleError)

	}


	useEffect(() => {
		console.log(gestion)
		if (gestion != null && gestion.aprovechamientoGestion != null) {
			let aprovechamiento = gestion.aprovechamientoGestion
			setPreAprovechamiento(aprovechamiento.preAprovechamiento)
			setAprovechamiento(aprovechamiento.aprovechamiento)
			setTiempoEjecucionPrimerTurno(aprovechamiento.tiempoEjecucionPrimerTurno)
			setPostAprovechamiento(aprovechamiento.postAprovechamiento)
		}
	}, [gestion])

	return (
		<Segment raised clearing>
			<Header>7.2. Actividades a realizar durante ejecución de plan de manejo</Header>
			<Form>
				<Form.TextArea
					label="7.2.1. Actividades de preaprovechamiento"
					defaultValue={preAprovechamiento}
					name="preAprovechamiento"
					onBlur={handleBlur}
				/>
				<Form.TextArea
					label="7.2.2. Actividades de aprovechamiento"
					defaultValue={aprovechamiento}
					name="aprovechamiento"
					onBlur={handleBlur}
				/>
				<FormNumInput
					width={3}
					label="Tiempo requerido para la ejecución en el primer turno (meses)"
					value={tiempoEjecucionPrimerTurno}
					name="tiempoEjecucionPrimerTurno"
					onBlur={handleBlur}
				/>
				<Form.TextArea
					label="7.2.3. Actividades de post-aprovechamiento"
					defaultValue={postAprovechamiento}
					name="postAprovechamiento"
					onBlur={handleBlur}
				/>
				<Form.Button icon primary floated="right" labelPosition='right' onClick={update} >
					Guardar
								<Icon name="save" />
				</Form.Button>
			</Form>
		</Segment>
	)
}
