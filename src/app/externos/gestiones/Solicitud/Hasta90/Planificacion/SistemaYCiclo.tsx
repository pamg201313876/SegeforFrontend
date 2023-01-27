import React from 'react'
import { Form, Group, TextArea, NumInput } from 'components/Form'
import { SistemaCortaSelect, TratamientoSilviculturalSelect } from 'components/Form/CatalogSelect'
import { requiredObject, SchemaOf, object, requiredString, defaultSelect, defaultText, requiredNumber  } from 'components/Yup'
import { Header } from 'semantic-ui-react';
import UpdateSistemaYCicloDTO from "dto/gestion/latifoliado/hasta90/planificacion/UpdateSistemaYCicloDTO"
import { planificacionApi } from 'api/latifoliado/hasta90';

type Props = {
	gestion: any,
	onSuccess: () => void
}

type SistemaYCicloForm = {
	sistemaCorta: any
	tratamientoSilvicultural: any
	descripcionSistemaManejo: string
	vigencia: number
	aniosRevision: number
	descripcionCicloAprovechamiento: string
}

const validationSchema: SchemaOf<SistemaYCicloForm> = object({
	sistemaCorta: requiredObject(),
	tratamientoSilvicultural: requiredObject(),
	descripcionSistemaManejo: requiredString(),
	vigencia: requiredNumber(1),
	aniosRevision: requiredNumber(1),
	descripcionCicloAprovechamiento: requiredString(),
})

export default function SistemaYCiclo({
	gestion,
	onSuccess
}: Props) {

	const defaultValues: SistemaYCicloForm = {
		sistemaCorta: defaultSelect(gestion?.planificacionGestion?.tcSistemaCorta),
		tratamientoSilvicultural: defaultSelect(gestion?.planificacionGestion?.tcTratamientoSilvicultural),
		descripcionSistemaManejo:  defaultText(gestion?.planificacionGestion?.descripcionSistemaManejo),
		vigencia:  defaultText(gestion?.planificacionGestion?.vigencia),
		aniosRevision:  defaultText(gestion?.planificacionGestion?.aniosRevisionActualizacion),
		descripcionCicloAprovechamiento:  defaultText(gestion?.planificacionGestion?.descripcionCicloAprovechamiento)
	}

	const handleSubmit = (data: SistemaYCicloForm, onResponse: (res: any) => void, onError: (error: any) => void) => {
		let updateDto: UpdateSistemaYCicloDTO = {
			tcSistemaCortaId: data.sistemaCorta.sistemaCortaId,
			tcTratamientoSilviculturalId: data.tratamientoSilvicultural.tratamientoSilviculturalId,
			descripcionSistemaManejo: data.descripcionSistemaManejo,
			vigencia: data.vigencia,
			aniosRevisionActualizacion: data.aniosRevision,
			descripcionCicloAprovechamiento: data.descripcionCicloAprovechamiento
		}
		planificacionApi.updateSistemaYCiclo(gestion.gestionId, updateDto, onResponse, onError);
	}

	return (
		<Form
			validationSchema={validationSchema}
			defaultValues={defaultValues}
			onSubmit={handleSubmit}
			onSuccess={onSuccess}>
			<Header>
				6.1. Sistema de manejo a aplicar
			</Header>
			<Group>
				<SistemaCortaSelect
					label="Sistema silvicultural"
					name="sistemaCorta" />
				<TratamientoSilviculturalSelect
					label="Tratamiento silvicultural"
					name="tratamientoSilvicultural" />
			</Group>
			<TextArea
				label="Descripción del sistema de manejo"
				name="descripcionSistemaManejo"
			/>
			<Header>
				6.2. Ciclo de aprovechamiento a aplicar
			</Header>
			<Group>
				<NumInput
					label="Vigencia del plan de manejo (años)"
					name="vigencia"
				/>
				<NumInput
					label="Revisión y actualización del plan de manejo (años)"
					name="aniosRevision"
				/>
			</Group>
			<TextArea
				label="Describir el ciclo de aprovechamiento a aplicar"
				name="descripcionCicloAprovechamiento"
			/>
		</Form>
	)
}
