import React from 'react'
import { Form, NumInput, Input, Modal, Group } from 'components/Form'
import { DepartamentoMunicipioSelect } from 'components/Form/CatalogSelect'
import { object, SchemaOf, requiredString, requiredNumber, requiredObject, defaultText, defaultSelect } from 'components/Yup'
import FincaApi from 'api/FincaApi'

type Finca = {
	nombre: string
	tcMunicipio: any
	direccion: string
	gtmX: number
	gtmY: number
	areaDocumento: number
	area: number
}

type FincaDTO = {
	area: number,
	areaDocumento: number,
	direccion: string,
	estadoId: number,
	este: string,
	fincaDesc: string,
	gtmX: number,
	gtmY: number,
	norte: string,
	oeste: string,
	sur: string,
	tcMunicipio: any
}

const validationSchema: SchemaOf<Finca> = object({
	nombre: requiredString(),
	tcMunicipio: requiredObject(),
	direccion: requiredString(),
	gtmX: requiredNumber().test('len', 'Requeridos 6 dígitos', val => val?.toString().length === 6),
	gtmY: requiredNumber().test('len', 'Requeridos 7 dígitos', val => val?.toString().length === 7),
	areaDocumento: requiredNumber(),
	area: requiredNumber()
})

type Props = {
	fincaData: any
	open: boolean
	closeModal: () => void
}

const fincaApi = new FincaApi()

export default function EdicionFinca({
	fincaData,
	open,
	closeModal
}: Props) {

	const formToDTO = (data: Finca) : FincaDTO => {
		let fincaDTO : FincaDTO = {
			area: data.area,
			areaDocumento: data.areaDocumento,
			direccion: data.direccion,
			estadoId: fincaData.estadoId,
			este: fincaData.este,
			fincaDesc: data.nombre,
			gtmX: data.gtmX,
			gtmY: data.gtmY,
			norte: fincaData.nombre,
			oeste: fincaData.oeste,
			sur: fincaData.sur,
			tcMunicipio: data.tcMunicipio
		}
		return fincaDTO
	}

	const handleSubmit = (data: Finca, onResponse: (res: any) => void, onError: (error: any) => void) => {
		let fincaDto = formToDTO(data)
		fincaApi.editarFinca(fincaData.fincaId, fincaDto, onResponse, onError)
	}

	const defaultValues: Finca = {
		nombre: defaultText(fincaData.fincaDesc),
		tcMunicipio: defaultSelect(fincaData.tcMunicipio),
		direccion: defaultText(fincaData.direccion),
		gtmX: defaultText(fincaData.gtmX),
		gtmY: defaultText(fincaData.gtmY),
		areaDocumento: defaultText(fincaData.areaDocumento),
		area: defaultText(fincaData.area)
	}

	return (
		<Modal size="large" header="Editar datos de la finca" open={open} closeModal={closeModal} >
			<Form onSubmit={handleSubmit} validationSchema={validationSchema} onSuccess={closeModal} defaultValues={defaultValues} >
				<Group>
					<Input label="Nombre de la finca" name="nombre" />
					<DepartamentoMunicipioSelect name="tcMunicipio" />
				</Group>
				<Input label="Dirección / aldea / caserío / cantón (NO incluya texto como: lugar denominado, conocido, etc.)" name="direccion" />
				<Group widths="equal">
					<NumInput label="Coordenadas GTM X" name="gtmX" maxLength={6} />
					<NumInput label="Coordenadas GTM Y" name="gtmY" maxLength={7} />
					<NumInput label="Área total (ha. Según documento)" name="areaDocumento" />
					<NumInput label="Área total (ha. Según GPS)" name="area" />
				</Group>
			</Form>
		</Modal>
	)
}
