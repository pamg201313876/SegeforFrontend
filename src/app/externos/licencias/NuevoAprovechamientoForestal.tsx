import GestionApi from 'api/GestionApi';
import UsuarioPerfilSistemaApi from 'api/UsuarioPerfilSistemaApi';
import { AxiosError, AxiosResponse } from 'axios';
import FormCatalogSelect from 'components/FormCatalogSelect/FormCatalogSelect';
import FormNumInput from 'components/FormNumInput';
import NuevaGestionDTO from 'dto/NuevaGestionDTO';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';
import { AppDataContext } from '../../App';


type Props = {
	nombre: string
}

const usuarioPerfilSistemaApi = new UsuarioPerfilSistemaApi()
const gestionApi = new GestionApi()

export default function NuevoAprovechamientoForestal(props: Props) {

	//Datos del Form de creación DTO
	const [area, setArea] = useState(0)
	const [areaError, setAreaError] = useState<string>()
	const [elaborador, setElaborador] = useState<any>()
	const [elaboradorError, setElaboradorError] = useState<string>()
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	const appDataContext = useContext(AppDataContext);

	const handleResponse = (axiosResponse: AxiosResponse) => {
		setLoading(false)
		if (axiosResponse.data.status !== "error") {
			appDataContext.successToast("Proceso exitoso. Se ha enviado la gestión al elaborador solicitado.")
			history.push("/bandeja_solicitudes")
			setArea(0)
			setElaborador(null)
		}
		else {
			console.error(axiosResponse.data.message)
			appDataContext.errorToast("Hubo un error. Intentelo de nuevo.")
		}
	}

	const handleError = (error: AxiosError) => {
		setLoading(false)
		appDataContext.errorToast("Hubo un error. Intentelo de nuevo.")
		console.error(error)
	}

	const handleConfirm = () => {

		setAreaError(undefined)
		setElaboradorError(undefined)

		let areaNumber = Number(area)

		let error = false
		if(areaNumber === 0){
			setAreaError("El área a ingresar debe de ser mayor a 0")
			error = true
		}

		if(elaborador == null){
			setElaboradorError("Debe seleccionar un elaborador")
			error = true
		}

		if(error){
			return
		}

		let usuarioId = appDataContext.tokenData?.usuarioId

		let nuevaGestionDTO: NuevaGestionDTO = {
			area: areaNumber,
			categoriaProfesionId: 1,
			estadoId: 1,
			tcElaborador: elaborador.tcPersona,
			tcPersonaCrea: {
				personaId: usuarioId
			},
			tcTipoBosque: {
				tipoBosqueId: 3
			},
			tcTipoGestion: {
				tipoGestionId: 1
			}
		}


		setLoading(true)
		gestionApi.nuevaGestion(nuevaGestionDTO, handleResponse, handleError);


	}

	useEffect(() => {
		console.log(area, elaborador)
	}, [area, elaborador])

	return (
		<Segment placeholder style={{ height: "100%" }}>
			<Header size="huge" icon>
				<Icon name="file alternate" />
				Nuevo plan de manejo
			</Header>
			<Form>
					<FormNumInput
						name="hectareas"
						label="Área a intervenir"
						value={area}
						onBlur={(e: any) => setArea(e.target.value)}
						error={areaError}
					/>
					<FormCatalogSelect
						label="Elaborador del Plan de Manejo"
						name='idUsuarioElaborador'
						value={elaborador != null ? elaborador!!.usuarioId : 0}
						idName="usuarioId"
						labelName="nombre"
						fetchDataFunction={usuarioPerfilSistemaApi.getElaboradores}
						isUpward={false}
						handleChange={(_e, { object }) => setElaborador(object)}
						error={elaboradorError}
					/>
				<Form.Button
					size="medium"
					color="green"
					loading={loading}
					onClick={handleConfirm}
				>Guardar</Form.Button>
			</Form>
		</Segment>
	)

}
