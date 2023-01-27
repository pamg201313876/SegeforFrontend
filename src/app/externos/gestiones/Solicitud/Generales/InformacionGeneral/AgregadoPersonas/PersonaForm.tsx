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
import PersonaFormError from './PersonaFormError'

type Props = {
	formError: PersonaFormError
	setFormData: Function
	formData: any
	noImage?: boolean
}

export default function PersonaForm({
	formError,
	setFormData,
	formData,
	noImage = false
}: Props) {

	const [edit, setEdit] = useState(true);

	const setData = (name: string, value: any) => {
		setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}

	const handleChangeMunicipio = (_e: any, { object }: any) => {
		setData("tcMunicipio", object)
	}

	const handleChange = (_e: any, { name, value }: any) => {
		setData(name, value)
	}

	const handleBlur = (e: any) => {
		setData(e.target.name, e.target.value)
	}

	return (
		<Form error={formError.isError}>
			{!noImage 
			?	<Form.Group widths='equal'>
					<UploadImageFormButton
						disabled={!edit}
						defaultLabel={'Clic para buscar'}
						imageSize={'small'}
						fileNameLabel={'Foto'}
						imageBase64={formData.foto}
						name='foto'
						error={formError ? formError.foto : null}
						handleChange={handleChange} />
				</Form.Group>
				: null}
			<Form.Group widths='equal'>
				<Form.Input
					disabled={!edit}
					label='Nombre completo'
					name='personaDesc'
					error={formError ? formError.nombre : null}
					onBlur={handleBlur}
					defaultValue={formData.personaDesc ? formData.personaDesc : ``} />
				<Form.Input
					disabled={!edit}
					label='Dirección'
					name='direccion'
					error={formError ? formError.direccion : null}
					onBlur={handleBlur}
					defaultValue={formData.direccion ? formData.direccion : ``} />
			</Form.Group>
			<Form.Group widths='equal'>
				<PaisDepartamentoMunicipioSelect
					disabled={!edit}
					municipioValue={formData.tcMunicipio}
					departamentoName="municipioEmision"
					onChange={handleChangeMunicipio}
					departamentoLabel="Departamento/estado"
					municipioLabel="Municipio/provincia"
					municipioName="tcMunicipio"
					paisError={formError ? formError.pais : null}
					municipioError={formError ? formError.municipio : null}
					departamentoError={formError ? formError.municipio : null}
					upward={false}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<FormNumInput
					disabled={!edit}
					label='CUI -DPI-'
					name='cui'
					error={formError ? formError.cui : null}
					maxLength={13}
					onlyDigits
					onBlur={handleBlur}
					value={formData.cui ? formData.cui : ``} />
				<Form.Input
					disabled={!edit}
					type="date"
					label='Fecha de vencimiento'
					name='fechaVencimiento'
					error={formError ? formError.fechaVencimiento : null}
					onBlur={handleBlur}
					defaultValue={formData.fechaVencimiento ? formData.fechaVencimiento.split('T')[0].trim() : ``} />
				<FormNumInput
					disabled={!edit}
					label='Teléfono'
					name='telefono'
					onlyDigits
					error={formError ? formError.telefono : null}
					onBlur={handleBlur}
					value={formData.telefono ? formData.telefono : ``} />
				<OcupacionSelect
					disabled={!edit}
					label="Ocupación"
					value={formData.tcOcupacion}
					onChange={handleChange}
					error={formError ? formError.ocupacion : null}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<CulturaSelect
					disabled={!edit}
					label="Pueblo de Pertenencia"
					value={formData.tcCultura}
					onChange={handleChange}
					error={formError ? formError.pueblo : null}
				/>
				<IdiomaSelect
					disabled={!edit}
					label="Comunidad Lingüistica"
					value={formData.tcIdioma}
					onChange={handleChange}
					error={formError ? formError.comunidad : null}
				/>
				<EstadoCivilSelect
					disabled={!edit}
					label="Estado civil"
					value={formData.tcEstadoCivil}
					onChange={handleChange}
					error={formError ? formError.estadoCivil : null}
				/>
			</Form.Group>
			<Form.Group widths='equal'>
				<Form.Input
					disabled={!edit}
					label='Correo'
					name='correo'
					error={formError ? formError.correo : null}
					onBlur={handleBlur}
					defaultValue={formData.correo ? formData.correo : ``} />
				<Form.Input
					disabled={!edit}
					type="date"
					label='Fecha de nacimiento'
					name='fechaNacimiento'
					error={formError ? formError.fechaNacimiento : null}
					onBlur={handleBlur}
					defaultValue={formData.fechaNacimiento ? formData.fechaNacimiento.split('T')[0].trim() : ``} />
				<SexoSelect
					label="Género"
					disabled={!edit}
					value={formData.tcSexo}
					error={formError ? formError.sexo : null}
					onChange={handleChange}
				/>
				<FormNumInput
					disabled={!edit}
					label='NIT'
					name='nit'
					onlyDigits
					error={formError ? formError.nit : null}
					onBlur={handleBlur}
					value={formData.nit ? formData.nit : ``} />
			</Form.Group>
		</Form>
	)
}