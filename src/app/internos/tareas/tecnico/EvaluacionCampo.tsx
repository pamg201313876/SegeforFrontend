import TareaApi from 'api/TareaApi';
import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios';
import FormNumInput from 'components/FormNumInput';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DropdownProps, Form, Header, Label } from 'semantic-ui-react';
import EnmiendaTecnico from './EnmiendaTecnico';
import EvaluacionDasometrica from "./evaluacionCampo/EvaluacionDasometrica";
import ResumenEvaluacionCampo from "./evaluacionCampo/ResumenEvaluacionCampo";

type Props = {
    tareaData: any
    setClose: () => void
    nextButtonRef: React.MutableRefObject<() => boolean>
}

const tareaApi = new TareaApi();

export default function EvaluacionCampo({
    tareaData,
    setClose,
    nextButtonRef
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)
    const [opinion, setOpinion] = useState<string | number | boolean | (string | number | boolean)[] | undefined>(0)
    const [numeroDictamen, setNumeroDictamen] = useState<string | undefined>()
    const [numeroNotas, setNumeroNotas] = useState<number | undefined>()
    const [archivoCargado, setArchivoCargado] = useState(false)
    const [numeroDictamenError, setNumeroDictamenError] = useState<string | null>()
    const [notasError, setNotasError] = useState<string | null>()

    const handleChangeLista = (_event: any, data: DropdownProps) => {
        setOpinion(data.value)
    }

    const handleNumeroDictamenChange = (_e: any, { value }: any) => {
        setNumeroDictamen(value)
    }

    const handleNotasBlur = (e: any) => {
        setNumeroNotas(e.target.value)
    }

    //Validamos datos antes de continuar
    const isDataValid = (): boolean => {
        let isValid = true

        if (numeroDictamen == null || numeroDictamen.toString().trim() === "") {
            setNumeroDictamenError("Debe de ingresar este valor")
            isValid = false
        }

        if (opinion === 1 && (numeroNotas == null || numeroNotas.toString().trim() === "")) {
            setNotasError("Debe de ingresar este valor")
            isValid = false
        }

        if(!archivoCargado){
            appDataContext.errorToast("Debe cargar el archivo de evaluación")
            isValid = false
        }

        if (isValid) {

            const handleResponse = (res: any) => {
                if (res.status == "OK") {
                    // setTareaData(res.data[0])
                }
                else {
                    console.error(res.message)
                }
            }

            const handleError = (error: AxiosError) => {
                console.error(error)
            }

            if (tareaData.ttSeguimientoTarea == null) {
                tareaData.ttSeguimientoTarea = {
                    tab: 2,
                    monto: numeroNotas,
                    numeroResolucion: numeroDictamen
                }
            }

            else {
                // if (tareaData.ttSeguimientoTarea.tab < 2) {
                //     tareaData.ttSeguimientoTarea.tab = 2
                // }
                tareaData.ttSeguimientoTarea.tab = 2
                tareaData.ttSeguimientoTarea.monto = numeroNotas
                tareaData.ttSeguimientoTarea.numeroResolucion = numeroDictamen
            }

            tareaData.aprobado = opinion
            //tareaApi.ActualizarTecnico(tareaData, handleResponse, handleError)

        }

        

        return isValid
    }

    const isDataValidCallback = useCallback(
        isDataValid,
        [numeroDictamen, numeroNotas, tareaData, opinion, archivoCargado],
    )

    useEffect(() => {
        nextButtonRef.current = isDataValidCallback
    }, [nextButtonRef, isDataValidCallback])

    useEffect(() => {
        setOpinion(tareaData?.aprobado)
        setNumeroDictamen(tareaData?.ttSeguimientoTarea?.numeroResolucion)
        setNumeroNotas(tareaData?.ttSeguimientoTarea?.monto)
    }, [tareaData])

    return (
        <>
            <EnmiendaTecnico open={open} closeModal={closeModal} tareaData={tareaData} setClose={setClose} />
            <Label basic size="large" >
                Tipo de inventario: <Label.Detail>Censo</Label.Detail>
            </Label>

            <Header content="Resumen de la evaluación de campo (Evaluación de características generales del área propuesta) " />

            <ResumenEvaluacionCampo tarea={tareaData} setNumeroNotas={setNumeroNotas} />

            <Header content="Evaluación de las características dasométrica de las especias propuestas a aprovechar" />

            <EvaluacionDasometrica tarea={tareaData} archivoCargado={archivoCargado} setArchivoCargado={setArchivoCargado} />

            <Header content="Su opinión a emitir es para:" />
            <Form>
                <Form.Group>
                    <Form.Select
                        options={[
                            { key: '0', value: 0, text: 'No Aprobar' },
                            { key: '1', value: 1, text: 'Aprobar' },
                        ]}
                        onChange={handleChangeLista}
                        value={opinion}
                        width="3"
                    />
                    <Form.Button
                        content="Generar enmienda"
                        onClick={() => setOpen(true)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        type="text"
                        label="Número de Dictamen"
                        onChange={handleNumeroDictamenChange}
                        name={"dictamen"}
                        width="3"
                        error={numeroDictamenError}
                        value={numeroDictamen}
                    />
                    {opinion === 1 ?
                        <FormNumInput
                            onlyDigits
                            label="Notas de Envío (POA)"
                            name="notas"
                            onBlur={handleNotasBlur}
                            width="3"
                            error={notasError}
                            value={numeroNotas}
                        />
                        :
                        null
                    }
                </Form.Group>
            </Form>


        </>
    )
}
