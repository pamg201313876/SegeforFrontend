import AuthApi from 'api/AuthApi'
import { Form, Modal, Input } from 'components/Form'
import React, { useContext } from 'react'
import { object, SchemaOf, requiredString} from 'components/Yup'
import { AppDataContext } from 'app/App'

type Props = {
	open: boolean,
	closeModal: () => void
}

const authApi = new AuthApi()

type LlaveAcceso = {
	llave: string
}

const validationSchema: SchemaOf<LlaveAcceso> = object({
	llave: requiredString()
})

export default function ValidarLlave({
	open,
	closeModal
}: Props) {

	const appDataContext = useContext(AppDataContext)

	const onSuccess = (res: any) => {
		closeModal()
		appDataContext.showAlertMessage(res.message, "Llave aceptada con éxito")
	}

	const onError = () => {
		appDataContext.errorToast("Llave ingresada no es válida")
	}

	const handleSubmit = (data: LlaveAcceso, onResponse: (res: any) => void, onError: (error: any) => void) => {
		authApi.validarLlave(data.llave, onResponse, onError)
	}

	return (
		<Modal header="Validar llave de acceso" open={open} closeModal={closeModal} >
			<Form 
				submitButtonIcon="check" 
				submitButtonLabel="Validar" 
				onSubmit={handleSubmit}  
				validationSchema={validationSchema} 
				onSuccess={onSuccess}
				noSuccessMessage
				onError={onError}
				>
				<Input name="llave" label="Llave" />
			</Form>
		</Modal>
	)
}
