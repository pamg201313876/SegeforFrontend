import EnmiendasTable, { Enmienda } from 'app/internos/tareas/generales/EnmiendasTable';
import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import DictamenSubregionalFormError from './DictamenSubregionalFormError';

type Props = {
    tareaData: any
    setFormData: Function,
    formError: DictamenSubregionalFormError
}
export default function DictamenSubRegional({
    tareaData,
    setFormData,
    formError
}: Props) {

    const [mostrarExpedientes, setMostrarExpedientes] = useState<boolean>(false);
    const [enmiendas, setEnmiendas] = useState<Enmienda[]>([]);
    const [aprobado, setAprobado] = useState<boolean>(true);
    const [agregarEnmiendas, setAgregarEnmiendas] = useState<boolean>(false);

    useEffect(() => {
        if (tareaData) {
            tareaData.ttSeguimientoTarea = {};
        }
    }, [tareaData])


    const showEnmiendaForm = (e: any, data: any) => {
        toogleEnmienda(data.checked)
    }

    const toogleEnmienda = (flag: boolean) => {
        setAgregarEnmiendas(flag)

        if (flag === false) {
            let temporalArray: Enmienda[] = [];
            setEnmiendas(temporalArray);
        }
        else {
            toogleAprobado(false)
        }

        setFormData((oldValues: any) => ({
            ...oldValues,
            'agregarEnmienda': flag,
        }));

        setMostrarExpedientes(flag);
    }

    const handleAprobadoForm = (e: any, data: any) => {
        toogleAprobado(data.checked)
    }

    const toogleAprobado = (flag: boolean) => {
        setAprobado(flag)

        if (flag) toogleEnmienda(false)

        setFormData((oldValues: any) => ({
            ...oldValues,
            'aprobado': flag ? 1 : 0,
        }));
    }

    const handleChangeSeguimiento = (e: any, { name, value }: any) => {
        value = (e.target.type === 'number') ? parseInt(value) : value
        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }

        setFormData((oldValues: any) => ({
            ...oldValues,
            [name]: value,
        }));
    }

    useEffect(() => {
        setFormData((oldValues: any) => ({
            ...oldValues,
            'enmienda': JSON.stringify(enmiendas),
        }));
    }, [enmiendas])

    return (
        <>
            <Form error={formError.isError}>
                <Form.Input
                    width="4"
                    label={mostrarExpedientes ? "No. de oficio" : "No. de dictamen"}
                    placeholder={mostrarExpedientes ? "Número de oficio" : "Número de dictamen"}
                    name='numeroResolucion'
                    onChange={handleChangeSeguimiento}
                    error={formError ? formError.numeroResolucion : null}
                />
                <Form.Checkbox name='aprobado' toggle label='Aprobar' checked={aprobado} onChange={handleAprobadoForm} />
                <Form.Checkbox name='agregarEnmienda' toggle label='¿Agregar Enmienda(s)?' checked={agregarEnmiendas} onChange={showEnmiendaForm} />
            </Form>
            {mostrarExpedientes && <EnmiendasTable enmiendas={enmiendas} setEnmiendas={setEnmiendas} />}
        </>
    )
}