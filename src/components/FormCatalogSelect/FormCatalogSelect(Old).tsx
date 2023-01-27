import React from 'react'
import { Form, SemanticWIDTHS } from 'semantic-ui-react'

type Props = {
	dataSource: string
	label?: String
	name: String
	value: any
	width?: SemanticWIDTHS
	required?: boolean
	error?: string | null
	valueName?: string
	isUpward?: boolean 
	useFirstValueAsDefault?: boolean
	disabled?: boolean
	handleChange: (e: any, { name, value }: any) => void
}

const FormCatalogSelect = function FormCatalogSelect({
	dataSource,
	label,
	name,
	value,
	width,
	required,
	error,
	valueName,
	isUpward,
	disabled,
	useFirstValueAsDefault,
	handleChange
} : Props ) {

	const catalog : any[] = []//useFetchCatalog(dataSource, valueName)
	const handleChangeCallback = React.useCallback(handleChange, [])

	React.useEffect(() => {
		if(catalog != null && catalog.length !== 0 && useFirstValueAsDefault === true){
			let value = catalog[0].value
			handleChangeCallback(null, {name, value})
		}
	}, [catalog, name, handleChangeCallback, useFirstValueAsDefault])
	
	return (
		<Form.Select 
			search
			upward={isUpward}
			options={catalog} 
			label={label} 
			name={name} 
			value={value}
			width={width}
			onChange={handleChangeCallback}
			required={required} 
			error={error}
		    disabled = {disabled}
		/>
	)

	
}

export default FormCatalogSelect;