import FielApi from 'api/FileApi';
import TareaApi from 'api/TareaApi';
import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios';
import FormModal from 'components/FormModal';
import UploadFormButton from 'components/UploadButton';
import TokenResponseDTO from 'dto/auth/TokenResponseDTO';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { toLocalDateIsoString } from 'utils/UtilFunctions';

type Props = {
    open: boolean
    closeModal: () => void
    tareaData: any
    setTareaData: (x: any) => void
}

const tareaApi = new TareaApi();
const fileApi = new FielApi();

export default function RecibirTarea(props: Props) {


    const dataContext = useContext(AppDataContext)
    const [initDate, setInitDate] = useState<string>("");
    const [initTime, setInitTime] = useState<string>()
    const [file, setFile] = useState<any>({});
    const [loading, setLoading] = useState(false)

    const onSave = () => {

        let tokenData = localStorage.getItem("tokenData")

        if (tokenData !== null) {

            let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
            let fechaRecepcion = initDate + " " + initTime
            props.tareaData.fechaRecepcion = toLocalDateIsoString(fechaRecepcion)
            props.tareaData.tcPersonaAsignada = tokenObj.tcPersona;
            props.tareaData.anexo = [file];

            const HandleResponse = (response: any) => {
                console.log(response)
                if (response.status === "OK") {
                    dataContext.successToast("Proceso exitoso")
                    setLoading(false)
                    props.closeModal()
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
            tareaApi.RecibirTarea(props.tareaData, HandleResponse, HandleError)

        }
        else {
            dataContext.errorToast('Error al procesar, intentelo de nuevo')
        }
    }

    const handleChange = (e: any, { name, value }: any) => {

        value = (e.target.type === 'number') ? parseInt(value) : value
        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }

        props.setTareaData((oldValues: any) => ({
            ...oldValues,
            [name]: value,
        }));

        console.log(props.tareaData)
    }


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
        console.log(today.toTimeString())
        setInitDate(today.toLocaleDateString('en-CA'))
        setInitTime(today.toTimeString().split(' ')[0]);

        let initDate = today.toLocaleDateString('en-CA')
        let initTime = today.toTimeString().split(' ')[0]

        let date = initDate + " " + initTime

        console.log(toLocalDateIsoString(date))


    }, [])


    return (

        <FormModal loading={loading} header="Recibir Tarea" open={props.open} closeModal={props.closeModal} confirmLabel="Confirmar" onSave={onSave} >
            <Form>
                <Header>Indicar Fecha y Hora de recepción</Header>
                <Form.Group>
                    <Form.Input
                        type={"date"}
                        name={"fechaRecepcion"}
                        value={initDate}
                        onChange={handleChange}
                    />
                    <Form.Input
                        type={"time"}
                        defaultValue={initTime}
                        name="hora"
                    />
                </Form.Group>
                <div style={{marginBottom: "8px"}}>
                    <UploadFormButton defaultLabel={"Adjuntar un anexo"} handleChange={handleChangeFile} name="anexo" url="/" />
                </div>
                <Form.TextArea
                    rows={10}
                    name="observaciones"
                    placeholder='Breve descripción de respaldo'
                    onChange={handleChange}
                />
            </Form>
        </FormModal>

    )
}
