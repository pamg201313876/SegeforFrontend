import React, { useState, useEffect } from 'react'
import { Button, Form, Icon, Popup, Segment, Table, TableBody, TableHeader, TextArea } from 'semantic-ui-react'
import DictamenJuridicoFormError from './DictamenJuridicoFormError';

type EnmiendasTable = {
    numero: number,
    descripcion: string
}

type Props = {
    tareaData: any
    setFormData: Function,
    formError: DictamenJuridicoFormError
}
export default function DictamenJuridico({
    tareaData,
    setFormData,
    formError
}: Props) {

    const [mostrarExpedientes, setMostrarExpedientes] = useState<boolean>(false);
    const [enmiendas, setEnmiendas] = useState<EnmiendasTable[]>([]);

    useEffect(() => {
        if (tareaData) {
            tareaData.ttSeguimientoTarea = {};
            //setTareaData(tareaData);
        }
    }, [tareaData])

    // handle click event of the Remove button
    const handleRemoveClick = (index: number) => {
        let list: EnmiendasTable[] = [];
        enmiendas.map((x) => {
            if (x.numero - 1 !== index) {
                x.numero = list.length + 1;
                list.push(x);
            }
        })
        setEnmiendas(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setEnmiendas([...enmiendas, { numero: enmiendas.length + 1, descripcion: '' }]);
    };

    // hande changes on input descripcion
    const handleInputChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const list = [...enmiendas];
        list[index]['descripcion'] = value;
        setEnmiendas(list);

        setFormData((oldValues: any) => ({
            ...oldValues,
            ['enmienda']: JSON.stringify(enmiendas, (key, value) => {
                if (key === "numero") return undefined;
                else return value;
            }),
        }));
    };

    const showEnmiendaForm = (e: any, data: any) => {
        if (data.checked == false) {
            let temporalArray: EnmiendasTable[] = [];
            setEnmiendas(temporalArray);
            tareaData.esEnmienda = 0;
        }
        else {
            tareaData.esEnmienda = 1;
        }
        setMostrarExpedientes(data.checked);
    }

    const handleChange = (e: any, { name, value }: any) => {
        tareaData.observaciones = value
        handleChangeSeguimiento(e, { name, value });
    }

    const handleAprobadoForm = (e: any, data: any) => {
        setFormData((oldValues: any) => ({
            ...oldValues,
            'aprobado': data.checked ? 1 : 0,
        }));
    }

    const handleChangeSeguimiento = (e: any, { name, value }: any) => {
        value = (e.target.type === 'number') ? parseInt(value) : value
        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }

        setFormData((oldValues: any) => ({
            ...oldValues,
            [name]: value,
        }));
    }

    const renderEnmiendas = () => {
        if (mostrarExpedientes) {
            return tablaEnmiendas();
        }
    }



    const tablaEnmiendas = () => {
        return (<>
            <Segment inverted color='blue' clearing >
                Liste las enmiendas que desea solicitar<Button floated='right' icon circular color='green' onClick={handleAddClick}><Icon name='plus' /></Button>
            </Segment>

            <Table>
                <TableHeader>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Descripcion</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </TableHeader>
                <TableBody>

                    {enmiendas.map((x, i) => {
                        return (
                            <React.Fragment key={x.numero}>
                                <Table.Row>
                                    <Table.Cell>{x.numero}</Table.Cell>
                                    <Table.Cell>
                                        <TextArea
                                            key={'descripcion' + x.numero}
                                            placeholder="Ingresar descripción de la enmienda"
                                            value={x.descripcion}
                                            onChange={e => handleInputChange(e, i)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell><Button floated='right' color="red" onClick={() => handleRemoveClick(i)}>Remover</Button></Table.Cell>
                                </Table.Row>
                            </React.Fragment>
                        );
                    })}

                </TableBody>
            </Table>
        </>)
    }


    return (
        <>


            <Form error={formError.isError}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="No. de dictamen"
                        placeholder="Número de dictamen"
                        name='numeroResolucion'
                        onChange={handleChangeSeguimiento}
                        error={formError ? formError.numeroResolucion : null}
                    />

                    <Form.Input
                        fluid
                        label="Iniciales procurador"
                        placeholder="Iniciales del procurador"
                        name='codigo'
                        icon={<Popup content='Opcional: use esta opción para agregar las iniciales del procurador en el número de dictamen. Un ejemplo de como quedará es: NO. DICTAMEN/INICIALES' trigger={<Icon name='question' inverted circular link />} />}
                        onChange={handleChangeSeguimiento}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Checkbox name='aprobado' toggle label='Aprobar' defaultChecked onChange={handleAprobadoForm} />
                </Form.Group>

                <Form.TextArea
                    label='Antecedentes'
                    name='antecedente'
                    onChange={handleChangeSeguimiento}
                    error={formError ? formError.antecedente : null}
                />

                <Form.TextArea
                    label='Fundamento legal'
                    name='fundamento'
                    onChange={handleChangeSeguimiento}
                    error={formError ? formError.fundamento : null}
                />

                <Form.TextArea
                    label='Análisis'
                    name='analisis'
                    onChange={handleChangeSeguimiento}
                    error={formError ? formError.analisis : null}
                />

                <Form.TextArea
                    label='Observaciones (dirigidas al director subregional o regional)'
                    name='observaciones'
                    onChange={handleChange}
                    // error={formError ? formError.observaciones : null}
                />
                <Form.Group>
                    <Form.Checkbox toggle label='¿Agregar Enmienda(s)?' onChange={showEnmiendaForm} />
                </Form.Group>
            </Form>

            <Form>
                {renderEnmiendas()}
            </Form>
        </>
    )
}