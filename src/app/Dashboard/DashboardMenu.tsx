import AuthApi from 'api/AuthApi'
import Perfil from 'app/Perfil/Perfil'
import { AxiosError } from 'axios'
import CodigoPerfil from 'dto/perfil/CodigoPerfil'
import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom"
import Logo from 'resources/images/inab_logo.png'
import { Accordion, Dropdown, Header, Menu } from 'semantic-ui-react'
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic'
import { AppDataContext } from '../App'
import styles from './DashboardMenu.module.css'
import UserMenu from './Menus/UserMenu'

type Props = {
	onItemClick: (name: string, icon: SemanticICONS) => void
	userProfile: CodigoPerfil | undefined
	userName: string | undefined
}

const authApi = new AuthApi()

export default function DashboardMenu({
	onItemClick,
	userProfile,
	userName
}: Props) {

	const history = useHistory()
	const [openPerfil, setOpenPerfil] = useState(false)
	const [selectedItem, setSelectedItem] = useState("");
	const appDataContext = useContext(AppDataContext);

	const handleItemClick = (e: any, { name }: any) => {

		setSelectedItem(name)
		localStorage.setItem("actualLink", name)

		let headerName: string
		let headerIcon: SemanticICONS

		switch (name) {

			case "inbox":
				headerName = "Bandeja de actividades"
				headerIcon = "inbox"
				break

			case "misFincas":
				headerName = "Mis Fincas"
				headerIcon = 'location arrow'
				history.push("/mis-fincas")
				break;

			case "misgestiones":
				headerName = "Mis Gestiones"
				headerIcon = 'sort amount down'
				history.push("/mis-gestiones")
				break;

			case "bandejasolicitudes":
				headerName = "Bandeja de Solicitudes"
				headerIcon = "inbox"
				history.push('/bandeja_solicitudes')
				break;

			case "solicitudesok":
				headerName = "Solicitudes Aceptadas"
				headerIcon = 'check square'
				history.push('/solicitudes_aceptadas')
				break;

			case "solicitudesfinish":
				headerName = "Solicitudes Finalizadas"
				headerIcon = 'flag checkered'
				history.push('/solicitudes_finalizadas')
				break;

			case "licNuevo":
				headerName = "Nueva Licencia"
				headerIcon = 'add'
				history.push('/nuevo_aprovechamiento');
				break;

			case "guias_formatos":
				headerName = "Guías y Formatos";
				headerIcon = 'write square';
				break;


			case "asignadas":
				headerName = "Tareas Asignadas";
				headerIcon = 'pencil alternate';
				history.push('/tareas_asignadas')
				break;


			case "finalizadas":
				headerName = "Tareas Finalizadas";
				headerIcon = 'check';
				history.push('/tareas_finalizadas')
				break;


			case "inventarione":
				headerName = "Inventario de NE";
				headerIcon = 'th list';
				break;


			case "movimiento":
				headerName = "Movimiento";
				headerIcon = 'cog';
				break;


			case "reserva":
				headerName = "Reserva";
				headerIcon = 'box';
				break;

			case "cargaInicialExento":
				headerName = "Carga inicial de Exento";
				headerIcon = 'list';
				history.push('/carga_inicial_exento')
				break;

			case "ingresarLicencia":
				headerName = "Ingresar Licencia";
				headerIcon = 'list';
				history.push('/ingresar_licencia')
				break;

			case "licenciasRecibidas":
				headerName = "Licencias Recibidas";
				headerIcon = 'list';
				history.push('/licencias_recibidas')
				break;

			case "suspenderTramite":
				headerName = "Suspensiones";
				headerIcon = 'list';
				history.push('/suspender_tramite')
				break;

			case "entrantes":
				headerName = "Solicitudes Entrantes";
				headerIcon = 'list';
				break;


			case "aceptadas":
				headerName = "Solicitudes Aceptadas";
				headerIcon = 'list';
				break;


			case "lista":
				headerName = "Lista de Resoluciones";
				headerIcon = 'tasks';
				history.push('/resoluciones');
				break;


			case "recibirenmiendas":
				headerName = "Recibir Enmiendas";
				headerIcon = 'inbox';
				history.push('/recibir_enmiendas')
				break;


			case "ingresopoa":
				headerName = "Ingreso POA";
				headerIcon = 'pen square';
				break;


			case "solicitudesne":
				headerName = "Solicitudes NE";
				headerIcon = 'marker';
				break;


			case "autorizarne":
				headerName = "Autorizar NE";
				headerIcon = 'check';
				break;


			default:
				//console.log(name);							
				headerName = "Dashboard"
				headerIcon = "dashboard"
				break
		}


		onItemClick(headerName, headerIcon)

	}

	const openPerfilDialog = () => {
		setOpenPerfil(true)
	}

	const closePerfilDialog = () => {
		setOpenPerfil(false)
	}

	const logout = () => {

		const onSuccess = () => {
			appDataContext.deleteToken()
			let base_url = window.location.origin
			window.location.href = base_url + "/login"
		}

		const onError = (error: AxiosError) => {
			console.error(error)
		}

		authApi.logout(onSuccess, onError)

	}

	return (

		<>
			{openPerfil === true ?
				<Perfil open={openPerfil} closeModal={closePerfilDialog} />
				: null}
			<Accordion attached as={Menu} vertical inverted color="green" className={styles.menu}>
				<Menu.Item>
					<Header as="h1" image={Logo} inverted content="SEGEFOR" textAlign='center' />
				</Menu.Item>
				<Menu.Item header as="h4"  >
					<Dropdown className={styles.profile} text={userName ? userName : "Mi nombre"}>
						<Dropdown.Menu>
							<Dropdown.Item onClick={openPerfilDialog}>Perfil</Dropdown.Item>
							<Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
				{userProfile != null &&
					<UserMenu selectedItem={selectedItem} handleClick={handleItemClick} codigoPerfil={userProfile} />
				}
			</Accordion>

		</>
	)
}

