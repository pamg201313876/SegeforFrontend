import React, { useEffect, useState } from 'react'
import InventarioApi from 'api/latifoliado/hasta90/InventarioApi'
import BasicLabel from 'components/BasicLabel/BasicLabel'
import SaveDescripcionDTO from 'dto/gestion/latifoliado/hasta90/inventario/SaveDescripcionDTO'
import { requiredNumber, SchemaOf, object, requiredString, defaultText  } from 'components/Yup'
import { useWatch, useFormContext } from "react-hook-form";
import { Form, TextArea, NumInput, ControlProps } from 'components/Form'

type Props = {
	areasEstrato: number[],
	volumenTotal: number,
	inventarioApi: InventarioApi,
	gestion: any,
	onSuccess: () => void
}

type DescripcionCaracteristicas = {
	caracteristicasBosque: string,
	edadBosque: number
}

const validationSchema: SchemaOf<DescripcionCaracteristicas> = object({
	caracteristicasBosque: requiredString(),
	edadBosque: requiredNumber(1)
})

export default function DescripcionCaracteristicas({
	areasEstrato,
	volumenTotal,
	inventarioApi,
	gestion,
	onSuccess
}: Props) {

	const saveDescripcion = (data: DescripcionCaracteristicas, onResponse: (res: any) => void, onError: (error: any) => void) => {
		let saveDTO: SaveDescripcionDTO = {
			caracteristicasBosque: data.caracteristicasBosque,
			edadBosque: data.edadBosque,
			volumenTotal: volumenTotal,
		}
		inventarioApi.saveDescripcionInventario(gestion.gestionId, saveDTO, onResponse, onError)
	}

	const defaultValues: DescripcionCaracteristicas = {
		caracteristicasBosque: defaultText(gestion?.inventarioGestion?.caracteristicasBosque),
		edadBosque: defaultText(gestion?.inventarioGestion?.edadBosque)
	}

	return (
		<Form
			onSubmit={saveDescripcion}
			validationSchema={validationSchema}
			defaultValues={defaultValues}
			onSuccess={onSuccess}
		>
			<TextArea
				name="caracteristicasBosque"
				placeholder="Describir las características del bosque de acuerdo al censo comercial"
			/>
			<NumInput
				width="4"
				label="Edad del bosque"
				name="edadBosque"
				onlyDigits />
			<IncrementoAnual areasEstrato={areasEstrato} volumenTotal={volumenTotal} name="incrementoAnual" />
		</Form>
	)
}

type IncrementoProps = {
	areasEstrato: number[],
	volumenTotal: number
} & ControlProps

function IncrementoAnual({ areasEstrato, volumenTotal, name }: IncrementoProps) {

	const [incrementoAnual, setIncrementoAnual] = useState<number>(0)
	const { control } = useFormContext()

	const edadBosque = useWatch({
		control,
		name: "edadBosque"
	});

	useEffect(() => {
		let areaTotal = 0.00
		areasEstrato.forEach(a => {
			areaTotal += a
		});
		let incrementoAnual = (volumenTotal / areaTotal) / edadBosque
		if (isNaN(incrementoAnual) || incrementoAnual === Infinity) {
			incrementoAnual = 0
		}
		incrementoAnual = +(incrementoAnual.toFixed(3))
		setIncrementoAnual(incrementoAnual)
	}, [areasEstrato, volumenTotal, edadBosque])

	return (
		<BasicLabel name={name} label="Incremento anual del bosque (m3/ha/año): " value={incrementoAnual} />
	)
}

