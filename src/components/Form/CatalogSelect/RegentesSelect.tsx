import React from 'react'
import CatalogSelect from './CatalogSelect'
import BridgeApi from 'api/BridgeApi'
import { Header, StrictFormFieldProps } from 'semantic-ui-react'

type Props = {
	name: string,
	label: string
} & StrictFormFieldProps

const api = new BridgeApi()

export default function RegentesSelect({
	name,
	label,
	...restProps
}: Props) {

	const generateCatalog = (rows: any[]): any[] => {
		if (rows && rows.length !== 0) {
			let myCatalog = rows.map((data: any, i) => (
				{
					key: i,
					text: data["nombre"],
					object: data,
					value: data["profesionalId"],
					content: (
						<Header>
							{data["nombre"]}
							<Header.Subheader>
								<div>NIT: {data["nit"]}</div>
								<div>Profesión: {data["profesion"]}</div>
								<div>{data["noCedula"]}</div>
							</Header.Subheader>
						</Header>
					)
				}
			))
			return myCatalog
		}
		return []
	}

	return (
		<CatalogSelect
			search
			label={label}
			name={name}
			idName="profesionalId"
			descName="nombre"
			fetchDataFunction={api.getListaRegentes}
			customCatalog={generateCatalog}
			{...restProps}
		/>
	)
}
