import GestionApi from 'api/GestionApi';
import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios';
import CreateUpdateCronogramaDTO from 'dto/solicitud/CreateUpdateCronogramaDTO';
import CronogramaConvert from 'dto/solicitud/CronogramaConvert';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Icon, Segment, Tab } from 'semantic-ui-react';
import CronogramaDTO, { convertAsArrayDTO, convertAsCronogramaDTO, createNew } from '../../../../../../dto/solicitud/CronogramaDTO';
import CronogramaTextBox from './CronogramaTextBox';
import YearTable from './YearTable';

type Props = {
	gestion: any
	setNextButtonDisabled: (disabled: boolean) => void
}

const gestionApi = new GestionApi();

export default function Cronograma({
	gestion,
	setNextButtonDisabled
}: Props) {

	const dataContext = useContext(AppDataContext)
	const [vigencia, setVigencia] = useState(0)
	const [counter, setCounter] = useState<number>(0)
	const [paneles, setPaneles] = useState<any[]>([])
	const [activeIndex, setActiveIndex] = useState<number>(0)
	const [cronogramas, setCronogramas] = useState<CronogramaDTO[]>([]);
	const [cronograma, setCronograma] = useState<CronogramaDTO>(createNew());
	const [isSaved, setIsSaved] = useState(false)
	const [observaciones, setObservaciones] = useState<string>("")
	const [loading, setLoading] = useState(false)

	const handleTabChange = (_e: any, data: any) => {
		setActiveIndex(data.activeIndex)
		dataContext.activateLoading()
	}

	const addCounter = () => {
		let tmpCounter = counter + 1
		setCounter(tmpCounter)
		renderTables(tmpCounter)
		let cronograma: CronogramaDTO = createNew()
		let tmpCronogramas = cronogramas
		tmpCronogramas.push(cronograma)
		setCronogramas(tmpCronogramas)
	}

	const reduceCounter = () => {
		let tmpCounter = counter - 1
		if (activeIndex === tmpCounter) {
			setActiveIndex(tmpCounter - 1)
		}

		setCounter(tmpCounter)
		renderTables(tmpCounter)
		let tmpCronogramas = cronogramas
		tmpCronogramas.pop()
		setCronogramas(tmpCronogramas)
	}

	const onSave = () => {

		let cronogramasDTO = {
			cronogramas: convertCronogramasToArray(cronogramas),
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
			if (res.data.status === "OK") {
				setIsSaved(true)
				dataContext.successToast("Datos almacenados correctamente")
			}
			else {
				dataContext.errorToast(res.data.message)
			}
			setLoading(false)
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			dataContext.errorToast("Datos no pudieron ser almacenados. Intentelo de nuevo.")
			setLoading(false)
		}

		setLoading(true)
		gestionApi.agregarCronograma(cronogramasDTO, handleResponse, handleError)

	}

	const convertCronogramasToArray = (cronogramas: CronogramaDTO[]) => {
		var list: any[] = [];
		cronogramas.forEach(cronograma => {
			list.push(convertAsArrayDTO(cronograma));
		});
		return list;
	}

	const convertArrayToCronogramas = (cronograma: any, counter: number) => {
		let cronogramas: CronogramaConvert[] = cronograma?.cronogramas
		var list: any[] = [];
		if (cronogramas == null) {
			cronogramas = []
		}
		for (let i = 0; i < counter; i++) {
			let cronograma = cronogramas[i]
			if (cronograma != null) {
				list.push(convertAsCronogramaDTO(cronograma));
			}
			else {
				list.push(createNew())
			}
		}
		return list;
	}
	const renderTables = (counter: number) => {
		setPaneles([])
		let list = []
		for (let i = 0; i < counter; i++) {
			list.push({
				menuItem: '#' + (i + 1),
				key: 'Año' + (i + 1)
			})
		}
		setPaneles(list)
	}

	const handleObservacionesChange = (value: string) => {
		cronograma.observaciones = value
		setObservaciones(value)
	}
	
	useEffect(() => {
		renderTables(counter);
	}, [counter])

	useEffect(() => {
		let currentCronograma = cronogramas[activeIndex];
		if (currentCronograma != null) {
			setCronograma(currentCronograma)
			setObservaciones(currentCronograma.observaciones)
		}
	}, [activeIndex, cronogramas])

	useEffect(() => {
		dataContext.desactivateLoading()
	}, [cronograma, dataContext])

	useEffect(() => {
		if (gestion != null) {
			let cronograma = gestion.ttCronogramaGestion

			if (cronograma != null) {
				setIsSaved(true)
			}

			let vigencia = gestion?.planificacionGestion?.vigencia

			if (vigencia == null) {
				vigencia = 5
			}

			setVigencia(vigencia)

			let counter: number = cronograma?.cronogramas?.length > vigencia ? cronograma?.cronogramas?.length : vigencia

			let cronogramasDTO: CreateUpdateCronogramaDTO = {
				cronogramas: convertArrayToCronogramas(cronograma, counter),
				//observaciones: cronograma?.observaciones ? cronograma?.observaciones : "",
				ttGestion: null
			};
			setCronogramas(cronogramasDTO.cronogramas)
			setActiveIndex(0)
			setCronograma(cronogramasDTO.cronogramas[0])
			setCounter(counter)
		}
	}, [gestion])

	useEffect(() => {
		setNextButtonDisabled(!isSaved)
	}, [isSaved, setNextButtonDisabled])

	return (
		<Segment raised clearing>
			<Button primary onClick={addCounter} labelPosition="right" icon  >
				<Icon name="add" />
				Agregar año
			</Button>
			{counter !== vigencia
				? <Button color="red" onClick={reduceCounter} labelPosition="right" icon >
					<Icon name="x" />
					Quitar último año
				</Button>
				: null}
			<Tab style={{ marginTop: "8px" }} menu={{ secondary: true, color: 'green', attached: false, tabular: true }} onTabChange={handleTabChange} activeIndex={activeIndex} panes={paneles} />
			<YearTable number={activeIndex + 1} cronograma={cronograma} />
			<Form>
				<CronogramaTextBox
					observaciones={observaciones}
					onBlurValue={handleObservacionesChange}
				/>
				<Form.Button floated="right" labelPosition="right" primary icon onClick={onSave} loading={loading} >
					<Icon name="save" />
					Guardar
				</Form.Button>
			</Form>
		</Segment>
	)
}
