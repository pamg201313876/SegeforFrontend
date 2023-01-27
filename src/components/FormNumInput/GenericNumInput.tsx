import React, { useState, useEffect } from 'react'
import { Form, Input, FormInputProps, SemanticWIDTHS } from 'semantic-ui-react'
import { isNumberOrEmpty, isOnlyDigitsOrBlank } from 'utils/UtilFunctions'

type Props = {
	onlyDigits?: boolean,
	allowNegative?: boolean
	maxValue?: number
	minValue?: number
	isInput?: boolean
} & FormInputProps

// type Props = {
// 	name: string
// 	value: any
// 	label?: string
// 	onBlur: (e: any) => void
// 	error?: string | null
// 	width?: SemanticWIDTHS
// 	required?: boolean
// 	onlyDigits?: boolean
// 	maxLength?: any
// 	disabled?: boolean
// 	placeholder?: string
// 	allowNegative?: boolean
// 	maxValue?: number
// 	minValue?: number,
// 	isInput?: boolean
// }

export default function GenericNumInput({
	onlyDigits = false,
	allowNegative = false,
	maxValue,
	minValue,
	isInput = false,
	...props
}: Props) {

	const [localValue, setLocalValue] = useState<string | number>("")

	const handleEnter = (e: any) => {
		e.key === 'Enter' && e.preventDefault()
	}

	const localOnBlur = (e: any) => {

		if (maxValue != null) {
			if (e.target.value > maxValue) {
				e.target.value = maxValue
			}
		}

		if (minValue != null) {
			if (e.target.value < minValue) {
				e.target.value = minValue
			}
		}

		props.onBlur(e)
	}

	const handleNumChange = (value: any) => {
		if (!isNumberOrEmpty(value, allowNegative)) {
			return
		}
		setLocalValue(value)
	}

	const handleOnlyDigitsChange = (value: any) => {
		if (!isOnlyDigitsOrBlank(value)) {
			return
		}
		setLocalValue(value)
	}

	const handleLocalChange = (_e: any, {value}: any) => {
		if (onlyDigits) {
			handleOnlyDigitsChange(value)
		}
		else {
			handleNumChange(value)
		}
	}

	useEffect(() => {
		if (isNaN(props.value)) {
			setLocalValue("")
		}
		else {
			setLocalValue(props.value)
		}
	}, [props.value])

	const returnInput = () => {

		if (isInput) {
			return(
				<Input
				{...props}
				value={localValue}
				onKeyPress={handleEnter}
				onChange={handleLocalChange}
				onBlur={localOnBlur}
			/>
			)
		}

		return (
				<Form.Input
					{...props}
					value={localValue}
					onKeyPress={handleEnter}
					onChange={handleLocalChange}
					onBlur={localOnBlur}
				/>
		)

	}

	return (
		returnInput()
	)
}
