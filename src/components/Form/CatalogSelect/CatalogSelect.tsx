import React from 'react'
import { DropdownItemProps, Form as SForm, StrictFormFieldProps } from 'semantic-ui-react'
import { ControlProps } from '../Form'
import { Controller, useFormContext } from "react-hook-form";
import { AxiosError } from 'axios';
import useFetchCatalog from 'hooks/useFetchCatalog'

type SelectProps = {
	fetchDataFunction: (
		onResponse: (data: any[]) => void,
		onError: (error: AxiosError) => void
	) => void,
	placeholder?: string,
	descName: string,
	idName: string,
	search?: boolean | ((options: DropdownItemProps[], value: string) => DropdownItemProps[]),
	customCatalog?: (rows: any[]) => any[]
} & ControlProps & StrictFormFieldProps

export default function CatalogSelect({
	fetchDataFunction,
	placeholder = "Seleccionar opción...",
	descName,
	idName,
	name,
	search,
	customCatalog,
	...inputProps
}: SelectProps){

	const {control, formState: {errors}} = useFormContext()
	const { catalog } = useFetchCatalog(fetchDataFunction, descName, idName, customCatalog)

	const handleSelectChange = (value: any, onChange: (value: any) => void) => {
		let option : any = catalog.find((x: any) => x.value === value) //obteniendo el objeto completo
		let object = option.object
		onChange(object)
	}

	const render = ({ field:  {name, onBlur, onChange, value}}: any) => {
		return (
			<SForm.Select
				{...inputProps}
				search={search}
				options={catalog ? catalog : []}
				name={name}
				onBlur={onBlur}
				onChange={(_e: any, { value }: any) => handleSelectChange(value, onChange)}
				value={value ? value[idName] : null}
				error={errors[name]?.message}
				placeholder={placeholder}
				selectOnBlur={false}
			/>
		)
	}

	return (
		<Controller
			name={name}
			control={control}
			render={render}
		/>

	)
}
