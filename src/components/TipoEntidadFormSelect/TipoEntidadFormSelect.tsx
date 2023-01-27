import React from 'react';
import { Form } from 'semantic-ui-react';

type Props = {
    value?: any,
    disabled?: boolean,
    error? : any,
    handleChange: (e: any, { name, value }: any) => void
}

export default function TipoEntidadFormSelect(props: Props) {

    const tipos = [
        { key: 1, text: 'Empresas Privadas', value: "empresa_privada" },
        { key: 2, text: 'Asociaciones, Comités, Fundaciones, Municipalidades', value: "asociaciones" },
        { key: 3, text: 'Cooperativas', value: "cooperativas" },        
    ];

    const handleChangeCallback = React.useCallback(props.handleChange, [])

	return (
        <Form.Select 
        disabled={props.disabled}
        options={tipos} 
        error={props.error}
        name='tipoEntidad' 
        value={props.value} 
        onChange={handleChangeCallback} />	
	)
}
