import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios';
import CreateUpdateCaracteristicasBiofisicasDTO, { createNew as newBiofisicas } from 'dto/solicitud/Hasta90/CreateUpdateCaracteristicasBiofisicasDTO';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';
import GestionApi from '../../../../../../api/GestionApi';
import CaracteristicasBiofisicasError, { newBiofisicasError, validateForm } from './BiofisicasFormError';

type Props = {
	gestion: any
	nextButtonRef: React.MutableRefObject<() => boolean>
}

const gestionApi = new GestionApi();

export default function Biofisicas({
	gestion,
	nextButtonRef
}: Props) {

	const dataContext = useContext(AppDataContext)
	const [formData, setFormData] = useState<CreateUpdateCaracteristicasBiofisicasDTO>(newBiofisicas());
	const [formError, setFormError] = useState<CaracteristicasBiofisicasError>(newBiofisicasError());
	const [isSaved, setIsSaved] = useState(false)

	const handleChange = (e: any, { name, value }: any) => {
		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}


	const onSave = () => {
		let formError = validateForm(formData)
		setFormError(formError)

		if (formError.isError) {
			dataContext.errorToast("Existen errores en el formulario. Ingrese los datos requeridos antes de continuar.")
		}

		else {
			let biofisica = formData;
			biofisica.ttGestion = {
				estadoId: gestion.estadoId,
				gestionId: gestion.gestionId,
				personaAnulaId: gestion.personaAnulaId,
				tcElaborador: gestion.tcElaborador,
				tcPersonaCrea: gestion.tcPersonaCrea,
				tcTipoBosque: gestion.tcTipoBosque,
				tcTipoGestion: gestion.tcTipoGestion,
				ttTipoPropietarioGestion: gestion.ttTipoPropietarioGestion
			};

			const handleResponse = (res: any) => {
				if (res.data.status === "OK") {
					setIsSaved(true)
					setFormError(formError)
					dataContext.successToast("Proceso exitoso")
				}
				else {
					dataContext.errorToast("Error al guardar la información. Intentelo de nuevo.")
				}
				dataContext.desactivateLoading()
			}

			const handleError = (error: AxiosError) => {
				console.error(error)
				dataContext.errorToast("Error al guardar la información. Intentelo de nuevo.")
				dataContext.desactivateLoading()
			}

			dataContext.activateLoading()

			gestionApi.agregarBiofisica(biofisica, handleResponse, handleError)
		}
	}

	useEffect(() => {
		if (gestion == null) {
			return
		}
		let biofisica = gestion.ttBiofisicaGestion
		let formError = newBiofisicasError()
		if (biofisica !== null) {
			setIsSaved(true)
			setFormError(formError)
			setFormData(() => (biofisica));
		}

	}, [gestion])

	//Validamos datos antes de continuar
	const isDataValid = (): boolean => {
		if(!isSaved){
			dataContext.errorToast("Debe de ingresar todos los datos requeridos")
		}

		return isSaved
	}

	const isDataValidCallback = useCallback(
		isDataValid,
		[isSaved],
	)

	useEffect(() => {
		nextButtonRef.current = isDataValidCallback
	}, [nextButtonRef, isDataValidCallback])

	return (
		<Segment raised style={{ paddingBottom: "14px" }} clearing>
			<Header >
				2. Descripción biofísica del área
			</Header>
			<Form style={{ marginBottom: "14px" }}>
				<Form.TextArea name='elevacion' label="Elevación" onChange={handleChange} error={formError ? formError.elevacion : null} value={formData ? formData.elevacion : ""} />
				<Form.TextArea name='topografia' label="Topografía" onChange={handleChange} error={formError ? formError.topografia : null} value={formData ? formData.topografia : ""} />
				<Form.TextArea name='clima' label="Características Climáticas" onChange={handleChange} error={formError ? formError.clima : null} value={formData ? formData.clima : ""} />
				<Form.TextArea name='hidrografia' label="Hidrografía" onChange={handleChange} error={formError ? formError.hidrografia : null} value={formData ? formData.hidrografia : ""} />
				<Form.TextArea name='zonaVida' label="Zona de vida (Holdrige)" onChange={handleChange} error={formError ? formError.zonaVida : null} value={formData ? formData.zonaVida : ""} />
				<Form.Button floated="right" primary onClick={onSave} icon labelPosition="right">
					<Icon name="save" />
					Guardar
				</Form.Button>
			</Form>
		</Segment>
	)
}
