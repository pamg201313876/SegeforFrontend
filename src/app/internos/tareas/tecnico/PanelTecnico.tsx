import DictamenTecnicoApi from 'api/latifoliado/DictamenTecnicoApi';
import TareaApi from 'api/TareaApi';
import { AppDataContext } from 'app/App';
import { DownloadButton } from 'components/Downloads';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Icon, Step } from 'semantic-ui-react';
import AntecedentesConclusiones from './AntecedentesConclusiones';
import CompromisoRepoblacion from './CompromisoRepoblacion';
import DictamenTecnico from './DictamenTecnico';
import EvaluacionCampo from './EvaluacionCampo';
import FinalizarDictamen from './FinalizarDictamen';
import InformacionGeneral from './InformacionGeneral';
import Recomendaciones from './Recomendaciones';
import ValorMadera from './ValorMadera';


type Props = {
    tareaData: any
    setTareaData: (x: any) => void
    setClose: () => void
}

enum steps {
    EVALUACION_CAMPO,
    INFORMACION_GENERAL,
    ANTECEDENTES,
    CONCLUSIONES,
    DICTAMEN_TECNICO,
    COMPROMISO_REPOBLACION,
    VALOR_MADERA,
    RECOMENDACIONES,
    FINALIZAR
}

const tareaApi = new TareaApi();
const dictamenTecnicoApi = new DictamenTecnicoApi()

export default function PanelTecnico({
    tareaData,
    setClose,
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const nextButtonRef = useRef<() => boolean>(() => true)
    const [lastStep, setLastStep] = useState<steps>(steps.EVALUACION_CAMPO)
    const [step, setStep] = useState(steps.EVALUACION_CAMPO)
    const [isPreviousDisabled, setPreviousDisabled] = useState(true)
    const [isNextDisabled, setNextDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const nextStep = () => {

        if (nextButtonRef.current != null && nextButtonRef.current()) {
            actualizarTecnico(step + 2)
        }

    }

    const previousStep = () => {
        let preStep = step - 1;
        setStep(preStep)
    }

    const actualizarTecnico = (myTab: number) => {

        tareaData.ttSeguimientoTarea.tab = myTab

        const HandleResponse = (response: any) => {
            setLoading(false)
            if (response.status == "OK") {
                nextButtonRef.current = () => { return true }
                let nextStep = step + 1
                setStep(nextStep)
            }
            else {
                appDataContext.errorToast(response.message)
            }
        }

        const HandleError = (error: any) => {
            setLoading(false)
            console.log("error")
            console.log(error)
        }

        setLoading(true)
        tareaData.esEnmienda = 0;
        tareaApi.ActualizarTecnico(tareaData, HandleResponse, HandleError);
    }

    useEffect(() => {
        if (tareaData !== undefined) {
            if (tareaData.ttSeguimientoTarea === null || tareaData.ttSeguimientoTarea === undefined) {
                nextButtonRef.current = () => { return true }
                setStep(steps.EVALUACION_CAMPO)
                setLastStep(steps.EVALUACION_CAMPO)
            } else {
                nextButtonRef.current = () => { return true }
                setStep(tareaData.ttSeguimientoTarea.tab - 1)
                setLastStep(tareaData.ttSeguimientoTarea.tab - 1)
            }
        }
    }, [tareaData])

    useEffect(() => {
        setNextDisabled(false)
        setPreviousDisabled(false)
        if (step === steps.EVALUACION_CAMPO) {
            setPreviousDisabled(true)
        }
        if (step === steps.FINALIZAR) {
            setNextDisabled(true)
        }

    }, [step])

    useEffect(() => {
        if (lastStep < step) {
            setLastStep(step)
        }
    }, [step, lastStep])

    const renderHeader = () => {
        return (
            <Step.Group widths={8} size='tiny'  >
                <Step active={step === steps.EVALUACION_CAMPO ? true : false} onClick={() => setStep(steps.EVALUACION_CAMPO)}   >
                    <Icon name='clipboard check' />
                    <Step.Content>
                        <Step.Title>Evaluación de Campo</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    disabled={tareaData.ttSeguimientoTarea == null || lastStep < steps.INFORMACION_GENERAL}
                    active={step === steps.INFORMACION_GENERAL ? true : false} onClick={() => setStep(steps.INFORMACION_GENERAL)}    >
                    <Icon name='info' />
                    <Step.Content>
                        <Step.Title>Información General</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    disabled={tareaData.ttSeguimientoTarea == null || lastStep < steps.ANTECEDENTES}
                    active={step === steps.ANTECEDENTES ? true : false} onClick={() => setStep(steps.ANTECEDENTES)}  >
                    <Icon name='list' />
                    <Step.Content>
                        <Step.Title>Antecedentes</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    disabled={tareaData.ttSeguimientoTarea == null || lastStep < steps.CONCLUSIONES}
                    active={step === steps.CONCLUSIONES ? true : false} onClick={() => setStep(steps.CONCLUSIONES)} >
                    <Icon name='list ol' />
                    <Step.Content>
                        <Step.Title>Conclusiones</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    disabled={tareaData.ttSeguimientoTarea == null || lastStep < steps.DICTAMEN_TECNICO}
                    active={step === steps.DICTAMEN_TECNICO ? true : false} onClick={() => setStep(steps.DICTAMEN_TECNICO)}>
                    <Icon name='book' />
                    <Step.Content>
                        <Step.Title>Dictamen Técnico</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    disabled={tareaData.ttSeguimientoTarea == null || lastStep < steps.COMPROMISO_REPOBLACION}
                    active={step === steps.COMPROMISO_REPOBLACION ? true : false} onClick={() => setStep(steps.COMPROMISO_REPOBLACION)}>
                    <Icon name='archive' />
                    <Step.Content>
                        <Step.Title>Compromiso de Repoblación</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    disabled={tareaData.ttSeguimientoTarea == null || lastStep < steps.VALOR_MADERA}
                    active={step === steps.VALOR_MADERA ? true : false} onClick={() => setStep(steps.VALOR_MADERA)} >
                    <Icon name='dollar' />
                    <Step.Content>
                        <Step.Title>Valor Madera</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    disabled={tareaData.ttSeguimientoTarea == null || lastStep < steps.RECOMENDACIONES}
                    active={step === steps.RECOMENDACIONES ? true : false} onClick={() => setStep(steps.RECOMENDACIONES)}>
                    <Icon name='list ul' />
                    <Step.Content>
                        <Step.Title>Recomendaciones</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>

        )
    }

    const renderButtons = () => {
        return (
            <>
                <DownloadButton
                    disabled={tareaData.ttSeguimientoTarea == null}
                    downloadFunction={(onResponse: any, onError: any) =>
                        dictamenTecnicoApi.descargarDictamen("DictamenTecnico.pdf", tareaData.tareaId, onResponse, onError)}
                    icon='file'
                    content="Vista previa"
                    color="yellow" />
                <Button floated="right" loading={loading} disabled={isNextDisabled} labelPosition="right" content="Guardar y continuar" primary icon='arrow right' onClick={nextStep} />
                <Button floated="right" disabled={isPreviousDisabled} primary icon='arrow left' onClick={previousStep} />

            </>
        )
    }


    return (
        <>
            {renderHeader()}
            < >
                {
                    step === steps.EVALUACION_CAMPO ?
                        <EvaluacionCampo nextButtonRef={nextButtonRef} tareaData={tareaData} setClose={setClose} />
                        : null
                }

                {
                    step === steps.INFORMACION_GENERAL ?
                        <InformacionGeneral tareaData={tareaData} />
                        : null
                }

                {
                    step === steps.ANTECEDENTES ?
                        <AntecedentesConclusiones tipo={1} nextButtonRef={nextButtonRef} tareaData={tareaData} />
                        : null
                }

                {
                    step === steps.CONCLUSIONES ?
                        <AntecedentesConclusiones tipo={2} nextButtonRef={nextButtonRef} tareaData={tareaData} />
                        : null
                }

                {
                    step === steps.DICTAMEN_TECNICO ?
                        <DictamenTecnico tareaData={tareaData} />
                        : null
                }


                {
                    step === steps.COMPROMISO_REPOBLACION ?
                        <CompromisoRepoblacion tareaData={tareaData} />
                        : null
                }

                {
                    step === steps.VALOR_MADERA ?
                        <ValorMadera tareaData={tareaData} />
                        : null
                }
                {
                    step === steps.RECOMENDACIONES ?
                        <Recomendaciones nextButtonRef={nextButtonRef} tareaData={tareaData} />
                        : null
                }
                {
                    step === steps.FINALIZAR ?
                        <FinalizarDictamen tarea={tareaData} closeModal={setClose} />
                        : null
                }
            </>
            {renderButtons()}
        </>
    )
}
