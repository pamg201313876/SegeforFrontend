import React from 'react'
import CatalogSelect from './CatalogSelect'
import TratamientoSilviculturalApi from 'api/catalogs/TratamientoSilviculturalApi'
import { StrictFormFieldProps } from 'semantic-ui-react'

type Props = {
	name: string,
	label: string
} & StrictFormFieldProps

const api = new TratamientoSilviculturalApi()

export default function TratamientoSilviculturalSelect({
	name,
	label,
	...restProps
}: Props) {
	return (
		<CatalogSelect
			label={label}
			name={name}
			idName="tratamientoSilviculturalId"
			descName="tratamientoSilviculturalDesc"
			fetchDataFunction={api.getList}
			{...restProps}
		/>
	)
}
