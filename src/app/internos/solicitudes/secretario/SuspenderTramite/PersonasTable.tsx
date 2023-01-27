import React from 'react'
import { Button, Form, Segment, Table } from 'semantic-ui-react'

type Props = {
	personas: any,
    setPersonas: Function, 
    counter: number,
    setCounter: Function
}

export default function PersonasTable(props: Props) {
	const [personas, setPersonas] = React.useState<any> (props.personas)
    
    const handleChange = (e: any) => {
		let name = e.target.name
        let value = e.target.value

        props.setPersonas((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
    }
    
    const onAdd = () => {
        let array = personas;
        array.push({});
        setPersonas(array)
        props.setCounter(props.counter + 1 )
    }

    const onRemove = (id: number) => {
        let array : any [] = [];
        console.log(personas)
        let i = 0;
        personas.map((x: { id: number; }) => {
            i++;
            if (i !== id) {
                array.push(x)
            }
        })
        setPersonas(array)
        props.setCounter(props.counter - 1)
    }

    const renderBodyTable = () => {
        let list: JSX.Element[] = []
        let counter = 0;
        personas.forEach((requisito: any) => {
            counter ++;
            list.push(
				<Table.Row  key={counter}>
                    <Table.Cell>{counter}</Table.Cell>
                    <Table.Cell>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Nombre'
                                    name={"nombre" + counter}
                                    onBlur={handleChange}
                                    defaultValue={requisito["nombre" + counter] ? requisito["nombre" + counter] : ``} 
                                />
                            </Form.Group>
                        </Form>
                    </Table.Cell>
                    <Table.Cell>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='DPI'
                                    name={"dpi" + counter}
                                    onBlur={handleChange}
                                    defaultValue={requisito["dpi" + counter] ? requisito["dpi" + counter] : ``} 
                                />
                            </Form.Group>
                        </Form>
                    </Table.Cell>
                    <Table.Cell>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Teléfono'
                                    name={"telefono" + counter}
                                    onBlur={handleChange}
                                    type='number'
                                    defaultValue={requisito["telefono" + counter] ? requisito["telefono" + counter] : ``} 
                                />
                            </Form.Group>
                        </Form>
                    </Table.Cell>
                    <Table.Cell>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Correo'
                                    name={"correo" + counter}
                                    onBlur={handleChange}
                                    defaultValue={requisito["correo" + counter] ? requisito["correo" + counter] : ``} 
                                />
                            </Form.Group>
                        </Form>
                    </Table.Cell>
                    <Table.Cell>
                        <Button color='red' icon='minus'  onClick={ () => {onRemove(counter)}}>
                        </Button>
                    </Table.Cell>
                </Table.Row>
			)            
        });
        return list;
    }

    const renderTable = () => {
        let list: JSX.Element [] = []
            list.push(
                <Table key="personasTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}  textAlign="center" > No. </Table.HeaderCell>
                            <Table.HeaderCell width={2}  textAlign="center" > Nombre </Table.HeaderCell>
                            <Table.HeaderCell width={2}  textAlign="center" > DPI </Table.HeaderCell>
                            <Table.HeaderCell width={2}  textAlign="center" > Teléfono (Opcional) </Table.HeaderCell>
                            <Table.HeaderCell width={3}  textAlign="center" > Correo (Opcional) </Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign="center" >
                            <Button color='green' icon='plus' onClick={onAdd}></Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {renderBodyTable()}
                    </Table.Body>
                </Table>    
            )
        return list;
    }

	return (
        <Segment>
            { props.counter >= 0 && renderTable()}
        </Segment>
	)
}
