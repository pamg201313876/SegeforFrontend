import React from 'react'
import { FormInputProps } from 'semantic-ui-react'
import GenericNumInput from './GenericNumInput'

type Props = {
	onlyDigits?: boolean,
	allowNegative?: boolean
	maxValue?: number
	minValue?: number
} & FormInputProps

export default function NumInput({
	onlyDigits = false,
	allowNegative = false,
	maxValue,
	minValue,
	...props
}: Props) {

	return (
		<GenericNumInput
			{...props}
			onlyDigits={onlyDigits}
			maxValue={maxValue}
			allowNegative={allowNegative}
			minValue={minValue}
			isInput={true}
		/>
	)

}
