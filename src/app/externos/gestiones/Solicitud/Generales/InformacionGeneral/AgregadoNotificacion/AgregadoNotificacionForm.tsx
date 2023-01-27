import DepartamentoMunicipioSelect from 'components/DepartamentoMunicipioSelect';
import TipoNotificacionSelect from 'components/TipoNotificacionSelect/TipoNotificacionSelect';
import React, { useState } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { NotificacionData } from './AgregadoNotificacion';


type Props = {
    setFormData: Function
    formData: NotificacionData
}

export default function AgregadoNotificacionForm(props: Props) {


    const [label, setLabel] = useState<string>("");
    const [actual, setActual] = useState<any>({});
    const [numericoActual, setNumericoActual] = useState<number>(0);

    /**
     * Función para el manejo de Datos del DTO
     */
    const handleChange = (e: any, { name, value }: any) => {

        //console.log(value)
        value = (e.target.type === 'number') ? parseInt(value) : value
        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }

        props.setFormData((oldValues: any) => ({
            ...oldValues,
            [name]: value,
        }));

        //console.log(props.formData)
    }

    const handleChangeMunicipioNotificacion = (e: any, { name, value, object }: any) => {

        props.setFormData((oldValues: any) => ({
            ...oldValues,
            'municipioId': value,
        }));

        props.setFormData((oldValues: any) => ({
            ...oldValues,
            'tcMunicipio': object,
        }));

        props.setFormData((oldValues: any) => ({
            ...oldValues,
            'departamentoDesc': object  &&  object.tcDepartamento ?  object.tcDepartamento.departamentoDesc : "",
        }));

    }
    
    const handleChangeTipoNotificacionSelect = (e: any, { name, value, object }: any) => {
        setActual(value)
        setNumericoActual(value.tipoNotificacionId)
        props.setFormData((oldValues: any) => ({
            ...oldValues,
            'tcTipoNotificacion': value,
        }));
    }


    const renderDireccion = () => {
        return (<>
            <Form.Group widths='equal'>
                <Form.Input
                    label='Dirección/Aldea/Caserío/Cantón'
                    name='notificacionGestionDesc'
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <DepartamentoMunicipioSelect
                    municipioValue={props.formData.tcMunicipio}
                    onChange={handleChangeMunicipioNotificacion}
                    departamentoLabel="Departamento/estado"
                    municipioLabel="Municipio/provincia"
                    municipioName="tcMunicipio"
                    upward={false} />
            </Form.Group>
        </>)
    }

    const renderOtro = () => {
        return (<>
            <Form.Group widths='equal'>
                <Form.Input
                    label={actual.tipoNotificacionDesc}
                    name='notificacionGestionDesc'
                    onChange={handleChange}
                />
            </Form.Group>
        </>)
    }

    const renderOpciones = () => {

        if (numericoActual === 0) {
            return null
        }
        if (numericoActual === 1 || numericoActual === 2) {
            return renderDireccion()
        } else {
            return renderOtro()
        }

    }

    return (
        <Form>
            <Header size="medium">
                Información de la Notificación
			</Header>
            <Form.Group widths='equal'>
                <TipoNotificacionSelect
                    onChange={handleChangeTipoNotificacionSelect}
                    value={actual}
                    label={"Tipo de Notificación"}
                />
            </Form.Group>
            { renderOpciones()}
        </Form>
    )
}