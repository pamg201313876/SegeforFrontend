import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { tareaApi } from 'api';
import { juridicoApi } from 'api/latifoliado';
import DictamenJuridico from './DictamenJuridico';
import SeguimientoTareaDTO, { createNew } from 'dto/tarea/SeguimientoTareaDTO';
import DictamenJuridicoFormError, { newDictamenJuridicoFormError, validateForm } from './DictamenJuridicoFormError';


type Props = {
    tareaData: any
    closeActivity: () => void
}

export default function ExpedienteDictamenJuridico({
    tareaData,
    closeActivity
}: Props) {

    const [formData, setFormData] = useState<SeguimientoTareaDTO>(createNew());
    const [formError, setFormError] = useState<DictamenJuridicoFormError>(newDictamenJuridicoFormError());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewLoading, setPreviewLoading] = useState(false)

    useEffect(() => {
        setFormData(createNew());
        setFormError(newDictamenJuridicoFormError());
    }, [tareaData])

    const onSave = () => {

        if (tareaData.esEnmienda === 1) {
            tareaData.ttSeguimientoTarea = formData;
        }

        else {
            console.log(formData)
            let formError = validateForm(formData)
            setFormError(formError)

            if (!formError.isError) {
                tareaData.aprobado = formData.aprobado;
                tareaData.ttSeguimientoTarea = formData;
                tareaData.observaciones = formData.observaciones;
            }
            else {
                return
            }
        }

        const HandleResponse = (response: any) => {
            setIsLoading(false);
            closeActivity();
        }

        const HandleError = (error: any) => {
            setIsLoading(false);
            alert(error);
        }

        setIsLoading(true);
        tareaApi.OpinionJuridica(tareaData, HandleResponse, HandleError);
    }

    const onPreview = () => {

        const HandleResponsePreview = (response: any) => {
            console.log(response);
            setPreviewLoading(false);
        }

        const HandleError = (error: any) => {
            console.log('Error', error);
            setPreviewLoading(false);
            alert(error);
        }

        tareaData.aprobado = formData.aprobado;
        tareaData.ttSeguimientoTarea = formData;
        tareaData.observaciones = formData.observaciones;

        setPreviewLoading(true)
        if (tareaData.esEnmienda === 1) {
            juridicoApi.descargarEnmiendaJuridicaPreview(tareaData, HandleResponsePreview, HandleError)
        }
        else {
            tareaApi.OpinionJuridicaPreview(tareaData, 'juridico', HandleResponsePreview, HandleError);
        }
    }

    const renderButtons = () => {
        return (
            <div style={{ marginTop: "16px" }}>
                <Button floated="right" loading={isLoading} primary onClick={onSave}>
                    Guardar
                </Button>
                <Button floated="right" loading={previewLoading} color={'yellow'} onClick={onPreview}>
                    Vista Previa
                </Button>
            </div>)
    }

    return (
        <>
            {/* <FormModal
                closeModal={setClose}
                open={open}
                onSave={onSave}
                header={'Dictamen Jurídico Expediente ' + tareaData.ttGestion?.expediente}
                scrollable={true}
                loading={isLoading}
                aditionalButtons={addPreviewButton}
            > */}
            <DictamenJuridico
                tareaData={tareaData}
                formError={formError}
                setFormData={setFormData} />
            {renderButtons()}
            {/* </FormModal> */}
        </>
    )
}
