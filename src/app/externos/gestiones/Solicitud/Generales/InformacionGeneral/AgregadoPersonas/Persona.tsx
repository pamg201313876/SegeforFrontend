import GestionApi from 'api/GestionApi'
import PersonaApi from 'api/PersonaApi'
import { AxiosError } from 'axios'
import FormModal from 'components/FormModal'
import React, { useContext, useEffect, useState } from 'react'
import CreatePersonaDTO, { createNew } from '../../../../../../../dto/persona/CreatePersonaDTO'
import { AppDataContext } from '../../../../../../App'
import PersonaForm from './PersonaForm'
import PersonaFormError, { newPersonaFormError, validateForm } from './PersonaFormError'


type Props = {
	open: boolean
	closeModal: () => void
	ttGestion: any
	setPerson: (x: any) => void
	setRepre: (x: any) => void
	bandera: number
	noImage?: boolean
}

//variables utilizadas para actualizar perfil y token	
const personaApi = new PersonaApi()
const gestionApi = new GestionApi()

export default function Persona({
	open,
	closeModal,
	ttGestion,
	setPerson,
	setRepre,
	bandera,
	noImage = false
}: Props) {


	const dataContext = useContext(AppDataContext);

	const [usuarioDTO, setUsuarioDTO] = useState<any>()
	const [formData, setFormData] = useState<CreatePersonaDTO>(createNew())
	const [formError, setFormError] = useState<PersonaFormError>(newPersonaFormError())

	const onSave = () => {
		let formError = validateForm(formData, noImage)
		setFormError(formError)

		if (!formError.isError) {

			const handleResponse = (response: any) => {

				if (response.status === "OK") {

					let savedata = response.data[0]

					let addPersonaIndi = {
						personaGestionId: 0,
						representanteLegal: bandera,
						soloRepresenta: bandera,
						tcPersona: savedata,
						ttGestion: ttGestion
					}

					const handleResponsePersona = (response: any) => {

						if (response.data.status === "OK") {
							let newPersona = {
								codigo: savedata.cui,
								cui: savedata.cui,
								nombre: savedata.personaDesc,
								estadoCivil: savedata.tcEstadoCivil.estadoCivilDesc,
								sexo: savedata.tcSexo.sexoDesc,
								data: response.data.data[0]
							}
							//console.log(newPersona)


							if (bandera === 0) {
								setPerson(newPersona);
							}
							else if (bandera === 1) {
								setRepre(response.data.data[0])
							}

							//console.log(response);
							closeModal();

						} else {
							console.log("hubo un error")
							dataContext.errorToast(response.message)
						}

					}

					const handleErrorPersona = (error: any) => {
						console.error(error);
					}

					gestionApi.agregarPersonaIndividual(addPersonaIndi, handleResponsePersona, handleErrorPersona);

				} else {
					console.log("hubo un error")
					dataContext.errorToast(response.message)
				}
			}

			const handleError = (error: AxiosError) => {
				console.error(error)
			}

			let data = formData;
			personaApi.agregarPersona(data, handleResponse, handleError)
		}
	}

	useEffect(() => {

		if (usuarioDTO != null) {
			let tcPersona: CreatePersonaDTO = {
				personaDesc: usuarioDTO.personaDesc,
				cui: usuarioDTO.cui + "",
				fechaVencimiento: usuarioDTO.fechaVencimiento,
				tcMunicipio: usuarioDTO.tcMunicipio,
				direccion: usuarioDTO.direccion,
				telefono: usuarioDTO.telefono,
				correo: usuarioDTO.correo,
				foto: usuarioDTO.foto,
				fechaNacimiento: usuarioDTO.fechaNacimiento,
				tcCultura: usuarioDTO.tcCultura,
				tcIdioma: usuarioDTO.tcIdioma,
				tcEstadoCivil: usuarioDTO.tcEstadoCivil,
				tcSexo: usuarioDTO.tcSexo,
				estadoId: usuarioDTO.estadoId,
				nit: usuarioDTO.nit,
				tcOcupacion: usuarioDTO.tcOcupacion,
				municipoId: usuarioDTO.municipioId,
				//tcUsuarioSubregion: usuarioDTO.tcUsuarioSubregion, 
				//usuario: usuarioDTO.usuario
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
		if (open) {
			setFormData(createNew())
			setFormError(newPersonaFormError())
		}
	}, [open])


	if (open) {
		return (
			<>
				<FormModal size="large" header="Crear Persona" open={open} closeModal={closeModal} confirmLabel="Guardar" onSave={onSave} >
					<PersonaForm
						formError={formError}
						setFormData={setFormData}
						formData={formData}
						noImage={noImage}
					/>
				</FormModal>
			</>
		)
	}

	return null
}
