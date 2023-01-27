import React from 'react'
import { Form as SForm, FormTextAreaProps } from 'semantic-ui-react'
import { ControlProps } from './Form'
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = ControlProps & FormTextAreaProps

export default function TextArea({
	name,
	...inputProps
}: TextAreaProps){

	const {control, formState: {errors}} = useFormContext()

	const render = ({ field:  {name, onBlur, onChange, value}}: any) => {
		return (
			<SForm.TextArea
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
