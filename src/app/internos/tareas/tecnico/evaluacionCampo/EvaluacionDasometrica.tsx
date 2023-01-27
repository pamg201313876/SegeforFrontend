import DictamenTecnicoApi from 'api/latifoliado/DictamenTecnicoApi'
import { AppDataContext } from 'app/App'
import BoletaErrorFormModal from 'app/externos/gestiones/Solicitud/Hasta90/BoletaCenso/BoletaErrorFormModal'
import { AxiosError } from 'axios'
import { DownloadButton } from "components/Downloads"
import UploadFormButton from 'components/UploadButton'
import TokenResponseDTO from "dto/auth/TokenResponseDTO"
import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'


const dictamenTecnicoApi = new DictamenTecnicoApi();

type Props = {
    tarea: any
    archivoCargado: boolean
    setArchivoCargado: (value: boolean) => void
}

export default function EvaluacionDasometrica({
    tarea,
    archivoCargado,
    setArchivoCargado
}: Props) {
    const appDataContext = useContext(AppDataContext);
    const [estratosDasometrica, setEstratosDasometrica] = useState<any[]>([])
    const descargaManual = (onResponse: any, onError: any) => dictamenTecnicoApi.descargarBoletaSistemaTecnico("manual", onResponse, onError)
    const descargaSistema = (onResponse: any, onError: any) => dictamenTecnicoApi.descargarBoletaSistemaTecnico("sistema", onResponse, onError)
    const [boletaErrorOpen, setBoletaErrorOpen] = useState(false)
    const [errorList, setErrorList] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const renderEstratosDasometricos = () => {
        const body: any[] = []
        if (estratosDasometrica != null) {
            let i = 0;
            estratosDasometrica.forEach((estrato: any) => {
                body.push(renderEstratoRow(estrato.especies.length, estrato.estrato))
                body.push(renderEspeciesDasometricas(estrato.especies, i))
                i++;
            });
        }

        return body;
    }

    const renderEstratoRow = (numEspecies: number, numero: number) => (
        <Table.Row key={"estrato_num" + numero}>
            <Table.Cell textAlign="center" rowSpan={numEspecies + 1}>
                {numero}
            </Table.Cell>
        </Table.Row>
    )

    const renderEspeciesDasometricas = (especies: any[], rowNumber: number) => {
        const body: any[] = []
        especies.forEach((especie: any) => {
            body.push(

                <Table.Row active={especie.estaVerificado} disabled={!especie.estaVerificado} key={"estrato" + rowNumber}>

                    <Table.Cell>
                        {especie.nombreCientifico}
                    </Table.Cell>

                    <Table.Cell textAlign="center">
                        {Math.trunc(especie.arbolesMuestreados)}
                    </Table.Cell>

                    <Table.Cell textAlign="center">
                        {especie.dapElaborador.toFixed(2)}
                    </Table.Cell>

                    <Table.Cell textAlign="center">
                        {especie.alturaElaborador.toFixed(2)}
                    </Table.Cell>

                    <Table.Cell textAlign="center">
                        {especie.volumenElaborador.toFixed(2)}
                    </Table.Cell>


                    <Table.Cell textAlign="center">
                        {especie.dapTecnico.toFixed(2)}
                    </Table.Cell>

                    <Table.Cell textAlign="center">
                        {especie.alturaTecnico.toFixed(2)}
                    </Table.Cell>

                    <Table.Cell textAlign="center">
                        {especie.volumenTecnico.toFixed(2)}
                    </Table.Cell>


                    <Table.Cell textAlign="center">
                        {especie.diferenciaVolumen.toFixed(2)}
                    </Table.Cell>

                    <Table.Cell textAlign="center">
                        {especie.porcentajeDiferencia.toFixed(2) + "%"}
                    </Table.Cell>

                </Table.Row>
            );
            rowNumber++;
        });

        return body;

    }


    const handleChangeFile = (e: any, { name, value }: any) => {

        let tokenData = localStorage.getItem("tokenData");

        if (tokenData !== null) {

            let tokenObj: TokenResponseDTO = JSON.parse(tokenData)

            var cargarBoletaDTO = {
                gestionId: tarea.ttGestion.gestionId,
                personaId: tokenObj.personaId
            }

            if (value !== null) {

                const onResponse = (response: any) => {
                    setLoading(false)
                    if (response.status === "OK") {
                        if (response.data[0].archivoCargado === false) {
                            setErrorList(response.data[0].errores)
                            setBoletaErrorOpen(true)
                        }
                        else {
                            appDataContext.successToast("Archivo cargado con éxito")
                            setEstratosDasometrica(response.data[0].estratos)
                            setArchivoCargado(response.data[0].archivoCargado)
                        }                        
                    }
                    else {
                        appDataContext.errorToast(response.message)
                    }
                }

                const onError = (axiosError: AxiosError) => {
                    setLoading(false)
                    console.error(axiosError)
                    appDataContext.errorToast("Error al cargar información. Vuelva a intentarlo")
                }

                setLoading(true)
                dictamenTecnicoApi.subirArchivoEvaluacion(value, cargarBoletaDTO, onResponse, onError)

            }

        }
    }

    useEffect(() => {

        const handleResponse = (res: any) => {
            if (res.status === "OK") {
                setArchivoCargado(res.data[0].archivoCargado)
                if (res.data[0].archivoCargado === true) {
                    setEstratosDasometrica(res.data[0].estratos)
                } 
            } else {
                appDataContext.errorToast("Error en la carga de información de la respuesta de evaluación")
            }
        }

        const handleError = (axiosError: any) => {
            console.error(axiosError)
            appDataContext.errorToast("Error al cargar información de respuesta evaluacion. Intentelo de nuevo")
        }

        dictamenTecnicoApi.getRespuestaCargaEvaluacion(tarea.ttGestion.gestionId, handleResponse, handleError);

    }, [tarea])

    return (
        <div>
            {boletaErrorOpen && <BoletaErrorFormModal open={boletaErrorOpen} closeModal={() => setBoletaErrorOpen(false)} errors={errorList} />}
            <div style={{ marginBottom: "8px" }}>
                <DownloadButton downloadFunction={descargaManual} primary content="Boleta Técnico - Manual" floated="right" />
                <DownloadButton downloadFunction={descargaSistema} secondary content="Boleta Técnico - Automático" floated="right" />
                <UploadFormButton loading={loading} buttonLabel="Cargar archivo evaluación" defaultLabel="" handleChange={handleChangeFile} name="anexo" url="/" />
            </div>
            <Table celled structured >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="center" collapsing rowSpan="2"   >Estrato</Table.HeaderCell>
                        <Table.HeaderCell rowSpan="2">Especie</Table.HeaderCell>
                        <Table.HeaderCell collapsing rowSpan="2">No. Arboles muestreados</Table.HeaderCell>
                        <Table.HeaderCell colSpan="3" textAlign="center"> Datos del Elaborador </Table.HeaderCell>
                        <Table.HeaderCell colSpan="3" textAlign="center">Datos de la evaluación Técnica</Table.HeaderCell>
                        <Table.HeaderCell colSpan="2" textAlign="center">Diferencia en Volumen</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>

                        <Table.HeaderCell >DAP promedio cm</Table.HeaderCell>
                        <Table.HeaderCell>Altura promedio m</Table.HeaderCell>
                        <Table.HeaderCell>Suma de Vol m3</Table.HeaderCell>
                        <Table.HeaderCell>DAP promedio cm</Table.HeaderCell>
                        <Table.HeaderCell>Altura promedio m</Table.HeaderCell>
                        <Table.HeaderCell>Suma de Vol m3</Table.HeaderCell>
                        <Table.HeaderCell>Vol m3</Table.HeaderCell>
                        <Table.HeaderCell>Porcentaje</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {archivoCargado && renderEstratosDasometricos()}
                </Table.Body>
            </Table>
        </div>
    )
}
