import React, { useState, useEffect, ReactElement, useCallback } from 'react'
import { Button, Form, Header, Table } from 'semantic-ui-react'
import { tareaApi } from 'api';
import { subregionalApi } from 'api/latifoliado'
import { toLocalDateIsoString } from 'utils/UtilFunctions';
import PersonaAsignarTareaSelect from 'components/TipoNotificacionSelect/PersonaAsignarTareaSelect';


type Props = {
    tareaData: any
    setClose: () => void
}

type valor = {
    codigo: any,
    descripcion: string
}


export default function EnmiendaSubregional({
    tareaData,
    setClose,
}: Props) {

    const [listaAntecedentes, setListaAntecedentes] = useState<ReactElement[]>([]);
    const [textos, setTextos] = useState<valor[]>([]);
    const [oficio, setOficio] = useState("")
    const [personaJuridica, setPersonaJuridica] = useState<any>({})
    const [personaTecnica, setPersonaTecnica] = useState<any>({})
    const [providenciar, setProvidenciar] = useState<boolean>(true)
    const [loading, setLoading] = useState(false)
    const [previewLoading, setPreviewLoading] = useState(false)
    const [tareasPadre, setTareasPadre] = useState<any>()

    const handleChangeTextos = (e: any, { name, value }: any) => {
        var f: valor = {
            codigo: null,
            descripcion: value,
        }
        var xyz = textos;
        xyz[parseInt(name)] = f;
        setTextos(xyz)
    }

    const setTareaData = () => {
        let data = tareasPadre
        var codigo = null;
        var enmiendas: any[] = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].ttSeguimientoTarea.codigo == null) {
                codigo = data[i].ttSeguimientoTarea.numeroResolucion;
            } else {
                if (data[i].tcTask.taskId == 3) {
                    codigo = data[i].ttSeguimientoTarea.numeroResolucion + '/' + data[i].ttSeguimientoTarea.codigo;
                } else {
                    codigo = data[i].ttSeguimientoTarea.codigo;
                }
            }
            let row: any = {
                codigo: codigo,
                taskId: data[i].tcTask.taskId,
                tareaId: data[i].tareaId,
                personaId: data[i].tcPersonaAsignada.personaId,
                personaDesc: data[i].tcPersonaAsignada.personaDesc,
                enmienda: []
            };
            let enmienda = JSON.parse(data[i].ttSeguimientoTarea.enmienda);
            for (var j = 0; j < enmienda.length; j++) {
                var item = {
                    descripcion: enmienda[j].descripcion
                };
                row.enmienda.push(item);
            }
            enmiendas.push(row);
        }

        let fundamento: any = {
            codigo: null,
            enmienda: Array(...textos)
        }
        enmiendas.push(fundamento)

        tareaData.ttSeguimientoTarea = {
            codigo: oficio,
            fechaProvidencia: toLocalDateIsoString(new Date().toLocaleDateString('en-CA')),
            enmienda: JSON.stringify(enmiendas)
        }

        if (!providenciar) {
            tareaData.tcPersonaJuridico = personaJuridica;
            tareaData.tcPersonaTraslado = personaTecnica;
        }

        tareaData.aprobado = 2
        tareaData.nextActivityId = 8;
    }

    const save = () => {
        
        setTareaData()

        const HandleResponse = (response: any) => {
            setLoading(false)
            console.log(response)
            setClose()
            getVistaPrevia();

        }

        const HandleError = (error: any) => {
            setLoading(false)
            console.log("error")
            console.log(error)
        }

        setLoading(true)

        if (!providenciar) {
            tareaApi.postRatificacionTarea(tareaData, HandleResponse, HandleError); //da error en los 2, pero no es el mismo error.
        } else {
            tareaApi.postEnmiendaTarea(tareaData, HandleResponse, HandleError); //si funciona tanto en inab.gob.gt como aqui.
        }
    }

    const getVistaPrevia = () => {

        setTareaData()

        const HandleResponse = (response: any) => {
            setPreviewLoading(false)
            console.log(response.data)
        }

        const HandleError = (error: any) => {
            setPreviewLoading(false)
            console.log("error")
            console.log(error)
        }

        setPreviewLoading(true)
        subregionalApi.descargarEnmiendaSubregionalPreview(tareaData, HandleResponse, HandleError); //si funciona tanto en inab.gob.gt como aqui.
    }

    const handleChange = (e: any, { name, value }: any) => {
        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }
        if (name === "numeroOficio") {
            setOficio(value)
        }
    }

    const renderBody = () => {

        if (listaAntecedentes.length === 0) {
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
                {listaAntecedentes.map((value: ReactElement, index: number) => (
                    <Table.Row key={"r" + index} >
                        <Table.Cell>
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                            {value}
                        </Table.Cell>
                        <Table.Cell>
                            {<Button id={index} onClick={quit} color="red" icon={"delete"} ></Button>}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </>
        )
    }

    const add = () => {

        var lista2 = textos;
        lista2.push({
            codigo: null,
            descripcion: textos.length + "",
        })
        setTextos([...lista2])

        var lista = listaAntecedentes;
        lista.push(
            <Form.Input name={lista.length + ""} onChange={handleChangeTextos} />
        )
        setListaAntecedentes([...listaAntecedentes])

    }

    const quit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        var lista2 = textos;
        lista2.splice(parseInt(event.currentTarget.id), 1);
        setTextos([...lista2])
        var lista = listaAntecedentes;
        lista.splice(parseInt(event.currentTarget.id), 1);
        setListaAntecedentes([...listaAntecedentes])
    }

    const handleChangeJuridico = (e: any, { name, value }: any) => {
        setPersonaJuridica(value)
    }

    const handleChangeTecnico = (e: any, { name, value }: any) => {
        setPersonaTecnica(value)
    }

    const negarProvidenciar = () => {
        setProvidenciar(!providenciar)
    }

    const getTareasPadre = () => {

        tareaData.nextActivityId = 8;

        const HandleResponse = (response: any) => {
            setLoading(false)
            //UsarEndpoint(response.data)
            setTareasPadre(response.data)
        }

        const HandleError = (error: any) => {
            setLoading(false)
            console.log("error")
            console.log(error)
        }

        setLoading(true)
        tareaApi.getTareaPadreEnmienda(tareaData.tareaPadreId, HandleResponse, HandleError); //si funciona tanto en inab.gob.gt como aqui.

    }

    const getTareasPadreCallback = useCallback(getTareasPadre,[tareaData])

    useEffect(() => {
        getTareasPadreCallback()
    }, [getTareasPadreCallback])


    const renderButtons = () => {
        return (
            <div style={{ marginTop: "16px" }}>
                <Button floated="right" loading={loading} primary onClick={save}>
                    Notificar
                </Button>
                <Button floated="right" loading={previewLoading} color={'yellow'} onClick={getVistaPrevia}>
                    Vista Previa
                </Button>
            </div>)
    }

    return (
        <Form>
            {/* <Form.Button color="green" primary floated='right' onClick={negarProvidenciar} icon="add" >  Providenciar </Form.Button> */}
            <h4>
                {
                    !providenciar ?
                        "El siguiente paso es notificar al solicitante las enmiendas. ¿Quiere realizarlo ahora? Presione si, de lo contrario puede cancelar y regresar a la lista de tareas" :
                        "El siguiente paso es providenciar expediente para ratificar información"
                }
            </h4>
            <Form.Input
                label={!providenciar ? "No. Providencia" : "No. Oficio"}
                placeholder={!providenciar ? "No. Providencia" : "No. Oficio"}
                name="numeroOficio"
                width="2"
                onChange={handleChange}
                value={oficio}
                size={'small'}
                type={"number"}
            />
            <h4>{!providenciar ? "Por favor seleccione las personas que desea providenciar" : null}</h4>
            {!providenciar ?
                <Form.Group>
                    <PersonaAsignarTareaSelect
                        onChange={handleChangeJuridico}
                        perfilId={6}
                        subregionId={tareaData.ttGestion ? tareaData.ttGestion.tcSubregion.subregionId : 1}
                        value={personaJuridica}
                        name={"tcPersonaJuridico"}
                        label={"Seleccionar Persona Juridica"}
                        disabled={providenciar}

                    />
                    <PersonaAsignarTareaSelect
                        onChange={handleChangeTecnico}
                        perfilId={7}
                        subregionId={tareaData.ttGestion ? tareaData.ttGestion.tcSubregion.subregionId : 1}
                        value={personaTecnica}
                        name={"tcPersonaTraslado"}
                        label={"Seleccionar Persona Técnica"}
                        disabled={providenciar}
                    />
                </Form.Group>
                :
                null

            }
            <Form.Button color="green" primary floated='right' onClick={add} icon="add" />
            <h5> Si desea agregar más datos a la providencia, presiones sobre el botón con el signo más (+) </h5>
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
            {renderButtons()}
        </Form>
    )
}
