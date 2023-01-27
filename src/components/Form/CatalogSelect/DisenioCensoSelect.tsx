import React from 'react'
import CatalogSelect from './CatalogSelect'
import DisenioCensoApi from 'api/catalogs/DisenioCensoApi'
import { StrictFormFieldProps } from 'semantic-ui-react'

type Props = {
	name: string,
	label: string
} & StrictFormFieldProps

const disenioCensoApi = new DisenioCensoApi()

export default function DisenioCensoSelect({
	name,
	label,
	...restProps
}: Props) {
	return (
		<CatalogSelect
			label={label}
			name={name}
			idName="disenioCensoId"
			descName="disenioCensoDesc"
			fetchDataFunction={disenioCensoApi.getList}
			{...restProps}
		/>
	)
}
