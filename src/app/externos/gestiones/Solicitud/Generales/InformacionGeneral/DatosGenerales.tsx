import GestionApi from 'api/GestionApi';
import { AppDataContext } from 'app/App';
import AgregadoNotificacion from 'app/externos/gestiones/Solicitud/Generales/InformacionGeneral/AgregadoNotificacion/AgregadoNotificacion';
import { CTButton, CTButtonResponse } from 'components/CustomTable';
import CustomTable from 'components/CustomTable/CustomTable';
import DepartamentoMunicipioSelect from 'components/DepartamentoMunicipioSelect';
import FormNumInput from 'components/FormNumInput';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Divider, Form, Header, Icon, Message, Segment, SemanticCOLORS } from 'semantic-ui-react';
import TipoEntidadSelect from '../../../../../../components/FormCatalogSelect/catalogs/TipoEntidadSelect';
import TipoPropietarioSelect from '../../../../../../components/FormCatalogSelect/catalogs/TipoPropietarioSelect';
import CreateUpdateInformacionGeneralDTO, { createNew as newGeneral } from '../../../../../../dto/solicitud/Hasta90/CreateUpdateInformacionGeneralDTO';
import Persona from './AgregadoPersonas/Persona';
import SeleccionPersonas from './AgregadoPersonas/SeleccionPersonas/SeleccionPersonas';
import AgregarFinca from './AgregarFinca/AgregarFinca';
import DocumentoFincaFormModal from './AgregarFinca/DocumentoFincaFormModal';
import DatosGeneralesFormError, { newDatosGeneralesFormError, validateDatosSolicitante } from './DatosGeneralesFormError';
import DatosRepresentacion from './DatosRepresentacion';

/**
	 * Este será el encabezado para las tablas
	 */
const encabezadosPersonas = [
	{ header: "Nombre", name: 'nombre' },
	{ header: "CUI", name: 'cui' },
	{ header: "Sexo", name: 'sexo' },
];

/**
 * Este será el encabezado para los representantes
 */
const encabezadosRepresentantes = [
	{ header: "Nombre", name: 'nombre' },
	{ header: "CUI", name: 'cui' },
	{ header: "Sexo", name: 'sexo' },
];


/**
 * Este será el encabezado para las fincas
 */
const encabezadosFincas = [
	{ header: "Nombre", name: 'nombreFinca' },
	{ header: "Dirección", name: 'direccion' },
	{ header: "Área", name: 'area' },
	{ header: "Tipo propiedad", name: 'tipoPropiedad' },
];


/**
 * Este será el encabezado para las notificaciones adicionales
 */
const encabezadosNotificaciones = [
	{ header: "Tipo de Notificación", name: 'tipoNotificacion' },
	{ header: "Datos", name: 'descripcionNotificacion' },
	{ header: "Departamento", name: 'municipio.tcDepartamento.departamentoDesc' },
	{ header: "Municipio", name: 'municipio.municipioDesc' },
];


/**
 * Colores para los botones
 */
const verde: SemanticCOLORS = 'green';
const azul: SemanticCOLORS = 'blue';
const rojo: SemanticCOLORS = 'red';





/**
 * Botones para los Fincas
 */
const botonesFincas: CTButton[] = [
	{ id: "editarDocumento", label: "Documento propiedad", hint: "Editar documento", color: azul, icon: "edit outline" },
	{ id: "eliminar", hint: "Eliminar", icon: "x", color: rojo },
];


/**
 * Botones para las notificaciones
 */
const botonesNotificaciones = [
	{ id: "eliminar", label: "Eliminar", color: rojo },
];

/** 
 * Este tipo de dato es el que usaremos para las tablas de personas y representantes
*/

type IndividualesTable = {
	codigo: number,
	nombre: string,
	cui: string,
	estadoCivil: string,
	sexo: string,
	data: any
}

type FincaTable = {
	nombreFinca: number,
	direccion: string,
	area: number,
	tipoPropiedad: string,
	data: any
}

type Props = {
	gestion: any,
	setNextButtonDisabled: (disabled: boolean) => void,
	nextButtonRef: React.MutableRefObject<() => boolean>
	reloadGestion: () => void
}


type NotificacionTable = {
	codigo: number
	descripcionNotificacion: string,
	tipoNotificacion: string,
	municipio: any,
	data: any
	notificacionGestionId?: number
}

const gestionApi = new GestionApi()

export default function IngresoSolicitud({
	gestion,
	setNextButtonDisabled,
	nextButtonRef,
	reloadGestion
}: Props) {

	const dataContext = useContext(AppDataContext)

	const successToast = useCallback(dataContext.successToast, [])
	const errorToast = useCallback(dataContext.errorToast, [])

	const notifyInfo = () => successToast("Proceso exitoso.");
	const notifyError = () => errorToast("Hubo un error. Vuelva a intentarlo.");

	const [formData, setFormData] = useState<CreateUpdateInformacionGeneralDTO>(newGeneral());
	const [formError, setFormError] = useState<DatosGeneralesFormError>(newDatosGeneralesFormError());
	const [visibleMessage, setVisibleMessage] = useState(false);
	const [banderaRepre, setBanderaRepre] = useState(0);	//0 = individual, 1 = repre
	const [tipoPropietario, setTipoPropietario] = useState<any>(null);
	const [tipoEntidad, setTipoEntidad] = useState<any>(null);
	const [fincaEditar, setFincaEditar] = useState<any>({});
	const [savePropietario, setSavePropietario] = useState<any>(null);

	const isNotInvolucradoSolicitante = (involucrado: IndividualesTable): boolean => {
		if (involucrado.cui === gestion.tcPersonaCrea.cui) {
			return false;
		}
		return true;
	}

	/**
	 * Tipos de botones para la tabla de involucrados
	 */
	const botonesInvolucrados: CTButton[] = [
		{ id: "volverRepresentante", label: "Convertir Representante", color: verde },
		{ id: "eliminar", label: "Eliminar", color: rojo },
	];



	/**
 * Botones para los representantes legales
 */
	const botonesRepresentantes = [
		{ id: "eliminar", label: "Eliminar", color: rojo },
	];

	/**
	 * Este sirve para el modal de creaciond e persona
	 */
	const [openPersona, setOpenPersona] = useState(false);

	/**
	 * Este sirve para el modal de seleccion de personas ya existentes
	 */
	const [openPeople, setOpenPeople] = useState(false);

	/**
	 * Este sirve para el modal de creacion de fincas
	 */
	const [openFincas, setOpenFincas] = useState(false);

	/**
	 * Este sirve para el modal de edicion de documentos de
	 */
	const [openEditDocumentoFinca, setOpenEditDocumentoFinca] = useState(false);

	/**
	 * Este sirve para el modal de creaciond e persona
	 */
	const [openNotificacion, setOpenNotificacion] = useState(false);

	/**Para el 
	 * manejo de las tablas y 
	 * fuente para el dto */
	const [involucrados, setInvolucrados] = useState<IndividualesTable[]>([]);
	const [representantes, setRepresentantes] = useState<IndividualesTable[]>([]);
	const [fincas, setFincas] = useState<FincaTable[]>([]);
	const [notificaciones, setNotificaciones] = useState<NotificacionTable[]>([]);




	/**
	 * Este metodo es el que maneja el cierre de los mensajes automaticos
	 */
	const handleDismiss = () => {
		setVisibleMessage(false)
	}

	const isPersonAdded = (cui: string) => {

		let index = involucrados.findIndex(i => i.cui === cui)

		if (index !== -1) {
			return true
		}

		return false

	}
	/**
	 * Esta Función es la que maneja el agregado a la tabla de 
	 * personas involucradas al crearse una nueva persona individual
	 */
	const setPerson = (e: any) => {

		if (isPersonAdded(e.cui)) {
			dataContext.errorToast("Ya se agrego a esta persona a la lista de involucrados")
			return
		}


		let nuevoIndividual: IndividualesTable = {
			codigo: parseInt(e.cui),
			nombre: e.nombre,
			cui: e.cui,
			estadoCivil: e.estadoCivil,
			sexo: e.sexo,
			data: e.data
		};
		let temporalArray: IndividualesTable[] = involucrados;
		temporalArray.push(nuevoIndividual);
		setInvolucrados(temporalArray);
		setFormData((oldValues: any) => ({
			...oldValues,
			'personasIndividuales': temporalArray,
		}));
	}

	/**
	 * Esta Función es la que maneja el borrado de la tabla de 
	 * personas involucradas 
	 */

	const quitPerson = (e: number) => {

		let nuevoArray: IndividualesTable[] = [];

		involucrados.forEach((x) => {
			if (x.codigo !== e) {
				nuevoArray.push(x)
			}
		})

		setInvolucrados(nuevoArray);

		setFormData((oldValues: any) => ({
			...oldValues,
			'personasIndividuales': nuevoArray,
		}));

		notifyInfo()
	}

	const isRepresentanteAdded = (cui: string) => {

		let index = representantes.findIndex(i => i.cui === cui)

		if (index !== -1) {
			return true
		}

		return false

	}

	/**
	 * Esta Función es la que maneja el agregado a la tabla de 
	 * respresentantes al crearse una nueva persona individual
	 */
	const setRepre2 = (e: any) => {

		let nuevoIndividual: IndividualesTable = {
			codigo: parseInt(e.tcPersona.cui),
			nombre: e.tcPersona.personaDesc,
			cui: e.tcPersona.cui,
			estadoCivil: e.tcPersona.tcEstadoCivil.estadoCivilDesc,
			sexo: e.tcPersona.tcSexo.sexoDesc,
			data: e
		};

		let temporalArray: IndividualesTable[] = representantes;
		temporalArray.push(nuevoIndividual)
		setRepresentantes(temporalArray);

		setFormData((oldValues: any) => ({
			...oldValues,
			'representantesLegales': temporalArray,
		}));

	}

	const setRepre = (e: any) => {

		let nuevoIndividual: IndividualesTable = {
			codigo: parseInt(e.tcPersona.cui),
			nombre: e.tcPersona.personaDesc,
			cui: e.tcPersona.cui,
			estadoCivil: e.tcPersona.tcEstadoCivil.estadoCivilDesc,
			sexo: e.tcPersona.tcSexo.sexoDesc,
			data: e
		};

		let temporalArray: IndividualesTable[] = [];

		representantes.forEach((x) => {
			temporalArray.push(x)
		})

		temporalArray.push(nuevoIndividual)
		setRepresentantes(temporalArray);
		setFormData((oldValues: any) => ({
			...oldValues,
			'representantesLegales': temporalArray,
		}));
	}

	const getTipoPropiedad = (fincaGestion: any): string => {
		if (fincaGestion.tcTipoPropiedad == null) {
			return "Sin definir"
		}
		return fincaGestion.tcTipoPropiedad.tipoPropiedadDesc
	}

	const addFinca = (fincaGestion: any) => {

		let finca: FincaTable = {
			data: fincaGestion,
			area: fincaGestion.tcFinca.area,
			direccion: fincaGestion.tcFinca.direccion,
			tipoPropiedad: getTipoPropiedad(fincaGestion),
			nombreFinca: fincaGestion.tcFinca.fincaDesc
		};

		let temporalArray: FincaTable[] = fincas;
		temporalArray.push(finca)
		setFincas(temporalArray);

		setFormData((oldValues: any) => ({
			...oldValues,
			'fincasActuales': temporalArray,
		}));

	}

	//Update finca
	const modifyFinca = (fincaGestion: any) => {
		let copy = fincas.slice()
		let index = copy.findIndex(element => element.data.tcFinca.fincaId === fincaGestion.tcFinca.fincaId)
		if (index !== -1) {
			let fincaTable: FincaTable = {
				data: fincaGestion,
				area: fincaGestion.tcFinca.area,
				direccion: fincaGestion.tcFinca.direccion,
				tipoPropiedad: getTipoPropiedad(fincaGestion),
				nombreFinca: fincaGestion.tcFinca.fincaDesc
			};
			copy[index] = fincaTable
			setFincas(copy)
			setFormData((oldValues: any) => ({
				...oldValues,
				'fincasActuales': copy
			}))
		}
	}


	/*Agregado de las notificaciones*/

	const setNotificacionesTable = (e: any) => {
		let notificacion: NotificacionTable = {
			codigo: e.notificacionGestionId,
			descripcionNotificacion: e.notificacionGestionDesc,
			tipoNotificacion: e.tcTipoNotificacion.tipoNotificacionDesc,
			municipio: e.tcMunicipio,
			data: e
		}
		let temporalArray: NotificacionTable[] = notificaciones;
		temporalArray.push(notificacion)
		setNotificaciones(temporalArray);
	}


	/**
	 * Esta Función es la que maneja el borrado de la tabla de 
	 * representantes involucradas 
	 */

	const quitRepre = (e: number) => {
		let nuevoArray: IndividualesTable[] = [];
		representantes.forEach((x) => {
			if (x.codigo !== e) {
				nuevoArray.push(x)
			}
		})
		setRepresentantes(nuevoArray);
		setFormData((oldValues: any) => ({
			...oldValues,
			'representantesLegales': nuevoArray,
		}));
	}


	/**
	 * Esta Función es la que maneja el borrado de la tabla de 
	 * fincas involucradas 
	 */

	const quitFinca = (e: number) => {

		let nuevoArray: FincaTable[] = [];
		fincas.forEach((x) => {
			if (x.data.tcFinca.fincaId !== e) {
				nuevoArray.push(x)
			}
		})
		setFincas(nuevoArray);
		setFormData((oldValues: any) => ({
			...oldValues,
			'fincasActuales': nuevoArray,
		}));

	}


	/**
	 * Esta Función es la que maneja el borrado de la tabla de 
	 * fincas involucradas 
	 */

	const quitNotificaciones = (e: number) => {
		let nuevoArray: NotificacionTable[] = [];
		notificaciones.forEach((x) => {
			if (x.codigo !== e) {
				nuevoArray.push(x)
			}
		})
		setNotificaciones(nuevoArray);
	}

	/**
	 * Esta funcion es la invocada por el boton "Convertir Representante"
	 * Lo que hace es agregar la persona al array de representantes y a la tabla
	 */

	const onButtonClick = (buttonResponse: CTButtonResponse) => {

		if (buttonResponse.id === "volverRepresentante") {

			if (isRepresentanteAdded(buttonResponse.rowData.data.tcPersona.cui)) {
				dataContext.errorToast("Ya se agrego a esta persona a la lista de representantes")
				return
			}

			let agregarRepresentante = {
				estadoId: buttonResponse.rowData.data.estadoId,
				fechaRegistro: buttonResponse.rowData.data.fechaRegistro,
				personaGestionId: buttonResponse.rowData.data.personaGestionId,
				representanteLegal: 1,
				soloRepresenta: buttonResponse.rowData.data.soloRepresenta,
				tcPersona: buttonResponse.rowData.data.tcPersona,
				ttGestion: gestion,
			};

			const handleResponseAgregarRepre = (response: any) => {
				if (response.data.status === "OK") {
					setRepre(response.data.data[0])
				} else {
					notifyError()
				}
			}

			const handleErrorAgregarRepre = (response: any) => {
				notifyError()
				console.error(response)
			}

			gestionApi.agregarPersonaIndividual(agregarRepresentante, handleResponseAgregarRepre, handleErrorAgregarRepre)


		} else {

			let quitarPersona = {
				estadoId: buttonResponse.rowData.data.estadoId,
				fechaRegistro: buttonResponse.rowData.data.fechaRegistro,
				personaGestionId: buttonResponse.rowData.data.personaGestionId,
				representanteLegal: buttonResponse.rowData.data.representanteLegal,
				soloRepresenta: buttonResponse.rowData.data.soloRepresenta,
				tcPersona: buttonResponse.rowData.data.tcPersona,
				ttGestion: gestion,
			};

			const handleResponseQuitarPersona = (response: any) => {
				if (response.data.status === "OK") {
					quitPerson(quitarPersona.tcPersona.cui)
				} else {
					notifyError()
				}
			}

			const handleErrorQuitarPersona = (response: any) => {
				notifyError()
				console.error(response)
			}

			gestionApi.quitarPersonaIndividual(quitarPersona, handleResponseQuitarPersona, handleErrorQuitarPersona)

		}
	}


	const onButtonClickFincas = (buttonResponse: CTButtonResponse) => {
		if (buttonResponse.id === "editarDocumento") {
			setFincaEditar(buttonResponse.rowData.data)
			setOpenEditDocumentoFinca(true)
		} else {
			let fincaEliminar = {
				estadoId: buttonResponse.rowData.data.estadoId,
				fechaEmision: buttonResponse.rowData.data.fechaEmision,
				fechaRegistro: buttonResponse.rowData.data.fechaRegistro,
				fincaGestionId: buttonResponse.rowData.data.fincaGestionId,
				folio: buttonResponse.rowData.data.folio,
				libro: buttonResponse.rowData.data.libro,
				mostrarNotario: buttonResponse.rowData.data.notario ? true : false,
				mostrarDocumento: buttonResponse.rowData.data.numeroDOcumento ? true : false,
				notario: buttonResponse.rowData.data.notario,
				numeroDocumento: buttonResponse.rowData.data.numeroDocumento,
				personas: buttonResponse.rowData.data.personas,
				propietarios: buttonResponse.rowData.data.propietarios,
				tcFinca: buttonResponse.rowData.data.tcFinca,
				tcLibro: buttonResponse.rowData.data.tcLibro,
				tcMunicipo: null,
				tcMunicipioEmite: buttonResponse.rowData.data.tcMunicipioEmite,
				tcTipoPropiedad: buttonResponse.rowData.data.tcTipoPropiedad,
				ttGestion: gestion
			}

			const handleResponeEliminar = (response: any) => {
				if (response.status === "OK") {
					quitFinca(buttonResponse.rowData.data.tcFinca.fincaId)
					notifyInfo()
				} else {
					errorToast(response.message)
				}
			}

			const handleErrorEliminar = (error: any) => {
				console.log(error)
				notifyError()
			}

			gestionApi.quitarFinca(fincaEliminar, handleResponeEliminar, handleErrorEliminar)
		}

	}

	const onButtonClickRepresentantes = (buttonResponse: CTButtonResponse) => {

		let quitarPersona = {
			estadoId: buttonResponse.rowData.data.estadoId,
			fechaRegistro: buttonResponse.rowData.data.fechaRegistro,
			personaGestionId: buttonResponse.rowData.data.personaGestionId,
			representanteLegal: buttonResponse.rowData.data.representanteLegal,
			soloRepresenta: buttonResponse.rowData.data.soloRepresenta,
			tcPersona: buttonResponse.rowData.data.tcPersona,
			ttGestion: gestion,
		};

		const handleResponseQuitarPersona = (response: any) => {
			if (response.data.status === "OK") {
				quitRepre(quitarPersona.tcPersona.cui)
				successToast("Dato eliminado correctamente")
			} else {
				errorToast(response.data.message)
			}
		}

		const handleErrorQuitarPersona = (response: any) => {
			console.error(response)
			notifyError()
		}

		gestionApi.quitarPersonaIndividual(quitarPersona, handleResponseQuitarPersona, handleErrorQuitarPersona)

	}

	const onButtonClicNotificaciones = (buttonResponse: CTButtonResponse) => {

		let body = {
			notificacionGestionId: buttonResponse.rowData.data.notificacionGestionId,
			notificacionGestionDesc: buttonResponse.rowData.data.notificacionGestionDesc,
			tcTipoNotificacion: buttonResponse.rowData.data.tcTipoNotificacion,
			ttGestion: gestion
		}

		const handleResponse = (response: any) => {

			if (response.data.status === "OK") {
				quitNotificaciones(buttonResponse.rowData.codigo)
				notifyInfo()
			} else {
				errorToast(response.data.message)
			}
		}

		const handleError = (error: any) => {
			console.error(error)
			notifyError()
		}

		gestionApi.quitarNotificacion(body, handleResponse, handleError)

	}

	const setData = (name: string, value: any) => {
		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));

		if (name === 'tcTipoPropietario') {

			setFormData((oldValues: any) => ({
				...oldValues,
				'tipoPersona': value.tipoPropietarioDesc,
			}));

		} else if (name === 'tcTipoEntidad') {
			setFormData((oldValues: any) => ({
				...oldValues,
				'tipoEntidad': value.tipoEntidadDesc,
			}));
		} else if (name === 'tipoDocumento') {
		}
	}

	/**
	 * Función para el manejo de Datos del DTO
	 */
	const handleChange = (_e: any, { name, value }: any) => {
		setData(name, value)
	}

	const handleBlur = (e: any) => {
		setData(e.target.name, e.target.value)
	}


	const handleChangeMunicipioNotificacion = (e: any, { name, value, object }: any) => {

		setFormData((oldValues: any) => ({
			...oldValues,
			'municipioNoti': value,
		}));

		setFormData((oldValues: any) => ({
			...oldValues,
			'tcMunicipio': object,
		}));
	}


	/*Con esta funcion manejamos el tipo de propietario y el render que se manejaba en HandleChange*/
	const HandleChangeTipoPropietario = (e: any, { name, value }: any) => {
		handleChange(e, { name, value })
		setTipoPropietario(value)
		// onSaveTipoPropietario(value)
	}

	/*Con esta funcion manejamos el tipo de propietario y el render que se manejaba en HandleChange*/
	const HandleChangeTipoEntidad = (e: any, { name, value }: any) => {
		handleChange(e, { name, value })
		setTipoEntidad(value)
	}

	/**
	 * Con esta función vamos a guardar el tipo de propietario de la gestion
	 */
	const onSaveTipoPropietario = () => {

		let ttTipoPropietarioGestion_var;

		if (tipoPropietario.tipoPropietarioId === 1) {
			ttTipoPropietarioGestion_var = {
				categoriaProfesionId: 0,
				nitEntidad: null,
				nombreComercial: null,
				razonSocial: null,
				tcTipoEntidad: null,
				tcTipoPropietario: tipoPropietario,
				tipoPropietarioGestionId: 0
			}
		}
		else if (tipoPropietario.tipoPropietarioId === 2) {
			ttTipoPropietarioGestion_var = {
				categoriaProfesionId: 0,
				nitEntidad: formData.nit,
				nombreComercial: formData.nombreComercial,
				razonSocial: formData.razonSocial,
				tcTipoEntidad: tipoEntidad,
				tcTipoPropietario: tipoPropietario,
				tipoPropietarioGestionId: 0
			}
		}

		let setPropietario = {
			estadoId: gestion.estadoId,
			gestionId: gestion.gestionId,
			personaAnulaId: gestion.tcElaborador.personaId,
			tcElaborador: gestion.tcElaborador,
			tcPersonaCrea: gestion.tcElaborador,
			tcTipoBosque: gestion.tcTipoBosque,
			tcTipoGestion: gestion.tcTipoGestion,
			ttTipoPropietarioGestion: ttTipoPropietarioGestion_var
		}


		const handleResponse = (response: any) => {
			if (response.data.status === "OK") {
				setSavePropietario(response.data.data[0])
				reloadGestion()
				// setRepre()
				notifyInfo()
			} else {
				notifyError()
			}
		}

		const handleError = (error: any) => {
			console.error(error)
			notifyError()
		}


		let formError = validateDatosSolicitante(ttTipoPropietarioGestion_var)
		setFormError(formError)
		if (!formError.isError) {
			gestionApi.setPropietario(setPropietario, handleResponse, handleError)
		}

	}

	/**
	 * Esta función guarda los datos de notificación de la solicitud
	 * Consume su respectivo servicio
	 */
	const onSaveNotificacion = () => {

		let updateNotificacion = [

			//Direccion
			{
				notificacionGestionId: formData.direccionId,
				estadoId: 1,
				municipioId: formData.tcMunicipio.municipioId,
				notificacionGestionDesc: formData.direccionDomiciliar,
				tcMunicipio: formData.tcMunicipio,
				tcTipoNotificacion: {
					esDireccion: 1,
					esObligatorio: 1,
					estadoId: 1,
					fechaRegistro: "2020-01-01",
					maxlength: 500,
					tcTipoNotificacionDesc: "Dirección domiciliar",
					tipoNotificacionId: 1,
					type: "text"
				},
				ttGestion: gestion
			},
			//telefono
			{
				notificacionGestionId: formData.telefonoId,
				estadoId: 1,
				notificacionGestionDesc: formData.telefono,
				tcTipoNotificacion: {
					esDireccion: 0,
					esObligatorio: 1,
					estadoId: 1,
					fechaRegistro: "2020-01-01",
					maxlength: 8,
					tcTipoNotificacionDesc: "Teléfono",
					tipoNotificacionId: 3,
					type: "text"
				},
				ttGestion: gestion
			},
			//celular
			{
				notificacionGestionId: formData.celularId,
				estadoId: 1,
				notificacionGestionDesc: formData.celular,
				tcTipoNotificacion: {
					esDireccion: 0,
					esObligatorio: 1,
					estadoId: 1,
					fechaRegistro: "2020-01-01",
					maxlength: 8,
					tcTipoNotificacionDesc: "Celular",
					tipoNotificacionId: 4,
					type: "text"
				},
				ttGestion: gestion
			},
			//email
			{
				notificacionGestionId: formData.correoId,
				estadoId: 1,
				notificacionGestionDesc: formData.email,
				tcTipoNotificacion: {
					esDireccion: 0,
					esObligatorio: 1,
					estadoId: 1,
					fechaRegistro: "2020-01-01",
					maxlength: 100,
					tcTipoNotificacionDesc: "Correo electrónico",
					tipoNotificacionId: 5,
					type: "email"
				},
				ttGestion: gestion
			}
		]



		const handleResponse = (response: any) => {
			dataContext.desactivateLoading()
			if (response.data.status === "OK") { 

				const handleResponseInterno = (response2: any) => {
					dataContext.desactivateLoading()

					if (response2.status === "OK") {

						var array = response2.data[0].notificaciones;

						for (var pos = 0; pos < array.length; pos++) {

							switch (pos) {
								case 0:
									formData.direccionId = array[0].notificacionGestionId
									break;

								case 1:
									formData.telefonoId = array[1].notificacionGestionId
									break;

								case 2:
									formData.celularId = array[2].notificacionGestionId
									break;

								case 3:
									formData.correoId = array[3].notificacionGestionId
									break;

								default:
									break;
							}
						}
					}
				}

				const handleErrorInterno = (error2: any) => {
					console.error(error2)
					dataContext.desactivateLoading()
				}


				if (!formData.telefonoId) {	 //validamos si es la primera vez que se guarda.	
					dataContext.activateLoading()			
					gestionApi.getGestionById(gestion.gestionId, handleResponseInterno, handleErrorInterno)
				}

				notifyInfo()

			} else {
				notifyError()
			}
		}

		const handleError = (error: any) => {
			dataContext.desactivateLoading()
			console.error(error)
			notifyError()
		}

		dataContext.activateLoading()
		gestionApi.actualizarNotificacion(updateNotificacion, handleResponse, handleError)
	}


	const openPersonaDialog = () => {
		setBanderaRepre(0)
		setOpenPersona(true)
	}

	const openPeopleDialog = () => {
		setBanderaRepre(0)
		setOpenPeople(true)
	}

	const openPersonaDialog2 = () => {
		setBanderaRepre(1)
		setOpenPersona(true)
	}

	const openPeopleDialog2 = () => {
		setBanderaRepre(1)
		setOpenPeople(true)
	}

	const openFincasDialog = () => {
		if (formData.tipoPersona) {
			setOpenFincas(true)
		} else {
			errorToast("Se debe seleccionar y guardar tipo de propietario antes de realizar esta acción")
		}
	}

	const openNotificacionDialog = () => {
		setOpenNotificacion(true)
	}

	const setMiPersona = (e: number) => {
		//setPersonaSeleccionada(e);
	}


	/**
	 * Buscamos si el representante que se agregará ya existe en el vector
	 */
	const RepresentantesExist = (e: number) => {
		let contador: 0;
		for (contador = 0; contador < formData.representantesLegales.length; contador++) {
			if (e === formData.representantesLegales[contador]) {
				return true;
			}
		}
		return false;
	}


	//Este use effect es para llenar datos que vienen de la base
	const initData = (gestion: any) => {


		if (gestion.ttTipoPropietarioGestion) {

			let formdata: CreateUpdateInformacionGeneralDTO = newGeneral()
			setTipoPropietario(gestion.ttTipoPropietarioGestion.tcTipoPropietario)
			formdata.tipoPersona = gestion.ttTipoPropietarioGestion.tcTipoPropietario.tipoPropietarioDesc;
			setSavePropietario(gestion.ttTipoPropietarioGestion)

			for (let x = 0; x < gestion.personas.length; x++) {

				let newPersona = {
					codigo: gestion.personas[x].tcPersona.cui,
					cui: gestion.personas[x].tcPersona.cui,
					nombre: gestion.personas[x].tcPersona.personaDesc,
					estadoCivil: gestion.personas[x].tcPersona.tcEstadoCivil.estadoCivilDesc,
					sexo: gestion.personas[x].tcPersona.tcSexo.sexoDesc,
					data: gestion.personas[x]
				}

				setPerson(newPersona)
				formdata.personasIndividuales.push(newPersona)
			}

			for (let x = 0; x < gestion.representantes.length; x++) {
				setRepre2(gestion.representantes[x])
				formdata.representantesLegales.push(gestion.representantes[x])
			}

			setTipoEntidad(gestion.ttTipoPropietarioGestion.tcTipoEntidad)

			if (formdata.tipoPersona !== "Individual" && gestion.ttTipoPropietarioGestion != null) {
				if (gestion.ttTipoPropietarioGestion.tcTipoEntidad != null) {
					formdata.tipoEntidad = gestion.ttTipoPropietarioGestion.tcTipoEntidad.tipoEntidadDesc;
				}
			}

			formdata.nit = gestion.ttTipoPropietarioGestion.nitEntidad ? gestion.ttTipoPropietarioGestion.nitEntidad : "";
			formdata.nombreComercial = gestion.ttTipoPropietarioGestion.nombreComercial ? gestion.ttTipoPropietarioGestion.nombreComercial : "";
			formdata.razonSocial = gestion.ttTipoPropietarioGestion.razonSocial ? gestion.ttTipoPropietarioGestion.razonSocial : "";

			if (gestion.notificaciones.length > 0) {

				for (var pos = 0; pos < gestion.notificaciones.length; pos++) {

					switch (pos) {
						case 0:
							formdata.direccionDomiciliar = gestion.notificaciones[0].notificacionGestionDesc
							formdata.tcMunicipio = gestion.notificaciones[0].tcMunicipio
							formdata.direccionId = gestion.notificaciones[0].notificacionGestionId
							break;

						case 1:
							formdata.telefono = gestion.notificaciones[1].notificacionGestionDesc
							formdata.telefonoId = gestion.notificaciones[1].notificacionGestionId
							break;

						case 2:
							formdata.celular = gestion.notificaciones[2].notificacionGestionDesc
							formdata.celularId = gestion.notificaciones[2].notificacionGestionId
							break;

						case 3:
							formdata.email = gestion.notificaciones[3].notificacionGestionDesc
							formdata.correoId = gestion.notificaciones[3].notificacionGestionId
							break;

						default:
							setNotificacionesTable(gestion.notificaciones[pos])
							break;
					}
				}
			}

			for (let x = 0; x < gestion.fincas.length; x++) {
				addFinca(gestion.fincas[x])
				formdata.fincasActuales.push(gestion.fincas[x])
			}


			setFormData(formdata)
		}

	}

	const initDataCallback = useCallback(initData, [gestion])


	//use effect para darle get al servicio
	useEffect(() => {
		if (gestion != null) {
			initDataCallback(gestion)
		}
	}, [gestion, initDataCallback]);

	//Validamos datos antes de continuar
	const isDataValid = (): boolean => {

		if (fincas.length === 0) {
			dataContext.errorToast("No hay datos de finca");
			return false
		}

		for (let finca of fincas) {
			if (finca.data.tcTipoPropiedad == null) {
				dataContext.errorToast("Debe de ingresar todos los datos de la fincas");
				return false
			}
		}
		return true
	}

	const isDataValidCallback = useCallback(
		isDataValid,
		[fincas],
	)

	useEffect(() => {
		nextButtonRef.current = isDataValidCallback
	}, [nextButtonRef, isDataValidCallback])

	const renderSolicitanteIndividual = () => {
		return (
			<>
				<Header size="medium">Personas Involucradas en la Solicitud</Header>
				<Form.Group widths="equal">
					<Form.Button
						onClick={openPersonaDialog}
						color={"twitter"}
						error={formError ? formError.personasIndividuales : null}
						icon
						labelPosition="right">
						<Icon name="add user" />
						Agregar Persona
					</Form.Button>
					<Form.Button
						onClick={openPeopleDialog}
						color={"olive"}
						error={formError ? formError.personasIndividuales : null}
						icon
						labelPosition="right" >
						<Icon name="search" />
						Buscar Persona
					</Form.Button>
				</Form.Group>
				<CustomTable
					data={involucrados}
					columns={encabezadosPersonas}
					buttonsColumnHeader="Opciones"
					buttons={botonesInvolucrados}
					onButtonClick={onButtonClick}
				/>
				<Header size="medium">Representantes Legales</Header>
				<Form.Group widths="equal">
					<Form.Button
						onClick={openPersonaDialog2}
						color={"twitter"}
						error={formError ? formError.representantesLegales : null}
						icon
						labelPosition="right"
					>
						<Icon name="add user" />
						Agregar Persona
					</Form.Button>
					<Form.Button
						onClick={openPeopleDialog2}
						color={"olive"}
						error={formError ? formError.representantesLegales : null}
						icon
						labelPosition="right"
					>
						<Icon name="search" />
						Buscar Persona
					</Form.Button>
				</Form.Group>
				<CustomTable
					data={representantes}
					columns={encabezadosRepresentantes}
					buttonsColumnHeader="Eliminar"
					buttons={botonesRepresentantes}
					onButtonClick={onButtonClickRepresentantes}
				/>
				{representantes.length !== 0 &&
					<>
						<Header size="medium">Datos de representación</Header>
						<DatosRepresentacion gestion={gestion} />
					</>
				}
			</>
		)
	}

	const renderPersonaJuridica = () => {
		return (
			<Segment clearing>
				<Header size="medium">Datos de Persona Jurídica</Header>
				<Form.Group widths="equal">
					<Form.Input
						name="razonSocial"
						fluid
						label="Nombre o Razón Social"
						value={formData.razonSocial}
						onChange={handleChange}
						error={formError ? formError.razonSocial : null}
					/>
					<Form.Input
						fluid
						label="NIT"
						name='nit'
						onChange={handleChange}
						value={formData.nit}
						error={formError ? formError.nit : null}
					/>

					<Form.Input
						fluid
						label="Nombre Comercial"
						name='nombreComercial'
						onChange={handleChange}
						value={formData.nombreComercial}
						error={formError ? formError.nombreComercial : null}
					/>
				</Form.Group>
				<Form.Group widths="equal">
					<TipoEntidadSelect
						onChange={HandleChangeTipoEntidad}
						label="Tipo De Entidad"
						value={tipoEntidad}
						error={formError ? formError.tipoEntidad : null}
					/>
				</Form.Group>
				<Form.Button floated="right" onClick={onSaveTipoPropietario} color="green" icon labelPosition="right" >
					<Icon name="save" />
					Guardar
				</Form.Button>
			</Segment>
		)
	}

	const renderTipoDatosSolicitante = () => {

		if (tipoPropietario === null) {
			return
		}

		if (tipoPropietario.tipoPropietarioId === 2) {
			return renderPersonaJuridica()
		}
		else {
			return (
				<Form.Button floated="right" onClick={onSaveTipoPropietario} color="green" icon labelPosition="right" >
					<Icon name="save" />
					Guardar
				</Form.Button>
			)
		}

	}

	const renderDatosSolicitante = () => {
		return (
			<Segment raised clearing>
				<Header size="medium">
					1.1. Datos del solicitante
				</Header>
				<Form>
					<TipoPropietarioSelect
						width="3"
						onChange={HandleChangeTipoPropietario}
						label="Tipo De Propietario"
						value={tipoPropietario}
						error={formError ? formError.tipoPersona : null}
					/>
					{renderTipoDatosSolicitante()}
					{savePropietario != null ?
						<>
							{renderSolicitanteIndividual()}
						</>
						: null}
				</Form>
			</Segment>
		)
	}

	const renderDatosNotificacion = () => {
		if (savePropietario === null) {
			return
		}

		return (
			<Segment raised>
				<Header>
					1.2. Datos de notificación
				</Header>
				<Form>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							name="direccionDomiciliar"
							label="Lugar para recibir notificaciones"
							onChange={handleChange}
							value={formData.direccionDomiciliar}
							error={formError ? formError.direccionDomiciliar : null}
						/>
						<DepartamentoMunicipioSelect
							required
							municipioValue={formData.tcMunicipio}
							onChange={handleChangeMunicipioNotificacion}
							departamentoLabel="Departamento/estado"
							municipioLabel="Municipio/provincia"
							municipioName="tcMunicipio"
							upward={false}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<FormNumInput
							name="telefono"
							label="Teléfono"
							onlyDigits
							maxLength={8}
							value={formData.telefono}
							onBlur={handleBlur}
							error={formError ? formError.telefono : null}
						/>
						<FormNumInput
							name="celular"
							onlyDigits
							maxLength={8}
							value={formData.celular}
							onBlur={handleBlur}
							label="Celular"
							error={formError ? formError.celular : null}
						/>
						<Form.Input
							name="email"
							value={formData.email}
							label="Correo Electrónico"
							onChange={handleChange}
							error={formError ? formError.email : null}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Button floated="right" onClick={onSaveNotificacion} color={"green"} icon labelPosition="right">
							<Icon name="save" />
							Guardar notificación
						</Form.Button>
					</Form.Group>
					<Header size={"medium"}>Notificaciones Adicionales</Header>
					<Form.Button
						onClick={openNotificacionDialog}
						color={"blue"}
						icon
						labelPosition="right"
						error={formError ? formError.personasIndividuales : null}>
						<Icon name="add" />
						Agregar notificación adicional
					</Form.Button>
					<CustomTable
						data={notificaciones}
						columns={encabezadosNotificaciones}
						buttonsColumnHeader="Acciones"
						buttons={botonesNotificaciones}
						onButtonClick={onButtonClicNotificaciones}
					/>
				</Form>
			</Segment>
		)
	}

	const renderTablaFincas = () => {

		if (savePropietario === null) {
			return
		}

		return (
			<Segment raised>
				<Form>
					<Header size="medium" >1.3. Datos de las Fincas</Header>
					<Form.Group widths="equal">
						<Form.Button
							onClick={openFincasDialog}
							color={"blue"}
							error={formError ? formError.fincasActuales : null}
							icon
							labelPosition="right"
						>
							<Icon name="add" />
							Agregar finca
						</Form.Button>
					</Form.Group>
					<CustomTable
						data={fincas}
						columns={encabezadosFincas}
						buttonsColumnHeader="Opciones"
						buttons={botonesFincas}
						onButtonClick={onButtonClickFincas}
					/>
				</Form>
			</Segment>
		)
	}

	return (
		< >
			{visibleMessage ? <Message header={"Información"} floating={true} onDismiss={handleDismiss} /> : <></>}
			{renderDatosSolicitante()}
			<Divider horizontal />
			{renderDatosNotificacion()}
			<Divider horizontal />
			{renderTablaFincas()}
			<Persona noImage bandera={banderaRepre} setRepre={setRepre} setPerson={setPerson} open={openPersona} ttGestion={gestion} closeModal={() => setOpenPersona(false)} />
			<SeleccionPersonas bandera={banderaRepre} setRepre={setRepre} setPerson={setPerson} ttGestion={gestion} setSeleccionado={setMiPersona} open={openPeople} closeModal={() => setOpenPeople(false)} />
			{openFincas && <AgregarFinca gestion={gestion} open={openFincas} closeModal={() => setOpenFincas(false)} onFincaAdded={addFinca} />}
			<DocumentoFincaFormModal
				closeModal={() => setOpenEditDocumentoFinca(false)}
				modifyFinca={modifyFinca}
				gestion={gestion}
				open={openEditDocumentoFinca}
				listIndividuales={involucrados}
				propietarioTipo={savePropietario}
				fincaData={fincaEditar}
			/>
			<AgregadoNotificacion closeModal={() => setOpenNotificacion(false)} setNotificacionesTable={setNotificacionesTable} gestion={gestion} open={openNotificacion} />
		</>
	)
}