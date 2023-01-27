import BridgeApi from 'api/BridgeApi'
import UsuarioPerfilSistemaApi from 'api/UsuarioPerfilSistemaApi'
import { AppDataContext } from 'app/App'
import { AxiosError, AxiosResponse } from 'axios'
import FormModal from 'components/FormModal'
import TokenResponseDTO from 'dto/auth/TokenResponseDTO'
import ValidarElaboradorDTO from 'dto/bridge/ValidarElaboradorDTO'
import UsuarioPerfilSistemaDTO from 'dto/perfil/UsuarioPerfilSistemaDTO'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Message } from 'semantic-ui-react'
import { isBlankString } from 'utils/UtilFunctions'

type Props = {
	nit: string,
	open: boolean
	closeModal: () => void
}

const usaurioPerfilSistemaApi = new UsuarioPerfilSistemaApi()
const bridgeApi = new BridgeApi()

export default function CambioElaborador({
	nit,
	open,
	closeModal
}: Props) {

	const appDataContext = useContext(AppDataContext)
	const [rfn, setRfn] = useState("")
	const [rfnError, setRfnError] =useState<string | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [usuarioPerfilDTO, setUsuarioPerfilDTO] = useState<UsuarioPerfilSistemaDTO>()

	const handleResponse = (axiosResponse: AxiosResponse) => {
		appDataContext.desactivateLoading()
		if (axiosResponse.data.status === "error") {
			setErrorMessage(axiosResponse.data.message)
		}

		else {
			appDataContext.successToast(axiosResponse.data.message)
			closeModal()
			setErrorMessage(null)
		}

	}

	const handleError = (axiosError: AxiosError) => {
		appDataContext.desactivateLoading()
		setErrorMessage("Hubo un error, vuelva a intentarlo")
	}

	const save = () => {

		if (usuarioPerfilDTO == null) {
			console.error("No se pudo conseguir la data de usuarioPerfilSistema")
			return
		}

		if (isBlankString(rfn)) {
			setErrorMessage("Debe de ingresar la llave")
			return
		}

		usuarioPerfilDTO.rfn = rfn
		appDataContext.activateLoading()
		usaurioPerfilSistemaApi.cambiarAElaborador(usuarioPerfilDTO, handleResponse, handleError)

	}

	const validateData = () => {
		
		setErrorMessage(null)
		setRfnError(null)

		let error = false
		
		if(rfn == null || isBlankString(rfn)){
			setRfnError("Campo requerido")
			error = true
		}

		if(error){
			return
		}
		
		let data : ValidarElaboradorDTO = {
			nit: nit,
			rnf: rfn
		}

		const hResponse = (res: AxiosResponse) => {
			appDataContext.desactivateLoading()
			if (res.data.status === "error") {
				setErrorMessage(res.data.message)
			}
			else {
				save()
			}
		}

		appDataContext.activateLoading()
		bridgeApi.validarElaborador(data, hResponse, handleError)
	}

	useEffect(() => {
		let tokenData = localStorage.getItem("tokenData")

		const handleResponse = (dto: UsuarioPerfilSistemaDTO) => {
			console.log(dto)
			setUsuarioPerfilDTO(dto)
		}

		const handleError = (error: any) => {
			console.log(error)
		}

		if (tokenData != null) {
			let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
			console.log(tokenObj)
			console.log(tokenObj.usuarioId)
			usaurioPerfilSistemaApi.get(tokenObj.usuarioId, handleResponse, handleError)
		} else {

		}
	}, [])

	return (
		<FormModal header="Cambio a elaborador" open={open} closeModal={closeModal} confirmLabel="Confirmar" onSave={validateData} >
			<Form>
				<Form.Input
					label='NIT'
					name='nit'
					value={nit}
					readOnly
					/>
				<Form.Input
					label='Número de registro en el RFN'
					placeholder='Número de registro en el RFN (Incluya EPMF-)'
					name='rfn'
					value={rfn}
					error={rfnError}
					onChange={(_e, { value }) => setRfn(value)} />
			</Form>
			<Message
				hidden={errorMessage === null}
				error
				content={errorMessage}
			/>
		</FormModal>
	)
}
