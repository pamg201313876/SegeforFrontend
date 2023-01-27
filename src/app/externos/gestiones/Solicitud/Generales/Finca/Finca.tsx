import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import CustomFincaTable from 'components/CustomFincaTable'
import CustomFincaDTO from 'components/CustomFincaTable/CustomFincaDTO'
import ItemFilter from 'components/CustomFincaTable/ItemFilter'
import UploadFormButton from 'components/UploadButton'
import CreateBosqueFincaDTO from 'dto/solicitud/CreateBosqueFincaDTO'
import UsoActualFinca from 'enums/UsoActualFinca'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import FielApi from '../../../../../../api/FileApi'
import UsoFincaApi from '../../../../../../api/UsoFincaApi'
import { createNewBosqueDTO } from '../../../../../../dto/solicitud/CreateBosqueFincaDTO'
import BosqueFinca from './BosqueFinca'

type Props = {
	gestion: any
	nextButtonRef: React.MutableRefObject<() => boolean>
}

const gestionApi = new GestionApi();
const usoFincaApi = new UsoFincaApi();
const fileApi = new FielApi();

export default function Finca({
	gestion,
	nextButtonRef
}: Props) {

	const encabezadosUsoFinca = [
		{ header: "Uso", name: 'uso' },
		{ header: "Área (ha)", name: 'area' },
		{ header: "Porcentaje (%)", name: 'porcentaje' },
	];

	const dataContext = useContext(AppDataContext)

	const [isSaved, setIsSaved] = useState<boolean>(false)
	const [anexoUsoFinca, setAnexoUsoFinca] = React.useState<number>(0);
	const [anexoBosqueFinca, setAnexoBosqueFinca] = React.useState<number>(0);
	const [dataTableUsoFinca, setDataTableUsoFinca] = React.useState<CustomFincaDTO[]>([]);
	const [dataTableCriterioProteccion, setDataTableCriterioProteccion] = React.useState<CustomFincaDTO[]>([]);
	const [areaTotal, setAreaTotal] = React.useState<number>(0);
	const [areaIntervenir, setAreaIntervenir] = React.useState<number>(0);
	const [filterUsoFinca, setFilterUsoFinca] = React.useState<ItemFilter[]>([]);
	const [showBosqueDeFinca, setShowBosqueDeFinca] = React.useState<boolean>(false);
	const [areaForestal, setAreaForestal] = React.useState<number>(0);
	const [areaData, setAreaData] = useState<CreateBosqueFincaDTO>(createNewBosqueDTO())
	const [tipoBosque, setTipoBosque] = React.useState<any>();
	const [subtipoBosque, setSubtipoBosque] = useState<any>()
	const [estadoBosque, setEstadoBosque] = useState<any>()
	const [descripcionVegetacion, setDescripcionVegetacion] = useState<string>("")
	const [removeCriterios, setRemoveCriterios] = useState<boolean>(false);

	const cargarDataGestion = (gestion: any) => {

		let fincas = gestion.fincas
		let uso = gestion.uso
		let criterio = gestion.criterio
		let tipoBosque = gestion.tcTipoBosque
		let subtipoBosque = gestion.tcSubTipoBosque
		let estadoBosque = gestion.tcEstadoBosque
		let descripcionVegetacion = gestion.descripcionVegetacion
		let areaProteccion = gestion.areaProteccion
		let areaProduccion = gestion.areaProduccion
		let areaForestal = gestion.areaForestal
		let finca = fincas ? fincas[0] : null
		let anexos = gestion.anexo
		let areaTotal = fincas ? fincas.reduce((count: any, finca: { tcFinca: { area: any } }) => count + finca.tcFinca.area, 0) : 0;

		setAreaTotal(areaTotal)
		setAreaIntervenir(gestion.area)
		setDataTableUsoFinca(uso ? createUsoFincaColumns(uso, areaTotal) : []);

		anexos.forEach((anexo: any) => {
			if (anexo.tcTipoAnexo.tipoAnexoId === 2) {
				setAnexoUsoFinca(anexo.anexoGestionId)
			}
			else if (anexo.tcTipoAnexo.tipoAnexoId === 3) {
				setAnexoBosqueFinca(anexo.anexoGestionId)
			}
		});

		setTipoBosque(tipoBosque)
		setSubtipoBosque(subtipoBosque)
		setEstadoBosque(estadoBosque)
		setDescripcionVegetacion(descripcionVegetacion)

		let areaFinca: CreateBosqueFincaDTO = {
			areaProteccion: areaProteccion != null ? areaProteccion : 0,
			areaProduccion: areaProduccion != null ? areaProduccion : 0,
		};
		setAreaData(areaFinca);
		setAreaForestal(areaForestal != null ? areaForestal : 0)
		setDataTableCriterioProteccion(criterio ? createCriterioColumns(criterio, areaProteccion) : [])
		setShowBosqueDeFinca(areaProduccion > 0)

		if(areaProduccion > 0 && subtipoBosque != null){
			setIsSaved(true)
		}

	}

	const cargarListadoUsoFinca = () => {
		let nuevoArray: any[] = [];
		const handleResponse = (res: any) => {
			if (res) {
				res.forEach((usoFinca: { usoFincaDesc: any, usoFincaId: any }) => {
					let item = {
						key: usoFinca.usoFincaId,
						text: usoFinca.usoFincaDesc,
						value: usoFinca.usoFincaId
					}
					nuevoArray.push(item)
				});
			}
			setFilterUsoFinca(nuevoArray)
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
		}
		usoFincaApi.obtenerListaUsoFinca(handleResponse, handleError)
	}

	const createUsoFincaColumns = (usoArray: any[], areaTotal: number) => {
		let nuevoArray: CustomFincaDTO[] = [];
		usoArray.forEach((x) => {
			let column: CustomFincaDTO = {
				uso: x.tcUsoFinca ? x.tcUsoFinca.usoFincaDesc : '',
				area: x.area ? x.area : 0,
				porcentaje: x.area ? Math.round((100 * x.area) / areaTotal) : 0,
				value: x.tcUsoFinca ? x.tcUsoFinca.usoFincaId : 0,
				usoFincaGestionId: x.usoFincaGestionId ? x.usoFincaGestionId : 0
			};
			nuevoArray.push(column)
		});
		return nuevoArray;
	}

	const createCriterioColumns = (usoArray: any[], areaTotal: number) => {
		let nuevoArray: CustomFincaDTO[] = [];
		usoArray.forEach((x) => {
			let column: CustomFincaDTO = {
				uso: x.tcCriterioProteccion ? x.tcCriterioProteccion.criterioProteccionDesc : '',
				area: x.area ? x.area : 0,
				porcentaje: x.area ? Math.round((100 * x.area) / areaTotal) : 0,
				value: x.tcCriterioProteccion ? x.tcCriterioProteccion.criterioProteccionId : 0,
				usoFincaGestionId: x.criterioProteccionGestionId ? x.criterioProteccionGestionId : 0
			};
			nuevoArray.push(column)
		});
		return nuevoArray;
	}

	const handleChange = (e: any, { value }: any) => {
		let file = value;

		if (file !== null) {
			const onResponse = (response: any) => {
				if (response.status === "OK") {
					addAnexo(response.data[0])
				}
				else {
					console.error("Error al cargar mapa")
				}
			}

			const onError = (axiosError: AxiosError) => {
				console.log(axiosError)
			}

			fileApi.cargarArchivo(file, onResponse, onError)
		}
	}

	const onDeleteUsoActualFinca = (e: CustomFincaDTO, porcentaje: number) => {
		let usoFinca = {
			area: e.area,
			estadoId: 1,//gestion.estadoId,
			fechaRegistro: gestion.fechaRegistro,
			porcentaje: e.porcentaje,
			tcUsoFinca: {
				codigo: null,
				estadoId: 1,
				fechaRegistro: gestion.fechaRegistro,
				usoFincaDesc: e.uso,
				usoFincaId: e.value
			},
			ttGestion: {
				estadoId: gestion.estadoId,
				gestionId: gestion.gestionId,
				personaAnulaId: gestion.personaAnulaId,
				tcElaborador: gestion.tcElaborador,
				tcPersonaCrea: gestion.tcPersonaCrea,
				tcTipoBosque: gestion.tcTipoBosque,
				tcTipoGestion: gestion.tcTipoGestion,
				ttTipoPropietarioGestion: gestion.ttTipoPropietarioGestion
			},
			usoFincaGestionId: e.usoFincaGestionId
		};

		const handleResponse = (res: any) => {
			setIsSaved(false)
			if (e.uso.toUpperCase() === "FORESTAL" || porcentaje >= 100) {
				setRemoveCriterios(true)
				let areaFinca: CreateBosqueFincaDTO = {
					areaProteccion: 0,
					areaProduccion: 0,
				};
				setAreaData(areaFinca);
				setShowBosqueDeFinca(false);
			}
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
		}

		gestionApi.quitarUsoFinca(usoFinca, handleResponse, handleError)
	}

	const onSaveData = (e: CustomFincaDTO[], porcentaje: number) => {
		if (porcentaje < 100) {
			dataContext.errorToast('Debe indicar al 100% el uso de la finca')
			return;
		}
		let areaForestal = 0;

		e.forEach((x) => {
			if (x.uso.toUpperCase() === UsoActualFinca.Forestal) {
				areaForestal = x.area
			}
		})

		setAreaForestal(areaForestal)

		let areas = {
			areaForestal: areaForestal,
			areaProduccion: areaForestal,
			areaProteccion: 0,
			estadoId: gestion.estadoId,
			gestionId: gestion.gestionId,
			personaAnulaId: gestion.personaAnulaId,
			tcElaborador: gestion.tcElaborador,
			tcPersonaCrea: gestion.tcPersonaCrea,
			tcTipoBosque: gestion.tcTipoBosque,
			tcTipoGestion: gestion.tcTipoGestion,
			ttTipoPropietarioGestion: gestion.ttTipoPropietarioGestion
		};


		const handleResponse = (res: any) => {
			if (res.data.status === "OK") {
				dataContext.successToast("Datos almacenados correctamente")
				setShowBosqueDeFinca(areaForestal > 0)
				if(subtipoBosque != null){
					setIsSaved(true)
				}
			}
			else{
				dataContext.errorToast(res.data.message)
			}

		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			dataContext.errorToast("Hubo un error. Vuelva a intentarlo.")
			setShowBosqueDeFinca(false)
		}

		gestionApi.actualizarAreas(areas, handleResponse, handleError)
	}

	const addAnexo = (e: any) => {
		let anexo = {
			extension: e.extension,
			nombre: e.nombre,
			ruta: e.rutaArchivo,
			size: e.size,
			tcTipoAnexo: {
				tipoAnexoId: "2"
			},
			tipoAnexoId: "2",
			ttGestion: {
				estadoId: gestion.estadoId,
				gestionId: gestion.gestionId,
				personaAnulaId: gestion.personaAnulaId,
				tcElaborador: gestion.tcElaborador,
				tcPersonaCrea: gestion.tcPersonaCrea,
				tcTipoBosque: gestion.tcTipoBosque,
				tcTipoGestion: gestion.tcTipoGestion,
				ttTipoPropietarioGestion: gestion.ttTipoPropietarioGestion
			}
		};

		const handleResponse = (res: any) => {
			setAnexoUsoFinca(res.data ? res.data.data[0].anexoGestionId : 0)
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
		}

		gestionApi.agregarAnexo(anexo, handleResponse, handleError)
	}

	const onSaveUsoActualFinca = (e: CustomFincaDTO) => {
		let usoFinca = {
			area: e.area,
			estadoId: 1,//gestion.estadoId,
			tcUsoFinca: {
				codigo: null,
				estadoId: 1,
				fechaRegistro: gestion.fechaRegistro,
				usoFincaDesc: e.uso,
				usoFincaId: e.value
			},
			ttGestion: {
				estadoId: gestion.estadoId,
				gestionId: gestion.gestionId,
				personaAnulaId: gestion.personaAnulaId,
				tcElaborador: gestion.tcElaborador,
				tcPersonaCrea: gestion.tcPersonaCrea,
				tcTipoBosque: gestion.tcTipoBosque,
				tcTipoGestion: gestion.tcTipoGestion,
				ttTipoPropietarioGestion: gestion.ttTipoPropietarioGestion
			}
		};

		const handleResponse = (res: any) => {
			e.usoFincaGestionId = res.data.data ? res.data.data[0].usoFincaGestionId : 0
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
		}

		gestionApi.agregarUsoFinca(usoFinca, handleResponse, handleError)
	}

	const viewUsoFincaImage = () => {
		const onResponse = (_response: any) => {

		}

		const onError = (axiosError: AxiosError) => {
			console.error(axiosError)
		}

		gestionApi.getGestionFileById(anexoUsoFinca, onResponse, onError)
	}

	const cargarDataGestionCallback = useCallback(cargarDataGestion, [gestion])


	useEffect(() => {
		if (gestion === null) {
			return
		}
		cargarListadoUsoFinca()
		cargarDataGestionCallback(gestion)
	}, [gestion, cargarDataGestionCallback])

	useEffect(() => {
		if (removeCriterios) {
			setRemoveCriterios(false)
		}
	}, [removeCriterios])

	//Validamos datos antes de continuar
	const isDataValid = (): boolean => {
		if(!isSaved){
			dataContext.errorToast("Debe de ingresar toda la información requerida")
		}
		return isSaved
	}

	const isDataValidCallback = useCallback(
		isDataValid,
		[isSaved],
	)

	useEffect(() => {
		nextButtonRef.current = isDataValidCallback
	}, [nextButtonRef, isDataValidCallback])

	// useEffect(() => {
	// 	setNextButtonDisabled(!isSaved)
	// }, [isSaved, setNextButtonDisabled])


	return (
		<>
			<Segment raised>
				<Header>3.1. Uso actual de la finca</Header>
				<CustomFincaTable
					labelFilter="Uso de finca"
					labelInput="Área en (ha)"
					errorFilter="Este campo no puede ir vacio"
					errorInput="Debe de ser mayor a 0"
					filterElements={filterUsoFinca}
					headerTable={encabezadosUsoFinca}
					setOnSaveItem={onSaveUsoActualFinca}
					setOnDeleteItem={onDeleteUsoActualFinca}
					setOnSaveData={onSaveData}
					areaTotal={areaTotal}
					dataTable={dataTableUsoFinca}
					areaIntervenir={areaIntervenir}
				/>

				<Grid textAlign="center" verticalAlign="bottom" style={{ "marginTop": "12px" }}>
					<Grid.Row columns={2}>
						<Grid.Column>
							<UploadFormButton defaultLabel={"Clic para cambiar mapa de finca"} name={"mapa"} url="/" handleChange={handleChange} />
						</Grid.Column>
						<Grid.Column>
							{anexoUsoFinca !== 0 &&
								<Button icon primary onClick={viewUsoFincaImage} labelPosition="right">
									<Icon name="map" />
								Ver mapa
							</Button>
							}
						</Grid.Column>
					</Grid.Row>
				</Grid>

			</Segment>

			{showBosqueDeFinca &&
				<Segment>
					<BosqueFinca
					setIsSaved={setIsSaved}
						gestion={gestion}
						areaBosque={areaForestal}
						areaIntervenir={areaIntervenir}
						formData={areaData}
						setFormData={setAreaData}
						dataTableCriterioProteccion={dataTableCriterioProteccion}
						tipoBosque={tipoBosque}
						subtipoBosque={subtipoBosque}
						estadoBosque={estadoBosque}
						descripcionVegetacion={descripcionVegetacion}
						anexoBosqueFinca={anexoBosqueFinca}
						removeCriterios={removeCriterios}
						/>
				</Segment>
			}
		</>
	)
}
