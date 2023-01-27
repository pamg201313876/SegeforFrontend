import React, { useState, useEffect } from 'react'
import FormModal from 'components/FormModal'
import GestionApi from 'api/GestionApi'
import DocumentoFincaForm from './DocumentoFincaForm'
import DocumentoFincaFormError, { createFormError, validateForm } from './data/DocumentoFincaFormError';

type Props = {
	open: boolean
	closeModal: () => void
	gestion: any
	modifyFinca: (finca: any) => void
	fincaData: any
	propietarioTipo: any
	listIndividuales: any[]
};

const gestionApi = new GestionApi()

export default function DocumentoFincaFormModal(props: Props) {

	const [formDataUpdate, setFormDataUpdate] = useState<any>({})
	const [formError, setFormError] = useState<DocumentoFincaFormError>(createFormError())

	const handleUpdate = () => {

		const onResponse = (res: any) => {
			console.log(res)
			props.modifyFinca(res.data.data[0])
			props.closeModal()
		}

		const onError = (error: any) => {
			console.log(error)
		}

		let formError = validateForm(formDataUpdate)

		// Solamente se indica cuando es individual
		if (props.propietarioTipo.tcTipoPropietario.tipoPropietarioId === 1) {
			if (props.fincaData.propietarios === null || props.fincaData.propietarios.length === 0) {
				formError.propietarios = "Debe ingresar al menos un propietario"
				formError.isError = true
			}
		}

		setFormError(formError)

		if(!formError.isError){
			gestionApi.actualizarFinca(formDataUpdate, onResponse, onError)
		}

	}

	useEffect(() => {
		setFormDataUpdate({
			fincaGestionId: props.fincaData.fincaGestionId,
			estadoId: props.fincaData.estadoId,
			fechaRegistro: props.fincaData.fechaRegistro,
			tcFinca: props.fincaData.tcFinca,
			fechaEmision: props.fincaData.fechaEmision,
			notario: props.fincaData.notario,
			tcMunicipioEmite: props.fincaData.tcMunicipioEmite,
			numeroDocumento: props.fincaData.numeroDocumento,
			folio: props.fincaData.folio,
			libro: props.fincaData.libro,
			tcTipoPropiedad: props.fincaData.tcTipoPropiedad,
			tcLibro: props.fincaData.tcLibro,
			propietaro: props.fincaData.propietarios,
			personas: props.fincaData.personas,
			ttGestion: props.gestion
		})
	}, [props.fincaData, props.gestion])

	useEffect(() => {
		if (true) {
			setFormError(createFormError())
		}
	}, [props.open])


	return (
		<>
			<FormModal header="Información de Propiedad de Finca" open={props.open} closeModal={props.closeModal} confirmLabel="Guardar" onSave={handleUpdate} >
				<DocumentoFincaForm
					ttGestion={props.gestion}
					propietarioTipo={props.propietarioTipo}
					listIndividuales={props.listIndividuales}
					ttFincaGestion={props.fincaData}
					formData={formDataUpdate}
					setFormData={setFormDataUpdate}
					formError={formError}
				/>
			</FormModal>
		</>
	)
}
