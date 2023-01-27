import { tareaApi } from 'api'
import { subregionalApi } from 'api/latifoliado'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import { Form, FormAdditionalButton, Input, TextArea } from 'components/Form'
import InformationTable, { InformationRow } from 'components/InformationTable'
import { object, requiredString, SchemaOf, string } from 'components/Yup'
import React, { useCallback, useContext, useEffect, useState } from 'react'

type Props = {
    ttTarea: any,
    closeActivity: () => void
}

type aval = {
    codigo: string
    observaciones?: string
}

const validationSchema: SchemaOf<aval> = object({
    codigo: requiredString(),
    observaciones: string()
})


export default function AvalGarantia({
    ttTarea,
    closeActivity
}: Props) {

    const [dataAval, setDataAval] = useState<any>(null)
    const [rows, setRows] = useState<InformationRow[]>([])
    const appDataContext = useContext(AppDataContext)

    const onSuccess = () => {
        appDataContext.successToast("Solicitud realizada exitosamente")
        getPDF();
        closeActivity()
    }

    const setTareaData = (data: aval) => {
        ttTarea.observaciones = data.observaciones
        if (ttTarea.ttSeguimientoTarea == null) {
            ttTarea.ttSeguimientoTarea = {}
        }
        ttTarea.ttSeguimientoTarea.area = dataAval?.areaGarantia
        ttTarea.ttSeguimientoTarea.codigo = data.codigo
        ttTarea.ttSeguimientoTarea.monto = dataAval?.montoGarantia
        ttTarea.ttSeguimientoTarea.volumen = dataAval?.volumen
        ttTarea.ttSeguimientoTarea.analisis = dataAval?.nombreFiador
        ttTarea.ttSeguimientoTarea.enmienda = dataAval?.dpiFiador
    }

    const handleSubmit = (data: aval, onResponse: (res: any) => void, onError: (error: any) => void) => {
        setTareaData(data)
        tareaApi.solicitarAval(ttTarea, onResponse, onError)
    }
    
    const getPDFPreview = (_id: any, data: aval, onResponse: (res: any) => void, onError: (error: any) => void) => {
        if (ttTarea == null) {
            return
        }
        setTareaData(data)
        subregionalApi.descargarAvalPreview(ttTarea, onResponse, onError)
    }


    const getPDF = () => {
        const handleResponse = (res: any) => {
            if (res.status !== "OK") {
                console.error(res.message)
                appDataContext.errorToast(res.message)
            }
        }
        const handleError = (axiosError: AxiosError) => {
            console.error(axiosError)
            appDataContext.errorToast("Error al descargar archivo.")
        }
        if (ttTarea == null) {
            return
        }
        subregionalApi.descargarAvalPDF(ttTarea.tareaId, handleResponse, handleError)
    }

    const setRowData = (data: any) => {
        if (data != null) {
            let newRows: InformationRow[] = []
            newRows.push({
                header: "Área para calcular la garantía",
                value: data?.areaGarantia
            })
            newRows.push({
                header: "Monto de la garantía",
                value: data?.montoGarantia
            })
            newRows.push({
                header: "Volumen (m3)",
                value: data?.volumen
            })
            if (data?.nombreEmpresa != null) {
                newRows.push({
                    header: "Nombre de la empresa",
                    value: data?.nombreEmpresa
                })
            }
            newRows.push({
                header: "Nombre del fiador",
                value: data?.nombreFiador
            })
            newRows.push({
                header: "DPI del fiador",
                value: data?.dpiFiador
            })
            newRows.push({
                header: "Regente propuesto",
                value: data?.regentePropuesto
            })
            setRows(newRows)
        }
    }

    const getEstimacion = () => {
        const handleResponse = (res: any) => {
            if (res.status === "OK") {
                setDataAval(res.data[0])
                setRowData(res.data[0])
            }
            else {
                console.log(res)
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

        subregionalApi.getAvalGarantia(ttTarea.tareaId, handleResponse, handleError)
    }

    const getEstimacionCallback = useCallback(getEstimacion, [ttTarea])

    useEffect(() => {
        getEstimacionCallback()
    }, [getEstimacionCallback])

    useEffect(() => {
        console.log(ttTarea)
    }, [ttTarea])


    const buttons : FormAdditionalButton[] = [
        {
            label: "Vista previa",
            id: "preview",
            color: "yellow"
        }
    ]

    return (
        <>
            <InformationTable
                rows={rows}
                style={{ "marginBottom": "16px" }}
                collapseLeft
            />
            <Form
                submitButtonIcon="send"
                submitButtonLabel="Solicitar"
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                onSuccess={onSuccess}
                noSuccessMessage
                buttons={buttons}
                onButtonClick={getPDFPreview}
            >
                <Input
                    label="No. Oficio"
                    name="codigo"
                    width="2" 
                />
                <TextArea
                    name="observaciones"
                    label="Comentarios para que se consideren en el aval de la Garantía Fiduciaria"                    
                />
            </Form>
        </>
    )
}
