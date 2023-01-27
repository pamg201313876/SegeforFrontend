import React from 'react'
import { Form as SForm, FormInputProps } from 'semantic-ui-react'
import { ControlProps } from './Form'
import { Controller,useFormContext } from "react-hook-form";
import { isNumberOrEmpty, isOnlyDigitsOrBlank } from 'utils/UtilFunctions';

type NumInputProps = {
	onlyDigits?: boolean,
	allowNegative?: boolean
} & ControlProps & FormInputProps

export default function NumInput ({
	name,
	onlyDigits = false,
	allowNegative = false,
	...inputProps
}: NumInputProps){

	const {control, formState: {errors}} = useFormContext()

	// const handleNumChange = (value: any): boolean => {
	// 	if (!isNumberOrEmpty(value, allowNegative)) {
	// 		return false
	// 	}
	// 	return true
	// }

	// const handleOnlyDigitsChange = (value: any) : boolean => {
	// 	if (!isOnlyDigitsOrBlank(value)) {
	// 		return false
	// 	}
	// 	return true
	// }

	const handleLocalChange = (value: any, onChange: (value: any) => void) => {
		if (onlyDigits) {
			if(isOnlyDigitsOrBlank(value)){
				onChange(value)
			}
		}
		else {
			if(isNumberOrEmpty(value, allowNegative)){
				onChange(value)
			}
		}
	}

	const render = ({ field:  {name, onBlur, onChange, value}}: any) => {
		return (
			<SForm.Input
				{...inputProps}
				name={name}
				onBlur={onBlur}
				value={value}
				onChange={(_e: any, { value }: any) => handleLocalChange(value, onChange)}
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