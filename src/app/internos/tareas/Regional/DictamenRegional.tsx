import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Segment, Table, TableBody, TableHeader, TextArea } from 'semantic-ui-react';
import SeguimientoTareaDTO from '../../../../dto/tarea/SeguimientoTareaDTO';
import EnmiendaTable, { Enmienda } from '../generales/EnmiendasTable';
import DictamenRegionalFormError from './DictamenRegionalFormError';

type ItemTable = {
    numero: number,
    descripcion: string
}

type Props = {
    tareaData: any
    gestionData: any
    seguimientoData: SeguimientoTareaDTO,
    setFormData: Function,
    formError: DictamenRegionalFormError
}
export default function DictamenRegional({
    tareaData,
    gestionData,
    seguimientoData,
    setFormData,
    formError
}: Props) {
    const [labelInputNumero, setLabelInputNumero] = useState<string>("No. de licencia");
    const [mostrarExpedientes, setMostrarExpedientes] = useState<boolean>(false);
    const [enmiendas, setEnmiendas] = useState<Enmienda[]>([]);
    const [fundamentos, setFundamentos] = useState<ItemTable[]>([]);
    const [aprobado, setAprobado] = useState<boolean>(true);
    const [agregarEnmiendas, setAgregarEnmiendas] = useState<boolean>(false);
    useEffect(() => {
        if (tareaData) {
            tareaData.ttSeguimientoTarea = {};
        }
    }, [tareaData])


    // handle click event of the Remove fundamento button
    const handleRemoveFundamentoClick = (index: number) => {
        let list: ItemTable[] = [];
        fundamentos.map((x) => {
            if (x.numero - 1 !== index) {
                x.numero = list.length + 1;
                list.push(x);
            }
        })
        setFundamentos(list);
    };

    // handle click event of the Add fundamento button
    const handleAddFundamentoClick = () => {
        setFundamentos([...fundamentos, { numero: fundamentos.length + 1, descripcion: '' }]);
    };

    const handleInputChangeFundamentos = (e: any, index: number) => {
        const { name, value } = e.target;
        const list = [...fundamentos];
        list[index]['descripcion'] = value;
        setFundamentos(list);

        setFormData((oldValues: any) => ({
            ...oldValues,
            'fundamentos': JSON.stringify(fundamentos, (key, value) => {
                if (key === "numero") return undefined;
                else return value;
            }),
        }));
    };

    const showEnmiendaForm = (e: any, data: any) => {
        console.log('showEnmiendaForm')
        toogleEnmienda(data.checked)
    }

    const toogleEnmienda = (flag: boolean) => {
        setAgregarEnmiendas(flag)

        if (flag === false) {
            let temporalArray: Enmienda[] = [];
            setEnmiendas(temporalArray);
        }
        else {
            toogleAprobado(false)
            setLabelInputNumero("No. de oficio")
        }

        setFormData((oldValues: any) => ({
            ...oldValues,
            'agregarEnmienda': flag,
        }));

        setMostrarExpedientes(flag);
    }

    const handleAprobadoForm = (e: any, data: any) => {
        console.log('handlAprobadoForm')
        toogleAprobado(data.checked)
    }

    const toogleAprobado = (flag: boolean) => {
        setAprobado(flag)

        if (flag) {
            toogleEnmienda(false)
            setLabelInputNumero("No. de licencia")
        }
        else {
            setLabelInputNumero("No. de Resolución")
        }

        setFormData((oldValues: any) => ({
            ...oldValues,
            'aprobado': flag ? 1 : 0,
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

    const convertDate = (date: any) => {
        let arr = date.split('T');
        console.log(arr)
        return arr[0]
    }

    const renderInputsExtra = () => {
        if (!mostrarExpedientes) {
            if (aprobado) {
                return inputsAprobado();
            }
            else if (!aprobado) {
                return inputsNoAprobado();
            }
        }
        return null
    }

    useEffect(() => {
        setFormData((oldValues: any) => ({
            ...oldValues,
            'enmienda': JSON.stringify(enmiendas),
        }));
    }, [enmiendas])

    const inputsAprobado = () => {
        return (<>
            <Form.Group widths="equal">
                <Form.Input
                    fluid
                    label="Años de vigencia"
                    placeholder="Años de vigencia"
                    value={gestionData && gestionData.planificacionGestion ? gestionData.planificacionGestion.aniosRevisionActualizacion : 10}
                    onChange={handleChangeSeguimiento}
                />
                <Form.Input
                    fluid
                    label="Fechas de emisión"
                    type="date"
                    value={convertDate(seguimientoData.fechaEmision)}//'2022-05-25'
                    name='fechaEmision'
                    onChange={handleChangeSeguimiento}
                    error={formError ? formError.fechaEmision : null}
                />
                <Form.Input
                    fluid
                    label="Fechas de vencimiento"
                    type="date"
                    value={convertDate(seguimientoData.fechaVencimiento)}
                    name='fechaVencimiento'
                    onChange={handleChangeSeguimiento}
                    error={formError ? formError.fechaVencimiento : null}
                />
            </Form.Group>
        </>)
    }

    const inputsNoAprobado = () => {
        return (<>
            <Segment inverted color='blue' clearing >
                Liste las condiciones y fundamentos en las que se basa su opinión<Button floated='right' icon circular color='green' onClick={handleAddFundamentoClick}><Icon name='plus' /></Button>
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

                    {fundamentos.map((x, i) => {
                        return (
                            <React.Fragment key={x.numero}>
                                <Table.Row>
                                    <Table.Cell>{x.numero}</Table.Cell>
                                    <Table.Cell>
                                        <TextArea
                                            key={'descripcion' + x.numero}
                                            placeholder="Ingresar descripción de la condición o fundamento"
                                            value={x.descripcion}
                                            onChange={e => handleInputChangeFundamentos(e, i)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell><Button floated='right' color="red" onClick={() => handleRemoveFundamentoClick(i)}>Remover</Button></Table.Cell>
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
                        label={labelInputNumero}
                        placeholder={labelInputNumero}
                        name='numeroResolucion'
                        onChange={handleChangeSeguimiento}
                        error={formError ? formError.numeroResolucion : null}
                    />
                    {!agregarEnmiendas &&
                        <Form.Input
                            fluid
                            label="No. de providencia"
                            placeholder="No. de providencia"
                            name='numeroProvidencia'
                            onChange={handleChangeSeguimiento}
                            error={formError ? formError.numeroProvidencia : null}
                        />
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Checkbox name='aprobado' toggle label='Aprobar' checked={aprobado} onChange={handleAprobadoForm} />
                </Form.Group>

                <Form.Group>
                    <Form.Checkbox name='agregarEnmienda' toggle label='¿Agregar Enmienda(s)?' checked={agregarEnmiendas} onChange={showEnmiendaForm} />
                </Form.Group>
            </Form>
            <Form>
                {mostrarExpedientes && <EnmiendaTable enmiendas={enmiendas} setEnmiendas={setEnmiendas} />}
                {renderInputsExtra()}
            </Form>
        </>
    )
}