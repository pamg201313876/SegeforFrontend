import React from 'react';
import { Table } from 'semantic-ui-react';
import CronogramaDTO from '../../../../../../dto/solicitud/CronogramaDTO';
import ActivityRow from './ActivityRow';

type Props = {
	number: number
	cronograma: CronogramaDTO
}

export default function YearTable({
	number,
	cronograma
}: Props) {
	
	return (	
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell width={8} rowSpan={3} textAlign="center" > Actividades </Table.HeaderCell>
					<Table.HeaderCell colSpan={12} textAlign="center" >Año {number}</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell>Ene</Table.HeaderCell>
					<Table.HeaderCell>Feb</Table.HeaderCell>
					<Table.HeaderCell>Mar</Table.HeaderCell>
					<Table.HeaderCell>Abr</Table.HeaderCell>
					<Table.HeaderCell>May</Table.HeaderCell>
					<Table.HeaderCell>Jun</Table.HeaderCell>
					<Table.HeaderCell>Jul</Table.HeaderCell>
					<Table.HeaderCell>Ago</Table.HeaderCell>
					<Table.HeaderCell>Sep</Table.HeaderCell>
					<Table.HeaderCell>Oct</Table.HeaderCell>
					<Table.HeaderCell>Nov</Table.HeaderCell>
					<Table.HeaderCell>Dic</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan={13}>Actividades pre-aprovechamiento</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<ActivityRow cronogramaActivity={cronograma.delimitacionUnidadManejo} /*setCronogramaActivity={setDelimitacionUnidadManejo} handleChange={handleChange} *//>
				<ActivityRow cronogramaActivity={cronograma.delimitacionAreaProduccionYProteccion} /*setCronogramaActivity={setDelimitacionAreaProduccionYProteccion} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.tomaInformacionCampoYCenso} /*setCronogramaActivity={setTomaInformacionCampoYCenso} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.marcacion} /*setCronogramaActivity={setMarcacion} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.procesamientoInformacionCampo} /*setCronogramaActivity={setProcesamientoInformacionCampo} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.elaboracionPlanManejo} /*setCronogramaActivity={setElaboracionPlanManejo} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.retiroYDisposicionDeDesechos} /*setCronogramaActivity={setRetiroYDisposicionDeDesechos} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.patrullajes} /*setCronogramaActivity={setPatrullajes} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.identificacionYMapeoAreasCriticas} /*setCronogramaActivity={setIdentificacionYMapeoAreasCriticas} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.construccionDeBrechas} /*setCronogramaActivity={setConstruccionDeBrechas} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.manejoCombustible} /*setCronogramaActivity={setManejoCombustible} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.identificacionPuntosIncendios} /*setCronogramaActivity={setIdentificacionPuntosIncendios} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.patrullajesIncendios} /*setCronogramaActivity={setPatrullajesIncendios} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.capacitacionIncendios} /*setCronogramaActivity={setCapacitacionIncendios} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.adquisicionEquipoIncendios} /*setCronogramaActivity={setAdquisicionEquipoIncendios} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.controlIncendios} /*setCronogramaActivity={setControlIncendios} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.monitoreoIncendios} /*setCronogramaActivity={setMonitoreoIncendios} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.medidasPrevencionPlagas} /*setCronogramaActivity={setMedidasPrevencionPlagas} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.medidasControlPlagas} /*setCronogramaActivity={setMedidasControlPlagas} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.monitoreoPlagas} /*setCronogramaActivity={setMonitoreoPlagas} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.mantenimientoLinderos} /*setCronogramaActivity={setMantenimientoLinderos} handleChange={handleChange}*//>
			</Table.Body>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan={13}>Actividades de aprovechamiento</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<ActivityRow cronogramaActivity={cronograma.construccionCaminos} /*setCronogramaActivity={setConstruccionCaminos} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.construccionAcopio} /*setCronogramaActivity={setConstruccionAcopio} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.talaDirigida} /*setCronogramaActivity={setTalaDirigida} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.arrastreYTransporte} /*setCronogramaActivity={setArrastreYTransporte} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.presentacionTrimestral} /*setCronogramaActivity={setPresentacionTrimestral} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.retiroDesechos} /*setCronogramaActivity={setRetiroDesechos} handleChange={handleChange}*//>
			</Table.Body>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan={13}>Actividades post-aprovechamiento</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>	
				<ActivityRow cronogramaActivity={cronograma.retiroResiduos} /*setCronogramaActivity={setRetiroResiduos} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.cierreCaminosSecundarios} /*setCronogramaActivity={setCierreCaminosSecundarios} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.tratamientoSilviculturales} /*setCronogramaActivity={setTratamientoSilviculturales} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.actividadesRepoblacion} /*setCronogramaActivity={setActividadesRepoblacion} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.retiroDesechos2} /*setCronogramaActivity={setRetiroDesechos2} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.remocion} /*setCronogramaActivity={setRemocion} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.plantacion} /*setCronogramaActivity={setPlantacion} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.resiembra} /*setCronogramaActivity={setResiembra} handleChange={handleChange}*//>
				<ActivityRow cronogramaActivity={cronograma.informeFinal} /*setCronogramaActivity={setInformeFinal} handleChange={handleChange}*//>
			</Table.Body>
		</Table>
	)
}
