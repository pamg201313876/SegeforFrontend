import AprovechamientoApi from 'api/latifoliado/hasta90/AprovechamientoApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import BasicLabel from 'components/BasicLabel/BasicLabel'
import FormNumInput from 'components/FormNumInput'
import UpdatePropuestaDTO from 'dto/gestion/latifoliado/hasta90/aprovechamiento/UpdatePropuestaDTO'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Header, Icon, Segment } from 'semantic-ui-react'
import { isNumber, roundDouble } from 'utils/UtilFunctions'

type Props = {
	gestion: any,
	volumenTotal: number
}

const aprovechamientoApi = new AprovechamientoApi()

export default function PropuestaAprovechamientoGestion({
	gestion,
	volumenTotal
}: Props) {

	const dataContext = useContext(AppDataContext);
	const [cicloAprovechamiento, setCicloAprovechamiento] = useState<number>(0)
	const [cicloCorta, setCicloCorta] = useState<number>(0)
	const [cortaPeriodicaPermisible, setCortaPeriodicaPermisible] = useState<number>(0)


	const handleResponse = (res: any) => {
		dataContext.desactivateLoading()
		if (res.status === "OK") {
			dataContext.successToast("Datos guardados satisfactoriamente")
		}
		else {
			dataContext.errorToast("Error al guardar informacion")
		}
	}

	const handleError = (axiosError: AxiosError) => {
		dataContext.errorToast("Error al guardar la informcación")
		console.error(axiosError)
		dataContext.desactivateLoading()
	}

	const updatePropuesta = () => {
		
		let updateDto : UpdatePropuestaDTO = {
			cicloAprovechamiento: cicloAprovechamiento,
			cicloCorta: cicloCorta
		}

		dataContext.activateLoading()
		aprovechamientoApi.updatePropuesta(gestion.gestionId, updateDto, handleResponse, handleError)

	}


	const handleCicloCortaChange = (e: any) => {
		let value = e.target.value

		if (isNumber(value)) {
			setCicloCorta(Number(value))
		}
		else {
			setCicloCorta(0)
		}

	}

	const handleCicloAprovechamientoChange = (e: any) => {
		let value = e.target.value

		if (isNumber(value)) {
			setCicloAprovechamiento(Number(value))
		}
		else {
			setCicloAprovechamiento(0)
		}

	}

	useEffect(() => {
		console.log(gestion)
		if(gestion != null && gestion.aprovechamientoGestion != null){
			let aprovechamiento = gestion.aprovechamientoGestion
			setCicloAprovechamiento(aprovechamiento.cicloAprovechamiento)
			setCicloCorta(aprovechamiento.cicloCorta)
		}
		else{
			setCicloCorta(5)
			setCicloAprovechamiento(5)
		}
	}, [gestion])

	useEffect(() => {
		console.log(cicloCorta)
		if (cicloCorta === 0) {
			setCortaPeriodicaPermisible(0)
		}
		else {
			console.log("entra aqui")
			let cortaPeriodica = (volumenTotal * cicloAprovechamiento) / cicloCorta
			setCortaPeriodicaPermisible(roundDouble(cortaPeriodica))
		}
	}, [volumenTotal, cicloAprovechamiento, cicloCorta])



	return (
		<Segment raised clearing>
			<Header>7. Propuesta de aprovechamiento y repoblación forestal</Header>
			<BasicLabel label="Volumen total aprovechable:" value={volumenTotal} />
			<Form.Group  >
				<FormNumInput
					label="Ciclo de aprovechamiento (años)"
					value={cicloAprovechamiento}
					onlyDigits
					name="cicloAprovechamiento"
					onBlur={handleCicloAprovechamientoChange}
					width="3"
				/>
				<FormNumInput
					label="Ciclo de corta (años)"
					value={cicloCorta}
					onlyDigits
					name="cicloCorta"
					onBlur={handleCicloCortaChange}
					width="3"
				/>

			</Form.Group>
			<BasicLabel label="Corta Periodica Permisible m3 (CPP): " value={cortaPeriodicaPermisible} />
			<Form.Button icon primary floated="right" labelPosition='right' onClick={updatePropuesta} >
				Guardar
							<Icon name="save" />
			</Form.Button>
		</Segment>
	)
}
