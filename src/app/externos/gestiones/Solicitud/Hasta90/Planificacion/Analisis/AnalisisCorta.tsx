import { planificacionApi } from 'api/latifoliado/hasta90'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import UpdateIcEspecieDTO from 'dto/gestion/latifoliado/hasta90/planificacion/UpdateIcEspecieDTO'
import UpdateIcEstratoDTO from 'dto/gestion/latifoliado/hasta90/planificacion/UpdateIcEstratoDTO'
import React, { useContext, useRef, useState } from 'react'
import { Button, Header, Table } from 'semantic-ui-react'
import { roundDouble } from 'utils/UtilFunctions'
import { EspecieEstratoIc } from '../Planificacion'
import AnalisisCortaEstrato from './AnalisisCortaEstrato'
import AnalisisCortaTotalParametro from './AnalisisCortaTotalParametro'
import ParametroAnalisis from './ParametroAnalisis'
import SeleccionarArbolesAManejar from './SeleccionarArbolesAManejar/SeleccionarArbolesAManejar'
import TotalAnalisis, { newTotal } from './TotalAnalisis'

type Props = {
	gestion: any,
	analisisCortaDTO: any
	especiesEstratoIc: EspecieEstratoIc[]
	onSuccess: () => void
}

export default function AnalisisCorta({
	gestion,
	analisisCortaDTO,
	especiesEstratoIc,
	onSuccess
}: Props) {

	const appDataContext = useContext(AppDataContext);
	const subTotales: TotalAnalisis[] = []
	const [total, setTotal] = useState<TotalAnalisis>(newTotal(0))
	const [open, setOpen] = useState<boolean>(false)
	const refRegistros = useRef<any[]>([])
	const refSetRegistros = useRef<Function>()
	const [arbolesCalculados, setArbolesCalculados] = useState(0)
	const erroresEspecie: React.MutableRefObject<boolean>[] = ([])
	const [loading, setLoading] = useState(false)

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

	const sumTotal = (subTotalOld: TotalAnalisis, subTotal: TotalAnalisis) => {
		sumParametros(total.extraer, parametrosDif(subTotalOld.extraer, subTotal.extraer))
		sumParametros(total.semilleros, parametrosDif(subTotalOld.semilleros, subTotal.semilleros))
		sumParametros(total.remanentes, parametrosDif(subTotalOld.remanentes, subTotal.remanentes))
	}

	const handleSubTotalUpdate = (
		subTotal: TotalAnalisis
	) => {
		let newSubTotal = JSON.parse(JSON.stringify(subTotal))
		let subTotalOld;
		let index = subTotales.findIndex(element => element.id === newSubTotal.id)
		if (index === - 1) {
			subTotales.push(newSubTotal)
			subTotalOld = newTotal(0)
		}
		else {
			subTotalOld = subTotales[index]
			subTotales[index] = newSubTotal
		}
		sumTotal(subTotalOld, newSubTotal)
		setTotal((oldValues: any) => ({
			...oldValues,
			extraer: total.extraer
		}));
	}

	const seleccionarRegistros = (registros: any[], setRegistro: (registros: any[]) => void, arbolesCalculados: number) => {
		if (registros != null) {
			refRegistros.current = registros
			refSetRegistros.current = setRegistro
			setArbolesCalculados(arbolesCalculados)
			setOpen(true)
		}
	}

	const closeSeleccionar = () => {
		setOpen(false)
		if (refSetRegistros.current != null) {
			let copy = refRegistros.current.slice()
			refSetRegistros.current(copy)
		}
	}

	const getEspecieEstrato = (especie: EspecieEstratoIc): UpdateIcEspecieDTO => {
		let updateIcEspecie: UpdateIcEspecieDTO = {
			ic: especie.ic,
			numArbolesExtraer: especie.extraer.numeroArboles,
			abExtraer: especie.extraer.ab,
			volumenExtraer: especie.extraer.vol,
			tcEspecieId: especie.especieId,
			registros: especie.registros
		}
		return updateIcEspecie
	}

	const handleResponse = (res: any) => {
		setLoading(false)
		if (res.status === "OK") {
			appDataContext.successToast("Datos guardados satisfactoriamente")
			onSuccess()
		}
		else {
			appDataContext.errorToast("Error al guardar informacion")
		}
	}

	const handleError = (_axiosError: AxiosError) => {
		setLoading(false)
		appDataContext.errorToast("Error al guardar informacion")
	}

	const isValid = () => {
		for (let error of erroresEspecie) {
			if (error.current === true) {
				return false
			}
		}
		return true
	}

	const updateIc = () => {

		if (gestion != null && gestion.gestionId != null) {

			if (!isValid()) {
				appDataContext.errorToast("Error. Existen registros de árboles no asignados correctamente.")
				return
			}

			let estratoList: UpdateIcEstratoDTO[] = []
			let currentEstrato: UpdateIcEstratoDTO = {
				estrato: -1,
				especies: []
			};

			especiesEstratoIc.forEach(e => {

				if (currentEstrato.estrato !== e.estratoId) {
					if (currentEstrato.estrato !== -1) {
						estratoList.push(currentEstrato)
					}
					currentEstrato = {
						estrato: e.estratoId,
						especies: []
					}
				}

				let updateIcEspecieDTO = getEspecieEstrato(e)
				currentEstrato.especies.push(updateIcEspecieDTO)

			});

			if (currentEstrato.estrato !== -1) {
				estratoList.push(currentEstrato)
			}

			setLoading(true)
			planificacionApi.updateIc(gestion.gestionId, estratoList, handleResponse, handleError)

		}
	}

	const renderRows = () => {
		let rows: any[] = []
		let i = 0;
		analisisCortaDTO.estratos.forEach((estratoAnalisis: any) => {
			rows.push(
				<AnalisisCortaEstrato
					key={"ac_" + i++}
					estratoAnalisis={estratoAnalisis}
					especiesEstratoIc={especiesEstratoIc}
					erroresEspecie={erroresEspecie}
					seleccionarRegistros={seleccionarRegistros}
					onSubtotalUpdate={handleSubTotalUpdate}
				/>)
		});
		return rows
	}

	const renderTotal = (
		<>
			<Table.Row positive style={{ "borderTop": "solid 1px" }}>
				<Table.Cell verticalAlign="middle" textAlign="center" colSpan={2} rowSpan={4} ><Header>Total</Header></Table.Cell>
			</Table.Row>
			<AnalisisCortaTotalParametro
				noIc
				parametroAnalisis={analisisCortaDTO.totalN}
				letra="N"
				extraer={total.extraer.numeroArboles}
				semilleros={total.semilleros.numeroArboles}
				remanentes={total.remanentes.numeroArboles}
			/>
			<AnalisisCortaTotalParametro
				parametroAnalisis={analisisCortaDTO.totalG}
				letra="G"
				extraer={total.extraer.ab}
				semilleros={total.semilleros.ab}
				remanentes={total.remanentes.ab}
			/>
			<AnalisisCortaTotalParametro
				parametroAnalisis={analisisCortaDTO.totalV}
				letra="V"
				extraer={total.extraer.vol}
				semilleros={total.semilleros.vol}
				remanentes={total.remanentes.vol}
			/>
		</>
	)

	return (
		<>
			<Table celled structured compact striped size="small" >
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell collapsing>Estrato</Table.HeaderCell>
						<Table.HeaderCell>Nombre científico</Table.HeaderCell>
						<Table.HeaderCell collapsing>Parámetro</Table.HeaderCell>
						<Table.HeaderCell>No. Total de árboles</Table.HeaderCell>
						<Table.HeaderCell>No. total de árboles &lt; DMC </Table.HeaderCell>
						<Table.HeaderCell>No. total de árboles &gt;= DMC </Table.HeaderCell>
						<Table.HeaderCell>No. árboles decrépitos </Table.HeaderCell>
						<Table.HeaderCell>No. árboles sanos </Table.HeaderCell>
						<Table.HeaderCell collapsing>No. IC &lt;= 80% </Table.HeaderCell>
						<Table.HeaderCell>No. Arboles calculados</Table.HeaderCell>
						<Table.HeaderCell>Asignar registros</Table.HeaderCell>
						<Table.HeaderCell>Total no. árboles a extraer </Table.HeaderCell>
						<Table.HeaderCell>No. árboles semilleros </Table.HeaderCell>
						<Table.HeaderCell>No. árboles remanentes </Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{renderRows()}
				</Table.Body>
				<Table.Footer style={{ "borderTop": "solid 1px" }}>
					{renderTotal}
				</Table.Footer>
			</Table>
			<Button
				content="Guardar"
				icon="save"
				primary
				loading={loading}
				floated="right"
				labelPosition='right'
				onClick={updateIc} />
			<SeleccionarArbolesAManejar
				open={open}
				closeModal={closeSeleccionar}
				registros={refRegistros.current}
				arbolesCalculados={arbolesCalculados}
			/>
		</>
	)


}
