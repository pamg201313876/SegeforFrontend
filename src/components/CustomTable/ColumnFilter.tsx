import React from 'react'
import { Input, Icon } from 'semantic-ui-react'

type Props = {
	name: string
	search: () => void
	searchData: any
	setSearchData: (name:string, value: string) => void
}

export default function ColumnFilter({
	name,
	search,
	searchData,
	setSearchData
}: Props) {

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			search()
		}
	}

	return (
		<Input
			fluid
			icon={
				<Icon name='search' link onClick={search} />
			}
			value={searchData[name]}
			onKeyDown={handleKeyDown}
			onChange={(_e, { value }) => setSearchData(name, value)}
		/>
	)
}
