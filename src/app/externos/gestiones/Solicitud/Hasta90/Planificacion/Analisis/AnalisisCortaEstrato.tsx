import React, { useState, useRef, useEffect } from 'react'
import { Header, Table } from 'semantic-ui-react'
import { EspecieEstratoIc } from '../Planificacion'
import AnalisisCortaTotalParametro from './AnalisisCortaTotalParametro'
import AnalisisCortaEspecie from './AnalisisCortaEspecie'
import TotalAnalisis, { newTotal } from './TotalAnalisis'
import ParametroAnalisis from './ParametroAnalisis'
import { roundDouble } from 'utils/UtilFunctions'

type Props = {
	estratoAnalisis: any
	especiesEstratoIc: EspecieEstratoIc[]
	erroresEspecie: React.MutableRefObject<boolean>[]
	seleccionarRegistros: (registros: any[], setRegistros: (registros: any[]) => void, arbolesCalculados: number) => void,
	onSubtotalUpdate: (value: any) => void
}


export default function AnalisisCortaEstrato({
	estratoAnalisis,
	especiesEstratoIc,
	erroresEspecie,
	seleccionarRegistros,
	onSubtotalUpdate
}: Props) {

	const registros: TotalAnalisis[] = []
	const [subTotal, setSubTotal] = useState<TotalAnalisis>(newTotal(estratoAnalisis.estrato))

	const getEspecieEstrato = (especieId: number, estratoId: number,) => {
		for (let e of especiesEstratoIc) {
			if (e.especieId === especieId && e.estratoId === estratoId) {
				return e;
			}
		}
	}

	const parametrosDif = (parametroOld: ParametroAnalisis, parametroNew: ParametroAnalisis): ParametroAnalisis => {
		return {
			numeroArboles: parametroNew.numeroArboles - parametroOld.numeroArboles,
			ab: parametroNew.ab - parametroOld.ab,
			vol: parametroNew.vol - parametroOld.vol,
		}
	}

	const sumParametros = (parametro: ParametroAnalisis, parametroASumar: ParametroAnalisis) => {
		parametro.numeroArboles += parametroASumar.numeroArboles
		parametro.ab = roundDouble(parametro.ab + parametroASumar.ab)
		parametro.vol = roundDouble(parametro.vol + parametroASumar.vol)
	}

	const sumSubTotal = (totalOld: TotalAnalisis, totalNew: TotalAnalisis) => {
		sumParametros(subTotal.extraer, parametrosDif(totalOld.extraer, totalNew.extraer))
		sumParametros(subTotal.semilleros, parametrosDif(totalOld.semilleros, totalNew.semilleros))
		sumParametros(subTotal.remanentes, parametrosDif(totalOld.remanentes, totalNew.remanentes))
	}

	const handleRegistrosUpdate = (
		total: TotalAnalisis
	) => {

		let registroOld;
		let index = registros.findIndex(element => element.id === total.id)
		if (index === - 1) {
			registros.push(total)
			registroOld = newTotal(0)
		}
		else {
			registroOld = registros[index]
			registros[index] = total
		}

		sumSubTotal(registroOld, total)

		onSubtotalUpdate(subTotal)

		setSubTotal((oldValues: any) => ({
			...oldValues,
			extraer: subTotal.extraer,
		}));
	}



	const renderRows = () => {
		let rows: any[] = []
		estratoAnalisis.especies.forEach((especieAnalisis: any) => {
			let especieEstratoIc = getEspecieEstrato(especieAnalisis.tcEspecie.especieId, estratoAnalisis.estrato);
			let row = <AnalisisCortaEspecie
				key={"ace_" + especieAnalisis?.tcEspecie?.especieId}
				especieAnalisis={especieAnalisis}
				especieEstratoIc={especieEstratoIc!}
				erroresEspecie={erroresEspecie}
				seleccionarRegistros={seleccionarRegistros}
				onRegistrosUpdate={handleRegistrosUpdate}
			/>
			rows.push(row)
		})
		return rows
	}


	const renderSubTotal = (
		<>
			<Table.Row warning style={{ "borderTop": "solid 1px" }}>
				<Table.Cell style={{ "borderTop": "solid 1px" }} verticalAlign="middle" textAlign="center" colSpan={2} rowSpan={4} ><Header size="small">Sub total</Header></Table.Cell>
			</Table.Row>

			<AnalisisCortaTotalParametro
				noIc
				isSubTotal
				parametroAnalisis={estratoAnalisis.subtotalN}
				letra="N"
				extraer={subTotal.extraer.numeroArboles}
				semilleros={subTotal.semilleros.numeroArboles}
				remanentes={subTotal.remanentes.numeroArboles}
			/>
			<AnalisisCortaTotalParametro
				parametroAnalisis={estratoAnalisis.subtotalG}
				letra="G"
				isSubTotal
				extraer={subTotal.extraer.ab}
				semilleros={subTotal.semilleros.ab}
				remanentes={subTotal.remanentes.ab}
			/>
			<AnalisisCortaTotalParametro
				isSubTotal
				parametroAnalisis={estratoAnalisis.subtotalV}
				letra="V"
				extraer={subTotal.extraer.vol}
				semilleros={subTotal.semilleros.vol}
				remanentes={subTotal.remanentes.vol}
			/>
		</>
	)

	return (
		<>
			<Table.Row >
				<Table.Cell verticalAlign="top" textAlign="center" rowSpan={((estratoAnalisis.especies.length) * 3) + 1} >{estratoAnalisis.estrato}</Table.Cell>
			</Table.Row>
			{renderRows()}
			{renderSubTotal}
		</>
	)
}
