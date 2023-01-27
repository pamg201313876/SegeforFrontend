import { tareaApi } from 'api';
import { subregionalApi } from 'api/latifoliado';
import { Form, FormAdditionalButton, Input, NumInput } from 'components/Form';
import React, { useContext, useState } from 'react';
import { toLocalDateIsoString } from 'utils/UtilFunctions';
import { object, requiredNumber, requiredString, SchemaOf, string } from 'components/Yup'
import { AppDataContext } from 'app/App';


type Props = {
    tareaData: any
    closeActivity: () => void
}

type Cedula = {
    codigo: number
    fundamento: number
}

const validationSchema: SchemaOf<Cedula> = object({
    codigo: requiredNumber(),
    fundamento: requiredNumber()
})


export default function CedulaNotificacion({
    tareaData,
    closeActivity,
}: Props) {

    const onSuccess = () => {
        subregionalApi.descargarCedulaPreview(tareaData, () => null, () => null)
        subregionalApi.descargarNotificacionPreview(tareaData, () => null, () => null)
        closeActivity()
    }

    const setTareaData = (data: Cedula) => {
        tareaData.ttSeguimientoTarea = {
            codigo: data.codigo,
            fechaProvidencia: toLocalDateIsoString(new Date().toLocaleDateString('en-CA')),
            fundamento: data.fundamento
        }
    }

    const handleSubmit = (data: Cedula, onResponse: (res: any) => void, onError: (error: any) => void) => {
        setTareaData(data)
        tareaApi.NotificarResolucionTarea(tareaData, onResponse, onError);
    }

    const getPDFPreview = (_id: any, data: Cedula, onResponse: (res: any) => void, onError: (error: any) => void) => {
        if (tareaData == null) {
            return
        }
        setTareaData(data)
        subregionalApi.descargarCedulaPreview(tareaData, onResponse, onError)
        subregionalApi.descargarNotificacionPreview(tareaData, onResponse, onError)
    }

    const buttons: FormAdditionalButton[] = [
        {
            label: "Vista previa",
            id: "preview",
            color: "yellow"
        }
    ]

    return (
        <Form
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onButtonClick={getPDFPreview}
            buttons={buttons}
            submitButtonIcon="send"
            submitButtonLabel="Generar"
            onSuccess={onSuccess}
        >
            <NumInput
                label="No. Oficio (Aviso)"
                placeholder="Aviso"
                name="codigo"
                width="4"
            />

            <NumInput
                label="No. Oficio (Póliza)"
                placeholder="Póliza"
                name="fundamento"
                width="4"
            />
        </Form>
    )
}
