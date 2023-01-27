import DictamenTecnicoApi from 'api/latifoliado/DictamenTecnicoApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import ResumenEvaluacionRow from './ResumenEvaluacionRow'

type Props = {
    tarea: any
    setNumeroNotas: (value: number) => void
}

const dictamenTecnicoApi = new DictamenTecnicoApi()

export default function ResumenEvaluacionCampo({
    tarea,
    setNumeroNotas
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [loading, setLoading] = useState(false)
    const [estratos, setEstratos] = useState<any[]>([])

    const renderRows = (): any[] => {
        let list: any[] = []
        for (let estrato of estratos) {
            let row = (<ResumenEvaluacionRow estrato={estrato}/>)
            list.push(row)
        }
        return list
    }

    const getDataResumen = () => {

        const handleResponse = (res: any) => {
            if (res.status == "OK") {
                setEstratos(res.data[0].estratos)
                setNumeroNotas(res.data[0].numeroNotasRecomendadas)
            }
            else {
                appDataContext.errorToast(res.message)
            }
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
            appDataContext.errorToast("Error al obtener la información")
        }

        if (tarea == null) {
            return
        }
        dictamenTecnicoApi.getResumenEvaluacion(tarea.ttGestion.gestionId, handleResponse, handleError)
    }

    const getDataCallback = useCallback(getDataResumen, [tarea])

    useEffect(() => {
        getDataCallback()
    }, [getDataCallback])


    const save = () => {

        const handleResponse = (res: any) => {
            setLoading(false)
            if (res.status == "OK") {
                appDataContext.successToast("Datos guardados exitostamente")
            }
            else {
                appDataContext.errorToast(res.message)
            }
        }

        const handleError = (error: AxiosError) => {
            setLoading(false)
            console.error(error)
            appDataContext.errorToast("Error al guardar la información")
        }

        let resumenDTO = {
            estratos: estratos
        }

        setLoading(true)
        dictamenTecnicoApi.updateResumenEvaluacion(tarea.ttGestion.gestionId, resumenDTO, handleResponse, handleError )
    }

    return (
        <div style={{ marginBottom: "64px" }}>
            <Table size="small" celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Estrato</Table.HeaderCell>
                        <Table.HeaderCell>Variables evaluadas</Table.HeaderCell>
                        <Table.HeaderCell>Plan de manejo</Table.HeaderCell>
                        <Table.HeaderCell>Aplica</Table.HeaderCell>
                        <Table.HeaderCell>Verificación de campo</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderRows()}
                </Table.Body>
            </Table>
            <Button loading={loading} floated="right" primary content="Guardar" icon="save" labelPosition="right" onClick={save} />
        </div>
    )
}
