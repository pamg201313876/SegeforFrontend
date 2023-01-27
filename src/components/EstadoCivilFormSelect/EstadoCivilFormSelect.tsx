import React from 'react'
import { Form } from 'semantic-ui-react'
import EstadoCivil from 'enums/EstadoCivil';

type Props = {
    value?: any,
    disabled?: boolean,
    label?: string,
    handleChange: (e: any, { name, value }: any) => void
}

export default function EstadoCivilFormSelect(props: Props) {

    const estados = [
        { key: 1, text: 'Casado (a)', value: EstadoCivil.Casado },
        { key: 2, text: 'Soltero (a)', value: EstadoCivil.Soltero },
       /* { key: 3, text: 'Divorciado', value: EstadoCivil.Divorciado },
        { key: 4, text: 'Viudo', value: EstadoCivil.Viudo },
        { key: 5, text: 'Unión Libre', value: EstadoCivil.Union_Libre }*/
    ];

    const handleChangeCallback = React.useCallback(props.handleChange, [])

	return (
        <Form.Select 
        disabled = {props.disabled}
        label={props.label}
        options={estados} 
        name='estadoCivil' 
        value={props.value} 
        onChange={handleChangeCallback} />	
	)
}
