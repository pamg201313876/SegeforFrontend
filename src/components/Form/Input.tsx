import React from 'react'
import { Form as SForm, FormInputProps } from 'semantic-ui-react'
import { ControlProps } from './Form'
import { Controller, useFormContext } from "react-hook-form";

type InputProps = ControlProps & FormInputProps

export default function Input({
	name,
	...inputProps
}: InputProps) {

	const {control, formState: {errors}} = useFormContext()

	const render = ({ field:  {name, onBlur, onChange, value}}: any) => {
		return (
			<SForm.Input
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