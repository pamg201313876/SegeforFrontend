import React, {useState} from 'react'
import { Table, Button } from 'semantic-ui-react'
import EspeciesAprovecharRow from './EspeciesAprovecharRow'
import { EspecieDMC } from '../Planificacion'
import { useContext } from 'react'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import { planificacionApi } from 'api/latifoliado/hasta90';
import UpdateDmcDTO from 'dto/gestion/latifoliado/hasta90/planificacion/UpdateDmcDTO'

type Props = {
	gestion: any
	especiesDMC: EspecieDMC[]
	onSuccess: () => void
}

export default function EspeciesAprovechar({
	gestion,
	especiesDMC,
	onSuccess
}: Props) {

	const appDataContext = useContext(AppDataContext); 
	const [loading, setLoading] = useState(false)

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

	const updateDmc = () => {

		if (gestion != null && gestion.gestionId != null) {
			let updateDmcList: UpdateDmcDTO[] = []
			especiesDMC.forEach(e => {
				let updateDmc: UpdateDmcDTO = {
					tcEspecieId: e.especieId,
					dmc: e.dmc,
					justificacion: e.justificacion,
					habilitado: e.habilitado
				}
				updateDmcList.push(updateDmc)
			});
			setLoading(true)
			planificacionApi.updateDmc(gestion.gestionId, updateDmcList, handleResponse, handleError);
		}
	}

	const renderRow = (): any[] => {

		let rows: any = []
		let i = 1;
		especiesDMC.forEach((e: EspecieDMC) => {
			rows.push(
				<EspeciesAprovecharRow key={"ea_" + i} pos={i++} especie={e} />
			)
		})

		return rows
	}

	return (
		<>
			<Table celled structured compact striped size="small" >
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell>Nombre científico</Table.HeaderCell>
						<Table.HeaderCell>Nombre común</Table.HeaderCell>
						<Table.HeaderCell width="2" >DMC</Table.HeaderCell>
						<Table.HeaderCell>Justificación DMC</Table.HeaderCell>
						<Table.HeaderCell>Habilitar</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{renderRow()}
				</Table.Body>
			</Table>
			<Button loading={loading} content="Guardar" icon="save" primary floated="right" labelPosition='right' onClick={updateDmc} />
		</>
	)
}
