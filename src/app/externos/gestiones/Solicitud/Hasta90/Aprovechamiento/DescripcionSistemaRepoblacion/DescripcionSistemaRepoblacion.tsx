import EspecieApi from 'api/catalogs/EspecieApi'
import useFetchCatalog from 'hooks/useFetchCatalog'
import React, { useContext, useEffect, useState } from 'react'
import { Table, Segment, Icon, Header, Form } from 'semantic-ui-react'
import { SistemaRepoblacion, SistemaRepoblacionValor } from '../Aprovechamiento'
import Recuperacion from './Recuperacion'
import DescripcionSistemaRepoblacionEstrato from './DescripcionSistemaRepoblacionEstrato'
import AprovechamientoApi from 'api/latifoliado/hasta90/AprovechamientoApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'

type Props = {
	gestion: any
	descripcionSistemaRepoblacion: any
	getCalculos: () => void
}

const especieApi = new EspecieApi()
const aprovechamientoApi = new AprovechamientoApi()

export default function DescripcionSistemaRepoblacion({
	gestion,
	descripcionSistemaRepoblacion,
	getCalculos
}: Props) {

	const dataContext = useContext(AppDataContext);

	const { catalog } = useFetchCatalog(especieApi.getList, "nombreCientifico", "especieId")
	const [valoresSistemaRepoblacion, setValoresSistemaRepoblacion] = useState<any[]>([])
	const [sistemasCatalog, setSistemasCatalog] = useState<SistemaRepoblacionValor[]>([])
	const [sistemasRepoblacion, setSistemasRepoblacion] = useState<SistemaRepoblacion[]>([])
	const [loading, setLoading] = useState(false)

	const handleResponse = (res: any, onSuccess: () => void) => {
		if (res.status === "OK") {
			onSuccess()
		}
		else {
			dataContext.errorToast("Error al guardar informacion")
		}
		setLoading(false)
	}

	const handleSuccess = () => {
		dataContext.successToast("Datos guardados satisfactoriamente")
		getCalculos()
	}

	const handleSistemasResponse = (res: any) => {
		handleResponse(res, handleSuccess)
	}

	const handleAnioResponse = (res: any) => {
		handleResponse(res, updateSistemas)
	}

	const handleError = (axiosError: AxiosError) => {
		dataContext.errorToast("Error al guardar la informcación")
		console.error(axiosError)
		dataContext.desactivateLoading()
		setLoading(false)
	}

	//TODO agregar catalogo para sistema repoblación

	const updateSistemas = () => {

		let updateSistemasDTO: any = {}

		updateSistemasDTO.estratos = getEstratosSistemas()
		updateSistemasDTO.valores = getValoresSistemas()

		aprovechamientoApi.updateSistemaRepoblacion(gestion.gestionId, updateSistemasDTO, handleSistemasResponse, handleError)

	}

	const getEstratosSistemas = (): any => {

		let listUpdate: any[] = []

		for (let s of sistemasRepoblacion) {
			let dto = {
				estrato: s.estrato,
				especieId: s.especie.especieId,
				densidadInicial: s.densidadInicial,
				tcSistemaRepoblacion: s.tcSistemaRepoblacion
			}
			listUpdate.push(dto)
		}

		return listUpdate

	}

	const getValoresSistemas = (): any => {

		let listUpdate: any[] = []

		for (let s of sistemasCatalog) {
			let dto = {
				valor: s.valor,
				sistemaRepoblacionId: s.tcSistemaRepoblacion.sistemaRepoblacionId
			}
			listUpdate.push(dto)
		}

		return listUpdate

	}

	const updateAnio = () => {

		let listDTO: any[] = []
		let isError = false
		let errorMsg =  "Las densidades ingresadas no cumplen con el minimo en el (los) estrato(s): "


		for (let e of descripcionSistemaRepoblacion.estratos) {

			if (e.faltanteCalculado > 0) {
				if(isError){
					errorMsg += "," + e.estrato
				}
				else{
					errorMsg += e.estrato
				}
				isError = true
			}

			let dto = {
				estrato: e.estrato,
				anioEstablecimiento: e.anio
			}
			listDTO.push(dto)
		}

		if(isError){
			dataContext.errorToast(errorMsg);
		}

		else {
			setLoading(true)
			aprovechamientoApi.updateAnioEstablecimiento(gestion.gestionId, listDTO, handleAnioResponse, handleError)
		}

	}

	const handleUpdate = () => {
		if (!loading) {
			updateAnio()
		}
	}

	const handleSistemaAdd = (sistemaRepoblacion: SistemaRepoblacion) => {
		let copy = sistemasRepoblacion.slice()
		copy.push(sistemaRepoblacion)
		setSistemasRepoblacion(copy)
	}

	const handleSistemaDelete = (sistemaRepoblacion: SistemaRepoblacion) => {
		let copy = sistemasRepoblacion.slice()
		let index = copy.findIndex(element => element.especieId === sistemaRepoblacion.especieId
			&& element.estrato === sistemaRepoblacion.estrato)
		if (index !== -1) {
			copy.splice(index, 1)
			setSistemasRepoblacion(copy)
		}
	}


	const handleSistemaUpdate = () => {
		let copy = sistemasRepoblacion.slice()
		setSistemasRepoblacion(copy)
	}

	const renderRows = () => {
		let rows: any[] = []
		let i = 0;
		descripcionSistemaRepoblacion.estratos.forEach((estrato: any) => {
			rows.push(
				<DescripcionSistemaRepoblacionEstrato
					key={"dt_" + i++}
					especieCatalog={catalog}
					estrato={estrato}
					sistemasRepoblacion={sistemasRepoblacion}
					handleSistemaUpdate={handleSistemaUpdate}
					handleSistemaAdd={handleSistemaAdd}
					handleSistemaDelete={handleSistemaDelete}
				/>
			)
		});
		return rows
	}

	useEffect(() => {
		let sistemas: SistemaRepoblacionValor[] = []
		for (let sistemaRep of sistemasRepoblacion) {
			let index = sistemas.findIndex(s => s.tcSistemaRepoblacion.sistemaRepoblacionId === sistemaRep.tcSistemaRepoblacion.sistemaRepoblacionId)
			if (index === -1) {
				let sistemaRepoblacionValor: SistemaRepoblacionValor = {
					tcSistemaRepoblacion: sistemaRep.tcSistemaRepoblacion,
					valor: 0
				}
				for (let valor of valoresSistemaRepoblacion) {
					if (valor.tcSistemaRepoblacion.sistemaRepoblacionId === sistemaRep.tcSistemaRepoblacion.sistemaRepoblacionId) {
						sistemaRepoblacionValor.valor = valor.valor
					}
				}
				sistemas.push(sistemaRepoblacionValor)
			}
		}
		setSistemasCatalog(sistemas)
	}, [sistemasRepoblacion, valoresSistemaRepoblacion])

	useEffect(() => {
		if (descripcionSistemaRepoblacion != null) {

			let lista: SistemaRepoblacion[] = []

			for (let estrato of descripcionSistemaRepoblacion.estratos) {
				for (let especie of estrato.especies) {
					let turnoSistema: SistemaRepoblacion = {
						especieId: especie.tcEspecie.especieId,
						especie: especie.tcEspecie,
						estrato: estrato.estrato,
						turno: estrato.turno,
						area: estrato.area,
						anio: estrato.anio,
						densidadInicial: especie.densidadInicial,
						tcSistemaRepoblacion: especie.tcSistemaRepoblacion
					}
					lista.push(turnoSistema)
				}
			}

			setSistemasRepoblacion(lista)
			setValoresSistemaRepoblacion(descripcionSistemaRepoblacion.valores)
		}
	}, [descripcionSistemaRepoblacion])


	// useEffect(() => {
	// 	let currentEstrato = -1;
	// 	let listaPorEstrato : SistemaRepoblacion[][] = []
	// 	let estrato : SistemaRepoblacion[] = []
	// 	for(let sistema of sistemasRepoblacion){
	// 		console.log(sistema)
	// 		if(sistema.estrato !== currentEstrato){
	// 			if(currentEstrato !== -1){
	// 				listaPorEstrato.push(estrato)
	// 				estrato = []
	// 			}
	// 			currentEstrato = sistema.estrato
	// 		}
	// 		estrato.push(sistema)
	// 	}
	// 	listaPorEstrato.push(estrato)
	// 	setEstratos(listaPorEstrato)
	// 	console.log(listaPorEstrato)
	// }, [sistemasRepoblacion])

	const renderTable = () => {
		return (
			<Table celled structured compact striped size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign="center" >Turno</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Año Establecimiento</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Estrato</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Área</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Faltante</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Nombre científico</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Densidad inicial</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Sistema repoblación</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Quitar</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{renderRows()}
				</Table.Body>
				<Table.Footer>
				</Table.Footer>
			</Table>
		)
	}


	return (
		<Segment raised clearing>
			<Header>
				7.3. Recuperación de la masa forestal
			</Header>
			<Recuperacion
				sistemasCatalog={sistemasCatalog}
			/>
			<Header size="small">
				7.3.1. Descripción de sistema de repoblación forestal
			</Header>
			{descripcionSistemaRepoblacion != null &&
				renderTable()
			}
			<Form.Button icon primary floated="right" labelPosition='right' onClick={handleUpdate} loading={loading} >
				Guardar
				<Icon name="save" />
			</Form.Button>
		</Segment>
	)
}
