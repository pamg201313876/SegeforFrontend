import React from 'react'
import { Form as SForm, FormSelectProps } from 'semantic-ui-react'
import { ControlProps } from './Form'
import { Controller, useFormContext } from "react-hook-form";

type SelectProps = ControlProps & FormSelectProps

export default function Select({
	name,
	...inputProps
}: SelectProps){

	const {control, formState: {errors}} = useFormContext()

	const render = ({ field:  {name, onBlur, onChange, value}}: any) => {
		return (
			<SForm.Select
				{...inputProps}
				name={name}
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				error={errors[name]?.message}
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
