import React, { useEffect, useState } from 'react'
import { Checkbox, Table } from 'semantic-ui-react'
import { roundDouble } from 'utils/UtilFunctions'

type Props = {
	registro: any,
	checkAll: boolean | null
}

export default function RegistroRow({
	registro,
	checkAll
}: Props) {

	const [checked, setChecked] = useState<boolean>(registro.amanejar)

	const handleIncluirChange = (_e: any, data: any) => {
		let checked = data.checked
		registro.amanejar = checked
		setChecked(checked)
	}
	
	useEffect(() => {
		if(checkAll != null){
			setChecked(checkAll)
			registro.amanejar = checkAll
		}
	}, [checkAll, registro])

	return (
		<Table.Row>
			<Table.Cell>{registro.numArbol}</Table.Cell>
			<Table.Cell>{registro.dap}</Table.Cell>
			<Table.Cell>{registro.altura}</Table.Cell>
			<Table.Cell>{roundDouble(registro.ab)}</Table.Cell>
			<Table.Cell>{roundDouble(registro.vol)}</Table.Cell>
			<Table.Cell>
				<Checkbox
					toggle
					onChange={handleIncluirChange}
					checked={checked}
				/>
			</Table.Cell>
		</Table.Row>
	)
}
