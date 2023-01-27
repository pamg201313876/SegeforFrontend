import React from 'react'
import useFetchCatalog from 'hooks/useFetchCatalog'
import { Form, SemanticWIDTHS } from 'semantic-ui-react'
import { AxiosError } from 'axios'


type Props = {
	fetchDataFunction: (
		onResponse: (data: any[]) => void,
		onError: (error: AxiosError) => void
	) => void
	label: String
	name: String
	value: any
	width?: SemanticWIDTHS
	required?: boolean
	error?: string | null
	idName?: string,
	labelName?: string
	placeholder?: string
	isUpward?: boolean 
	disabled?: boolean
	handleChange: (e: any, { name, value, object }: any) => void
}

const FormCatalogSelect = function FormCatalogSelect({
	fetchDataFunction,
	label,
	name,
	value,
	width,
	required,
	error,
	idName,
	labelName,
	placeholder,
	isUpward,
	disabled,
	handleChange
} : Props ) {

	const { catalog } = useFetchCatalog(fetchDataFunction, labelName, idName)

	const handleSelectChange = (e: any, {name, value}: any) => {
		let option : any = catalog.find((x: any) => x.value === value) //obteniendo el objeto completo
		let object = option.object
		handleChange(e, {name, value, object})
	}

	return (
		<Form.Select 
			search
			upward={isUpward}
			disabled={disabled}
			options={catalog ? catalog : []}
			label={label} 
			name={name} 
			value={value}
			width={width}
			placeholder={placeholder}
			selectOnNavigation={false}
			onChange={handleSelectChange}
			required={required} 
			error={error}
			selectOnBlur={false}
		/>
	)

}

export default FormCatalogSelect;