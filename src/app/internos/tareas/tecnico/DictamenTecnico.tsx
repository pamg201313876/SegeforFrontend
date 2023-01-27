import AprovechamientoApi from 'api/latifoliado/hasta90/AprovechamientoApi';
import GestionHasta90Api from 'api/latifoliado/hasta90/GestionHasta90Api';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Message, Table } from 'semantic-ui-react';
import { formatDouble } from 'utils/UtilFunctions';


type Props = {
    tareaData: any
}


const aprovechamientoApi = new AprovechamientoApi();
const gestionHasta90Api = new GestionHasta90Api();

export default function DictamenTecnico({
    tareaData
}: Props) {


    const [turnos, setTurnos] = useState<any>(null)
    const [tratamiento, setTratamiento] = useState<any>(null)
    var troza = 0;
    var lenia = 0;
    var total = 0;



    useEffect(() => {


        const handleResponse = (res: any) => {

            if (res.status === "OK") {
                console.log(res.data[0].detalleIntervencion.estratos)
                setTurnos(res.data[0].detalleIntervencion.estratos)
            }
            else {

            }
        }

        const handleError = (axiosError: AxiosError) => {

        }

        const handleResponse2 = (res: any) => {

            if (res.status === "OK") {
                let tratamiento = res.data[0]?.planificacionGestion?.tcTratamientoSilvicultural
                setTratamiento(tratamiento)
            }
        }

        if (tareaData != null) {

            aprovechamientoApi.getCalculos(tareaData.ttGestion.gestionId, handleResponse, handleError)
            gestionHasta90Api.getGestion(tareaData.ttGestion.gestionId, handleResponse2, handleError)
        }

    }, [tareaData])


    const leerTurnos = () => {

        const body: any[] = []

        console.log(turnos)

        if (turnos != null) {
            let i = 0;

            troza = 0;
            lenia = 0;
            total = 0;

            body.push(leerEstratos())
        }

        body.push(
            <Table.Row active key={"xxxxx"}>
                <Table.Cell textAlign="right"  colSpan="6">
                    Total
                </Table.Cell>
                <Table.Cell textAlign="right">
                    {formatDouble(troza)}
                </Table.Cell>

                <Table.Cell textAlign="right">
                    {formatDouble(lenia)}
                </Table.Cell>

                <Table.Cell textAlign="right">
                    {formatDouble(total)}
                </Table.Cell>
            </Table.Row>
        )

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
                    <Table.Row key={"turno" + i}  >
                        {
                            i === 0
                                ?
                                <>
                                    <Table.Cell textAlign="center" rowSpan={estrato.especies.length}>
                                        {estrato.turno}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" rowSpan={estrato.especies.length}>
                                        {estrato.estrato}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" rowSpan={estrato.especies.length}>
                                        {estrato.anio}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" rowSpan={estrato.especies.length}>
                                        {estrato.area}
                                    </Table.Cell>
                                </>
                                : null
                        }


                        <Table.Cell>
                            {especie.tcEspecie.nombreCientifico}
                        </Table.Cell>

                        <Table.Cell >
                            {tratamiento != null ? tratamiento.tratamientoSilviculturalDesc : ""}
                        </Table.Cell>

                        <Table.Cell textAlign="right">
                            {formatDouble((especie.porcentajeTroza / 100 * especie.volumenTotal))}
                        </Table.Cell>

                        <Table.Cell textAlign="right">
                            {formatDouble(((Math.abs((1 - especie.porcentajeTroza / 100) * especie.volumenTotal))))}
                        </Table.Cell>

                        <Table.Cell textAlign="right">
                            {especie.volumenTotal}
                        </Table.Cell>
                    </Table.Row>
                )
                i++;
                trozaSub = trozaSub + especie.porcentajeTroza / 100 * especie.volumenTotal;
                leniaSub = leniaSub + (Math.abs((1 - especie.porcentajeTroza / 100) * especie.volumenTotal))
                volSub = volSub + especie.volumenTotal;
            });
        }

        body.push(
            <Table.Row positive key={"turno"}>
                <Table.Cell textAlign="right" colSpan="6">
                    Subtotal
                </Table.Cell>

                <Table.Cell textAlign="right">
                    {formatDouble(trozaSub)}
                </Table.Cell>

                <Table.Cell textAlign="right">
                    {formatDouble(leniaSub)}
                </Table.Cell>

                <Table.Cell textAlign="right">
                    {formatDouble(volSub)}
                </Table.Cell>
            </Table.Row>
        )

        troza = troza + trozaSub;
        lenia = lenia + leniaSub;
        total = total + volSub;

        return body;
    }

    return (
        <>
            <Message >
                Con base a la revisión y análisis del expediente en estudio y a la comprobación de campo realizada por el suscrito,
                se recomienda la ejecución del Plan de Manejo Forestal, con un aprovechamiento de acuerdo al cuadro siguiente:
            </Message>
            <Table structured celled  >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Turno</Table.HeaderCell>
                        <Table.HeaderCell>Estrato</Table.HeaderCell>
                        <Table.HeaderCell>Año</Table.HeaderCell>
                        <Table.HeaderCell>Área (ha)</Table.HeaderCell>
                        <Table.HeaderCell>Especie</Table.HeaderCell>
                        <Table.HeaderCell>Tratamiento silvicultural</Table.HeaderCell>
                        <Table.HeaderCell>Troza (m<sup>2</sup>)</Table.HeaderCell>
                        <Table.HeaderCell>Leña (m<sup>2</sup>)</Table.HeaderCell>
                        <Table.HeaderCell>Volumen total (m<sup>2</sup>)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {leerTurnos()}
                </Table.Body>
            </Table>
        </>
    )
}
