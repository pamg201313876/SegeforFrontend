import React from 'react'
import { Form, TextArea as STextArea, TextAreaProps } from 'semantic-ui-react'

export default function TextArea({
	...props
}: TextAreaProps) {
	return (
		<Form>
			<STextArea {...props}/>
		</Form>
	)
}
