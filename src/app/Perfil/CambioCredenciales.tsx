import UsuarioApi from 'api/UsuarioApi';
import { AxiosError } from 'axios';
import FormModal from 'components/FormModal';
import CreateUpdateClaveUsuarioDTO, { createNew } from 'dto/usuario/CreateUpdateClaveUsuarioDTO';
import CreateUsuarioDTO from 'dto/usuario/CreateUsuarioDTO';
import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import CambioCredencialesFormError, { newCambioCredencialesError, validateForm } from './CambioCredencialesError';


type Props = {
	open: boolean
	tcPersona: CreateUsuarioDTO
	closeModal: () => void
}

export default function CambioCredenciales(props: Props) {
	const [formError, setFormError] = useState<CambioCredencialesFormError>(newCambioCredencialesError())
	const [formData, setFormData] = useState<CreateUpdateClaveUsuarioDTO>(createNew())
	const usuarioApi = new UsuarioApi()

	const onSave = () => {
		let formError = validateForm(formData)
		setFormError(formError)
		
		if (!formError.isError) {
			const handleResponse = () => {
				alert("Contraseña actualizada correctamente")
			}
	
			const handleError = (error: AxiosError) => {
				console.error(error)
			}
	
			formData.usuarioId = props.tcPersona.personaId;
			formData.usuario = props.tcPersona.personaDesc;
			formData.claveUsuario = btoa(formData.claveUsuario);
			formData.oldPassword = btoa(formData.oldPassword);
			console.log("formData Cambio contraseña")
			console.log(formData)
			
			usuarioApi.cambiarClave(formData, handleResponse, handleError)
			//personaApi.actualizarUsuario(id, data, handleResponse, handleError)
		}
	}

	const handleChange = (e: any, { name, value }: any) => {
		value = (e.target.type === 'number') ? parseInt(value) : value

		if (e.target.type === 'number' && isNaN(value)) {
			value = ""
		}

		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}
	
	return (
		<FormModal header="Cambio de contraseña" open={props.open} closeModal={props.closeModal} confirmLabel="Confirmar" onSave={onSave} >
			<Form>
				<Form.Input
					label='Usuario'
					name='usuario'
					required={true}
					value={props.tcPersona ? props.tcPersona?.tcUsuario?.usuario : ``}
					//disabled={true}
				/>
                <Form.Input
					label='Contraseña actual'
					name='oldPassword'
					required={true}
					defaultValue=""
					onChange={handleChange}
					error={formError ? formError.oldPassword : null}
					type='password' />
                <Form.Input
					label='Contraseña nueva'
					name='claveUsuario'
					onChange={handleChange}
					required={true}
					defaultValue=""
					error={formError ? formError.claveUsuario: null}
					type='password' />
                <Form.Input
					label='Confirmar contraseña'
					name='confirmacion'
					onChange={handleChange}
					required={true}
					defaultValue=""
					error={formError ? formError.confirmacion : null}
					type='password' />
			</Form>

		</FormModal>
	)
}
