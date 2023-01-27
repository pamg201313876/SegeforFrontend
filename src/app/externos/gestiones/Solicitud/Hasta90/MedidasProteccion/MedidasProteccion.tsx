import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import CreateUpdateMedidasProteccionDTO, { createNew } from 'dto/solicitud/Hasta90/CreateUpdateMedidasProteccionDTO'
import React, { useEffect, useState, useContext } from 'react'
import { Form, Header, Icon, Segment } from 'semantic-ui-react'
import MedidasProteccionError, { newMedidasProteccionError, validateForm } from './MedidasProteccionFormError'

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
	const [formData, setFormData] = useState<CreateUpdateMedidasProteccionDTO>(createNew())
	const [formError, setFormError] = useState<MedidasProteccionError>(newMedidasProteccionError())
	const [isSaved, setIsSaved] = useState<boolean>(false)

	const handleChange = (_e: any, { name, value }: any) => {
		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}

	const onSave = () => {

		let formError = validateForm(formData)
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
			gestionApi.agregarProteccionHasta90(medidaProteccion, handleResponse, handleError)
		}
	}

	useEffect(() => {
		if (gestion != null) {
			let medida = gestion.ttlhProteccionGestion
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
					8.1. Patrullajes de control y vigilancia contra talas ilicitas
				</Header>
				<Form.TextArea
					label="Recorridos perimetrales"
					name='recorridosPerimetrales'
					onChange={handleChange}
					error={formError ? formError.recorridosPerimetrales : null}
					value={formData ? formData.recorridosPerimetrales : ""}
				/>
				<Form.TextArea
					label="Recorridos internos"
					name='recorridosInternos'
					onChange={handleChange}
					error={formError ? formError.recorridosInternos : null}
					value={formData ? formData.recorridosInternos : ""}
				/>
				<Header >
					8.2. Prevención de incendios forestales
				</Header>
				<Form.TextArea
					label="Identificación de áreas críticas"
					name='identificacionAreasCriticas'
					onChange={handleChange}
					error={formError ? formError.identificacionAreasCriticas : null}
					value={formData ? formData.identificacionAreasCriticas : ""}
				/>
				<Form.TextArea
					label="Contrucción de brechas o rondas perimetrales cortafuego"
					name='construccionBrechasRondasPerimetrales'
					onChange={handleChange}
					error={formError ? formError.construccionBrechasRondasPerimetrales : null}
					value={formData ? formData.construccionBrechasRondasPerimetrales : ""}
				/>
				<Form.TextArea
					label="Construcción de brechas intermedias cortafuego"
					name='construccionBrechasIntermedias'
					onChange={handleChange}
					error={formError ? formError.construccionBrechasIntermedias : null}
					value={formData ? formData.construccionBrechasIntermedias : ""}
				/>
				<Form.TextArea
					label="Manejo de combustible y/o silvicultura preventiva"
					name='manejoCombustibleSilviculturaPreventiva'
					onChange={handleChange}
					error={formError ? formError.manejoCombustibleSilviculturaPreventiva : null}
					value={formData ? formData.manejoCombustibleSilviculturaPreventiva : ""}
				/>
				<Form.TextArea
					label="Identificación de puntos de monitoreo"
					name='identificacionPuntosMonitoreo'
					onChange={handleChange}
					error={formError ? formError.identificacionPuntosMonitoreo : null}
					value={formData ? formData.identificacionPuntosMonitoreo : ""}
				/>
				<Form.TextArea
					label="Patrullajes de monitoreo terrestre"
					name='patrullajesMonitoreoTerrestre'
					onChange={handleChange}
					error={formError ? formError.patrullajesMonitoreoTerrestre : null}
					value={formData ? formData.patrullajesMonitoreoTerrestre : ""}
				/>
				<Form.TextArea
					label="Capacitación de personal"
					name='capacitacionPersonal'
					onChange={handleChange}
					error={formError ? formError.capacitacionPersonal : null}
					value={formData ? formData.capacitacionPersonal : ""}
				/>
				<Form.TextArea
					label="Equipación"
					name='equipacion'
					onChange={handleChange}
					error={formError ? formError.equipacion : null}
					value={formData ? formData.equipacion : ""}
				/>
				<Header >
					8.3. Control y liquidación de incendios forestales
				</Header>
				<Form.TextArea
					label="Medidas a implementar en el control y liquidación de incendios"
					name='medidasImplementarControlLiquidacionIncendios'
					onChange={handleChange}
					error={formError ? formError.medidasImplementarControlLiquidacionIncendios : null}
					value={formData ? formData.medidasImplementarControlLiquidacionIncendios : ""}
				/>
				<Form.TextArea
					label="Monitoreo y evaluación de incendios"
					name='monitoreoEvaluacionIncendios'
					onChange={handleChange}
					error={formError ? formError.monitoreoEvaluacionIncendios : null}
					value={formData ? formData.monitoreoEvaluacionIncendios : ""}
				/>
				<Header >
					8.4. Prevención contra plagas y enfermedades forestales
				</Header>
				<Form.TextArea
					label="Medidas de prevención contra plagas y enfermedades"
					name='medidasPrevencionContraPlagasEnfermedades'
					onChange={handleChange}
					error={formError ? formError.medidasPrevencionContraPlagasEnfermedades : null}
					value={formData ? formData.medidasPrevencionContraPlagasEnfermedades : ""}
				/>
				<Form.TextArea
					label="Medidas de control contra plagas y enfermedades"
					name='medidasControlContraPlagasEnfermedades'
					onChange={handleChange}
					error={formError ? formError.medidasControlContraPlagasEnfermedades : null}
					value={formData ? formData.medidasControlContraPlagasEnfermedades : ""}
				/>
				<Form.TextArea
					label="Monitoreo de plagas y enfermedades"
					name='monitoreoPlagasEnfermedades'
					onChange={handleChange}
					error={formError ? formError.monitoreoPlagasEnfermedades : null}
					value={formData ? formData.monitoreoPlagasEnfermedades : ""}
				/>
				<Header >
					8.5. Otras actividades
				</Header>
				<Form.TextArea
					name='otrasActividades'
					onChange={handleChange}
					error={formError ? formError.otrasActividades : null}
					value={formData ? formData.otrasActividades : ""}
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
