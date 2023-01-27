import DictamenTecnicoApi from 'api/latifoliado/DictamenTecnicoApi'
import AprovechamientoApi from 'api/latifoliado/hasta90/AprovechamientoApi'
import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Header, Select, Table } from 'semantic-ui-react'



type Props = {
    tareaData: any
}

const aprovechamientoApi = new AprovechamientoApi();
const dictamenApi = new DictamenTecnicoApi()

export default function CompromisoRepoblacion({
    tareaData
}: Props) {

    const [turnos, setTurnos] = useState<any>(null)
    const [estimacionDTO, setEstimacionDTO] = useState<any>()
    const [anio, setAnio] = useState<number>()

    const generateOptions = (): any[] => {
        let currentYear = new Date().getFullYear()

        let options = [
            { key: '1', value: (currentYear + 1), text: (currentYear + 1).toString() },
            { key: '2', value: (currentYear + 2), text: (currentYear + 2).toString() },
            { key: '3', value: (currentYear + 3), text: (currentYear + 3).toString() },
            { key: '4', value: (currentYear + 4), text: (currentYear + 4).toString() },
        ]

        return options
    }

    useEffect(() => {

        const handleResponse = (res: any) => {

            if (res.status === "OK") {
                setTurnos(res.data[0].sistemaRepoblacion.estratos)
            }
            else {

            }
        }

        const handleError = (axiosError: AxiosError) => {

        }

        if (tareaData != null) {
            aprovechamientoApi.getCalculos(tareaData.ttGestion.gestionId, handleResponse, handleError)
        }

    }, [tareaData])

    const renderRows = () => {
        let rows: any[] = []
        if (estimacionDTO != null) {

            for (let estrato of estimacionDTO.estratos) {

                let row = (
                    <Table.Row key={"r" + estrato?.turno + estrato?.estrato}>
                        <Table.Cell>{estrato?.turno}</Table.Cell>
                        <Table.Cell>{estrato?.estrato}</Table.Cell>
                        <Table.Cell>{estrato?.tipoCobertura}</Table.Cell>
                        <Table.Cell>{estrato?.areaIntervenir}</Table.Cell>
                        <Table.Cell>{estrato?.tratamientoSilvicultural}</Table.Cell>
                        <Table.Cell>{estrato?.metodoCalculo}</Table.Cell>
                        <Table.Cell>{estrato?.areaMonto}</Table.Cell>
                        <Table.Cell>{estrato?.monto}</Table.Cell>
                    </Table.Row>
                )

                rows.push(row)

            }

        }
        return rows;
    }

    useEffect(() => {

        const handleResponse = (res: any) => {
            if (res.status === "OK") {
                setEstimacionDTO(res.data[0])
            }
        }

        const handleError = (axiosError: AxiosError) => {

        }

        if (tareaData != null) {
            dictamenApi.getEstimacion(tareaData.ttGestion.gestionId, handleResponse, handleError)
        }

    }, [tareaData])


    const leerTurnos = () => {
        const body: any[] = []
        if (turnos != null) {
            body.push(leerEstratos())
        }
        return body;
    }

    const leerEstratos = () => {

        const body: any[] = []

        if (turnos != null) {
            let i = 0;
            turnos.forEach((estrato: any) => {
                body.push(leerEspecies(estrato))
                i++
            });
        }

        return body;
    }

    const leerEspecies = (estrato: any) => {


        const body: any[] = []

        var trozaSub = 0;
        var leniaSub = 0;
        var volSub = 0;

        if (estrato != null) {

            let i = 0;
            estrato.especies.forEach((especie: any) => {
                body.push(
                    <Table.Row key={"turno" + i}>
                        <Table.Cell>
                            {estrato.turno}
                        </Table.Cell>

                        <Table.Cell>
                            {estrato.estrato}
                        </Table.Cell>

                        <Table.Cell>
                            {estrato.anio}
                        </Table.Cell>

                        <Table.Cell>
                            {estrato.area}
                        </Table.Cell>

                        <Table.Cell>
                            {especie.tcEspecie.nombreCientifico}
                        </Table.Cell>


                        <Table.Cell>
                            {especie.densidadInicial}
                        </Table.Cell>

                        <Table.Cell>
                            {especie.tcSistemaRepoblacion.sistemaRepoblacionDesc}
                        </Table.Cell>
                    </Table.Row>
                )
                i++;
                trozaSub = trozaSub + especie.porcentajeTroza / 100 * especie.volumenTotal;
                leniaSub = leniaSub + (Math.abs((1 - especie.porcentajeTroza / 100) * especie.volumenTotal))
                volSub = volSub + especie.volumenTotal;
            });
        }


        return body;
    }

    useEffect(() => {
        if (anio != null) {
            tareaData.ttSeguimientoTarea.numero = anio
        }
    }, [anio])

    useEffect(() => {
        if (tareaData?.ttSeguimientoTarea?.numero != null && tareaData?.ttSeguimientoTarea?.numero != 0) {
            setAnio(tareaData.ttSeguimientoTarea.numero)
        }
        else {
            let nextYear = new Date().getFullYear() + 1
            setAnio(nextYear)
            tareaData.ttSeguimientoTarea.numero = nextYear
        }
    }, [tareaData])

    return (
        <>

            <Header size="small">a. Descripcion del área del compromiso</Header>
            El área de compromiso corresponde al área manejada y su recuperación será en base al siguiente cuadro.
            <Form.Group>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Turno</Table.HeaderCell>
                            <Table.HeaderCell>Estrato</Table.HeaderCell>
                            <Table.HeaderCell>Año</Table.HeaderCell>
                            <Table.HeaderCell>Área (ha)</Table.HeaderCell>
                            <Table.HeaderCell>Especie</Table.HeaderCell>
                            <Table.HeaderCell>Densidad Inicial Arb/ha</Table.HeaderCell>
                            <Table.HeaderCell>Sistema de Repoblación Forestal </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {leerTurnos()}
                    </Table.Body>
                </Table>
            </Form.Group>

            <Header size="small">b. Estimación del monto de compromiso del primer turno</Header>
            <div>El área de compromiso corresponde al área manejada y su recuperación será en base al siguiente cuadro.</div>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Turno</Table.HeaderCell>
                        <Table.HeaderCell>Estrato</Table.HeaderCell>
                        <Table.HeaderCell>Tipo de Cobertura</Table.HeaderCell>
                        <Table.HeaderCell>Área intervenir</Table.HeaderCell>
                        <Table.HeaderCell>Tratamiento silvicultural</Table.HeaderCell>
                        <Table.HeaderCell>Método de cálculo</Table.HeaderCell>
                        <Table.HeaderCell>Área para cálculo del monto</Table.HeaderCell>
                        <Table.HeaderCell>Monto de compromiso</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderRows()}
                </Table.Body>
                <Table.Footer>
                    <Table.Row positive>
                        <Table.Cell colSpan={6}>Total: </Table.Cell>
                        <Table.Cell>{estimacionDTO?.totalAreaMonto} </Table.Cell>
                        <Table.Cell>{estimacionDTO?.totalMonto}  </Table.Cell>
                    </Table.Row>
                </Table.Footer>
            </Table>

            <div><b>*Cuando el porcentaje de extracción en bosque sea mayor al 70 % del área basal existente, el método de calculo de la garantía será área por área (Porcentaje a extraer {estimacionDTO?.porcentaje}%)</b></div>

            <Header size="small">c. Tipo y monto de garantía</Header>
            <h3>Tipo de Garantía: {estimacionDTO?.tipoGarantia}</h3>

            <div> El compromiso debe garantizarse mediante {estimacionDTO?.tipoGarantia}, con una vigencia mínima de cuatro años y la misma debe garantizar el ESTABLECIMIENTO Y TRES AÑOS DE MANTENIMIENTO, de acuerdo al cuadro siguiente: </div>

            <Select
                style={{ marginTop: "4px" }}
                placeholder='Seleccione año'
                options={generateOptions()}
                value={anio}
                onChange={(_e: any, { value }) => setAnio(value as number)}
            />
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Etapa</Table.HeaderCell>
                        <Table.HeaderCell>Monto</Table.HeaderCell>
                        <Table.HeaderCell>Vigencia</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row >
                        <Table.Cell>
                            Establecimiento
                        </Table.Cell>
                        <Table.Cell>
                            {estimacionDTO?.totalMonto}
                        </Table.Cell>
                        <Table.Cell>
                            {anio != null ? "Hasta el 31/10/" + (+anio) : null}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row >
                        <Table.Cell>
                            Mantenimiento 1
                        </Table.Cell>
                        <Table.Cell>
                            {estimacionDTO?.totalMonto}
                        </Table.Cell>
                        <Table.Cell>
                            {anio != null ? "Del 01/01/" + (+anio) + " al 31/10/" + (+anio + 1) : null}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row >
                        <Table.Cell>
                            EsMantimiento 2
                        </Table.Cell>
                        <Table.Cell>
                            {estimacionDTO?.totalMonto}
                        </Table.Cell>
                        <Table.Cell>
                            {anio != null ? "Del 01/01/" + (+anio + 1) + " al 31/10/" + (+anio + 2): null}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            Establecimiento
                        </Table.Cell>
                        <Table.Cell>
                            {estimacionDTO?.totalMonto}
                        </Table.Cell>
                        <Table.Cell>
                            {anio != null ? "Del 01/01/" + (+anio + 2) + " al 31/10/" + (+anio + 3) : null}
                        </Table.Cell>
                    </Table.Row>

                </Table.Body>
            </Table>
        </>
    )
}
