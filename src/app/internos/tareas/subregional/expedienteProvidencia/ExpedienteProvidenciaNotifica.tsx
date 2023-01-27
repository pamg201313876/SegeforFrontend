import TareaApi from 'api/TareaApi';
import { AppDataContext } from 'app/App';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Icon, Step } from 'semantic-ui-react';
import { isBlankString } from 'utils/UtilFunctions';
import AdmitirExpediente from './AdmitirExpediente';
import ProvidenciaTarea from './ProvidenciaTarea';


type Props = {
    ttTarea: any
    closeActivity: () => void
}

const tareaApi = new TareaApi();

enum steps {
    ADMISION_EXPEDIENTE,
    PROVIDENCIA,
}

export default function ExpedienteProvidenciaNotifica({
    ttTarea: tareaData,
    closeActivity
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [step, setStep] = useState(steps.ADMISION_EXPEDIENTE)
    const [numeroResolucion, setNumeroresolucion] = React.useState("");
    const [personaJuridica, setPersonaJuridica] = useState<any>({})
    const [personaTecnica, setPersonaTecnica] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [errorNumResolucion, setErrorNumResolucion] = useState<string | null>(null)

    const nextStep = () => {

        if (loading) {
            return
        }

        switch (step) {

            case steps.ADMISION_EXPEDIENTE:
                onSaveResolucion()
                break;

            case steps.PROVIDENCIA:
                onSaveProvidencia()
                break;

        }

    }


    const onSaveResolucion = () => {

        if (isBlankString(numeroResolucion)) {
            setErrorNumResolucion("Ingrese un número de resolución válido")
            return
        }

        setErrorNumResolucion(null)

        tareaData.ttSeguimientoTarea = {
            seguimientoTareaId: 0,
            numeroResolucion: numeroResolucion,
            fechaAdmision: new Date().toLocaleDateString('en-CA')
        }

        const HandleResponse = (response: any) => {
            if (response.status === "OK") {
                if (step === steps.ADMISION_EXPEDIENTE) {
                    let preStep = step + 1;
                    setStep(preStep)
                }
            }
            else {
                appDataContext.errorToast(response.message)
            }
            setLoading(false)
        }

        const HandleError = (error: any) => {
            setLoading(false)
            console.error(error)
            appDataContext.errorToast("Error al envíar la información. Intente más tarde.")
        }

        setLoading(true)

        tareaApi.AdmitirExpediente(tareaData, HandleResponse, HandleError);
    }



    const onSaveProvidencia = () => {

        tareaData.tcPersonaJuridico = personaJuridica;
        tareaData.tcPersonaTraslado = personaTecnica;

        const HandleResponse = (response: any) => {
            if (response.status === "OK") {
                closeActivity()
            }
            else {
                appDataContext.errorToast(response.message)
            }
        }

        const HandleError = (error: any) => {
            appDataContext.errorToast("Error al envíar la información. Intente más tarde.")
            console.error(error)
        }

        tareaApi.Providencia(tareaData, HandleResponse, HandleError);

    }

    // const handleClose = () => {
    //     setClose()
    // }

    const renderHeader = () => {
        return (
            <Step.Group attached="top" widths={8} size='mini'  >
                <Step active={step === steps.ADMISION_EXPEDIENTE ? true : false} completed={step === steps.PROVIDENCIA}    >
                    <Icon name='clipboard check' />
                    <Step.Content>
                        <Step.Title>Admisión de Expediente</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={step === steps.PROVIDENCIA ? true : false}  >
                    <Icon name='list' />
                    <Step.Content>
                        <Step.Title>Realizar Providencia</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        )
    }

    const renderButtons = () => {
        return (
            <Button floated="right" primary icon labelPosition="right" onClick={nextStep} loading={loading}>
                {step === steps.ADMISION_EXPEDIENTE
                    ?
                    <>
                        <Icon name='arrow right' />
                        Continuar
                    </>
                    : <>
                        <Icon name='flag checkered' ></Icon>
                        Finalizar Tarea
                    </>}
            </Button>
        )
    }

    useEffect(() => {
        if (tareaData?.ttSeguimientoTarea != null) {
            setStep(steps.PROVIDENCIA)
        }
    }, [tareaData])

    return (
        <>
            {
                step === steps.ADMISION_EXPEDIENTE
                    ? <AdmitirExpediente error={errorNumResolucion} setNumeroResolucion={setNumeroresolucion} />
                    : <ProvidenciaTarea setPersonaJuridica={setPersonaJuridica} personaTecnica={personaTecnica} personaJuridica={personaJuridica} setPersonaTecnica={setPersonaTecnica} tareaData={tareaData} />
            }
            {renderButtons()}
        </>
    )
}
