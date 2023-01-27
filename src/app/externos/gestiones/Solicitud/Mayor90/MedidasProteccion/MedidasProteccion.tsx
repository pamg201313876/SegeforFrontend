import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import createUpdateMedidasProteccionDTO, { createNew } from 'dto/solicitud/Mayor90/CreateUpdateMedidasProteccionDTO'
import React, { useEffect, useState, useContext } from 'react'
import { Form, Header, Icon, Segment } from 'semantic-ui-react'
import MedidasProteccionError, { newMedidasProteccionError, validateForm2 } from './MedidasProteccionFormError'

type Props = {
	gestion: any
	setNextButtonDisabled: (disabled: boolean) => void
}

const gestionApi = new GestionApi();

export default function MedidasProteccion({
	gestion,
	setNextButtonDisabled
}: Props) {

	const dataContext = useContext(AppDataContext)
	const [formData, setFormData] = useState<createUpdateMedidasProteccionDTO>(createNew())
	const [formError, setFormError] = useState<MedidasProteccionError>(newMedidasProteccionError())
	const [isSaved, setIsSaved] = useState<boolean>(false)

	const handleChange = (_e: any, { name, value }: any) => {
		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}

	const onSave = () => {

		let formError = validateForm2(formData)
		setFormError(formError)

		if (!formError.isError) {

			let medidaProteccion = formData;
			medidaProteccion.ttGestion = {
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
					dataContext.successToast("Datos almacenados correctamente")
					setIsSaved(true)
				}
				else {
					dataContext.errorToast(res.data.message)
				}
				dataContext.desactivateLoading()
			}

			const handleError = (error: AxiosError) => {
				console.error(error)
				dataContext.desactivateLoading()
			}

			dataContext.activateLoading()
			gestionApi.agregarProteccionMayor90(medidaProteccion, handleResponse, handleError)
		}
	}

	useEffect(() => {
		if (gestion != null) {
			let medida = gestion.ttProteccionGestion
			if (medida !== null) {
				setIsSaved(true)
				setFormData(medida);
			}
		}
	}, [gestion])

	useEffect(() => {
		setNextButtonDisabled(!isSaved)
	}, [isSaved, setNextButtonDisabled])

	return (
		<Segment raised clearing>
			<Form>
				<Header >
					8.1. Medidas de prevencion contra incendios forestales							
				</Header>
				<Form.TextArea
					label="Descripción de las medidas de prevención contra Iincendios Forestales"
					name='justificacion'
					onChange={handleChange}
					error={formError ? formError.justificacion : null}
					value={formData ? formData.justificacion : ""}
				/>
				<Form.TextArea
					label="Descripcion sobre las Línea(s) de control y ronda(s) cortafuego"
					name='cortafuego'
					onChange={handleChange}
					error={formError ? formError.cortafuego : null}
					value={formData ? formData.cortafuego : ""}
				/>
				<Form.TextArea
					label="Descripcion de actividades de vigilancia: puesto(s) o punto(s) de control y recorridos por el área"
					name='vigilancia'
					onChange={handleChange}
					error={formError ? formError.vigilancia : null}
					value={formData ? formData.vigilancia : ""}
				/>
				<Form.TextArea
					label="Manejo de combustibles/Silvicultura preventiva (combustibles vivos y/o muertos)"
					name='combustible'
					onChange={handleChange}
					error={formError ? formError.combustible : null}
					value={formData ? formData.combustible : ""}
				/>
				<Form.TextArea
					label="Identificación de áreas críticas (topografía, combustibles, áreas mayormente susceptibles a incendios forestales en la periferia)"
					name='areaCritica'
					onChange={handleChange}
					error={formError ? formError.areaCritica : null}
					value={formData ? formData.areaCritica : ""}
				/>
				<Form.TextArea
					label="Respuesta en caso de incendios Forestales"
					name='respuestaIf'
					onChange={handleChange}
					error={formError ? formError.respuestaIf : null}
					value={formData ? formData.respuestaIf : ""}
				/>
				<Form.TextArea
					label="Ampliación de ronda donde existen mayores cargas de combustibles"
					name='ampliacionRonda'
					onChange={handleChange}
					error={formError ? formError.ampliacionRonda : null}
					value={formData ? formData.ampliacionRonda : ""}
				/>
				<Form.TextArea
					label="Rondas cortafuego intermedias"
					name='rondaCortafuego'
					onChange={handleChange}
					error={formError ? formError.rondaCortafuego : null}
					value={formData ? formData.rondaCortafuego : ""}
				/>
				<Form.TextArea
					label="Identificación de Rutas de Escape y Zonas de Seguridad"
					name='rutaEscape'
					onChange={handleChange}
					error={formError ? formError.rutaEscape : null}
					value={formData ? formData.rutaEscape : ""}
				/>
				<Header >
					8.2. Medidas de prevención contra plagas forestales
				</Header>
				<Form.TextArea
					label="Descripcion de las activiades de prevención contra plagas forestales"
					name='justificacionPf'
					onChange={handleChange}
					error={formError ? formError.justificacionPf : null}
					value={formData ? formData.justificacionPf : ""}
				/>
				<Form.TextArea
					label="Monitoreo de plagas forestales"
					name='monitoreoPlaga'
					onChange={handleChange}
					error={formError ? formError.monitoreoPlaga : null}
					value={formData ? formData.monitoreoPlaga : ""}
				/>
				<Form.TextArea
					label="Control de plagas forestales"
					name='controlPlaga'
					onChange={handleChange}
					error={formError ? formError.controlPlaga : null}
					value={formData ? formData.controlPlaga : ""}
				/>
				<Form.Button
					floated="right"
					primary
					icon
					labelPosition="right"
					onClick={onSave}>
					<Icon name="save" />
					Guardar
				</Form.Button>
			</Form>
		</Segment>
	)
}
