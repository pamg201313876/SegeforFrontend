import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import DepartamentoMunicipioSelect from 'components/DepartamentoMunicipioSelect'
import TipoRepresentacionSelect from 'components/FormCatalogSelect/catalogs/TipoRepresentacionSelect'
import FormNumInput from 'components/FormNumInput'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Icon } from 'semantic-ui-react'
import { isBlankString, isDateGreaterThanToday, isNumber } from 'utils/UtilFunctions'

type DatosRepresentacion = {
	tipoRepresentacion?: any,
	fechaAutorizacion?: string,
	numeroEscritura?: number,
	municipio?: any,
	notario?: string,
	inscripcion?: number,
	folio?: number,
	libro?: string,
	inscritoEn?: string
}

type DatosRepresentacionError = {
	tipoRepresentacion?: string,
	fechaAutorizacion?: string,
	numeroEscritura?: string,
	municipio?: string,
	notario?: string,
	inscripcion?: string,
	folio?: string,
	libro?: string,
	inscritoEn?: string
}

const gestionApi = new GestionApi()

type Props = {
	gestion: any
}

export default function DatosRepresentacion({
	gestion
}: Props) {

	const appDataContext = useContext(AppDataContext)
	const [formData, setFormData] = useState<DatosRepresentacion>({})
	const [formError, setFormError] = useState<DatosRepresentacionError>({})

	const setData = (name: string, value: any) => {
		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}

	const handleTipoRepresentacionChange = (_e: any, { name, value }: any) => {
		setData(name, value)
	}

	const handleMunicipioChange = (_e: any, { name, object }: any) => {
		setData(name, object)
	}

	const handleBlur = (e: any) => {
		let name = e.target.name
		let value = e.target.value
		setData(name, value)
	}

	const handleResponse = (response: any) => {
		if (response.data.status === "OK") {
			appDataContext.successToast("Datos guardados exitosamente")
		}
		else {
			appDataContext.errorToast(response.message)
		}
		appDataContext.desactivateLoading();
	}

	const handleError = (error: AxiosError) => {
		console.error(error)
		appDataContext.errorToast("Error al guardar la información. Vuelva a intentarlo")
		appDataContext.desactivateLoading();
	}

	const dataValid = (): boolean => {

		let isDataValid = true
		let noValueError = "Este campo no puede estar vacio"
		let formError: DatosRepresentacionError = {}

		if (formData.tipoRepresentacion == null) {
			formError.tipoRepresentacion = noValueError;
			isDataValid = false
		}

		if (formData.fechaAutorizacion == null || isBlankString(formData.fechaAutorizacion)) {
			formError.fechaAutorizacion = noValueError;
			isDataValid = false
		}

		else if(isDateGreaterThanToday(formData.fechaAutorizacion)){
			formError.fechaAutorizacion = "Fecha inválida";
			isDataValid = false
		}

		let tipoId = formData.tipoRepresentacion.tipoRepresentacionId
		if (tipoId === 2 || tipoId === 3 || tipoId === 4) {
			if (formData.numeroEscritura == null || !isNumber(formData.numeroEscritura)) {
				formError.numeroEscritura = noValueError;
				isDataValid = false
			}
		}

		if (formData.municipio == null) {
			formError.municipio = noValueError;
			isDataValid = false
		}

		if (formData.notario == null || isBlankString(formData.notario)) {
			formError.notario = noValueError;
			isDataValid = false
		}

		if (formData.inscripcion == null || !isNumber(formData.inscripcion)) {
			formError.inscripcion = noValueError;
			isDataValid = false
		}

		if (formData.folio == null || !isNumber(formData.folio)) {
			formError.folio = noValueError;
			isDataValid = false
		}

		if (formData.libro == null || isBlankString(formData.libro)) {
			formError.libro = noValueError;
			isDataValid = false
		}

		if (formData.inscritoEn == null || isBlankString(formData.inscritoEn)) {
			formError.inscritoEn = noValueError;
			isDataValid = false
		}

		setFormError(formError)

		return isDataValid
	}

	const handleSave = () => {

		if (!dataValid()) {
			return;
		}

		
		let numeroEscritura = null
		let tipoId = formData.tipoRepresentacion.tipoRepresentacionId
		if (tipoId === 2 || tipoId === 3 || tipoId === 4){
			numeroEscritura = formData.numeroEscritura 
		}

		let body = {
			ttGestion: gestion,
			folio: formData.folio,
			fecha: formData.fechaAutorizacion,
			libro: formData.libro,
			numero: formData.inscripcion,
			numeroEscritura: numeroEscritura,
			notario: formData.notario,
			tcMunicipio: formData.municipio,
			tcTipoRepresentacion: formData.tipoRepresentacion,
			lugarInscripcion: formData.inscritoEn
		}

		appDataContext.activateLoading();
		gestionApi.representanteLegal(body, handleResponse, handleError)
	}

	useEffect(() => {
		if (gestion != null && gestion.ttRepresentanteGestion != null) {
			let representacionGestion = gestion.ttRepresentanteGestion
			let data: DatosRepresentacion = {
				tipoRepresentacion: representacionGestion.tcTipoRepresentacion,
				fechaAutorizacion: representacionGestion.fecha,
				numeroEscritura: representacionGestion.numeroEscritura,
				municipio: representacionGestion.tcMunicipio,
				notario: representacionGestion.notario,
				inscripcion: representacionGestion.numero,
				folio: representacionGestion.folio,
				libro: representacionGestion.libro,
				inscritoEn: representacionGestion.lugarInscripcion
			}
			setFormData(data)
		}
	}, [gestion])

	return (
		<Form>

			<Form.Group >
				<TipoRepresentacionSelect
					width="10"
					name="tipoRepresentacion"
					value={formData.tipoRepresentacion}
					onChange={handleTipoRepresentacionChange}
					error={formError.tipoRepresentacion}
				/>
				{formData.tipoRepresentacion != null
					&&
					(formData.tipoRepresentacion.tipoRepresentacionId === 2 ||
						formData.tipoRepresentacion.tipoRepresentacionId === 3 ||
						formData.tipoRepresentacion.tipoRepresentacionId === 4
					) ?
					<FormNumInput
						width="3"
						label='No. Escritura pública'
						name='numeroEscritura'
						onlyDigits
						onBlur={handleBlur}
						value={formData.numeroEscritura}
						error={formError.numeroEscritura}
					/>
					: null
				}
				<Form.Input
					width="3"
					type="date"
					label='Fecha de autorización'
					name='fechaAutorizacion'
					onBlur={handleBlur}
					defaultValue={formData.fechaAutorizacion}
					error={formError.fechaAutorizacion} />
			</Form.Group>
			<Form.Group>
				<DepartamentoMunicipioSelect
					municipioValue={formData.municipio}
					onChange={handleMunicipioChange}
					departamentoLabel="Departamento autorización"
					municipioLabel="Municipio autorización"
					municipioName="municipio"
					upward={false}
					municipioError={formError.municipio} />
			</Form.Group>
			<Form.Group widths="equal">
				<Form.Input
					label="Nombre del notario"
					name="notario"
					defaultValue={formData.notario}
					onBlur={handleBlur}
					error={formError.notario}
				/>
				<FormNumInput
					label="No. de inscripción"
					name="inscripcion"
					onlyDigits
					maxLength={9}
					value={formData.inscripcion}
					onBlur={handleBlur}
					error={formError.inscripcion}
				/>
				<FormNumInput
					label="Documento / Folio"
					name="folio"
					onlyDigits
					value={formData.folio}
					onBlur={handleBlur}
					placeholder="Número de folio"
					error={formError.folio}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Input
					width="4"
					label="Libro / Poder"
					name="libro"
					defaultValue={formData.libro}
					onBlur={handleBlur}
					error={formError.libro}
				/>
				<Form.Input
					width='12'
					label="Inscrita en"
					name="inscritoEn"
					defaultValue={formData.inscritoEn}
					onBlur={handleBlur}
					error={formError.inscritoEn}
					placeholder='Ejemplo: Registro electrónico de poderes, Registro Mercantil, etc.'
				/>
			</Form.Group>
			<Form.Button floated="right" onClick={handleSave} color="green" icon labelPosition="right" >
				<Icon name="save" />
				Guardar
			</Form.Button>
		</Form>
	)
}
