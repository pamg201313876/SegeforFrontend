import React, { useState, useEffect, useContext } from 'react'
import FormModal from 'components/FormModal'
import {Form, Header } from 'semantic-ui-react'
import UploadFormButton from 'components/UploadButton'
import { tareaApi, fileApi } from 'api';
import TokenResponseDTO from 'dto/auth/TokenResponseDTO';
import { AxiosError } from 'axios';
import { AppDataContext } from 'app/App';
import { toLocalDateIsoString } from 'utils/UtilFunctions';

type Props = {
    open: boolean
    closeModal: () => void
    tareaData: any
}

export default function RecibirTarea({
    open,
    closeModal,
    tareaData
}: Props) {

    const dataContext = useContext(AppDataContext)
    const [initDate, setInitDate] = useState<string>("");
    const [initTime, setInitTime] = useState<string>()
    const [observaciones, setObservaciones] = useState<string>("")
    const [file, setFile] = useState<any>({});
    const [loading, setLoading] = useState(false)

    const onSave = () => {

        let tokenData = localStorage.getItem("tokenData")

        if (tokenData !== null) {

            let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
            let fechaRecepcion = initDate + " " + initTime
            tareaData.observaciones = observaciones
            tareaData.fechaRecepcion = toLocalDateIsoString(fechaRecepcion)
            tareaData.tcPersonaAsignada = tokenObj.tcPersona;
            tareaData.anexo = [file];

            const HandleResponse = (response: any) => {
                console.log(response)
                if (response.status === "OK") {
                    dataContext.successToast("Proceso exitoso")
                    setLoading(false)
                    closeModal()
                } else {
                    setLoading(false)
                    dataContext.errorToast(response.message)
                }
            }

            const HandleError = (error: any) => {
                console.error(error)
                setLoading(false)
                dataContext.errorToast('Error al procesar, intentelo de nuevo')
            }

            setLoading(true)
            tareaApi.RecibirTarea(tareaData, HandleResponse, HandleError)

        }
        else {
            dataContext.errorToast('Error al procesar, intentelo de nuevo')
        }
    }

    // const handleChange = (e: any, { name, value }: any) => {

    //     value = (e.target.type === 'number') ? parseInt(value) : value
    //     if (e.target.type === 'number' && isNaN(value)) {
    //         value = ""
    //     }

    //     setTareaData((oldValues: any) => ({
    //         ...oldValues,
    //         [name]: value,
    //     }));

    //     console.log(tareaData)
    // }


    const handleChangeFile = (e: any, { name, value }: any) => {
        let file = value;

        if (file !== null) {
            const onResponse = (response: any) => {
                if (response.status === "OK") {
                    console.log(response.data[0])
                    setFile(response.data[0])
                }
                else {
                    console.error("Error al cargar archivo")
                }
            }

            const onError = (axiosError: AxiosError) => {
                console.log(axiosError)
            }

            fileApi.cargarArchivo(file, onResponse, onError)
        }
    }

    useEffect(() => {
        let today = new Date();
        setInitDate(today.toLocaleDateString('en-CA'))
        setInitTime(today.toTimeString().split(' ')[0]);
    }, [])


    return (

        <FormModal loading={loading} header="Recibir Tarea" open={open} closeModal={closeModal} confirmLabel="Confirmar" onSave={onSave} >
            <Form>
                <Header>Indicar Fecha y Hora de recepción</Header>
                <Form.Group>
                    <Form.Input
                        type={"date"}
                        name={"fechaRecepcion"}
                        value={initDate}
                        onChange={(_e, {value}) => setInitDate(value)}
                    />
                    <Form.Input
                        type={"time"}
                        defaultValue={initTime}
                        name="hora"
                    />
                </Form.Group>
                <div style={{ marginBottom: "8px" }}>
                    <UploadFormButton defaultLabel={"Adjuntar un anexo"} handleChange={handleChangeFile} name="anexo" url="/" />
                </div>
                <Form.TextArea
                    rows={10}
                    name="observaciones"
                    placeholder='Breve descripción de respaldo'
                    onChange={(_e, {value}) => setObservaciones(value as string)}
                />
            </Form>
        </FormModal>

    )
}
