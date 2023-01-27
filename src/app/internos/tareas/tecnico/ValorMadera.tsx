import React, { useState, useEffect } from 'react'
import { Label, Table } from 'semantic-ui-react'
import {preciosApi} from 'api';
import { AxiosError } from 'axios'
import { formatDouble } from 'utils/UtilFunctions'


type Props = {
    tareaData: any
}


export default function ValorMadera({
    tareaData
}: Props) {

    const [turnos, setTurnos] = useState<any[]>([]);

    useEffect(() => {


        const handleResponse = (res: any) => {

            //console.log(res.data[0].detalleIntervencion.turnos)

            if (res.status === "OK") {
                setTurnos(res.data[0].turnos)
            }
            else {

            }
        }

        const handleError = (axiosError: AxiosError) => {

        }

        if (tareaData != null) {

            preciosApi.getPrecios(tareaData.ttGestion.gestionId, handleResponse, handleError)
            // planificacoinApi.getCalculos(tareaData.ttGestion.gestionId, handleResponse2, handleError2)
        }

    }, [tareaData])

    const leerTurnos = () => {

        const body: any[] = []

        console.log(turnos)

        if (turnos != null) {
            let i = 0;

            turnos.forEach((turno: any) => {
                body.push(leerEstratos(turno))
                i++
            });
        }

        return body;
    }


    const leerEstratos = (turno: any) => {

        const body: any[] = []

        if (turnos != null) {
            let i = 0;
            turno.estratos.forEach((estrato: any) => {
                body.push(leerEspecies(estrato, turno.turno, turno.anio, i))
                i++
            });
        }

        return body;
    }

    const leerEspecies = (estrato: any, turnoNum: number, turnoAnio: number, estratoN: number) => {


        const body: any[] = []

        if (estrato != null) {

            let i = 0;
            estrato.especies.forEach((especie: any) => {
                body.push(
                    <Table.Row active={estratoN % 2 === 0 ? true : false} key={"turno" + i}>
                        <Table.Cell>
                            {turnoNum}
                        </Table.Cell>

                        <Table.Cell>
                            {estrato.estrato}
                        </Table.Cell>

                        <Table.Cell>
                            {especie.tcEspecie.codigo}
                        </Table.Cell>

                        <Table.Cell>
                            {formatDouble(especie.troza)}
                        </Table.Cell>

                        <Table.Cell>
                            {formatDouble(especie.lenia)}
                        </Table.Cell>


                        <Table.Cell>
                            {formatDouble((especie.troza + especie.lenia))}
                        </Table.Cell>

                        <Table.Cell>
                            {formatDouble(especie.troza * especie.valorTroza)}
                        </Table.Cell>

                        <Table.Cell>
                            {formatDouble(especie.lenia * especie.valorLenia)}
                        </Table.Cell>


                        <Table.Cell>
                            {formatDouble(especie.troza * especie.valorTroza + especie.lenia * especie.valorLenia)}
                        </Table.Cell>

                        <Table.Cell>
                            {formatDouble((especie.troza * especie.valorTroza + especie.lenia * especie.valorLenia) * 0.1)}
                        </Table.Cell>

                    </Table.Row>
                )
                i++;
            });
        }


        return body;
    }

    return (
        <div style={{"marginBottom": "8px"}}>
            <Label>El titular de la licencia se obliga a pagar al fondo forestal privativo del INAB por concepto de derecho de corta un valor de 10806.25 correspondiente al primer turno de acuerdo al cuadro siguiente:</Label>
            <Label>Estimación del 10% del valor de la madera en Pie </Label>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Turno</Table.HeaderCell>
                        <Table.HeaderCell>Estrato</Table.HeaderCell>
                        <Table.HeaderCell>Especie</Table.HeaderCell>
                        <Table.HeaderCell>Troza</Table.HeaderCell>
                        <Table.HeaderCell>Leña</Table.HeaderCell>
                        <Table.HeaderCell>Volúmen Total (m3)</Table.HeaderCell>
                        <Table.HeaderCell>Troza (en pie (Q))</Table.HeaderCell>
                        <Table.HeaderCell>Leña  (en pie (Q))</Table.HeaderCell>
                        <Table.HeaderCell>Valor Total (Q)</Table.HeaderCell>
                        <Table.HeaderCell>10% a pagar (Q)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {leerTurnos()}
                </Table.Body>
            </Table>
        </div>
    )
}
