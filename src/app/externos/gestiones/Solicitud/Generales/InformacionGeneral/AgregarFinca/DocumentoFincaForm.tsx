import React, { useEffect, useState } from 'react'
import { Divider, Form, Header, Message } from 'semantic-ui-react'
import DepartamentoMunicipioSelect from 'components/DepartamentoMunicipioSelect';
import CustomTable, { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import LibroSelect from 'components/LibroSelect/LibroSelect'
import GestionApi from 'api/GestionApi'
import DocumentoFinca from './data/DocumentoFinca';
import FormNumInput from 'components/FormNumInput';
import DocumentoFincaFormError from './data/DocumentoFincaFormError';

const encabezadoPropietarios: CTColumn[] = [
	{ header: "Nombre del Propietario", name: 'nombre' },
	{ header: "CUI", name: 'cui' },
];


/**
 * Tipos de botones para la tabla de involucrados
 */
const botonesPropietarios: CTButton[] = [
	{ id: "quitar_propietario", label: "Quitar", color: 'red' },
];

type Props = {
	setFormData: Function
	formData: DocumentoFinca
	formError: DocumentoFincaFormError
	ttFincaGestion: any
	propietarioTipo: any
	listIndividuales: any[]
	ttGestion: any
}

type PropietarioTable = {
	personaId: number
	nombre: string
	cui: string
	estadoId?: number,
	fechaRegistro?: string,
	propietarioFincaId?: number,
	data: any
}

const gestionApi = new GestionApi()

export default function DocumentoFincaForm(props: Props) {

	const [tipoDocumento, setTipoDocumento] = useState<any>();
	const [propietarios, setPropietarios] = useState<PropietarioTable[]>([]);
	const [posiblesPropietarios, setPosiblesPropietarios] = useState<any[]>([]);

	const onButtonClickPropietarios = (buttonResponse: CTButtonResponse) => {
		quitarPropietarioBackend(buttonResponse.rowData)
	}

	const setData = (name: string, value: any) => {
		props.setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}

	const handleMunicipioChange = (_e: any, { object }: any) => {
		setData("tcMunicipioEmite", object)
	}


	const handleChangeLibroSelect = (_e: any, { value }: any) => {
		setData("tcLibro", value)
	}

	const handleTipoPropiedadChange = (_e: any, { value }: any) => {
		setTipoDocumento(value)
		var tcTipoPropiedad = {
			tipoPropiedadId: value,
			tipoPropiedadDesc: "",
			estadoId: 1,
			fechaRegistro: "2020-01-01",
			esPropiedad: 1
		}
		setData("tcTipoPropiedad", tcTipoPropiedad)
	}

	const handlePersonasDisponiblesChange = (_e: any, { value }: any) => {
		for (var x = 0; x < posiblesPropietarios.length; x++) {
			if (posiblesPropietarios[x].object.personaId === value) {
				agregarPropietarioBackend(posiblesPropietarios[x].object);
			}
		}
	}

	const handleBlur = (e: any) => {
		setData(e.target.name, e.target.value)
	}

	useEffect(() => {
		if (props.propietarioTipo && props.propietarioTipo.tcTipoPropietario.tipoPropietarioId) {
			for (var j = 0; j < props.listIndividuales.length; j++) {
				llenarPosiblesPropietarios(props.listIndividuales[j])
			}
			//vamos a llenar los propietarios
			if (props.ttFincaGestion.propietarios) {
				for (var i = 0; i < props.ttFincaGestion.propietarios.length; i++) {
					console.log(props.ttFincaGestion)
					llenarTablaPropietariosAlSeleccionar(props.ttFincaGestion.propietarios[i])
					quitarPosiblePropietario(props.ttFincaGestion.propietarios[i].tcPersona.personaId)
				}
			}
		}
	}, [])


	useEffect(() => {
		if (props.formData.fincaGestionId) {
			if (props.formData.tcTipoPropiedad) {
				setTipoDocumento(props.formData.tcTipoPropiedad.tipoPropiedadId)
			}
			else {
				setTipoDocumento(null)
			}
		}
	}, [props.formData])


	const agregarPropietarioBackend = (tcPersona: any) => {
		var body = {
			ttFincaGestion: {
				fincaGestionId: props.ttFincaGestion.fincaGestionId,
				estadoId: props.ttFincaGestion.estadoId,
				fechaRegistro: props.ttFincaGestion.fechaRegistro,
				tcFinca: props.ttFincaGestion.tcFinca,
				fechaEmision: props.ttFincaGestion.fechaEmision,
				notario: props.ttFincaGestion.notario,
				ttMunicipioEmite: props.ttFincaGestion.ttMunicipioEmite,
				numeroDocumento: props.ttFincaGestion.numeroDocumento,
				folio: props.ttFincaGestion.folio,
				libro: props.ttFincaGestion.libro,
				tcTipoPropiedad: props.ttFincaGestion.tcTipoPropiedad,
				tcLibro: props.ttFincaGestion.tcLibro,
				propietarios: props.ttFincaGestion.propietarios,
				personas: props.ttFincaGestion.personas,
				ttGestion: props.ttGestion
			},
			tcPersona: tcPersona,
		}
		const response = (e: any) => {
			if (e.data.status === "OK") {
				llenarTablaPropietariosAlSeleccionar(e.data.data[0])
				quitarPosiblePropietario(tcPersona.personaId)
				if (props.ttFincaGestion.propietaros) {
					props.ttFincaGestion.propietarios.push(e.data.data[0])
				} else {
					props.ttFincaGestion.propietarios = []
					props.ttFincaGestion.propietarios.push(e.data.data[0])
				}
			} else {
				//TODO
			}
		}
		const error = (e: any) => {
			console.error(e);
		}
		gestionApi.agregarPropietarioFinca(body, response, error)
	}


	const quitarPropietarioBackend = (data: any) => {

		var body = {
			estadoId: data.estadoId,
			fechaRegistro: data.fechaRegistro,
			propietarioFincaId: data.propietarioFincaId,
			ttFincaGestion: {
				fincaGestionId: props.ttFincaGestion.fincaGestionId,
				estadoId: props.ttFincaGestion.estadoId,
				fechaRegistro: props.ttFincaGestion.fechaRegistro,
				tcFinca: props.ttFincaGestion.tcFinca,
				fechaEmision: props.ttFincaGestion.fechaEmision,
				notario: props.ttFincaGestion.notario,
				ttMunicipioEmite: props.ttFincaGestion.ttMunicipioEmite,
				numeroDocumento: props.ttFincaGestion.numeroDocumento,
				folio: props.ttFincaGestion.folio,
				libro: props.ttFincaGestion.libro,
				tcTipoPropiedad: props.ttFincaGestion.tcTipoPropiedad,
				tcLibro: props.ttFincaGestion.tcLibro,
				propietarios: props.ttFincaGestion.propietarios,
				personas: props.ttFincaGestion.personas,
				ttGestion: props.ttGestion
			},
			tcPersona: data.data,
		}

		const response = (e: any) => {
			if (e.data.status === "OK") {
				console.log("todo correcto")
				llenarPosiblesPropietariosEliminandoTabla(data)
				quitarePropietario(data.personaId)
				var y: any = []
				props.ttFincaGestion.propietarios.map((x: any) => {
					if (x.tcPersona.personaId !== data.personaId) {
						y.push(x)
					}
				})
				props.ttFincaGestion.propietarios = y;
			} else {
				console.log("hubo un error eliminando el propietario")
			}
		}

		const error = (e: any) => {
			console.error(e)
		}
		gestionApi.quitarPropietarioFinca(body, response, error)
	}


	const llenarPosiblesPropietarios = (e: any) => {
		let dataSelectPosible = {
			key: e.data.tcPersona.personaId,
			text: e.nombre,
			value: e.data.tcPersona.personaId,
			object: e.data.tcPersona,
		}
		let temporalArray: any[] = posiblesPropietarios;
		temporalArray.push(dataSelectPosible)
		setPosiblesPropietarios(temporalArray)
	}


	const llenarPosiblesPropietariosEliminandoTabla = (e: any) => {
		let dataSelectPosible = {
			key: e.personaId,
			text: e.nombre,
			value: e.personaId,
			object: e.data
		}
		let temporalArray: any[] = posiblesPropietarios;
		temporalArray.push(dataSelectPosible)
		setPosiblesPropietarios(temporalArray)
	}

	const quitarPosiblePropietario = (e: number) => {
		let nuevoArray: any[] = [];
		posiblesPropietarios.map((x) => {
			if (x.value !== e) {
				nuevoArray.push(x)
			}
		})
		setPosiblesPropietarios(nuevoArray);
	}

	const quitarePropietario = (e: number) => {
		let nuevoArray: any[] = [];
		propietarios.map((x: any) => {
			if (x.personaId !== e) {
				nuevoArray.push(x)
			}
		})
		setPropietarios(nuevoArray);
	}

	const llenarTablaPropietariosAlSeleccionar = (e: any) => {
		let Propietario: PropietarioTable = {
			data: e.tcPersona,
			cui: e.tcPersona.cui,
			nombre: e.tcPersona.personaDesc,
			personaId: e.tcPersona.personaId,
			estadoId: e.estadoId,
			fechaRegistro: e.fechaRegistro,
			propietarioFincaId: e.propietarioFincaId
		};
		let temporalArray: PropietarioTable[] = propietarios;
		temporalArray.push(Propietario)
		setPropietarios(temporalArray);
	}


	const renderDocumentoActa = () => {

		if (tipoDocumento === null) {
			return null
		}

		return (
			<>
				<Form.Group widths="equal">
					<Form.Input
						label="Fecha de emisión"
						name="fechaEmision"
						type="date"
						error={props.formError.fechaEmision}
						onBlur={handleBlur}
						defaultValue={props.formData.fechaEmision ? props.formData.fechaEmision.split('T')[0].trim() : ''}
					/>
					{tipoDocumento === 1 &&
						<FormNumInput
							name="numeroDocumento"
							label="Número de escritura pública"
							onlyDigits
							error={props.formError.numeroDocumento}
							onBlur={handleBlur}
							value={props.formData.numeroDocumento}
						/>
					}
					<Form.Input
						name="notario"
						label="Nombre del notario"
						error={props.formError.notario}
						defaultValue={props.formData.notario ? props.formData.notario : ""}
						onBlur={handleBlur}
					/>
				</Form.Group>
				<Form.Group widths="equal">
					<DepartamentoMunicipioSelect
						municipioValue={props.formData.tcMunicipioEmite}
						onChange={handleMunicipioChange}
						departamentoLabel="Departamento/estado"
						municipioLabel="Municipio/provincia"
						municipioName="tcMunicipio"
						municipioError={props.formError.tcMunicipioEmite}
						upward={false}
					/>
				</Form.Group>
			</>
		)
	}

	const renderDocumentoRegistro = () => {
		return (
			<>
				<Form.Group widths="equal">
					<FormNumInput
						name="numeroDocumento"
						label="Número de Finca"
						error={props.formError.numeroDocumento}
						value={props.formData.numeroDocumento}
						onBlur={handleBlur}
					/>
					<FormNumInput
						name="folio"
						label="Número de Folio"
						onlyDigits
						error={props.formError.folio}
						value={props.formData.folio}
						onBlur={handleBlur}
					/>

				</Form.Group>
				<Form.Group widths="equal" >
					<Form.Input
						name="libro"
						label="Número de Libro"
						error={props.formError.libro}
						defaultValue={props.formData.libro ? props.formData.libro : ""}
						onBlur={handleBlur}
					/>
					<LibroSelect
						onChange={handleChangeLibroSelect}
						value={props.formData.tcLibro}
						error={props.formError.tcLibro}
						label="De."
						name="tcLibro"
					/>
					<Form.Input
						label="Fecha de certificación"
						name="fechaEmision"
						type="date"
						error={props.formError.fechaEmision}
						defaultValue={props.formData.fechaEmision ? props.formData.fechaEmision.split('T')[0].trim() : ''}
						onBlur={handleBlur}
					/>


				</Form.Group>
			</>
		)
	}

	const renderTipoDocumento = () => {
		if (tipoDocumento === 1 || tipoDocumento === 2) {
			return renderDocumentoActa()
		}

		else if (tipoDocumento === 3) {
			return renderDocumentoRegistro()
		}

		else {
			return null
		}
	}

	const renderPropietarios = () => {

		if (props.propietarioTipo != null && props.propietarioTipo.tcTipoPropietario.tipoPropietarioId === 2) {
			return (
				<>
					<Header size="medium">
						Propietario de la finca: {props.propietarioTipo.razonSocial}
					</Header>
				</>
			)
		}


		return (
			<>
				<Message
					negative
					hidden={props.formError.propietarios == null}
					content={props.formError.propietarios}
				/>
				<Header size="medium">
					Propietarios de la finca
				</Header>
				<Form.Select
					name={"personasDisponibles"}
					label={"Personas Disponibles"}
					options={posiblesPropietarios}
					onChange={handlePersonasDisponiblesChange}
					value={0}
				/>
				<CustomTable
					data={propietarios}
					columns={encabezadoPropietarios}
					buttonsColumnHeader="Quitar Propietario"
					buttons={botonesPropietarios}
					onButtonClick={onButtonClickPropietarios}
				/>

			</>
		)
	}


	return (
		<Form>
			<Header size="medium">
				Documento de propiedad de la finca
			</Header>
			<Form.Select
				name="tcTipoPropiedad"
				label="Tipo de documento"
				error={props.formError.tcTipoPropiedad}
				value={props.formData.tcTipoPropiedad ? props.formData.tcTipoPropiedad.tipoPropiedadId : ""}
				onChange={handleTipoPropiedadChange}
				options={[
					{ key: 1, text: 'Testimonio de escritura pública', value: 1 },
					{ key: 2, text: 'Acta Notarial de declaración Jurada', value: 2 },
					{ key: 3, text: 'Certificación de Registro de la propiedad', value: 3 },
				]}
			/>
			{renderTipoDocumento()}
			<Divider section />
			{renderPropietarios()}
		</Form>
	)
}