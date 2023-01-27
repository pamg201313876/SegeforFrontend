import NuevoAprovechamientoForestal from 'app/externos/licencias/NuevoAprovechamientoForestal'
import BandejaSolicitudes from 'app/externos/gestiones/BandejaSolicitudes/BandejaSolicitudes'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Tareas from 'app/BandejaTareas/Tareas';
import IngresarLicencia from 'app/internos/solicitudes/secretario/IngresarLicencia/IngresarLicencia';
import CargaInicialExento from 'app/SolicitudUsuarioInterno/CargaInicialExento/CargaInicialExento'
import LicenciasRecibidas from 'app/internos/solicitudes/secretario/LicenciasRecibidas/LicenciasRecibidas'
import SuspenderTramite from 'app/internos/solicitudes/secretario/SuspenderTramite/SuspenderTramite'
import Enmiendas from '../internos/enmiendas/secretario/Enmiendas';
import Resoluciones from 'app/internos/resoluciones/secretario/Resoluciones'
import SolicitudesAceptadas from 'app/externos/gestiones/SolicitudesAceptadas/SolicitudesAceptadas'
import SolicitudesFinalizadas from 'app/externos/gestiones/SolicitudesFinalizadas/SolicitudesFinalizadas'
import MisGestiones from 'app/externos/gestiones/MisGestiones/MisGestiones'
import MisFincas from 'app/externos/generales/MisFincas/MisFincas';
import TareasRecibidas from 'app/internos/tareas/TareasRecibidas';

export default function Content() {

	return (
		<Switch >			
			<Route exact path="/nuevo_aprovechamiento" component={NuevoAprovechamientoForestal} />             
			<Route exact path="/bandeja_solicitudes" component={BandejaSolicitudes} /> 
			<Route exact path="/mis-gestiones" component={MisGestiones} />  
			<Route exact path="/mis-fincas" component={MisFincas} />
			<Route exact path="/solicitudes_aceptadas" component={SolicitudesAceptadas} />  			
			<Route exact path="/solicitudes_finalizadas" component={SolicitudesFinalizadas} />  
			<Route exact path="/tareas_asignadas" component={TareasRecibidas} />  		
			{/* <Route exact path="/tareas_asignadas"  render={ (props) => <Tareas tipo={"1"} />} /> */}
			<Route exact path="/tareas_finalizadas"  render={ (props) => <Tareas tipo={"2"} />} />			
			<Route exact path="/carga_inicial_exento" component={CargaInicialExento} />
			<Route exact path="/ingresar_licencia" component={IngresarLicencia} />
			<Route exact path="/licencias_recibidas" component={LicenciasRecibidas} />
			<Route exact path="/suspender_tramite" component={SuspenderTramite} />
			<Route exact path="/recibir_enmiendas" component={Enmiendas} />
			<Route exact path="/resoluciones" component={Resoluciones} />
		</Switch>
	)
}

