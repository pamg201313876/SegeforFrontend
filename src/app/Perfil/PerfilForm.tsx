import CulturaSelect from 'components/FormCatalogSelect/catalogs/CulturaSelect'
import EstadoCivilSelect from 'components/FormCatalogSelect/catalogs/EstadoCivilSelect'
import IdiomaSelect from 'components/FormCatalogSelect/catalogs/IdiomaSelect'
import OcupacionSelect from 'components/FormCatalogSelect/catalogs/OcupacionSelect'
import SexoSelect from 'components/FormCatalogSelect/catalogs/SexoSelect'
import FormNumInput from 'components/FormNumInput'
import PaisDepartamentoMunicipioSelect from 'components/PaisDepartamentoMunicipioSelect'
import UploadImageFormButton from 'components/UploadImageButton'
import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import PerfilFormError from './PerfilFormError'

type Props = {
	formError: PerfilFormError
	setFormData: Function
	formData: any
}

export default function PerfilForm(props: Props) {

	const [edit, setEdit] = useState(true);

	const handleChangeMunicipio = (_e: any, { object }: any) => {

		props.setFormData((oldValues: any) => ({
			...oldValues,
			"tcMunicipio": object,
		}));

	}

	const setData = (name: string, value: any) => {
		props.setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}

	const handleBlur = (e: any) => {
		let name = e.target.name
		let value = e.target.value
		setData(name, value)
	}

	const handleChange = (_e: any, { name, value }: any) => {
		setData(name, value)
	}

	return (
		<Form error={props.formError.isError}>
			<Form.Group widths='equal'>
				<UploadImageFormButton
					disabled={!edit}
					defaultLabel={''}
					imageSize={'small'}
					fileNameLabel={'Foto'}
					imageBase64={props.formData.foto}
					name='foto'
					error={props.formError ? props.formError.foto : null}
					handleChange={handleChange}  ></UploadImageFormButton>
			</Form.Group>
			<Form.Group widths='equal'>
				<Form.Input
					disabled={!edit}
					label='Nombre completo'
					name='personaDesc'
					error={props.formError ? props.formError.nombre : null}
					onBlur={handleBlur}
					defaultValue={props.formData.personaDesc} />
				<Form.Input
					disabled={!edit}
					label='Dirección'
					name='direccion'
					error={props.formError ? props.formError.direccion : null}
					onBlur={handleBlur}
					defaultValue={props.formData.direccion} />
			</Form.Group>
			<Form.Group widths='equal'>
				<PaisDepartamentoMunicipioSelect
					disabled={!edit}
					municipioValue={props.formData.tcMunicipio}
					departamentoName="municipioEmision"
					onChange={handleChangeMunicipio}
					departamentoLabel="Departamento/estado"
					municipioLabel="Municipio/provincia"
					municipioName="tcMunicipio"
					paisError={props.formError ? props.formError.pais : null}
					municipioError={props.formError ? props.formError.municipio : null}
					departamentoError={props.formError ? props.formError.municipio : null}
					upward={false}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<FormNumInput
					disabled={!edit}
					label='CUI -DPI-'
					name='cui'
					onlyDigits
					error={props.formError ? props.formError.cui : null}
					maxLength={13}
					onBlur={handleBlur}
					value={props.formData.cui ? props.formData.cui : ``} />
				<Form.Input
					disabled={!edit}
					type="date"
					label='Fecha de vencimiento'
					name='fechaVencimiento'
					error={props.formError ? props.formError.fechaVencimiento : null}
					onBlur={handleBlur}
					defaultValue={props.formData.fechaVencimiento ? props.formData.fechaVencimiento.split('T')[0].trim() : ``} />
				<FormNumInput
					disabled={!edit}
					label='Teléfono'
					name='telefono'
					onlyDigits
					error={props.formError ? props.formError.telefono : null}
					onBlur={handleBlur}
					value={props.formData.telefono ? props.formData.telefono : ``} />
				<OcupacionSelect
					disabled={!edit}
					label="Ocupación"
					value={props.formData.tcOcupacion}
					onChange={handleChange}
					error={props.formError ? props.formError.ocupacion : null}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<CulturaSelect
					disabled={!edit}
					label="Pueblo de Pertenencia"
					value={props.formData.tcCultura}
					onChange={handleChange}
					error={props.formError ? props.formError.pueblo : null}
				/>
				<IdiomaSelect
					disabled={!edit}
					label="Comunidad Lingüistica"
					value={props.formData.tcIdioma}
					onChange={handleChange}
					error={props.formError ? props.formError.comunidad : null}
				/>
				<EstadoCivilSelect
					disabled={!edit}
					label="Estado civil"
					value={props.formData.tcEstadoCivil}
					onChange={handleChange}
					error={props.formError ? props.formError.estadoCivil : null}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<Form.Input
					disabled={!edit}
					label='Correo'
					name='correo'
					error={props.formError ? props.formError.correo : null}
					onBlur={handleBlur}
					defaultValue={props.formData.correo ? props.formData.correo : ``} />
				<Form.Input
					disabled={!edit}
					type="date"
					label='Fecha de nacimiento'
					name='fechaNacimiento'
					error={props.formError ? props.formError.fechaNacimiento : null}
					onBlur={handleBlur}
					defaultValue={props.formData.fechaNacimiento ? props.formData.fechaNacimiento.split('T')[0].trim() : ``} />
				<SexoSelect
					label="Género"
					disabled={!edit}
					value={props.formData.tcSexo}
					error={props.formError ? props.formError.sexo : null}
					onChange={handleChange}
				/>
				<FormNumInput
					disabled={!edit}
					label='NIT'
					name='nit'
					onlyDigits
					readOnly
					error={props.formError ? props.formError.nit : null}
					onBlur={handleBlur}
					maxLength={8}
					value={props.formData.nit} />
			</Form.Group>
		</Form>
	)
}