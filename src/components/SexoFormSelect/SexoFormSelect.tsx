import React from 'react'
import { Form } from 'semantic-ui-react'
import Sexo from 'enums/Sexo';

type Props = {
    value?: any,
    disabled?: boolean,
    label?: string
    handleChange: (e: any, { name, value }: any) => void
}

export default function SexoFormSelect(props: Props) {

    const sexos = [
        { key: 1, text: 'Hombre', value: Sexo.Hombre },
        { key: 2, text: 'Mujer', value: Sexo.Mujer },
    ];

    const handleChangeCallback = React.useCallback(props.handleChange, [])

	return (
        <Form.Select 
        disabled={props.disabled}
        label={props.label != undefined ? props.label : "Sexo"}
        options={sexos} 
        name='sexo' 
        value={props.value} 
        onChange={handleChangeCallback} />	
	)
}
