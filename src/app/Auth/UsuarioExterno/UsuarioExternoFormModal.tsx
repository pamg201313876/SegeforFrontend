import PersonaApi from 'api/PersonaApi';
import { AppDataContext } from 'app/App';
import CustomModal from 'components/CustomModal'
import CreateSolicitanteDTO, { createNew } from 'dto/usuario/CreateSolicitanteDTO';
import React, { useContext, useState } from 'react'
import { convertNit } from 'utils/UtilFunctions';
import { UsuarioExternoForm } from './UsuarioExternoForm';
import UsuarioExternoFormError, { newUsuarioExternoFormError, validateForm } from './UsuarioExternoFormError';

type Props = {
	open: boolean,
	closeModal: () => void
}

const personaApi = new PersonaApi()

export default function UsuarioExternoFormModal({
	open,
	closeModal
}: Props) {

	const appDataContext = useContext(AppDataContext)
	const [formData, setFormData] = useState<CreateSolicitanteDTO>(createNew());
	const [formError, setFormError] = useState<UsuarioExternoFormError>(newUsuarioExternoFormError());

	React.useEffect(() => {
		setFormError(newUsuarioExternoFormError())
		setFormData(createNew())
	}, [open]);

	const onSuccessResponse = (response: any) => {
		appDataContext.successToast(response.message)
	}

	const sendData = (onResponse: (responseData: any) => void, onError: (error: any) => void) : boolean => {
		let formError = validateForm(formData)
		setFormError(formError)
		if (!formError.isError) {
			
			let data: CreateSolicitanteDTO = {
				personaDesc: formData.personaDesc,
				nit: convertNit(formData.nit),
				cui: formData.cui,
				fechaVencimiento: formData.fechaVencimiento,
				direccion: formData.direccion,
				fechaNacimiento: formData.fechaNacimiento,
				telefono: formData.telefono,
				correo: formData.correo,
				foto: formData.foto,
				tcMunicipio: formData.tcMunicipio,
				tcOcupacion: formData.tcOcupacion,
				tcCultura: formData.tcCultura,
				tcIdioma: formData.tcIdioma,
				tcEstadoCivil: formData.tcEstadoCivil,
				tcSexo: formData.tcSexo,
				usuario: {
					usuario: formData.usuario.usuario,
					claveUsuario: btoa(formData.usuario.claveUsuario)
				},
				repassword: formData.repassword
			}
			personaApi.registrarNuevoUsuario(data, onResponse, onError)
			return true
		}
		return false
	}

	return (
		<CustomModal
			size="large"
			open={open}
			closeModal={closeModal}
			header="Nuevo usuario"
			apiFunction={sendData}
			onSuccessResponse={onSuccessResponse}
		>
			<UsuarioExternoForm formData={formData} setFormData={setFormData} formError={formError} />
		</CustomModal>
	)
}
