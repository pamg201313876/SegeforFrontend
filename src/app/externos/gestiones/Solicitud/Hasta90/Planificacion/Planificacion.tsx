import EspeciesProtegerApi from 'api/latifoliado/EspeciesProtegerApi'
import { planificacionApi } from 'api/latifoliado/hasta90'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import UpdateDmcDTO from 'dto/gestion/latifoliado/hasta90/planificacion/UpdateDmcDTO'
import UpdateEspecieProtegerDTO from 'dto/gestion/latifoliado/UpdateEspecieProtegerDTO'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Form, Header, Icon, Segment } from 'semantic-ui-react'
import AnalisisCorta from './Analisis/AnalisisCorta'
import ParametroAnalisis from './Analisis/ParametroAnalisis'
import EspeciesAprovechar from './EspeciesAprovechar/EspeciesAprovechar'
import Proteccion from './Proteccion/Proteccion'
import Remanentes from './Remanentes/Remanentes'
import ResumenCensoMayorDMC from './ResumenCensoMayorDMC/ResumenCensoMayorDMC'
import SistemaYCiclo from './SistemaYCiclo'

type Props = {
	gestion: any
	nextButtonRef: React.MutableRefObject<() => boolean>
}

export type Validation = {
	sistemaYCiclo: boolean,
	analisis: boolean
}

export type EspecieDMC = {
	especieId: number
	nombreCientifico: string,
	nombreComun: string,
	habilitado: boolean
	dmc: number
	justificacion: string
}

export type EspecieProteger = {
	especieId: number
	codigo: string
	nombreCientifico: string
	nombreComun: string
	justificacion: string
}


export type EspecieEstratoIc = {
	especieId: number
	estratoId: number
	ic: number
	extraer: ParametroAnalisis
	registros: any[]
}

const especieProtegerApi = new EspeciesProtegerApi()


export default function Planificacion({
	gestion,
	nextButtonRef
}: Props) {
	const appDataContext = useContext(AppDataContext);
	const isMounted = useRef(false)
	const [planificacionDTO, setPlanificacionDTO] = useState<any>()
	const [especiesDMC, setEspeciesDMC] = useState<EspecieDMC[]>([])
	const [especiesProteger, setEspeciesProteger] = useState<EspecieProteger[]>([])
	const [especiesEstratoIc, setEspeciesEstratoIc] = useState<EspecieEstratoIc[]>([])
	const [validation] = useState<Validation>({
		sistemaYCiclo: false,
		analisis: false
	})
	const activateLoading = useCallback(appDataContext.activateLoading, [])
	const desactivateLoading = useCallback(appDataContext.desactivateLoading, [])
	const errorToast = useCallback(appDataContext.errorToast, [])

	const handleUpdateResponse = (res: any) => {
		desactivateLoading()
		if (res.status === "OK") {
			appDataContext.successToast("Datos guardados satisfactoriamente")
		}
		else {
			appDataContext.errorToast("Error al guardar informacion")
		}
	}

	const handleResponseRecalcular = (res: any) => {
		desactivateLoading()
		if (res.status === "OK") {
			getCalculos()
			appDataContext.successToast("Datos guardados satisfactoriamente")
		}
		else {
			appDataContext.errorToast("Error al guardar informacion")
		}
	}

	const handleUpdateError = (axiosError: AxiosError) => {
		desactivateLoading()
		appDataContext.errorToast("Error al guardar informacion")
	}

	const handleEspeciesProtegerAdd = (especieProteger: EspecieProteger) => {
		let copy = especiesProteger.slice()
		copy.push(especieProteger)
		setEspeciesProteger(copy)
	}

	const handleDeleteEspecieProteger = (especieProteger: EspecieProteger) => {
		let copy = especiesProteger.slice()
		let index = copy.findIndex(element => element.especieId === especieProteger.especieId)
		if (index !== -1) {
			copy.splice(index, 1)
			setEspeciesProteger(copy)
		}
	}

	const updateEspeciesProteger = () => {
		let updateList: UpdateEspecieProtegerDTO[] = []
		especiesProteger.forEach(e => {
			let saveEspecieProteger: UpdateEspecieProtegerDTO = {
				tcEspecieId: e.especieId,
				justificacion: e.justificacion
			}
			updateList.push(saveEspecieProteger)
		});

		activateLoading()
		especieProtegerApi.updateEspeciesProteger(gestion.gestionId, updateList, handleUpdateResponse, handleUpdateError)
	}

	const getCalculos = () => {
		const handleResponse = (res: any) => {
			if (isMounted.current) {
				if (res.status === "OK" && isMounted.current) {
					let planificacion = res.data[0]
					setPlanificacionDTO(planificacion)
					let especieDmcList: EspecieDMC[] = []
					planificacion.especiesDMC.forEach((e: any) => {
						let especieDMC: EspecieDMC = {
							nombreCientifico: e.tcEspecie.nombreCientifico,
							nombreComun: e.tcEspecie.especieDesc,
							especieId: e.tcEspecie.especieId,
							habilitado: e.habilitado,
							dmc: e.dmc,
							justificacion: e.justificacion
						}
						especieDmcList.push(especieDMC)
					});
					setEspeciesDMC(especieDmcList)

					let especiesEstratoIcList: EspecieEstratoIc[] = []
					planificacion.analisisCortaDTO.estratos.forEach((estrato: any) => {
						estrato.especies.forEach((e: any) => {
							let especieEstratoIc: EspecieEstratoIc = {
								especieId: e.tcEspecie.especieId,
								estratoId: estrato.estrato,
								ic: e.ic,
								registros: e.registrosBoletaSanos,
								extraer: {
									numeroArboles: 0,
									ab: 0,
									vol: 0
								}
							}
							especiesEstratoIcList.push(especieEstratoIc)
						});
					});
					setEspeciesEstratoIc(especiesEstratoIcList)

				}
				else {
					errorToast("Error al descargar datos.")
				}
				desactivateLoading()
			}
		}

		const handleError = (axiosError: AxiosError) => {
			console.error(axiosError)
			errorToast("Error al descargar datos.")
			desactivateLoading()
		}

		if (gestion != null) {
			activateLoading()
			planificacionApi.getCalculos(gestion.gestionId, handleResponse, handleError)
		}

		else {
			desactivateLoading()
		}
	}

	const getEspeciesProteger = () => {

		const handleResponse = (res: any) => {
			if (isMounted.current) {
				if (res.status === "OK") {
					let especiesProteger = res.data[0]
					let especiesProtegerList: EspecieProteger[] = []
					especiesProteger.forEach((e: any) => {
						let especieProteger: EspecieProteger = {
							especieId: e.tcEspecie.especieId,
							codigo: e.tcEspecie.codigo,
							nombreCientifico: e.tcEspecie.nombreCientifico,
							nombreComun: e.tcEspecie.especieDesc,
							justificacion: e.justificacion
						}
						especiesProtegerList.push(especieProteger)
					});
					setEspeciesProteger(especiesProtegerList)
				}
				else {
					errorToast("Error al descargar datos.")
				}
				desactivateLoading()
			}
		}

		const handleError = (axiosError: AxiosError) => {
			console.error(axiosError)
			errorToast("Error al descargar datos.")
			desactivateLoading()
		}

		if (gestion != null) {
			activateLoading()
			especieProtegerApi.getEspeciesProteger(gestion.gestionId, handleResponse, handleError)
		}

		else {
			desactivateLoading()
		}

	}

	const getCalculosCallback = useCallback(getCalculos, [gestion])
	const getEspeciesProtegerCallback = useCallback(getEspeciesProteger, [gestion])

	useEffect(() => {
		getCalculosCallback()
	}, [getCalculosCallback])

	useEffect(() => {
		getEspeciesProtegerCallback()
	}, [getEspeciesProtegerCallback])


	const handleSistemaYCicloSuccess = () => {
		validation.sistemaYCiclo = true
	}

	const handleDmcSuccess = () => {
		getCalculos()
	}

	const handleAnalisisSuccess = () => {
		getCalculos()
		validation.analisis = true
	}

	//Validamos datos antes de continuar
	const isDataValid = (): boolean => {
		let isValid = true
		let errors = []
		if (!validation.sistemaYCiclo) {
			isValid = false
			errors.push(" sistema de manejo, ciclo de aprovechamiento")
		}
		if (!validation.analisis) {
			isValid = false
			errors.push(" análisis de la intensidad de corta")
		}
		if (!isValid) {
			errorToast("Debe almacenar todos los campos requeridos:" + errors.toString());
		}
		return isValid
	}

	const isDataValidCallback = useCallback(
		isDataValid,
		[validation],
	)
	useEffect(() => {
		nextButtonRef.current = isDataValidCallback
	}, [nextButtonRef, isDataValidCallback])

	useEffect(() => {
		if (gestion?.planificacionGestion?.tcSistemaCorta != null) {
			validation.sistemaYCiclo = true
		}
		if(gestion?.planificacionGestion?.analisisCorrecto == true){
			validation.analisis = true
		}
	}, [gestion, validation])

	useEffect(() => {
		isMounted.current = true
		return () => {
			isMounted.current = false
		}
	}, [])

	if (gestion == null || planificacionDTO == null) {
		return null
	}

	return (
		<>
			<Segment raised clearing>
				<SistemaYCiclo
					gestion={gestion}
					onSuccess={handleSistemaYCicloSuccess}
				/>
			</Segment>
			<Segment raised clearing>
				<Header >
					6.3. Especies a aprovechar y diámetros mínimos de corta
				</Header>
				<EspeciesAprovechar
					gestion={gestion}
					especiesDMC={especiesDMC}
					onSuccess={handleDmcSuccess}
				/>
			</Segment>
			<Segment raised>
				<Header >
					6.4. Resumen del censo de árboles &gt;= DMC
				</Header>
				<ResumenCensoMayorDMC resumenCensoMayorDmc={planificacionDTO.resumenCenso} />
			</Segment>
			)
			<Segment raised clearing>
				<Header >
					6.5. Análisis de la intensidad de corta
				</Header>
				<AnalisisCorta
					gestion={gestion}
					analisisCortaDTO={planificacionDTO.analisisCortaDTO}
					especiesEstratoIc={especiesEstratoIc}
					onSuccess={handleAnalisisSuccess}
				/>
			</Segment>
			<Segment raised>
				<Header >
					6.6. Resumen del número de árboles remanentes en la unidad de manejo
				</Header>
				<Remanentes
					analisisCortaDTO={planificacionDTO.analisisCortaDTO}
					especiesEstratoIc={especiesEstratoIc}
				/>
			</Segment>
			<Segment raised clearing>
				<Header >
					6.7. Especies a proteger
				</Header>
				<Proteccion
					especiesProteger={especiesProteger}
					onEspecieProtegerAdd={handleEspeciesProtegerAdd}
					onEspecieProtegerDelete={handleDeleteEspecieProteger} />
				<Form.Button style={{ marginTop: "16px" }} icon primary floated="right" labelPosition='right' onClick={updateEspeciesProteger} >
					Guardar
					<Icon name="save" />
				</Form.Button>
			</Segment>
		</>
	)
}
