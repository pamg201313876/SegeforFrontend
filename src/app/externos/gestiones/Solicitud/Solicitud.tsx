import NuevaGestionApi from 'api/generales/NuevaGestionApi'
import GestionApi from 'api/GestionApi'
import GestionHasta90Api from 'api/latifoliado/hasta90/GestionHasta90Api'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import Loading from 'components/Loading'
import CambioUltimoPanelDTO from 'dto/solicitud/CambioUltimoPanelDTO'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Button, Icon, Segment } from 'semantic-ui-react'
import Hasta90 from './Hasta90/Hasta90'
import Mayor90 from './Mayor90/Mayor90'
import styles from './Solicitud.module.css'
import SolicitudSteps, { SolicitudActivity } from './SolicitudSteps'

type Props = {
	gestionId: number
}

const gestionApi = new GestionApi()
const nuevaGestionApi = new NuevaGestionApi()
const gestionHasta90 = new GestionHasta90Api()

export default function Solicitud({
	gestionId
}: Props) {

	const dataContext = useContext(AppDataContext)
	const [gestion, setGestion] = useState<any>()
	const [init, setInit] = useState(false)
	const [step, setStep] = useState(SolicitudActivity.NULL)
	const tempStep = useRef(SolicitudActivity.NULL)
	const [lastStep, setLastStep] = useState(SolicitudActivity.NULL)
	const [isPreviousDisabled, setPreviousDisabled] = useState(false)
	const [nextButtonDisabled, setNextButtonDisabled] = useState(false)
	const [loading, setLoading] = useState(false)
	const nextButtonRef = useRef<() => boolean>(() => true)

	const handleResponse = (response: any) => {
		if (response.status === "OK" && response.data != null && response.data[0] != null) {
			setGestion(response.data[0])
		}
		else {
			dataContext.errorToast("No se pudo descargar los datos de la gestión. Recargue la pagina e intente de nuevo.")
		}
		setLoading(false)
	}

	const handleError = (error: AxiosError) => {
		console.error(error)
		dataContext.errorToast("No se pudo descargar los datos de la gestión. Recargue la pagina e intente de nuevo.")
		setLoading(false)
	}

	const getGestion = () => {
		setLoading(true)
		gestionHasta90.getGestion(gestionId, handleResponse, handleError)
	}

	const reloadGestion = () => {
		getGestion() //TODO Manejar recepción de gestiones mu
	}

	const previousStep = () => {
		changeTempStep(step - 1)
	}

	const changeTempStep = (step: SolicitudActivity) => {
		nextButtonRef.current = () => true
		setStep(SolicitudActivity.NULL)
		tempStep.current = step
		reloadGestion()
	}

	const nextStep = () => {
		if (nextButtonRef.current != null && nextButtonRef.current()) {
			let nextStep = step + 1
			cambiarPosicion(nextStep)
		}
	}

	const cambiarPosicion = (pos: number) => {
		const handleResponse = (res: any) => {
			changeTempStep(pos)
			console.log(res)
		}
		const handleError = (error: AxiosError) => {
			console.error(error)
		}
		let cambioUltimoPanel: CambioUltimoPanelDTO = {
			gestionId: gestionId,
			pos: pos + 1
		}
		nuevaGestionApi.cambiarPosicion(cambioUltimoPanel, handleResponse, handleError)
	}


	useEffect(() => {
		if (step === SolicitudActivity.NULL) {
			return
		}
		setNextButtonDisabled(false)
		setPreviousDisabled(false)
		if (step === SolicitudActivity.INFORMACION_GENERAL) {
			setPreviousDisabled(true)
		}
	}, [step])

	useEffect(() => {
		if (gestion != null) {
			if (!init) {
				tempStep.current = gestion.ultimoPanel - 1
				setInit(true)
			}
			else {
				console.log(gestion)
				setStep(tempStep.current)
				setLastStep(gestion.ultimoPanel - 1)
			}
		}
	}, [gestion, init])

	const callback = useCallback(reloadGestion, [gestionId])

	useEffect(() => {
		callback()
	}, [callback])

	return (
		<div style={{ height: "100%" }}  >
			<Segment.Group className={styles.box} >
				{!loading && <SolicitudSteps step={step} setStep={changeTempStep} lastStep={lastStep} />}
				<Segment className={styles.content}>
					{gestion != null && !loading ?
						gestion.area <= 90 ?
							<Hasta90
								step={step}
								gestion={gestion}
								nextButtonRef={nextButtonRef}
								setNextButtonDisabled={setNextButtonDisabled}
								setPrevButtonDisabled={setPreviousDisabled}
								reloadGestion={reloadGestion} />
							: <Mayor90
								step={step}
								gestion={gestion}
								nextButtonRef={nextButtonRef}
								setNextButtonDisabled={setNextButtonDisabled}
								setPrevButtonDisabled={setPreviousDisabled}
								reloadGestion={reloadGestion} />
						: null}
				</Segment>
				<Segment className={styles.footer}>
					<Button
						disabled={isPreviousDisabled}
						primary
						icon
						size="small"
						onClick={previousStep} >
						<Icon name='arrow left' />
					</Button>
					<Button
						size="small"
						disabled={step === SolicitudActivity.FINALIZAR || nextButtonDisabled}
						primary
						icon
						floated='right'
						onClick={nextStep}>
						<Icon name='arrow right' />
					</Button>
				</Segment>
			</Segment.Group>
			<Loading active={loading} />

		</div>
	)
}
