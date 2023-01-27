import GestionHasta90Api from 'api/latifoliado/hasta90/GestionHasta90Api';
import TareaApi from 'api/TareaApi';
import FormNumInput from 'components/FormNumInput';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button, Form, Header, Table } from 'semantic-ui-react';


type Props = {
    tareaData: any
    nextButtonRef: React.MutableRefObject<() => boolean>
}

type valor = {
    tareaId: number,
    descripcion: string
}

const tareaApi = new TareaApi();
const gestionApi = new GestionHasta90Api()

export default function Recomendaciones({
    tareaData,
    nextButtonRef
}: Props) {

    const [textos, setTextos] = useState<valor[]>([]);
    const [vigenciaAprovechamiento, setVigenciaAprovechamiento] = useState<number>(0)
    const [error, setError] = useState<string | null>()

    const onSave = (): boolean => {

        if (vigenciaAprovechamiento <= 0 || vigenciaAprovechamiento > 13) {
            console.log(vigenciaAprovechamiento)
            setError("Debe de ingresar una cantidad mayor a cero (0) o menor a trece (13)")
            return false
        }

        tareaData.ttSeguimientoTarea.area = vigenciaAprovechamiento.toString()
        tareaData.ttSeguimientoTarea.tab = 9
        tareaData.ttSeguimientoTarea.fundamento = JSON.stringify(textos)

        return true

    }

    const isSaveCallback = useCallback(onSave, [tareaData, textos, vigenciaAprovechamiento])

    useEffect(() => {
        nextButtonRef.current = isSaveCallback
    }, [nextButtonRef, isSaveCallback])

    useEffect(() => {
        const handleResponse = (response: any) => {
            if (response.status === "OK") {
                let gestion = response.data[0]
                console.log(gestion?.planificacionGestion?.vigencia)
                setVigenciaAprovechamiento(gestion?.planificacionGestion?.vigencia)
            }
        }

        const handleError = (error: any) => {
            console.log("error")
        }

        if (tareaData.ttSeguimientoTarea.area == null || tareaData.ttSeguimientoTarea.area == 0) {
            gestionApi.getGestion(tareaData.ttGestion.gestionId, handleResponse, handleError)
        }
        else {
            setVigenciaAprovechamiento(tareaData.ttSeguimientoTarea.area)
        }
    }, [tareaData])

    useEffect(() => {

        if (tareaData.ttSeguimientoTarea && tareaData.ttSeguimientoTarea.fundamento) {
            var array = JSON.parse(tareaData.ttSeguimientoTarea.fundamento);
            for (var x = 0; x < array.length; x++) {
                textos.push(array[x]);
            }
            setTextos([...textos])

        } else if (tareaData.ttSeguimientoTarea && tareaData.ttSeguimientoTarea.fundamento == null) {

            for (var x = 0; x < 8; x++) {

                var nuevoValor: valor = {
                    descripcion: "",
                    tareaId: tareaData.tareaId
                };

                switch (x) {

                    case 0:
                        nuevoValor.descripcion = "Se recomienda que la vigencia del aprovechamiento sea de 6 meses"
                        break;

                    case 1:
                        nuevoValor.descripcion = "El propietario debe aprovechar solo el volumen autorizado"
                        break;


                    case 2:
                        nuevoValor.descripcion = "El propietario debe aprovechar solo las especies autorizadas"
                        break;

                    case 3:
                        nuevoValor.descripcion = "La licencia forestal debe identificarse mediante un rótulo que contenga los datos generales de la misma"
                        break;

                    case 4:
                        nuevoValor.descripcion = "Las modificaciones al plan de manejo forestal aprobado deberán solicitarse por escrito para ser analizadas y resuletas por el INAB"
                        break;

                    case 5:
                        nuevoValor.descripcion = "Que el solicitante presente las constancias de las incripciones de las motosierras que se utilizarán en el aprovechamiento forestal"
                        break;

                    case 6:
                        nuevoValor.descripcion = "En cumplimiento del artículo 15 del Reglamento para el transporte de productos forestales y su procedencia Lícita se haga entrega de 52 notas de envío"
                        break;

                    case 7:
                        nuevoValor.descripcion = "Que el solicitante presente la propuesta de Regente Forestal"
                        break;
                }

                textos.push(
                    nuevoValor
                );
            }
            setTextos([...textos])
        }

    }, [tareaData])

    const onChange = (value: any, index: number) => {
        textos[index].descripcion = value
        setTextos([...textos]) //Para provocar nuevo render de la lista
    }

    const add = () => {
        textos.push({
            descripcion: "",
            tareaId: tareaData.tareaId
        })
        setTextos([...textos]) //Para provocar nuevo render de la lista
    }


    const remove = (index: number) => {
        textos.splice(index, 1);
        setTextos([...textos]) //Para provocar nuevo render de la lista
    }


    const renderBody = () => {

        if (textos.length === 0) {
            return (
                <Table.Row  >
                    <Table.Cell textAlign="center" colSpan={3} >
                        <Header as='h3' >
                            Sin datos que mostrar
                        </Header>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <>
                {textos.map((value: valor, index: number) => (
                    <Table.Row key={"r" + index} >
                        <Table.Cell>
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                            {index < 8 ?
                                <Form.Input readOnly value={value.descripcion} />
                                :
                                <Form.TextArea
                                    onChange={(_e: any, { value }) => onChange(value, index)}
                                    value={value.descripcion}
                                />
                            }
                        </Table.Cell>
                        <Table.Cell>
                            {index < 8 ? null : <Button id={index} onClick={() => remove(index)} color="red" icon={"delete"} ></Button>}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </>
        )
    }


    return (
        <>
            <Form>
                <Form.Button color="green" primary floated='right' onClick={add} icon="add" />
                <div style={{ marginBottom: "8px" }}>Lista de recomendaciones necesarias</div>
                <div style={{ marginBottom: "8px" }} >Para agregar presione sobre el botón con signo más</div>
                <FormNumInput
                    width="3"
                    label="Vigencia de aprovechamiento en meses"
                    value={vigenciaAprovechamiento}
                    error={error}
                    onBlur={(e: any) => setVigenciaAprovechamiento(e.target.value)} />
                <Form.Group>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>No.</Table.HeaderCell>
                                <Table.HeaderCell>Descripción</Table.HeaderCell>
                                <Table.HeaderCell>Eliminar</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {renderBody()}
                        </Table.Body>
                    </Table>
                </Form.Group>
            </Form>
        </>
    )
}
