import GestionApi from 'api/GestionApi';
import BoletaCensoApi from 'api/latifoliado/hasta90/BoletaCensoApi';
import TareaApi from 'api/TareaApi';
import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios';
import DescargaAnexos from 'components/Anexos/DescargaAnexos';
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import PlanManejoDownload from 'components/Downloads/PlanManejoDownload';
import FormModal from 'components/FormModal';
import PaginationTable from 'components/PaginationTable';
import TokenResponseDTO from 'dto/auth/TokenResponseDTO';
import CodigoPerfil from 'dto/perfil/CodigoPerfil';
import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SemanticCOLORS } from 'semantic-ui-react';
import Archivos from './Archivos/Archivos';
// import ExpedienteDictamenSubregional from './Subregional/ExpedienteDictamenSubregional';
import HistorialTarea from './HistorialTarea';
import RecibirTarea from './RecibirTarea';
// import Enmienda from '../internos/tareas/subregional/enmienda/Enmienda';

const gestionApi = new GestionApi()
const tareaApi = new TareaApi();
const boletaCensoApi = new BoletaCensoApi()

enum Action {
	INICIAR,
	ANULAR
}

type Props = {
	tipo: string
}
	;

export default function Tareas(
	props: Props
) {

	const appDataContext = useContext(AppDataContext)
	const [tokenData, setTokenData] = useState<any>({})
	const [refresh, setRefresh] = useState<boolean>(true)
	const [openImprimir, setOpenImprimir] = useState<boolean>(false)
	const closeImprimir = () => { setOpenImprimir(false) }
	const [openRecibir, setOpenRecibir] = useState<boolean>(false)
	const [openAnexos, setOpenAnexos] = useState<boolean>(false)
	const [openHistorial, setOpenHistorial] = useState<boolean>(false)
	const [openExpprovnot, setOpenExpprovnot] = useState<boolean>(false)
	const [openExpDicJuri, setOpenExpDicJuri] = useState<boolean>(false)
	const [openCedulaNotificacion, setOpenCedulaNotificacion] = useState<boolean>(false)
	const [openEnmiendaSubregional, setOpenEnmiendaSubregional] = useState<boolean>(false)	
	const [openExpDicSubReg, setOpenExpDicSubReg] = useState<boolean>(false)
	const [openExpDicReg, setOpenExpDicReg] = useState<boolean>(false)
	const [tecnico, setOpenTecnico] = useState<boolean>(false)
	const [openConfirmTraslado, setOpenConfirmTraslado] = React.useState<boolean>(false);
	const [openConfirmRealizarTarea, setOpenConfirmRealizarTarea] = React.useState<boolean>(false);
	const [currentData, setCurrentData] = useState<any>()
	const [anexosData, setAnexosData] = useState<any[]>([])
	const [historialData, setHistorialData] = useState<any[]>([])
	const [currentSolicitudData, setCurrentSolicitudData] = useState<any>()
	const notifyInfo = () => toast.info("Proceso exitoso")
	const notifyError = () => toast.error("Hubo un error")
	const successMsg = (message: string) => toast.success(message);
	const errorMsg = (message: string) => toast.error(message);
	const [dataTarea, setDataTarea] = useState<any>({});
	const [openDialog, setOpenDialog] = useState(false)
	const [loading, setLoading] = useState(false)
	

	var verde: SemanticCOLORS = 'green';
	var rojo: SemanticCOLORS = 'red';
	var azul: SemanticCOLORS = 'blue';
	var amarillo: SemanticCOLORS = 'yellow';
	var gris: SemanticCOLORS = 'grey';
	var rosado: SemanticCOLORS = 'pink';

	const encabezadoBandeja: CTColumn[] = props.tipo === "1" ?

		[
			{ header: "NUG", name: 'ttGestion.nug' },
			{ header: "Solicitante", name: 'ttGestion.tcPersonaCrea.personaDesc' },
			{ header: "Expediente", name: 'ttGestion.expediente' },
			{ header: "Fecha Asignación", name: 'fechaRegistro', isDate: true },
			{ header: "Fecha Vencimiento", name: 'fechaVencimiento', isDate: true },
			{ header: "Tarea ", name: 'tcTask.taskDesc' },

		]

		:
		[
			{ header: "Expediente", name: 'ttGestion.expediente' },
			{ header: "Fecha Asignación", name: 'fechaRegistro', isDate: true },
			{ header: "Fecha Vencimiento", name: 'fechaVencimiento', isDate: true },
			{ header: "Finalizacion ", name: 'fechaFinalizacion', isDate: true},
			{ header: "Tarea ", name: 'tcTask.taskDesc' },

		]

		;


	const recibido = (tarea: any): boolean => {
		if (tarea.recibido === 0) {
			return true
		}
		return false
	}

	const realizar = (tarea: any): boolean => {
		return !recibido(tarea)
	}

	const boletaInventario = (tarea: any): boolean => {

		return tokenData.perfil.codigo === CodigoPerfil.Tecnico;
	}

	const noVerHistorialSecretaria = (tarea: any): boolean => {
		//( tokenData.perfil.codigo !== CodigoPerfil.Secretaria )
		return tarea.tcTask.taskId !== 1;
	}

	const verCancelarSoloSubregional = (tarea: any): boolean => {
		return (tokenData.perfil.codigo === CodigoPerfil.SubRegional);
	}


	const botonesBandeja: CTButton[] =

		props.tipo === "1" ?

			[
				{ id: "recibir", icon: "download", color: rojo, hint: "Recibir Tarea", isEnabled: recibido },
				{ id: "realizar", icon: "play", color: azul, hint: "Realizar Tarea", isEnabled: realizar },
				{ id: "boletaInventario", icon: "database", color: gris, hint: "Descargar boleta de inventario", isEnabled: boletaInventario },
				{ id: "imprimirPlan", icon: "print", color: verde, hint: "Imprimir plan de manejo" },
				{ id: "anexos", icon: "file", color: rojo, hint: "Ver anexos" },
				{ id: "historial", icon: "list", color: amarillo, hint: "Ver historial", isEnabled: noVerHistorialSecretaria },
			]
			:
			[
				{ id: "imprimirPlan", icon: "print", color: verde, hint: "Imprimir plan de manejo" },
				{ id: "imprimir", icon: "file pdf", color: rosado, hint: "Imprimir documento" },
				{ id: "anexos", icon: "list", color: azul, hint: "Ver anexos" },
				{ id: "historial", icon: "list", color: amarillo, hint: "Ver historial", isEnabled: noVerHistorialSecretaria },
				{ id: "cancelTarea", icon: "cancel", color: rojo, hint: "Cancelar tarea técnica o jurídica y asignar a una nueva persona", isEnabled: verCancelarSoloSubregional },
			]

		;

	const onButtonClick = (buttonResponse: CTButtonResponse) => {

		setCurrentData(buttonResponse.rowData)

		switch (buttonResponse.id) {

			case "recibir":
				showRecibir()
				break;

			case "realizar":
				selectTask(buttonResponse.rowData.tcTask.taskId, buttonResponse.rowData);
				break;

			case "boletaInventario":
				descargarBoletaInventario(buttonResponse.rowData.ttGestion)
				break;

			case "imprimir":
				setOpenDialog(true)
				break;

			case "anexos":
				getOpenAnexos(buttonResponse.rowData)
				break;

			case "historial":
				getOpenHistorial(buttonResponse.rowData)
				break;

			case "imprimirDocumento":
				setOpenDialog(true)
				break;


			case "cancelar":
				break;

			case "imprimirPlan":
				setOpenImprimir(true)
				break;

			default:
				console.log(buttonResponse.id)
				break;

		}

	}

	const getOpenHistorial = (data: any) => {
		const handleData = (entity: any) => {
			if (entity.status === "OK") {
				setHistorialData(entity.data)
				setOpenHistorial(true)
			} else {
				errorMsg('Error al obtener historial de tarea')
			}
		}

		const errorData = (error: any) => {
			console.log("Error al obtener historial de la tarea")
		}
		tareaApi.HistorialGestion(data.tareaId, data.ttGestion.gestionId, 1 /*subregionReplace*/, handleData, errorData)
	}

	const getOpenAnexos = (data: any) => {

		const handleDataAnexos = (entity: any) => {
			if (entity.status === "OK") {
				setAnexosData(entity.data[0].anexo)
				setOpenAnexos(true)
			} else {
				alert("Error en la obtención de anexos de tarea")
			}
		}

		const errorDataAnexos = (error: any) => {
			console.log("Error al obtener los anexos de la tarea")
		}

		gestionApi.getGestionById(data.ttGestion.gestionId, handleDataAnexos, errorDataAnexos);
	}

	const selectTask = (taskId: number, solicitud: any) => {

		setCurrentSolicitudData(solicitud)
		switch (taskId) {

			case 1:
				setOpenConfirmRealizarTarea(true)
				break;

			case 2:
				consumirDataTarea(solicitud, setOpenExpprovnot);
				break;

			case 4: //tecnico by pamartin
				consumirDataTarea(solicitud, setOpenTecnico);
				break;

			case 3:
				consumirDataTareaJuridico(solicitud);
				break;

			case 7:
			case 5:
			case 9:
				consumirDataTareaSubReg(solicitud, taskId);
				break;

			case 6:
				consumirDataTareaReg(solicitud);
				break;

			default:
				break;

		}

	}



	const printTask = (taskId: number, solicitud: any) => {

		setCurrentSolicitudData(solicitud);

		switch (taskId) {

			case 1:
				break;

			case 2:
				printJuridico2(solicitud)
				break;

			case 3:
				printJuridico(solicitud);
				break;

			case 4:
				break;

			default:
				break;

		}

	}

	const printJuridico = (data: any) => {

		const HandleResponse = (response: any) => {
			console.log(response);
		}

		const HandleError = (error: any) => {
			console.log('Error', error);
			alert(error);
		}

		tareaApi.descargarArchivoTarea(data.tareaId, '', HandleResponse, HandleError);
	}

	const printJuridico2 = (data: any) => {

		console.log(data);


		const HandleResponse = (response: any) => {
			console.log(response);
		}

		const HandleError = (error: any) => {
			console.log('Error', error);
			alert(error);
		}
			;

		tareaApi.descargarArchivoTarea(data.tareaId, 'Admision', HandleResponse, HandleError);
	}


	useEffect(() => {
		let td = localStorage.getItem("tokenData")
		if (td != null) {
			td = JSON.parse(td)
			setTokenData(td)
			console.log(tokenData)
			console.log(td)
		}
	}, [])

	useEffect(() => {
		console.log('refresh')
		setRefresh(true)
	}, [props.tipo])

	const showRecibir = () => {
		setOpenRecibir(true)
	}

	const cloeseConfirmRealizarTarea = () => {
		setOpenConfirmRealizarTarea(false)
	}

	const confirmRealizarTarea = () => {
		setOpenConfirmRealizarTarea(false)
		setOpenConfirmTraslado(true)
	}

	const cloeseConfirmTraslado = () => {
		setOpenConfirmTraslado(false)
		setRefresh(true)
	}

	const confirmTraslado = () => {

		let tokenData = localStorage.getItem("tokenData")

		let solicitud = currentSolicitudData;
		if (tokenData !== null) {
			let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
			console.log(tokenObj)

			solicitud.ttGestion = {
				estadoId: currentSolicitudData.ttGestion.estadoId,
				expediente: currentSolicitudData.expediente,
				gestionId: currentSolicitudData.ttGestion.gestionId,
				personaAnulaId: tokenObj.personaId,
				tcElaborador: currentSolicitudData.ttGestion.tcElaborador,
				tcPersonaCrea: currentSolicitudData.ttGestion.tcPersonaCrea,
				tcTipoBosque: currentSolicitudData.ttGestion.tcTipoBosque,
				tcTipoGestion: currentSolicitudData.ttGestion.tcTipoGestion,
				ttTipoPropietarioGestion: currentSolicitudData.ttGestion.ttTipoPropietarioGestion
			}
			const handleResponse = (res: any) => {
				console.log(res)
				if (res.status === "OK") {
					successMsg(res.message)
				}
				else {
					errorMsg(res.message)
				}
				cloeseConfirmTraslado()
				setLoading(false)
			}

			const handleError = (error: AxiosError) => {
				setLoading(false)
				console.error(error)
			}

			setLoading(true)
			tareaApi.asignarSubregional(solicitud, handleResponse, handleError)
		}
		else {
			errorMsg('Error al procesar, intentelo de nuevo')
		}
	}

	useEffect(() => {
		if (tokenData.usuarioId) {

		}
	}, [props.tipo, tokenData])


	const consumirDataTarea = (data: any, openVentanaCorrespondiente: (param: boolean) => void) => {

		//console.log(data)

		const HandleResponse = (response: any) => {
			console.log(response)
			setDataTarea(response.data[0])
			openVentanaCorrespondiente(true);
		}

		const HandleError = (error: any) => {
			console.log("error")
			console.log(error)
		}

		tareaApi.getTareaData(data.tareaId, HandleResponse, HandleError);

	}

	const consumirDataTareaJuridico = (data: any) => {

		console.log(data)

		const HandleResponse = (response: any) => {
			console.log(response)
			setDataTarea(response.data[0])
			setOpenExpDicJuri(true);
		}

		const HandleError = (error: any) => {
			console.log("error")
			console.log(error)
		}

		tareaApi.getTareaData(data.tareaId, HandleResponse, HandleError);

	}


	const consumirDataTareaSubReg = (data: any, taskId: number) => {

		console.log(data)

		const HandleResponse = (response: any) => {
			console.log(response)
			setDataTarea(response.data[0])

			if (taskId === 5) {
				setOpenExpDicSubReg(true);
			}

			if (taskId === 7) {
				setOpenCedulaNotificacion(true)
			}

			if (taskId === 9) {
				setOpenEnmiendaSubregional(true)
			}
		}

		const HandleError = (error: any) => {
			console.log("error")
			console.log(error)
		}

		tareaApi.getTareaData(data.tareaId, HandleResponse, HandleError);

	}

	

	const consumirDataTareaReg = (data: any) => {

		console.log(data)

		const HandleResponse = (response: any) => {
			console.log(response)
			setDataTarea(response.data[0])
			setOpenExpDicReg(true);
		}

		const HandleError = (error: any) => {
			console.log("error")
			console.log(error)
		}

		tareaApi.getTareaData(data.tareaId, HandleResponse, HandleError);

	}

	const descargarBoletaInventario = (gestion: any) => {

		const handleResponse = (res: any) => {
			appDataContext.desactivateLoading()
		}

		const handleError = (error: AxiosError) => {
			appDataContext.errorToast("Error en la descarga de archivo. Vuelva a intentarlo")
			appDataContext.desactivateLoading()
		}

		appDataContext.activateLoading()
		boletaCensoApi.getFile(gestion.gestionId, "Boleta Inventario", handleResponse, handleError)
	}

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>


			<Archivos open={openDialog} closeModal={() => setOpenDialog(false)} task={currentData} />

			<RecibirTarea
				closeModal={() => {
					setOpenRecibir(false)
					setRefresh(true)
				}}
				open={openRecibir}
				tareaData={currentData}
				setTareaData={setCurrentData}
			/>

			<HistorialTarea
				closeModal={() => { setOpenHistorial(false) }}
				open={openHistorial}
				historialData={historialData}
			/>

			{currentData != null && <PlanManejoDownload gestion={currentData.ttGestion} open={openImprimir} closeModal={closeImprimir} />}

			{currentData != null && <DescargaAnexos open={openAnexos} closeModal={() => setOpenAnexos(false)} gestion={currentData.ttGestion} />}

			{/* <AnexosTarea
				closeModal={() => { setOpenAnexos(false) }}
				open={openAnexos}
				anexosData={anexosData}
				setTareaData={setCurrentData}
			/> */}

			{/* <ExpedienteProvidenciaNotifica open={openExpprovnot}
				setClose={() => {
					setOpenExpprovnot(false)
					setRefresh(true)
				}}
				tareaData={dataTarea}
				setTareaData={setCurrentData}
			/> */}
			{/* <ExpedienteDictamenJuridico open={openExpDicJuri}
				setClose={() => {
					setOpenExpDicJuri(false)
					setRefresh(true)
				}}
				tareaData={dataTarea}
				setTareaData={setCurrentData}
				setRefresh={() => { setRefresh(true) }} /> */}

			{/* <PanelTecnico open={tecnico}
				setClose={() => {
					setOpenTecnico(false)
					setRefresh(true)
				}} tareaData={dataTarea}
				setTareaData={setCurrentData}
				consumirDataTarea={consumirDataTarea}
			/> */}

			{/* <CedulaNotificacion open={openCedulaNotificacion}
				setClose={() => {
					setOpenCedulaNotificacion(false)
					setRefresh(true)
				}} tareaData={dataTarea}
				setTareaData={setCurrentData}
				consumirDataTarea={consumirDataTarea}
			/> */}


			{/*added by pamartin 2021*/ }
			{/* <Enmienda open={openEnmiendaSubregional}
				setClose={() => {
					setOpenEnmiendaSubregional(false)
					setRefresh(true)
				}} tareaData={dataTarea}
				setTareaData={setCurrentData}
				consumirDataTarea={consumirDataTarea}
			/> */}

			{/* <ExpedienteDictamenSubregional open={openExpDicSubReg}
				setClose={() => {
					setOpenExpDicSubReg(false)
					setRefresh(true)
				}} tareaData={dataTarea}
				setTareaData={setCurrentData}
				setRefresh={() => { setRefresh(true) }}
			/> */}
			{/* <ExpedienteDictamenRegional open={openExpDicReg}
				setClose={() => {
					setOpenExpDicReg(false)
					setRefresh(true)
				}} tareaData={dataTarea}
				setTareaData={setCurrentData}
				setRefresh={() => { setRefresh(true) }}
			/> */}

			<FormModal
				header={'Expediente ' + (currentSolicitudData && currentSolicitudData.ttGestion && currentSolicitudData.ttGestion.expediente ? currentSolicitudData.ttGestion.expediente : '')}
				open={openConfirmRealizarTarea}
				closeModal={cloeseConfirmRealizarTarea}
				onSave={confirmRealizarTarea}
				loading={loading}
			>
				<h4>El siguiente paso es trasladar el expediente a la Dirección Subregional
					¿Quiere realizarlo ahora? Presione si, de lo contrario puede cancelar y regresar a la lista de tareas</h4>
			</FormModal>


			<FormModal
				header='Confirmación'
				open={openConfirmTraslado}
				closeModal={cloeseConfirmTraslado}
				onSave={confirmTraslado}
				loading={loading}
			>
				<h4>¿Está seguro (a) de trasladar el expediente a la Dirección Subregional?
					Esta acción no se podrá reversar?</h4>
			</FormModal>
			{parseInt(props.tipo) === 1 && <PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={1}
				personaIdToFilter={tokenData.personaId}
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={tareaApi.getPage}
			/>}

			{parseInt(props.tipo) === 2 && <PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={2}
				personaIdToFilter={tokenData.personaId}
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={tareaApi.getPage}
			/>}

		</>
	)

}
