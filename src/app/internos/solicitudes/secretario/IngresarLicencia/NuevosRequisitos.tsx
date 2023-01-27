import React, { ReactElement, useState } from 'react';
import { Button, Form, Header, Table } from 'semantic-ui-react';


type Props = {
	requisitos: any[],
    setRequisitos: Function
}

type valor = {
    correlativo: number,
    descripcion: string
}

export default function NuevosRequisitos({
    requisitos,
    setRequisitos
}: Props) {

    const [listaAntecedentes, setListaAntecedentes] = useState<ReactElement[]>([]);

    const handleChange = (e: any, { name, value }: any) => {
        var xyz = requisitos;
        xyz[parseInt(name)].descripcion = value;
        setRequisitos(xyz)
    }

    const add = () => {

        var lista2 = requisitos;
        lista2.push({
            descripcion: requisitos.length + "",
            correlativo: requisitos.length
        })
        setRequisitos([...lista2])

        var lista = listaAntecedentes;
        lista.push(
            <Form.TextArea name={lista.length + ""} onChange={handleChange} />
        )
        setListaAntecedentes([...listaAntecedentes])

    }


    const remove = (index: number) => {

        var lista2 = requisitos;

        lista2.splice(index, 1);

        setRequisitos([...lista2])

        var lista = listaAntecedentes;
   
        lista.splice(index, 1);

        setListaAntecedentes([...listaAntecedentes])


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
                            <Button id={index} onClick={() => remove(index)} color="red" icon={"delete"} ></Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </>
        )
    }


    return (
        <Form>
        {/* <Form.Button style={{ marginBottom: "16px" }} color="green" primary onClick={add} icon="add" /> */}
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>No.</Table.HeaderCell>
                    <Table.HeaderCell width={8}>Descripción</Table.HeaderCell>
                    <Table.HeaderCell width={3} >
                        <Button color='green' icon='plus' onClick={add}></Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {renderBody()}
            </Table.Body>
        </Table>
        </Form>
    )
}
