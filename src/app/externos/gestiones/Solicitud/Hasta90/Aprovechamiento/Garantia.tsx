import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Header, Icon, Segment, Table } from 'semantic-ui-react'
import { AxiosError } from 'axios'
import { AppDataContext } from 'app/App'
import TipoGarantiaSelect from 'components/FormCatalogSelect/catalogs/TipoGarantiaSelect'
import NuevaGestionApi from 'api/generales/NuevaGestionApi'
import UpdateGarantiaGestionDTO from 'dto/gestion/UpdateGarantiaGestionDTO'
import FormNumInput from 'components/FormNumInput'

type FiadorDTO = {
	nombreEmpresa: string,
	nombreFiador: string,
	tipoFiadorId: number,
	dpiFiador: string,
	ttGestion: any
}

const nuevaGestionApi = new NuevaGestionApi()

type Props = {
	gestion: any
}

export default function Garantia({
	gestion
}: Props) {

	const dataContext = useContext(AppDataContext)
	const [dpiError, setDPIError] = useState<string| null>(null)
	const [tipoGarantia, setTipoGarantia] = useState<any>()
	const [formData, setFormData] = React.useState<FiadorDTO>({
		dpiFiador: "0",
		nombreEmpresa: "",
		nombreFiador: "",
		tipoFiadorId: 0,
		ttGestion: gestion
	});

	const isDPIValid = (): boolean => {
		setDPIError(null)
		if(formData.dpiFiador.length != 13 && tipoGarantia!!.tipoGarantiaId === 1){
			setDPIError("DPI inválido")
			return false
		}
		return true
	}

	const guardarFiador = () => {

		if(!isDPIValid()){
			return null
		}

		const handleResponse = (response: any) => {
			if (response.data.status === "OK") {
				dataContext.successToast("Datos guardados exitosamente")
			} else {
				dataContext.errorToast("Error al guardar información. Intentelo de nuevo.")
			}
			dataContext.desactivateLoading()
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			dataContext.errorToast("Error al guardar la información. Intentelo de nuevo")
			dataContext.desactivateLoading()
		}

		let updateDto: UpdateGarantiaGestionDTO = {
			nombreEmpresa: formData.nombreEmpresa,
			nombreFiador: formData.nombreFiador,
			tipoFiadorId: formData.tipoFiadorId,
			dpiFiador: formData.dpiFiador,
			tipoGarantiaId: tipoGarantia!!.tipoGarantiaId
		}

		dataContext.activateLoading()
		nuevaGestionApi.updateGarantiaGestion(gestion.gestionId, updateDto, handleResponse, handleError)
	}

	const handleChange = (e: any, { name, value }: any) => {

		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));

	}

	const handleDpiChange = (e: any) => {
		let value = e.target.value
		let name = e.target.name
		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}

	const handleTipoGarantiaChange = (_e: any, {value}: any) => {
		setTipoGarantia(value)
	}

	useEffect(() => {
		if (gestion.ttGarantiaGestion != null) {

			let garantiaGestion = gestion.ttGarantiaGestion

			let miFiador: FiadorDTO = {
				dpiFiador: garantiaGestion.dpiFiador,
				nombreEmpresa: garantiaGestion.nombreEmpresa,
				nombreFiador: garantiaGestion.nombreFiador,
				tipoFiadorId: garantiaGestion.tipoFiadorId,
				ttGestion: gestion
			};

			setTipoGarantia(garantiaGestion.tipoGarantia)
			setFormData(miFiador)
		}
	}, [gestion])

	

	const renderOpcional = () => {

		if (tipoGarantia == null || tipoGarantia!!.tipoGarantiaId !== 1) {
			return null
		}

		return (
			<>
				<Header size="small">Información del Fiador</Header>
				<Form >

					<Form.Select
						onChange={handleChange}
						value={formData.tipoFiadorId}
						width="4"
						name="tipoFiadorId"
						label="Tipo de Fiador"
						options={
							[
								{
									key: "1",
									text: "Empresa",
									value: 1,
								},

								{
									key: "2",
									text: "Individual",
									value: 2,
								}
							]
						}
					/>
					<Form.Group widths="equal">
						{formData.tipoFiadorId === 1 ?
							<Form.Input
								fluid
								onChange={handleChange}
								name="nombreEmpresa"
								value={formData.nombreEmpresa ? formData.nombreEmpresa : ""}
								label="Nombre de Empresa"
							/>
							: null}
						<Form.Input
							fluid
							onChange={handleChange}
							value={formData.nombreFiador ? formData.nombreFiador : ""}
							name="nombreFiador"
							label="Nombre de Fiador"
						/>
						<FormNumInput
							onBlur={handleDpiChange}
							onlyDigits
							name="dpiFiador"
							maxLength={13}
							value={formData.dpiFiador}
							label="DPI del fiador"
							error={ dpiError}
						/>
					</Form.Group>


				</Form>
			</>
		)
	}

	return (
		<Segment raised clearing>
			<Header>Tipo de garantía</Header>
			<TipoGarantiaSelect
				width={4}
				name="tipoGarantia"
				value={tipoGarantia != null ? tipoGarantia : 0}
				onChange={handleTipoGarantiaChange} />
			{renderOpcional()}
			<Button onClick={guardarFiador} color="green" icon labelPosition="right" floated="right">
				<Icon name="save" />
							Guardar información fiador
			</Button>
		</Segment>
	)
}
