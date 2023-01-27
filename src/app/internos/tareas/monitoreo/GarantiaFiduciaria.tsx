import { tareaApi } from 'api'
import { dictamenTecnicoApi } from 'api/latifoliado'
import { monitoreoApi } from 'api/latifoliado'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import { Form, FormAdditionalButton, Input, TextArea } from 'components/Form'
import { bool, object, requiredString, SchemaOf, string } from 'components/Yup'
import React, { useContext, useState } from 'react'
import { Checkbox, FormGroup, Header } from 'semantic-ui-react'
import EnmiendaTable, { Enmienda } from '../generales/EnmiendasTable'

type Props = {
    ttTarea: any
    closeActivity: () => void
}

type garantia = {
    solicitante?: boolean,
    fiador?: boolean,
    patrimonio?: boolean,
    regente?: boolean,
    aprobado?: boolean,
    observaciones?: string,
    noAval: string
}

const validationSchema: SchemaOf<garantia> = object({
    solicitante: bool(),
    fiador: bool(),
    patrimonio: bool(),
    regente: bool(),
    aprobado: bool(),
    observaciones: string(),
    noAval: requiredString()
})

export default function GarantiaFiduciaria({
    ttTarea,
    closeActivity
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [mostrarEnmiendas, setMostrarEnmiendas] = useState<boolean>(false)
    const [enmiendas, setEnmiendas] = useState<Enmienda[]>([]);

    const onSuccess = () => {
        appDataContext.successToast("Solicitud realizada exitosamente")
        getPDF()
        closeActivity()
    }

    const setTareaData = (data: garantia) => {
        ttTarea.observaciones = data.observaciones

        if (ttTarea.ttSeguimientoTarea == null) {
            ttTarea.ttSeguimientoTarea = {}
        }

        if (mostrarEnmiendas) {
            ttTarea.esEnmienda = 1;
            ttTarea.aprobado = 2;
            if (ttTarea.ttSeguimientoTarea == null) {
                ttTarea.ttSeguimientoTarea = {}
            }
            ttTarea.ttSeguimientoTarea.enmienda = JSON.stringify(enmiendas)
            ttTarea.ttSeguimientoTarea.codigo = data.noAval
            ttTarea.ttSeguimientoTarea.numeroResolucion = data.noAval
        }

        else {
            ttTarea.esEnmienda = 0;
            ttTarea.aprobado = 1;
            ttTarea.ttSeguimientoTarea.numeroResolucion = data.noAval;

            var dataArray: any[] = [];
            dataArray.push({ "solicitante": data.solicitante });
            dataArray.push({ "regente": data.regente });
            dataArray.push({ "fiador": data.fiador });
            dataArray.push({ "patrimonio": data.patrimonio });
            dataArray.push({ "amendment": false });
            dataArray.push({ "aprobado": data.aprobado });
            dataArray.push({ "representante": true });
            dataArray.push({ "representanteF": true });

            var cadena = "";
            cadena += "{\"solicitante\":" + data.solicitante;
            cadena += ",\"regente\":" + data.regente;
            cadena += ",\"fiador\":" + data.fiador;
            cadena += ",\"patrimonio\":" + data.patrimonio;
            cadena += ",\"amendment\":" + false;
            cadena += ",\"aprobado\":" + data.aprobado;
            cadena += ",\"representante\":" + true;
            cadena += ",\"representanteF\":" + true + "}";

            ttTarea.ttSeguimientoTarea.fundamento = JSON.stringify(dataArray);
        }
    }

    const handleSubmit = (data: garantia, onResponse: (res: any) => void, onError: (error: any) => void) => {
        setTareaData(data)
        tareaApi.opinionMonitoreoAval(ttTarea, onResponse, onError)
    }


    const getPDFPreview = (_id: any, data: garantia, onResponse: (res: any) => void, onError: (error: any) => void) => {
        setTareaData(data)
        if (mostrarEnmiendas) {
            dictamenTecnicoApi.descargarEnmiendaTecnicoPreview(ttTarea, onResponse, onError)
        }
        else {
            monitoreoApi.descargarOpinionPreview(ttTarea, onResponse, onError)
        }
    }

    const getPDF = () => {

        const handleResponse = (res: any) => {
            if (res.status === "OK") {

            }
            else {
                console.error(res.message)
                appDataContext.errorToast(res.message)
            }
        }
        const handleError = (axiosError: AxiosError) => {
            console.error(axiosError)
            appDataContext.errorToast("Error al descargar datos.")
        }

        if (ttTarea == null) {
            return
        }

        if (mostrarEnmiendas) {
            dictamenTecnicoApi.descargarEnmiendaTecnicoPreview(ttTarea, handleResponse, handleError)
        }

        else {
            monitoreoApi.descargarOpinionPDF(ttTarea.tareaId, handleResponse, handleError)
        }
    }

    const buttons: FormAdditionalButton[] = [
        {
            label: "Vista previa",
            id: "preview",
            color: "yellow"
        }
    ]

    const defaultValues: garantia = {
        solicitante: false,
        fiador: false,
        patrimonio: false,
        regente: false,
        aprobado: false,
        observaciones: "",
        noAval: ""
    }

    const toogleMostrarEnmiendas = () => setMostrarEnmiendas(!mostrarEnmiendas)

    return (
        <>
            <Checkbox style={{ "marginBottom": "16px" }} toggle label='¿Agregar Enmienda(s)?' checked={mostrarEnmiendas} onChange={toogleMostrarEnmiendas} />
            <Form
                submitButtonIcon='send'
                submitButtonLabel="Solicitar"
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                defaultValues={defaultValues}
                onSuccess={onSuccess}
                noSuccessMessage
                buttons={buttons}
                onButtonClick={getPDFPreview}
            >
                <Input
                    label={mostrarEnmiendas ? "No. de oficio" : "No. de AVAL"}
                    name="noAval"
                    width="4"
                />
                {mostrarEnmiendas
                    ?
                    <EnmiendaTable enmiendas={enmiendas} setEnmiendas={setEnmiendas} />
                    :
                    <>
                        <FormGroup>
                            <Header style={{ marginLeft: "8px" }} size="tiny" content="¿Avalar garantía?" />
                            <Input
                                type="checkbox"
                                name="aprobado"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Header style={{ marginLeft: "8px" }} size="tiny" content="¿Historial del solicitante es favorable?" />
                            <Input
                                type="checkbox"
                                name="solicitante"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Header style={{ marginLeft: "8px" }} size="tiny" content="¿El historial del fiador es favorable?" />
                            <Input
                                type="checkbox"
                                name="fiador"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Header style={{ marginLeft: "8px" }} size="tiny" content="¿El estado patrimonial del fiador cubre el monto de la garantía?" />
                            <Input
                                type="checkbox"
                                name="patrimonio"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Header style={{ marginLeft: "8px" }} size="tiny" content="¿Historial del regente es favorable?" />
                            <Input
                                type="checkbox"
                                name="regente"
                            />
                        </FormGroup>
                        <TextArea
                            name="observaciones"
                            label="Comentarios para que se consideren en el aval de la Garantía Fiduciaria"
                        />
                    </>}
            </Form>
        </>
    )
}
