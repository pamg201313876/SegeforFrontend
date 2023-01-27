import React, { useCallback, useEffect, useState, useRef } from 'react'
import { roundDouble } from 'utils/UtilFunctions'
import { EspecieEstratoIc } from '../Planificacion'
import AnalisisCortaParametro from './AnalisisCortaParametro'
import ParametroAnalisis from './ParametroAnalisis'
import TotalAnalisis from './TotalAnalisis'

type Props = {
	especieAnalisis: any
	especieEstratoIc: EspecieEstratoIc
	erroresEspecie: React.MutableRefObject<boolean>[]
	seleccionarRegistros: (registros: any[], setRegistros: (registros: any[]) => void, arbolesCalculados: number) => void,
	onRegistrosUpdate: (value: any) => void
}

export default function AnalisisCortaEspecie({
	especieAnalisis,
	especieEstratoIc,
	erroresEspecie,
	seleccionarRegistros,
	onRegistrosUpdate
}: Props) {

	const [registros, setRegistros] = useState<any[]>([])
	const [ic, setIc] = useState(0)
	const [arbolesCalculados, setArbolesCalculados] = useState<number>(0)
	const [error, setError] = useState<boolean>(false)
	const errorRef = useRef(error)

	const [extraer, setExtraer] = useState<ParametroAnalisis>({
		numeroArboles: 0,
		ab: 0,
		vol: 0
	})
	const [semilleros, setSemilleros] = useState<ParametroAnalisis>({
		numeroArboles: 0,
		ab: 0,
		vol: 0
	})
	const [remanentes, setRemanentes] = useState<ParametroAnalisis>({
		numeroArboles: 0,
		ab: 0,
		vol: 0
	})

	const handleEditClick = () => {
		seleccionarRegistros(registros, setRegistros, arbolesCalculados)
	}

	const sumarRegistroAParametro = (registro: any, parametro: ParametroAnalisis) => {
		parametro.numeroArboles++;
		parametro.ab += registro.ab
		parametro.vol += registro.vol
	}

	const calcIc = (value: number, ic: number): number => {
		return roundDouble(value * (ic / 100))
	}

	const onRegistrosUpdateCallback = useCallback(onRegistrosUpdate, [])

	const updateRemanentes = () => {

		if (semilleros != null) {

			let n = especieAnalisis.n;
			let g = especieAnalisis.g;
			let v = especieAnalisis.v;

			let numArbol = semilleros.numeroArboles + n.menoresDmc + n.decrepitos
			let ab = semilleros.ab + g.menoresDmc + g.decrepitos
			let vol = semilleros.vol + v.menoresDmc + v.decrepitos

			let remanentesParametro: ParametroAnalisis = {
				numeroArboles: Math.round(numArbol),
				ab: roundDouble(ab),
				vol: roundDouble(vol)
			}

			setRemanentes(remanentesParametro)

			let registros: TotalAnalisis = {
				id: especieAnalisis.tcEspecie.especieId,
				extraer: extraer,
				semilleros: semilleros,
				remanentes: remanentesParametro
			}
			onRegistrosUpdateCallback(registros)

		}

	}

	const updateExtraccion = () => {

		if (registros == null) {
			return
		}

		let extraerParametro: ParametroAnalisis = {
			numeroArboles: 0,
			ab: 0,
			vol: 0
		}

		let semillerosParametro: ParametroAnalisis = {
			numeroArboles: 0,
			ab: 0,
			vol: 0
		}

		for (let registro of registros) {
			if (registro.amanejar) {
				sumarRegistroAParametro(registro, extraerParametro)
			}
			else {
				sumarRegistroAParametro(registro, semillerosParametro)
			}
		}

		extraerParametro.ab = roundDouble(extraerParametro.ab)
		extraerParametro.vol = roundDouble(extraerParametro.vol)
		semillerosParametro.ab = roundDouble(semillerosParametro.ab)
		semillerosParametro.vol = roundDouble(semillerosParametro.vol)

		setExtraer(extraerParametro)
		setSemilleros(semillerosParametro)
		
		if(especieEstratoIc != null){
		especieEstratoIc.extraer = {
			numeroArboles: extraerParametro.numeroArboles,
			ab: extraerParametro.ab,
			vol: extraerParametro.vol
		}
		}

	}

	const updateRemanentesCallback = useCallback(updateRemanentes, [semilleros, especieAnalisis, onRegistrosUpdateCallback])
	const updateExtraerCallback = useCallback(updateExtraccion, [registros, especieEstratoIc])

	useEffect(() => {
		updateExtraerCallback()
	}, [updateExtraerCallback])

	useEffect(() => {
		updateRemanentesCallback()
	}, [updateRemanentesCallback])

	

	useEffect(() => {
		erroresEspecie.push(errorRef)
	}, [erroresEspecie])

	const handleIcChange = (ic: any) => {
		if (especieEstratoIc != null) {
			if (isNaN(ic)) {
				return
			}
			let numIc = Number(ic)
			//Para evitar re actualizaciones innecesarias si el valor es igual
			if (especieEstratoIc.ic === numIc) {
				return
			}
			setIc(numIc)
			especieEstratoIc.ic = numIc;
		}
	}


	useEffect(() => {
		if (especieAnalisis != null && especieAnalisis.registrosBoletaSanos != null) {
			setRegistros(especieAnalisis.registrosBoletaSanos)
		}
	}, [especieAnalisis])

	useEffect(() => {
		if (especieAnalisis != null) {
			setArbolesCalculados(Math.round(calcIc(especieAnalisis.n.sanos, ic)))
		}
	}, [especieAnalisis, ic])

	useEffect(() => {
		if (especieEstratoIc != null) {
			setIc(especieEstratoIc.ic)
		}
	}, [especieEstratoIc])

	useEffect(() => {
		if(extraer.numeroArboles !== arbolesCalculados){
			setError(true)
		}
		else{
			setError(false)
		}
	}, [arbolesCalculados, extraer])

	useEffect(() => {
		errorRef.current = error
	}, [error])

	return (
		<>
			{especieAnalisis != null ?
				<>
					<AnalisisCortaParametro
						nombre={especieAnalisis.tcEspecie.nombreCientifico}
						parametroAnalisis={especieAnalisis.n}
						ic={ic}
						setIc={handleIcChange}
						letra={"N"}
						onEditClick={handleEditClick}
						arbolesCalculados={arbolesCalculados}
						error={error}
						extraer={extraer.numeroArboles}
						semilleros={semilleros.numeroArboles}
						remanentes={remanentes.numeroArboles}
					/>
					<AnalisisCortaParametro
						parametroAnalisis={especieAnalisis.g}
						letra="G"
						error={error}
						extraer={extraer.ab}
						semilleros={semilleros.ab}
						remanentes={remanentes.ab}
					/>
					<AnalisisCortaParametro
						parametroAnalisis={especieAnalisis.v}
						letra="V"
						error={error}
						extraer={extraer.vol}
						semilleros={semilleros.vol}
						remanentes={remanentes.vol}
					/>
				</>
				: null}
		</>
	)
}
