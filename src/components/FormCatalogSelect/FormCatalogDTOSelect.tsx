import { AxiosError } from 'axios'
import React from 'react'
import { SemanticWIDTHS } from 'semantic-ui-react'
import FormCatalogSelect from './FormCatalogSelect'


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
	onChange: (e: any, { name, value }: any) => void
}

const FormCatalogDTOSelect = function FormCatalogDTOSelect({
	fetchDataFunction,
	label,
	name,
	value,
	width,
	required,
	error,
	idName = "id",
	labelName,
	placeholder,
	isUpward,
	disabled,
	onChange
}: Props) {


	const handleSelectChange = (e: any, { name, object }: any) => {
		let value = object
		onChange(e, {name, value})
	}

	return (
		<FormCatalogSelect
			fetchDataFunction={fetchDataFunction}
			disabled={disabled}
			label={label}
			name={name}
			value={value ? value[idName] : 0}
			width={width}
			required={required}
			error={error}
			idName={idName}
			labelName={labelName}
			placeholder={placeholder}
			isUpward={isUpward}
			handleChange={handleSelectChange}
		/>
	)

}

export default FormCatalogDTOSelect;