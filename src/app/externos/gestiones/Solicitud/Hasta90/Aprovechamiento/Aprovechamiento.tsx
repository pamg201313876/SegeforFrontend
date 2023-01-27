import AprovechamientoApi from 'api/latifoliado/hasta90/AprovechamientoApi'
import TurnosApi from 'api/latifoliado/TurnosApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'
import ActividadesAprovechamiento from './ActividadesAprovechamiento'
import PlanificacionActividades from './ActividadesSilviculturales/PlanificacionActividades'
import DescripcionSistemaRepoblacion from './DescripcionSistemaRepoblacion/DescripcionSistemaRepoblacion'
import DetalleIntervencion from './DetalleIntervencion/DetalleIntervencion'
import Garantia from './Garantia'
import PropuestaAprovechamientoGestion from './PropuestaAprovechamiento'

type Props = {
	gestion: any
}


export type SistemaRepoblacion = {
	especieId: number
	especie: any
	estrato: number
	turno: number
	area: number
	anio: number
	densidadInicial: number
	tcSistemaRepoblacion: any
}

export type ActividadSilvicultural = {
	especies: any[]
	turno: number
	area: number
	establecimiento: string
	mantenimiento1: string
	mantenimiento2: string
	mantenimiento3: string
}

export type SistemaRepoblacionValor = {
	tcSistemaRepoblacion: any,
	valor: number
}

const aprovechamientoApi = new AprovechamientoApi()
const turnosApi = new TurnosApi()

export default function Aprovechamiento({
	gestion
}: Props) {

	const dataContext = useContext(AppDataContext);
	const [aprovechamientoDTO, setAprovechamientoDTO] = useState<any>()
	const [aprovechamientoGestion, setAprovechamientoGestion] = useState<any>()
	const [descripcionSistema, setDescripcionSistema] = useState<SistemaRepoblacion[]>([])
	const [volumenTotal, setVolumenTotal] = useState<number>(0)
	// const [cicloAprovechamiento, setCicloAprovechamiento] = useState<number>(0)
	// const [cicloCorta, setCicloCorta] = useState<number>(0)
	// const [cortaPeriodicaPermisible, setCortaPeriodicaPermisible] = useState<number>(0)
	const [numTurnos, setNumTurnos] = useState<number>(1)
	const [tiempoEjecucionPrimerTurno, setTiempoEjecucionPrimerTurno] = useState()
	const [tipoGarantia, setTipoGarantia] = useState<any>()
	const [actividadesSilviculturales, setActividadesSilviculturales] = useState<ActividadSilvicultural[]>([])
	const [preAprovechamiento, setPreAprovechamiento] = useState()
	const [aprovechamiento, setAprovechamiento] = useState()
	const [postAprovechamiento, setPostAprovechamiento] = useState()
	const [valoresSistemaRepoblacion, setValoresSistemaRepoblacion] = useState<any[]>([])
	const [sistemasCatalog, setSistemasCatalog] = useState<SistemaRepoblacionValor[]>([])


	const activateLoading = useCallback(dataContext.activateLoading, [])
	const desactivateLoading = useCallback(dataContext.desactivateLoading, [])

	const handleUpdateResponse = (res: any) => {
		desactivateLoading()
		if (res.status === "OK") {
			dataContext.successToast("Datos guardados satisfactoriamente")
		}
		else {
			dataContext.errorToast("Error al guardar informacion")
		}
	}

	const handleUpdateError = (axiosError: AxiosError) => {
		desactivateLoading()
		console.error(axiosError)
		dataContext.errorToast("Error al guardar informacion")
	}

	const handleDetalleUpdate = (reloadCalculos: boolean = false) => {
		// save(reloadCalculos, false)
	}

	const handleSistemaAdd = (sistemaRepoblacion: SistemaRepoblacion) => {
		let copy = descripcionSistema.slice()
		copy.push(sistemaRepoblacion)
		setDescripcionSistema(copy)
		// save(true, true, copy)
	}

	const handleSistemaDelete = (sistemaRepoblacion: SistemaRepoblacion) => {
		let copy = descripcionSistema.slice()
		let index = copy.findIndex(element => element.especieId === sistemaRepoblacion.especieId
			&& element.estrato === sistemaRepoblacion.estrato)
		if (index !== -1) {
			copy.splice(index, 1)
			setDescripcionSistema(copy)
			// save(true, true, copy)
		}
	}


	const handleSistemaUpdate = () => {
		let copy = descripcionSistema.slice()
		setDescripcionSistema(copy)
		// save(false, false)
	}

	const save = () => {
		saveData(false)
	}

	const saveReload = () => {
		saveData(true)
	}

	const saveData = (reloadCalculos: boolean) => {

		const handleResponse = (res: any) => {
			desactivateLoading()
			if (res.status === "OK") {
				if (reloadCalculos) {
					// getCalculos()
				}
				dataContext.successToast("Datos guardados satisfactoriamente")
			}
			else {
				dataContext.errorToast("Error al guardar informacion")
			}
		}

		const handleError = (axiosError: AxiosError) => {
			console.error(axiosError)
			dataContext.errorToast("Error al guardar informacion")
			desactivateLoading()
		}


		let descripcionSistemaRepoblacion: any[] = []


		for (let sistema of descripcionSistema) {
			let saveDescripcionSistema: any = {
				estrato: sistema.estrato,
				especieId: sistema.especieId,
				densidadInicial: sistema.densidadInicial,
				tcSistemaRepoblacion: sistema.tcSistemaRepoblacion,
			}
			descripcionSistemaRepoblacion.push(saveDescripcionSistema);
		}


		let saveActividadesList: any[] = []

		for (let actividad of actividadesSilviculturales) {

			let especies: any = []

			for (let e of actividad.especies) {
				especies.push(e.especieId)
			}

			let saveActividad: any = {
				especies: especies,
				turno: actividad.turno,
				establecimiento: actividad.establecimiento,
				mantenimiento1: actividad.mantenimiento1,
				mantenimiento2: actividad.mantenimiento2,
				mantenimiento3: actividad.mantenimiento3
			}

			saveActividadesList.push(saveActividad)
		}


		// let saveAprovechamiento: SaveAprovechamientoDTO = {
		// 	ttGestionId: gestion.gestionId,
		// 	cicloAprovechamiento: cicloAprovechamiento,
		// 	cicloCorta: cicloCorta,
		// 	numTurnos: numTurnos,
		// 	tiempoEjecucionPrimerTurno: tiempoEjecucionPrimerTurno,
		// 	tipoGarantia: tipoGarantia,
		// 	preAprovechamiento: preAprovechamiento,
		// 	aprovechamiento: aprovechamiento,
		// 	postAprovechamiento: postAprovechamiento,
		// 	detalleIntervencion: saveDetalleList,
		// 	actividadSilviculturales: saveActividadesList,
		// 	descripcionSistemaRepoblacion: descripcionSistemaRepoblacion
		// }

		// activateLoading()
		// aprovechamientoApi.save(saveAprovechamiento, handleResponse, handleError)

	}

	const getActividades = () => {

		const handleResponse = (res: any) => {
			if (res.status === "OK") {
				let turnosActividades = res.data[0]
				setActividadesSilviculturales(turnosActividades)
			}
			else {
				console.error("entro en error")
				dataContext.errorToast("Error al descargar datos.")
			}

			desactivateLoading()
		}

		const handleError = (axiosError: AxiosError) => {
			dataContext.errorToast("Error al descargar datos.")
			console.error(axiosError)
			desactivateLoading()
		}

		turnosApi.getTurnosActividades(gestion.gestionId, handleResponse, handleError)

	}

	const getCalculos = () => {

		const handleResponse = (res: any) => {
			if (res.status === "OK") {
				let aprovechamiento = res.data[0]
				setAprovechamientoDTO(aprovechamiento)
				setVolumenTotal(aprovechamiento.volumenTotal)
				getActividades()
				// let descripcionSistemaRepoblacion: SistemaRepoblacion[] = []

				// for (let estrato of aprovechamiento.sistemaRepoblacion.estratos) {
				// 	for (let especie of estrato.especies) {
				// 		let turnoSistema: SistemaRepoblacion = {
				// 			especieId: especie.tcEspecie.especieId,
				// 			especie: especie.tcEspecie,
				// 			estrato: estrato.estrato,
				// 			turno: estrato.turno,
				// 			area: estrato.area,
				// 			anio: estrato.anio,
				// 			densidadInicial: especie.densidadInicial,
				// 			tcSistemaRepoblacion: especie.tcSistemaRepoblacion
				// 		}
				// 		descripcionSistemaRepoblacion.push(turnoSistema)
				// 	}
				// }

				// setDescripcionSistema(descripcionSistemaRepoblacion)
				// setValoresSistemaRepoblacion(aprovechamiento.sistemaRepoblacion.valores)

				// let actividadesSilviculturales: ActividadSilvicultural[] = []

				// for (let actividadTurno of aprovechamiento.actividadesSilviculturales.turnos) {

				// 	let actividadSilvicultural: ActividadSilvicultural = {
				// 		especies: actividadTurno.especies,
				// 		area: actividadTurno.area,
				// 		turno: actividadTurno.turno,
				// 		establecimiento: actividadTurno.establecimiento,
				// 		mantenimiento1: actividadTurno.mantenimiento1,
				// 		mantenimiento2: actividadTurno.mantenimiento2,
				// 		mantenimiento3: actividadTurno.mantenimiento3
				// 	}
				// 	actividadesSilviculturales.push(actividadSilvicultural)
				// }

				// setActividadesSilviculturales(actividadesSilviculturales)
			}
			else {
				console.error("entro en error")
				dataContext.errorToast("Error al descargar datos.")
				desactivateLoading()
			}

		}

		const handleError = (axiosError: AxiosError) => {
			dataContext.errorToast("Error al descargar datos.")
			console.error(axiosError)
			desactivateLoading()
		}

		if (gestion != null) {
			activateLoading()
			aprovechamientoApi.getCalculos(gestion.gestionId, handleResponse, handleError)
		}

		else {
			desactivateLoading()
		}
	}

	const handleSaveSistemaRepoblacion = () => {
		//save()

		const handleResponse = (res: any) => {
			desactivateLoading()
			if (res.status === "OK") {
				dataContext.successToast("Datos guardados satisfactoriamente")
			}
			else {
				dataContext.errorToast("Error al guardar informacion")
			}
		}

		const handleError = (axiosError: AxiosError) => {
			dataContext.errorToast("Error al descargar datos.")
			console.error(axiosError)
			desactivateLoading()
		}

		let sistemasRepoblacion: any[] = []

		for (let s of sistemasCatalog) {
			let saveSistemaRepoblacionDTO: any = {
				id: s.tcSistemaRepoblacion.sistemaRepoblacionId,
				valor: s.valor
			}
			sistemasRepoblacion.push(saveSistemaRepoblacionDTO)
		}

		let saveSistemasRepoblacionDTO: any = {
			ttGestionId: gestion.gestionId,
			sistemasRepoblacion: sistemasRepoblacion
		}

		// aprovechamientoApi.saveSistemasRepoblacion(saveSistemasRepoblacionDTO, handleResponse, handleError)

	}


	const getCalculosCallback = useCallback(getCalculos, [gestion])

	useEffect(() => {
		getCalculosCallback()
	}, [getCalculosCallback])

	// useEffect(() => {
	// 	console.log(cicloCorta)
	// 	if (cicloCorta === 0) {
	// 		setCortaPeriodicaPermisible(0)
	// 	}
	// 	else {
	// 		console.log("entra aqui")
	// 		let cortaPeriodica = (volumenTotal * cicloAprovechamiento) / cicloCorta
	// 		setCortaPeriodicaPermisible(roundDouble(cortaPeriodica))
	// 	}
	// }, [volumenTotal, cicloAprovechamiento, cicloCorta])

	useEffect(() => {
		if (gestion != null && gestion.aprovechamientoGestion != null) {
			let aprovechamiento = gestion.aprovechamientoGestion;
			setAprovechamientoGestion(aprovechamiento)
			setTiempoEjecucionPrimerTurno(aprovechamiento.tiempoEjecucionPrimerTurno)
			setPreAprovechamiento(aprovechamiento.preAprovechamiento)
			setAprovechamiento(aprovechamiento.aprovechamiento)
			setPostAprovechamiento(aprovechamiento.postAprovechamiento)
		}
	}, [gestion])

	// useEffect(() => {
	// 	let sistemas: SistemaRepoblacionValor[] = []
	// 	for (let sistemaRep of descripcionSistema) {
	// 		let index = sistemas.findIndex(s => s.tcSistemaRepoblacion.sistemaRepoblacionId === sistemaRep.tcSistemaRepoblacion.sistemaRepoblacionId)
	// 		if (index === -1) {
	// 			let sistemaRepoblacionValor: SistemaRepoblacionValor = {
	// 				tcSistemaRepoblacion: sistemaRep.tcSistemaRepoblacion,
	// 				valor: 0
	// 			}
	// 			for (let valor of valoresSistemaRepoblacion) {
	// 				if (valor.tcSistemaRepoblacion.sistemaRepoblacionId === sistemaRep.tcSistemaRepoblacion.sistemaRepoblacionId) {
	// 					sistemaRepoblacionValor.valor = valor.valor
	// 				}
	// 			}
	// 			sistemas.push(sistemaRepoblacionValor)
	// 		}
	// 	}
	// 	setSistemasCatalog(sistemas)
	// }, [descripcionSistema, valoresSistemaRepoblacion])

	return (
		<div>
			<>
				<Form>
					<PropuestaAprovechamientoGestion gestion={gestion} volumenTotal={volumenTotal} />
					<Garantia gestion={gestion} />
					<DetalleIntervencion gestion={gestion} detalleIntervencion={aprovechamientoDTO?.detalleIntervencion} getCalculos={getCalculos} />
					<ActividadesAprovechamiento
						gestion={gestion}
					/>
					{/* <Segment raised clearing>
						<Header>
							7.3. Recuperación de la masa forestal
							</Header>
						<Recuperacion
							sistemasCatalog={sistemasCatalog}
						/>
						<Header size="small">
							7.3.1. Descripción de sistema de repoblación forestal
						</Header> */}
						<DescripcionSistemaRepoblacion
								gestion={gestion}
								getCalculos={getCalculos}
								descripcionSistemaRepoblacion={aprovechamientoDTO?.sistemaRepoblacion}
								// sistemasRepoblacion={descripcionSistema}
								// handleSistemaUpdate={handleSistemaUpdate}
								// handleSistemaAdd={handleSistemaAdd}
								// handleSistemaDelete={handleSistemaDelete}
							/>
						{/* <Form.Button icon primary floated="right" labelPosition='right' onClick={saveReload} >
							Guardar
									<Icon name="save" />
						</Form.Button>
					</Segment> */}
					<PlanificacionActividades
						gestion={gestion}
						actividadesSilviculturales={actividadesSilviculturales}
					/>
				</Form>
			</>
		</div>
	)
}
