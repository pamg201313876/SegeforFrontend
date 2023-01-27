import React, {useState, useEffect} from 'react'
import { Checkbox, Table } from 'semantic-ui-react'

type Props = {
	name: string,
	checked: boolean,
	onCheckChange: (name: string, checked: boolean) => void
}

export default function CheckboxCell({
	name,
	checked: propChecked,
	onCheckChange
}: Props) {

	const [checked, setChecked] = useState<boolean>(false)

	const handleChange = (_e: any, { name, checked }: any) => {
		setChecked(checked)
		onCheckChange(name, checked)
	}

	useEffect(() => {
		setChecked(propChecked)
	}, [propChecked])

	return (
		<Table.Cell>
			<Checkbox onClick={handleChange} name={name} checked={checked}/> 
		</Table.Cell>
	)
}
