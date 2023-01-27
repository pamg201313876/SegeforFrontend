import { TextArea } from 'components/TextArea';
import React, { useEffect } from 'react';
import { Button, Icon, Segment, Table } from 'semantic-ui-react';

export type Enmienda = {
    correlativo: number,
    descripcion: string
}

type Props = {
    enmiendas: Enmienda[]
    setEnmiendas: (enmiendas: Enmienda[]) => void
}

export default function EnmiendasTable({
    enmiendas,
    setEnmiendas
}: Props) {

    const onChange = (value: any, index: number) => {
        enmiendas[index].descripcion = value
        setEnmiendas([...enmiendas]) //Para provocar nuevo render de la lista
    }

    const add = () => {
        enmiendas.push({
            descripcion: "",
            correlativo: enmiendas.length
        })
        setEnmiendas([...enmiendas]) //Para provocar nuevo render de la lista
    }

    const remove = (index: number) => {
        enmiendas.splice(index, 1);
        setEnmiendas([...enmiendas]) //Para provocar nuevo render de la lista
    }

    useEffect(() => {
        enmiendas?.map((value: Enmienda, index: number) => (
            value.correlativo = index + 1
        ))
    }, [enmiendas])

    const renderBody = () => {
        return (
            <>
                {enmiendas.map((value: Enmienda, index: number) => (
                    <Table.Row key={"r" + index} >
                        <Table.Cell>
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                            <TextArea
                                onChange={(_e: any, { value }) => onChange(value, index)}
                                value={value.descripcion}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Button type="button" id={index} onClick={() => remove(index)} color="red" icon={"delete"} >Remover</Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </>
        )
    }


    return (
        <>
            <Segment inverted color='blue' clearing >
                Liste las enmiendas que desea solicitar
                <Button  type="button" placeholder="Agregar enmienda" floated='right' icon circular color='green' onClick={add}>
                    <Icon name='plus' />
                </Button>
            </Segment>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Descripción</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderBody()}
                </Table.Body>
            </Table>
        </>
    )
}
