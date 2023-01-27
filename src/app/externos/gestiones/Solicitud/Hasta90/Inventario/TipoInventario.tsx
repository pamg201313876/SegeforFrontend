
import InventarioApi from 'api/latifoliado/hasta90/InventarioApi'
import SaveTipoInventarioDTO from 'dto/gestion/latifoliado/hasta90/inventario/SaveTipoInventarioDTO'
import { DisenioCensoSelect } from 'components/Form/CatalogSelect'
import React from 'react'
import { Header } from 'semantic-ui-react'
import { Form, TextArea } from 'components/Form'
import { requiredObject, SchemaOf, object, requiredString, defaultSelect, defaultText  } from 'components/Yup'

type Props = {
	inventarioApi: InventarioApi,
	gestion: any,
	onSuccess: () => void
}

type TipoInventarioForm = {
	disenioCenso: any,
	descripcionMetodologia: string,
	ecuacion: string
}

const validationSchema: SchemaOf<TipoInventarioForm> = object({
	disenioCenso: requiredObject(),
	descripcionMetodologia: requiredString(),
	ecuacion: requiredString()
})

export default function TipoInventario({
	inventarioApi,
	gestion,
	onSuccess
}: Props) {

	const handleSubmit = (data: TipoInventarioForm, onResponse: (res: any) => void, onError: (error: any) => void) => {
		let saveDTO: SaveTipoInventarioDTO = {
			tcDisenioCensoId: data.disenioCenso.disenioCensoId,
			descripcionMetodologia: data.descripcionMetodologia,
			ecuacion: data.ecuacion,
		}
		inventarioApi.saveTipoInventario(gestion.gestionId, saveDTO, onResponse, onError)
	}

	const defaultValues: TipoInventarioForm = {
		disenioCenso: defaultSelect(gestion?.inventarioGestion?.tcDisenioCenso),
		descripcionMetodologia: defaultText(gestion?.inventarioGestion?.descripcionMetodologia),
		ecuacion: defaultText(gestion?.inventarioGestion?.ecuacion)
	}

	return (
		<Form
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			defaultValues={defaultValues}
			onSuccess={onSuccess}
		>
			<DisenioCensoSelect
				label="Diseño censo"
				name="disenioCenso"
				width="4"
			/>
			<TextArea
				label="Descripción de la metodología"
				name="descripcionMetodologia"
			/>
			<TextArea
				label={
					<Header>
						4.2. Ecuación utilizada para el cálculo de volumen
					</Header>
				}
				name="ecuacion"
			/>
		</Form>
	)
}
