import PersonaApi from 'api/PersonaApi'
import { AxiosError } from 'axios'
import FormModal from 'components/FormModal'
import TokenResponseDTO from 'dto/auth/TokenResponseDTO'
import CodigoPerfil from 'dto/perfil/CodigoPerfil'
import CreateUsuarioDTO from 'dto/usuario/CreateUsuarioDTO'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
import { createNew } from '../../dto/usuario/CreateUsuarioDTO'
import { AppDataContext } from '../App'
import CambioCredenciales from './CambioCredenciales'
import CambioElaborador from './CambioElaborador'
import PerfilForm from './PerfilForm'
import PerfilFormError, { newPerfilFormError, validateForm } from './PerfilFormError'

type Props = {
	open: boolean
	closeModal: () => void
}

const personaApi = new PersonaApi()

export default function Perfil(props: Props) {

	//variables utilizadas para actualizar perfil y token	
	const appDataContext = useContext(AppDataContext);

	const [usuarioDTO, setUsuarioDTO] = useState<any>()
	const [codigoPerfil, setCodigoPerfil] = useState<CodigoPerfil>()
	const [formData, setFormData] = useState<CreateUsuarioDTO>(createNew())
	const [formError, setFormError] = useState<PerfilFormError>(newPerfilFormError())
	const [responseError, setResponseError] = useState<string | null>(null)
	const [openElaborador, setOpenElaborador] = useState<boolean>(false)
	const [openCredenciales, setOpenCredenciales] = useState<boolean>(false)

	const onSave = () => {
		let formError = validateForm(formData)
		setFormError(formError)
		if (!formError.isError) {
			const handleResponse = () => {
				appDataContext.successToast("Datos actualizados correctamente")
				props.closeModal()
			}

			const handleError = (error: AxiosError) => {
				console.error(error)
				appDataContext.errorToast("Error al actualizar los datos")
			}

			let id = parseInt(formData.personaId);
			let data = formData;
			// data.nit = convertNit(formData.nit)
			personaApi.actualizarUsuario(id, data, handleResponse, handleError)
		}
	}

	useEffect(() => {
		if (usuarioDTO != null) {
			
			let nit = usuarioDTO.nit.split('-').join('')

			let tcPersona: CreateUsuarioDTO = {
				personaId: usuarioDTO.personaId,
				personaDesc: usuarioDTO.personaDesc,
				cui: usuarioDTO.cui + "",
				fechaVencimiento: usuarioDTO.fechaVencimiento,
				tcMunicipio: usuarioDTO.tcMunicipio,
				direccion: usuarioDTO.direccion,
				telefono: usuarioDTO.telefono,
				correo: usuarioDTO.correo,
				foto: usuarioDTO.foto,
				tcUsuario: usuarioDTO.tcUsuario,
				fechaNacimiento: usuarioDTO.fechaNacimiento,
				tcCultura: usuarioDTO.tcCultura,
				tcIdioma: usuarioDTO.tcIdioma,
				tcEstadoCivil: usuarioDTO.tcEstadoCivil,
				tcSexo: usuarioDTO.tcSexo,
				estadoId: usuarioDTO.estadoId,
				fechaRegistro: usuarioDTO.fechaRegisto,
				confirmado: usuarioDTO.confirmado,
				nit: nit,
				fechaUltModif: usuarioDTO.fecha,
				tcOcupacion: usuarioDTO.tcOcupacion,
				sigla: usuarioDTO.sigla,
				rfn: usuarioDTO.rfn,
				rf: usuarioDTO.rf,
				tcUsuarioSubregion: usuarioDTO.tcUsuarioSubregion,
				usuario: usuarioDTO.usuario
			}
			setFormData(tcPersona)
		}
		else {
			let tcPersona: any = {

			}
			setFormData(tcPersona)
		}
	}, [usuarioDTO])

	useEffect(() => {
		if (props.open) {

			setResponseError(null)
			setFormError(newPerfilFormError())

			const handleResponse = (response: any) => {
				let usuario = response && response.data ? response.data[0] : null;
				setUsuarioDTO(usuario)
				console.log(usuario)
			}

			const handleError = () => {
				setResponseError("Error")
			}

			let tokenData = localStorage.getItem("tokenData")
			if (tokenData != null) {
				let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
				setCodigoPerfil(tokenObj.perfil.codigo)
				personaApi.getMiUsuario(tokenObj.usuarioId, handleResponse, handleError)
			}

		}
	}, [props.open])

	const cambioContrasenia = (
		<Button color="blue" floated="right" onClick={() => setOpenCredenciales(true)} content="Cambio de contraseña" />
	)

	const cambioElaborador = (
		<Button color="olive" floated="right" onClick={() => setOpenElaborador(true)} >Cambiar a elaborador</Button>
	)

	const buttons = () => (
		<>
			{cambioContrasenia}
			{codigoPerfil === CodigoPerfil.Solicitante && cambioElaborador}
		</>
	)

	const header = () => (
		<Header size="small" >
			Mi perfil
			{buttons()}
		</Header>
	)

	return (
		<>
			<CambioCredenciales open={openCredenciales} closeModal={() => setOpenCredenciales(false)} tcPersona={formData} />
			<CambioElaborador nit={formData.nit} open={openElaborador} closeModal={() => setOpenElaborador(false)} />
			<FormModal size="large" header={header()} open={props.open} closeModal={props.closeModal} confirmLabel="Modificar datos" onSave={onSave} >
				<PerfilForm
					formError={formError}
					setFormData={setFormData}
					formData={formData} />
			</FormModal>
		</>
	)
}
