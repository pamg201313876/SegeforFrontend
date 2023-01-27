import React, { useState } from 'react'
import { Divider, Form, Header, Icon, Message } from 'semantic-ui-react'
import DepartamentoMunicipioSelect from 'components/DepartamentoMunicipioSelect';
import FormNumInput from 'components/FormNumInput';
import FincaFormError, { createFormError, validateForm } from './data/FincaFormError';
import Finca, { createNewFinca } from './data/Finca';
import FincaApi from 'api/FincaApi';


const fincaApi = new FincaApi()

type Props = {
	onFincaCreated: (finca: any) => void
}

export default function FincaForm({
	onFincaCreated
}: Props) {

	const [formData, setFormData] = useState<Finca>(createNewFinca())
	const [formError, setFormError] = useState<FincaFormError>(createFormError())
	const [requestError, setRequestError] = useState<string | null>(null)

	
	const setData = (name: string, value: any) => {
		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}

	const handleBlur = (e: any) => {
		setData(e.target.name, e.target.value)
	}

	const handleChangeMunicipioNotificacion = (_e: any, { value, object }: any) => {

		setFormData((oldValues: any) => ({
			...oldValues,
			'municipioId': value,
		}));

		setFormData((oldValues: any) => ({
			...oldValues,
			'tcMunicipio': object,
		}));

	}

	const handleSave = () => {

		setRequestError(null)
		let formError = validateForm(formData)
		setFormError(formError)

		if (formError.isError) {
			return
		}

		const handleResponse = (response: any) => {

			if (response.data.status === "OK") {
				onFincaCreated(response.data.data[0])
			} else {
				setRequestError(response.data.message)
			}
		}

		const handleError = (error: any) => {
			console.error(error)
		}

		fincaApi.nuevaFinca(formData, handleResponse, handleError)

	}

	return (
		<Form>
			<Message
				negative
				hidden={requestError == null}
				content={requestError}
			/>
			<Header size="medium">
				Información de la Finca
			</Header>
			<Form.Group widths='equal'>
				<Form.Input
					label='Nombre de la Finca'
					name='fincaDesc'
					error={formError.fincaDesc}
					onBlur={handleBlur}
					defaultValue={formData.fincaDesc}
				/>
				<DepartamentoMunicipioSelect
					municipioValue={formData.tcMunicipio}
					onChange={handleChangeMunicipioNotificacion}
					departamentoLabel="Departamento/estado"
					municipioLabel="Municipio/provincia"
					municipioName="tcMunicipio"
					municipioError={formError.tcMunicipio}
					upward={false} />
			</Form.Group>
			<Form.Group widths='equal'>
				<Form.Input
					label='Dirección/Aldea/Caserío/Cantón (No incluir texto como: lugar denominado, conocido, etc)'
					name='direccion'
					onBlur={handleBlur}
					error={formError.direccion}
					defaultValue={formData.direccion}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<FormNumInput
					label='Coordenadas GTM X'
					name='gtmX'
					maxLength="6"
					onBlur={handleBlur}
					error={formError.gtmX}
					value={formData.gtmX}
				/>
				<FormNumInput
					label='Coordenadas GTM Y'
					name='gtmY'
					maxLength="7"
					onBlur={handleBlur}
					error={formError.gtmY}
					value={formData.gtmY}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<FormNumInput
					label='Area Total (ha. Según documento)'
					name='area'
					onBlur={handleBlur}
					error={formError.area}
					value={formData.area}
				/>
				<FormNumInput
					label='Area Total (ha. Según GPS)'
					name='areaDocumento'
					onBlur={handleBlur}
					error={formError.areaDocumento}
					value={formData.areaDocumento}
				/>
			</Form.Group>
			<Divider section />
			<Header size="medium">
				Colindancias
			</Header>
			<Form.Group widths='equal'>
				<Form.Input
					label='Norte'
					name='norte'
					onBlur={handleBlur}
					error={formError.norte}
					defaultValue={formData.norte}
				/>
				<Form.Input
					label='Sur'
					name='sur'
					onBlur={handleBlur}
					error={formError.sur}
					defaultValue={formData.sur}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<Form.Input
					label='Este'
					name='este'
					onBlur={handleBlur}
					error={formError.este}
					defaultValue={formData.este}
				/>
				<Form.Input
					label='Oeste'
					name='oeste'
					onBlur={handleBlur}
					error={formError.oeste}
					defaultValue={formData.oeste}
				/>
			</Form.Group>
			<Form.Button  icon labelPosition="right" color="green" onClick={handleSave} >
				<Icon name="save" />
				Guardar
			</Form.Button>
		</Form>
	)
}