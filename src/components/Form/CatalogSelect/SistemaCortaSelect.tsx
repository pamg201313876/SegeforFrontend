import React from 'react'
import CatalogSelect from './CatalogSelect'
import SistemaCortaApi from 'api/catalogs/SistemaCortaApi'
import { StrictFormFieldProps } from 'semantic-ui-react'

type Props = {
	name: string,
	label: string
} & StrictFormFieldProps

const api = new SistemaCortaApi()

export default function SistemaCortaSelect({
	name,
	label,
	...restProps
}: Props) {
	return (
		<CatalogSelect
			label={label}
			name={name}
			idName="sistemaCortaId"
			descName="sistemaCortaDesc"
			fetchDataFunction={api.getList}
			{...restProps}
		/>
	)
}
