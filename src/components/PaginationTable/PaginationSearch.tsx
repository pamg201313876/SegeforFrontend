import React, { useState, useEffect } from 'react'
import { Select, DropdownProps, Input, Icon } from 'semantic-ui-react'
import { CTColumn } from 'components/CustomTable/CustomTableTypes'

type Props = {
	columns: CTColumn[]
	handleSearch: (columnName: string, value: String) => void
	loading: boolean
}

export default function PaginationSearch({
	columns,
	handleSearch,
	loading
}: Props) {


	const [enabled, setEnabled] = React.useState<boolean>(true)
	const [value, setValue] = React.useState<string>("")
	const [selectedColumn, setSelectedColumn] = React.useState<string>("")
	const [options, setOptions] = useState<any>([])

	const handleChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		setSelectedColumn(data.value as string)
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleSearch(selectedColumn, value)
		}
	}

	useEffect(() => {
		if (columns.length !== 0) {
			let options: any[] = []
			let i = 0;
			columns.forEach((data: CTColumn) => {
				if (data.isSearcheable != null && data.isSearcheable) {
					options.push({ key: i++, text: data.header, value: data.name })
					if (i === 1) {
						setSelectedColumn(data.name)
					}
				}
			});
			if (i === 0) {
				setEnabled(false)
			}
			setOptions(options)
		}
		console.log("entro aqui")
	}, [columns, setSelectedColumn])


	return (
		<>
			{
				enabled ?
					<>
						<Input
							loading={loading}
							icon={
								<Icon name='search' link onClick={() => handleSearch(selectedColumn, value)} />
							}
							placeholder='Buscar...'
							value={value}
							list='list'
							onKeyDown={handleKeyDown}
							onChange={(_e, { name, value }) => setValue(value)}
						/>
						<Select
							style={{ "marginLeft": "8px" }}
							labeled
							options={options}
							value={selectedColumn}

							onChange={handleChange} />
					</> : null
			}
		</>
	)
}
