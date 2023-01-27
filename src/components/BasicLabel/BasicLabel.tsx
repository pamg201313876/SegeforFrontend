import React from 'react'
import { Header, Label, LabelProps } from 'semantic-ui-react'

type Props = {
	label: string
	labelSize?: "small" | "tiny" | "medium" | "large" | "huge"
	value?: any
	valueSize?: "small" | "tiny" | "medium" | "large" | "huge"
} & LabelProps

export default function BasicLabel({
	label,
	labelSize="small",
	value,
	valueSize="large",
	...restProps
}: Props) {
	return (
		<Header size={labelSize}>
			{label}
			{value != null
				? <Label size={valueSize} {...restProps}>{value}</Label>
				: null }
		</Header>
	)
}
