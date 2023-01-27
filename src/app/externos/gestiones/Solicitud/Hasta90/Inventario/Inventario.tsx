import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'
import { Form, Header, Icon, Segment } from 'semantic-ui-react'
import TipoInventario from './TipoInventario'
import DistribucionFrecuencias from './DistribucionFrecuencias/DistribucionFrecuencias'
import { AxiosError } from 'axios'
import DescripcionCaracteristicas from './DescripcionCaracteristicas'
import Resumen from './Resumen/Resumen'
import InventarioApi from 'api/latifoliado/hasta90/InventarioApi'
import { AppDataContext } from 'app/App';
import SaveAreasInventarioDTO from 'dto/gestion/latifoliado/hasta90/inventario/SaveAreasInventarioDTO'
import { roundDouble } from 'utils/UtilFunctions'

type Props = {
	gestion: any,
	nextButtonRef: React.MutableRefObject<() => boolean>
}

type Validation = {
	tipoInventario: boolean,
	areas: boolean,
	descripcion: boolean
}

const inventarioApi = new InventarioApi()

export default function Inventario({
	gestion,
	nextButtonRef
}: Props) {

	const isMounted = useRef(false)
	const { successToast, errorToast, activateLoading, desactivateLoading } = useContext(AppDataContext);
	const [inventarioDTO, setInventarioDTO] = useState<any>();
	const [areasEstrato, setAreasEstrato] = useState<number[]>([])
	const [validation] = useState<Validation>({
		tipoInventario: false,
		areas: false,
		descripcion: false
	})

	const handleAreaUpdate = (area: number, pos: number) => {
		let copy = areasEstrato.slice()
		copy[pos] = Number(area)
		setAreasEstrato(copy)
	}

	const getAreaTotal = () => {
		let areaTotal = 0
		for (let area of areasEstrato) {
			areaTotal += area
		}
		return roundDouble(areaTotal)
	}

	const handleAreaSaveClick = () => {
		let areaTotal = getAreaTotal()
		if (gestion.area !== areaTotal) {
			errorToast("Las sumatoria de las áreas indicadas (" + areaTotal + ") no es igual al área a intervenir (" + gestion.area + ")")
			return
		}
		saveAreas()
	}

	const handleResponse = (res: any) => {
		if (res.status === "OK") {
			successToast("Datos almacenados correctamente.")
			validation.areas = true
		}
		else {
			errorToast(res.message)
		}
		desactivateLoading()
	}

	const handleError = (axiosError: AxiosError) => {
		console.error(axiosError)
		errorToast("Error al guardar informacion. Intente de nuevo.")
		desactivateLoading()
	}

	const saveAreas = () => {
		let saveDTO: SaveAreasInventarioDTO = {
			areasEstrato: areasEstrato
		}
		inventarioApi.saveAreasInventario(gestion.gestionId, saveDTO, handleResponse, handleError)
	}

	const setAreas = (estratos: any[]) => {
		let areas = []
		for (let e of estratos) {
			areas.push(e.area)
		}
		setAreasEstrato(areas)
	}

	const getCalculos = () => {
		const handleResponse = (res: any) => {
			if (isMounted.current) {
				if (res.status === "OK") {
					let inventario = res.data[0]
					setInventarioDTO(inventario)
					setAreas(inventario.estratos)
				}
				else {
					errorToast("Error al cargar información. Intentelo de nuevo")
				}
				desactivateLoading()
			}
		}
		
		const handleError = (axiosError: AxiosError) => {
			console.error(axiosError)
			errorToast("Error al cargar información. Intentelo de nuevo")
			desactivateLoading()
		}

		if (gestion != null) {
			activateLoading()
			inventarioApi.getCalculos(gestion.gestionId, handleResponse, handleError)
		}
		else {
			desactivateLoading()
		}
	}

	const onTipoInventarioSuccess = () => {
		validation.tipoInventario = true
	}

	const onDescripcionSuccess = () => {
		validation.descripcion = true
	}

	const getCalculosCallback = useCallback(getCalculos, [gestion])

	useEffect(() => {
		getCalculosCallback()
	}, [getCalculosCallback])

	const getAreaTotalCallback = useCallback(getAreaTotal, [areasEstrato])

	useEffect(() => {
		if (gestion?.inventarioGestion?.tcDisenioCenso != null) {
			validation.tipoInventario = true
		}
		if (gestion.area === getAreaTotalCallback()) {
			validation.areas = true
		}
		if (gestion?.inventarioGestion?.caracteristicasBosque != null) {
			validation.descripcion = true
		}
	}, [gestion, validation, getAreaTotalCallback])

	//Validamos datos antes de continuar
	const isDataValid = (): boolean => {
		let isValid = true
		let errors = []
		if (!validation.tipoInventario) {
			isValid = false
			errors.push(" tipo de inventario y ecuación")
		}
		if (!validation.areas) {
			isValid = false
			errors.push(" áreas")
		}
		if (!validation.descripcion) {
			isValid = false
			errors.push(" descripción de características del bosque")
		}
		if (!isValid) {
			errorToast("Debe almacenar todos los campos requeridos:" + errors.toString());
		}
		return isValid
	}

	const isDataValidCallback = useCallback(
		isDataValid,
		[validation],
	)

	useEffect(() => {
		isMounted.current = true
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		nextButtonRef.current = isDataValidCallback
	}, [nextButtonRef, isDataValidCallback])

	return (
		<>
			{inventarioDTO != null ?
				<>
					<Segment raised clearing>
						<Header>
							4.1. Tipo de inventario: Censo de especies de interes comercial
						</Header>
						<TipoInventario
							inventarioApi={inventarioApi}
							gestion={gestion}
							onSuccess={onTipoInventarioSuccess}
						/>
					</Segment>
					<Segment raised clearing>
						<Header>4.3. Distribución de frecuencias por clases diametricas (≥ 10 cm de DAP) por estrato</Header>
						<DistribucionFrecuencias
							estratos={inventarioDTO.estratos}
							total={inventarioDTO.total}
							areasEstrato={areasEstrato}
							onAreaUpdate={handleAreaUpdate}
						/>
						<Form.Button icon primary floated="right" labelPosition='right' onClick={handleAreaSaveClick}  >
							Guardar
							<Icon name="save" />
						</Form.Button>
					</Segment>
					<Segment raised clearing>
						<Header>4.4. Descripción de las características del bosque</Header>
						<DescripcionCaracteristicas
							areasEstrato={areasEstrato}
							volumenTotal={inventarioDTO.total.vol.total}
							inventarioApi={inventarioApi}
							gestion={gestion}
							onSuccess={onDescripcionSuccess}
						/>
					</Segment>
					<Segment raised>
						<Header>4.5. Resumen de los resultados del censo</Header>
						<Resumen censo={inventarioDTO.censo} />
					</Segment>
				</>
				: null}
		</>
	)
}