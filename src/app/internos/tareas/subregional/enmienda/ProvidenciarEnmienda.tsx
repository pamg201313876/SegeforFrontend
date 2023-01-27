import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Form, FormAdditionalButton, Group, Input, TextArea } from 'components/Form'
import { object, SchemaOf, requiredString, string } from 'components/Yup'
import UsuarioAsignarSelect, { TipoUsuario } from 'components/Form/CatalogSelect/UsuarioAsignarSelect'
import { tareaApi } from 'api'
import { subregionalApi } from 'api/latifoliado'
import { AppDataContext } from 'app/App'
import { Button, Form as SForm, Icon } from 'semantic-ui-react'
import InformationTable, { InformationRow } from 'components/InformationTable'

type Props = {
    ttTarea: any
    closeActivity: () => void
}

type ProvidenciaForm = {
    providencia: string
    comentarios?: string
    tcPersonaTraslado?: any
    tcPersonaJuridico?: any
    //tcPersonaMonitoreo?: any //agregar despues
}

type DatosUsuarioMonitoreo = {
    personaId: string,
    personaDesc: string,
    codigo: string
}

const validationSchema: SchemaOf<ProvidenciaForm> = object({
    providencia: requiredString(),
    comentarios: string(),
    tcPersonaTraslado: object(),
    tcPersonaJuridico: object()
})

export default function ProvidenciarEnmienda({
    ttTarea,
    closeActivity
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [showTecnico, setShowTecnico] = useState(false)
    const [showJuridico, setShowJuridico] = useState(false)
    const [showMonitoreo, setShowMonitoreo] = useState(false)
    const [dataPadre, setDataPadre] = useState<any>()
    const [rows, setRows] = useState<InformationRow[]>([])
    const [datosUsuarioMonitoreo, setDatosUsuarioMonitoreo] = useState<DatosUsuarioMonitoreo | null>(null)
    const [dataAval, setDataAval] = useState<any>(null)

    const getTareasPadre = () => {

        ttTarea.nextActivityId = 8;

        const HandleResponse = (response: any) => {
            appDataContext.desactivateLoading()

            if (response.status === "OK") {
                setDataPadre(response.data[0])
            }
            else {
                console.error(response.message)
                appDataContext.errorToast(response.message)
            }

        }

        const HandleError = (error: any) => {
            appDataContext.desactivateLoading()
            console.log("error")
            console.log(error)
        }

        appDataContext.activateLoading()

        tareaApi.getTareaPadreEnmienda(ttTarea.tareaPadreId, HandleResponse, HandleError); //si funciona tanto en inab.gob.gt como aqui.
    }

    const setData = (data: ProvidenciaForm) => {
        if (ttTarea.ttSeguimientoTarea == null) {
            ttTarea.ttSeguimientoTarea = {}
        }

        ttTarea.ttSeguimientoTarea.providencia = data.providencia
        ttTarea.ttSeguimientoTarea.antecedente = dataPadre?.codigo

        if (showTecnico) {
            ttTarea.tcPersonaTraslado = {
                personaId: data.tcPersonaTraslado.personaId,
                personaDesc: data.tcPersonaTraslado.personaDesc,
            }
        }

        if (showJuridico) {
            ttTarea.tcPersonaJuridico = {
                personaId: data.tcPersonaJuridico.personaId,
                personaDesc: data.tcPersonaJuridico.personaDesc,
            }
        }

        if (showMonitoreo && datosUsuarioMonitoreo != null) {
            ttTarea.tcPersonaMonitoreo = {
                personaId: datosUsuarioMonitoreo.personaId,
                personaDesc: datosUsuarioMonitoreo.personaDesc,
            }
            // ttTarea.ttSeguimientoTarea.providencia = null
            ttTarea.ttSeguimientoTarea.analisis = datosUsuarioMonitoreo.codigo
            ttTarea.ttSeguimientoTarea.codigo = data.providencia
        }
    }

    const handleSubmit = (data: ProvidenciaForm, onResponse: (res: any) => void, onError: (error: any) => void) => {
        setData(data)
        tareaApi.providenciaEnmienda(ttTarea, onResponse, onError)
    }

    const onSuccess = () => {
        closeActivity()
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
        const handleError = (axiosError: any) => {
            console.error(axiosError)
            appDataContext.errorToast("Error al descargar datos.")
        }

        if (ttTarea == null) {
            return
        }

        subregionalApi.getAvalGarantia(ttTarea.tareaId, handleResponse, handleError)
    }

    const getTareaPadreCallback = useCallback(getTareasPadre, [ttTarea])

    useEffect(() => {
        getTareaPadreCallback()
    }, [getTareaPadreCallback])

    const onPreview = (_id: any, data: ProvidenciaForm, onResponse: (res: any) => void, onError: (error: any) => void) => {
        setData(data)
        subregionalApi.descargarProvidenciarEnmiendasPreview(ttTarea, onResponse, onError);
    }

    const getEstimacionCallback = useCallback(getEstimacion, [ttTarea])

    useEffect(() => {
        if (dataPadre != null) {
            let categoriasEnmienda = JSON.parse(dataPadre.ttSeguimientoTarea.enmienda);
            for (let categoria of categoriasEnmienda) {
                if (categoria.taskId == 3) {
                    setShowJuridico(true)
                }
                else if (categoria.taskId == 4) {
                    setShowTecnico(true)
                }
                else if (categoria.taskId == 14) {
                    setShowMonitoreo(true)
                    setDatosUsuarioMonitoreo({
                        personaDesc: categoria.personaDesc,
                        personaId: categoria.personaId,
                        codigo: categoria.codigo
                    })
                    getEstimacionCallback()
                }
            }
        }
    }, [dataPadre, getEstimacionCallback])

    const buttons : FormAdditionalButton[] = [
        {
            label: "Vista previa",
            id: "preview",
            color: "yellow"
        }
    ]

    if (dataPadre != null) {
        return (
            <>
                <Form
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    onSuccess={onSuccess}
                    buttons={buttons}
                    onButtonClick={onPreview}
                >
                    {showMonitoreo &&
                        <InformationTable
                            rows={rows}
                            style={{ "marginBottom": "16px" }}
                            collapseLeft
                        />}
                    <Input
                        label={showMonitoreo ? "No. de oficio" : "No. de providencia"}
                        name="providencia"
                        width="3"
                    />
                    {showMonitoreo == true ?
                        <TextArea
                            label="Comentarios para que se consideren en el aval de la Garantía Fiduciaria"
                            name="comentarios"
                            
                        />
                        : null
                    }
                    <Group>

                        {showJuridico &&
                            <UsuarioAsignarSelect
                                label="Jurídico"
                                subregionId={1} //Cambiar esto
                                tipoUsuario={TipoUsuario.JURIDICO}
                                name="tcPersonaJuridico"
                            />
                        }
                        {showTecnico &&
                            <UsuarioAsignarSelect
                                label="Técnico"
                                subregionId={1} //Cambiar esto
                                tipoUsuario={TipoUsuario.TECNICO}
                                name="tcPersonaTraslado"
                            />
                        }
                    </Group>
                </Form>
            </>
        )
    }

    return null
}
