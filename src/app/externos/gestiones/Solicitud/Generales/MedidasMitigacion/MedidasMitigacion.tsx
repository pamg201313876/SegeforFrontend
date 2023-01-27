import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios'
import CreateUpdateMedidasMitigacionDTO, { createNew } from 'dto/solicitud/Hasta90/CreateUpdateMedidasMitigacionDTO'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Segment, Table, Icon } from 'semantic-ui-react';
import Medida, { createMedida } from './Medida'
import MedidasMitigacionFormError, { newMedidasMitigacionError, validateForm } from './MedidasMitigacionFormError'
import MitigacionRow from './MitigacionRow'

type Props = {
	gestion: any
	setNextButtonDisabled: (disabled: boolean) => void
}

const gestionApi = new GestionApi();

export default function MedidasMitigacion({
	gestion,
	setNextButtonDisabled
}: Props) {

	const dataContext = useContext(AppDataContext)
	const [reserva, setReserva] = useState<Medida>(createMedida("Reserva de árboles semilleros, protección, remanentes", false))
	const [cortaLianas, setCortaLianas] = useState<Medida>(createMedida("Corta de lianas", false))
	const [delimitacionUnidadManejo, setDelimitacionUnidadManejo] = useState<Medida>(createMedida("Delimitación de unidad de manejo", false))
	const [delimitacionAreasProduccion, setDelimitacionAreasProduccion] = useState<Medida>(createMedida("Delimitación áreas de producción y protección ", false))
	const [manejoDesechos, setManejoDesechos] = useState<Medida>(createMedida("Manejo de desechos sólidos y líquidos", false))
	const [prevencionIncendios, setPrevencionIncendios] = useState<Medida>(createMedida("Prevención y control de incendios forestales", false))
	const [prevencionPlagas, setPrevencionPlagas] = useState<Medida>(createMedida("Prevención y control de plagas y enfermedades", false))
	const [mantenimientoLinderos, setMantenimientoLinderos] = useState<Medida>(createMedida("Mantenimiento de linderos", false))
	const [talaDirigida, setTalaDirigida] = useState<Medida>(createMedida("Tala dirigida (tumba e impacto a vegetación remanente)", false))
	const [caminoSecundario, setCaminoSecundario] = useState<Medida>(createMedida("Camino secundario ancho (3.5 m a 4 m)", false))
	const [caminoArrastre, setCaminoArrastre] = useState<Medida>(createMedida("Camino de arrastre ancho (3 m a 3,5 m) ", false))
	const [bacadilla, setBacadilla] = useState<Medida>(createMedida("Bacadilla (no mayor de 2,500 m²)", false))
	const [clarosTumba, setClarosTumba] = useState<Medida>(createMedida("Claros de tumba ( entre 250 a 300 m²)", false))
	const [maquinariaLiviana, setMaquinariaLiviana] = useState<Medida>(createMedida("Uso maquinaria liviana ", false))
	const [arrastreTransporte, setArrastreTransporte] = useState<Medida>(createMedida("Arrastre y transporte (solo época seca)", false))
	const [proteccionFuentesAgua, setProteccionFuentesAgua] = useState<Medida>(createMedida("Protección fuentes agua de acuerdo a lineamientos técnicos", false))
	const [proteccionSitios, setProteccionSitios] = useState<Medida>(createMedida("Protección sitios arqueólogicos y/o culturales", false))
	const [reservaArboles, setReservaArboles] = useState<Medida>(createMedida("Reserva de árboles para alimento y anidación de aves", false))
	const [manejoDesechos2, setManejoDesechos2] = useState<Medida>(createMedida("Manejo de desechos sólidos y líquidos", false))
	const [dispercionResiduos, setDispercionResiduos] = useState<Medida>(createMedida("Dispersión de residuos en los sitios de tumba y caminos forestales.", false))
	const [cierreCaminos, setCierreCaminos] = useState<Medida>(createMedida("Cierre de caminos secundarios.", false))
	const [tratamientosSilviculturales, setTratamientosSilviculturales] = useState<Medida>(createMedida("Tratamientos y prácticas silviculturales", false))
	const [repoblacionForestal, setRepoblacionForestal] = useState<Medida>(createMedida("Actividades de repoblación forestal", false))
	const [formData, setFormData] = useState<CreateUpdateMedidasMitigacionDTO>(createNew())
	const [formError, setFormError] = useState<MedidasMitigacionFormError>(newMedidasMitigacionError())
	const [isSaved, setIsSaved] = useState(false)

	const onSave = () => {
		let formError = validateForm(formData)
		setFormError(formError)
		if (!formError.isError) {
			let medidaMitigacion: CreateUpdateMedidasMitigacionDTO = {
				reserva: reserva.value,
				cortaLianas: cortaLianas.value,
				delimitacionUnidadManejo: delimitacionUnidadManejo.value,
				delimitacionAreasProduccion: delimitacionAreasProduccion.value,
				manejoDesechosPreAprovechamiento: manejoDesechos.value,
				prevencionIncendios: prevencionIncendios.value,
				prevencionPlagas: prevencionPlagas.value,
				mantenimientoLinderos: mantenimientoLinderos.value,
				talaDirigida: talaDirigida.value,
				caminoSecundario: caminoSecundario.value,
				caminoArrastre: caminoArrastre.value,
				bacadilla: bacadilla.value,
				clarosTumba: clarosTumba.value,
				maquinariaLiviana: maquinariaLiviana.value,
				arrastreTransporte: arrastreTransporte.value,
				proteccionFuentesAgua: proteccionFuentesAgua.value,
				proteccionSitios: proteccionSitios.value,
				reservaArboles: reservaArboles.value,
				manejoDesechosAprovechamiento: manejoDesechos2.value,
				dispercionResiduos: dispercionResiduos.value,
				cierreCaminos: cierreCaminos.value,
				tratamientosSilviculturales: tratamientosSilviculturales.value,
				repoblacionForestal: repoblacionForestal.value,
				otrasActividades: formData.otrasActividades,
				ttGestion: {
					estadoId: gestion.estadoId,
					gestionId: gestion.gestionId,
					personaAnulaId: gestion.personaAnulaId,
					tcElaborador: gestion.tcElaborador,
					tcPersonaCrea: gestion.tcPersonaCrea,
					tcTipoBosque: gestion.tcTipoBosque,
					tcTipoGestion: gestion.tcTipoGestion,
					ttTipoPropietarioGestion: gestion.ttTipoPropietarioGestion
				}
			};

			const handleResponse = (res: any) => {
				if (res.data.status === "OK") {
					setIsSaved(true)
					dataContext.successToast("Datos almacenados correctamente")
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
			gestionApi.agregarMitigacion(medidaMitigacion, handleResponse, handleError)
		}
	}

	const refreshData = (data: CreateUpdateMedidasMitigacionDTO) => {
		setReserva(createMedida("Reserva de árboles semilleros, protección, remanentes", data.reserva))
		setCortaLianas(createMedida("Corta de lianas", data.cortaLianas))
		setDelimitacionUnidadManejo(createMedida("Delimitación de unidad de manejo", data.delimitacionUnidadManejo))
		setDelimitacionAreasProduccion(createMedida("Delimitación áreas de producción y protección ", data.delimitacionAreasProduccion))
		setManejoDesechos(createMedida("Manejo de desechos sólidos y líquidos", data.manejoDesechosPreAprovechamiento))
		setPrevencionIncendios(createMedida("Prevención y control de incendios forestales", data.prevencionIncendios))
		setPrevencionPlagas(createMedida("Prevención y control de plagas y enfermedades", data.prevencionPlagas))
		setMantenimientoLinderos(createMedida("Mantenimiento de linderos", data.mantenimientoLinderos))
		setTalaDirigida(createMedida("Tala dirigida (tumba e impacto a vegetación remanente)", data.talaDirigida))
		setCaminoSecundario(createMedida("Camino secundario ancho (3.5 m a 4 m)", data.caminoSecundario))
		setCaminoArrastre(createMedida("Camino de arrastre ancho (3 m a 3,5 m) ", data.caminoArrastre))
		setBacadilla(createMedida("Bacadilla (no mayor de 2,500 m²)", data.bacadilla))
		setClarosTumba(createMedida("Claros de tumba ( entre 250 a 300 m²)", data.clarosTumba))
		setMaquinariaLiviana(createMedida("Uso maquinaria liviana ", data.maquinariaLiviana))
		setArrastreTransporte(createMedida("Arrastre y transporte (solo época seca)", data.arrastreTransporte))
		setProteccionFuentesAgua(createMedida("Protección fuentes agua de acuerdo a lineamientos técnicos", data.proteccionFuentesAgua))
		setProteccionSitios(createMedida("Protección sitios arqueólogicos y/o culturales", data.proteccionSitios))
		setReservaArboles(createMedida("Reserva de árboles para alimento y anidación de aves", data.reservaArboles))
		setManejoDesechos2(createMedida("Manejo de desechos sólidos y líquidos", data.manejoDesechosAprovechamiento))
		setDispercionResiduos(createMedida("Dispersión de residuos en los sitios de tumba y caminos forestales.", data.dispercionResiduos))
		setCierreCaminos(createMedida("Cierre de caminos secundarios.", data.cierreCaminos))
		setTratamientosSilviculturales(createMedida("Tratamientos y prácticas silviculturales", data.tratamientosSilviculturales))
		setRepoblacionForestal(createMedida("Actividades de repoblación forestal", data.repoblacionForestal))
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

	useEffect(() => {
		if (gestion != null) {
			let mitigacion = gestion.ttMitigacionGestion
			if (mitigacion !== null) {
				setIsSaved(true)
				setFormData(mitigacion);
				refreshData(mitigacion)
			}
		}
	}, [gestion])

	useEffect(() => {
		setNextButtonDisabled(!isSaved)
	}, [isSaved, setNextButtonDisabled])

	return (
		<Segment raised clearing>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width={8} > Actividades pre-aprovechamiento </Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >Si</Table.HeaderCell>
						<Table.HeaderCell textAlign="center" >No</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<MitigacionRow medida={reserva} setMedida={setReserva} />
					<MitigacionRow medida={cortaLianas} setMedida={setCortaLianas} />
					<MitigacionRow medida={delimitacionUnidadManejo} setMedida={setDelimitacionUnidadManejo} />
					<MitigacionRow medida={delimitacionAreasProduccion} setMedida={setDelimitacionAreasProduccion} />
					<MitigacionRow medida={manejoDesechos} setMedida={setManejoDesechos} />
					<MitigacionRow medida={prevencionIncendios} setMedida={setPrevencionIncendios} />
					<MitigacionRow medida={prevencionPlagas} setMedida={setPrevencionPlagas} />
					<MitigacionRow medida={mantenimientoLinderos} setMedida={setMantenimientoLinderos} />
				</Table.Body>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width={8} colSpan={3} > Actividades durante aprovechamiento </Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<MitigacionRow medida={talaDirigida} setMedida={setTalaDirigida} />
					<MitigacionRow medida={caminoSecundario} setMedida={setCaminoSecundario} />
					<MitigacionRow medida={caminoArrastre} setMedida={setCaminoArrastre} />
					<MitigacionRow medida={bacadilla} setMedida={setBacadilla} />
					<MitigacionRow medida={clarosTumba} setMedida={setClarosTumba} />
					<MitigacionRow medida={maquinariaLiviana} setMedida={setMaquinariaLiviana} />
					<MitigacionRow medida={arrastreTransporte} setMedida={setArrastreTransporte} />
					<MitigacionRow medida={proteccionFuentesAgua} setMedida={setProteccionFuentesAgua} />
					<MitigacionRow medida={proteccionSitios} setMedida={setProteccionSitios} />
					<MitigacionRow medida={reservaArboles} setMedida={setReservaArboles} />
					<MitigacionRow medida={manejoDesechos2} setMedida={setManejoDesechos2} />
				</Table.Body>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width={8} colSpan={3} > Actividades post-aprovechamiento </Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<MitigacionRow medida={dispercionResiduos} setMedida={setDispercionResiduos} />
					<MitigacionRow medida={cierreCaminos} setMedida={setCierreCaminos} />
					<MitigacionRow medida={tratamientosSilviculturales} setMedida={setTratamientosSilviculturales} />
					<MitigacionRow medida={repoblacionForestal} setMedida={setRepoblacionForestal} />
				</Table.Body>
			</Table>
			<Form>
				<Form.TextArea
					label="Otras actividades"
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
