import GestionApi from 'api/GestionApi'
import ResumenApi from 'api/latifoliado/hasta90/ResumenApi'
import { AxiosError } from 'axios'
import React from 'react'
import { Header, Segment, Table } from 'semantic-ui-react'
import { roundDouble } from 'utils/UtilFunctions'
import RegenteForm from './RegenteForm'


type Props = {
	gestion: any
}

type FiadorDTO = {
	nombreEmpresa: string,
	nombreFiador: string,
	tipoFiadorId: number,
	dpiFiador: number,
	ttGestion: any
}

const gestionApi = new GestionApi()
const resumenApi = new ResumenApi()

export default function Resumen({
	gestion
}: Props) {

	const [resumen, setResumen] = React.useState<any>()

	React.useEffect(() => {

		if (gestion != null) {

			const handleResponse = (res: any) => {
				if (res.status === "OK") {
					let resumen = res.data[0]
					setResumen(resumen)

				}
				else {
					console.log("entro en error")
				}

			}

			const handleError = (axiosError: AxiosError) => {
				console.error(axiosError)
			}

			resumenApi.getResumen(gestion.gestionId, handleResponse, handleError)
		}

	}, [gestion])

	const renderResumen = () => {
		if (resumen == null) {
			return null
		}
		return (
			<Segment raised>
				<Header>5. Resumen del Plan de Manejo</Header>
				<Table definition>
					<Table.Body>
						<Table.Row>
							<Table.Cell width={6}>Vigencia del plan de manejo (años)</Table.Cell>
							<Table.Cell>{resumen.vigenciaPlanManejo}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell >Revisión y actualización del plan (años)</Table.Cell>
							<Table.Cell>{resumen.revisionPlan}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell >Tiempo de ejecución de la extracción para el primer turno (meses)</Table.Cell>
							<Table.Cell>{resumen.tiempoEjecucion}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell >Superficia a intervenir (ha)</Table.Cell>
							<Table.Cell>{resumen.superficieIntervenir}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell >Sistema silvicultural</Table.Cell>
							<Table.Cell>{resumen.tcSistemaCorta?.sistemaCortaDesc}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Tratamiento(s) silvicultural (es)</Table.Cell>
							<Table.Cell>{resumen.tcTratamientoSilvicultural?.tratamientoSilviculturalDesc}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Incremento anual del bosque (m3/ha/año)</Table.Cell>
							<Table.Cell>{resumen.incrementoAnual}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Corta periódica permisible (m3)</Table.Cell>
							<Table.Cell>{resumen.cortaPeriodicaPermisible}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Volumen total aprovechable (m3)</Table.Cell>
							<Table.Cell>{roundDouble(resumen.volumenTotalAprovechable)}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Número de árboles a extraer</Table.Cell>
							<Table.Cell>{resumen.numeroArbolesExtraer}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Volumen a extraer (m3)</Table.Cell>
							<Table.Cell>{resumen.volumenExtraer}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Especies a aprovechar</Table.Cell>
							<Table.Cell>
								{resumen.especiesAprovechar?.join(', ')}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Sistema de repoblación forestal</Table.Cell>
							<Table.Cell>
								{resumen.sistemasRepoblacion?.join(', ')}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Especies del compromiso de repoblación forestal</Table.Cell>
							<Table.Cell>
								{resumen.especiesCompromiso?.join(', ')}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Número de turnos</Table.Cell>
							<Table.Cell>
								{resumen.numeroTurnos}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Tipo de garantía POA 1</Table.Cell>
							<Table.Cell>{resumen.tcTipoGarantia?.tipoGarantiaDesc}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Segment>
		)
	}

	return (
		<>
			<Segment raised clearing>
				<Header content="Regente propuesto"/>
				<RegenteForm gestion={gestion} />
			</Segment>
			{renderResumen()}
		</>
	)
}
