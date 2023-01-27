import React from 'react'
import { Button, Form, Segment, Table } from 'semantic-ui-react'

type Props = {
	requisitos: any[],
    setRequisitos: Function
}

export default function RequisitosAdicionalesTable(props: Props) {
    const [requisitosAdicionales, setRequisitosAdicionales] = React.useState<any> (props.requisitos)
    const [counter, setCounter] = React.useState<number> (0)

    const handleChange = (e: any) => {
        let name = e.target.name
        let value = e.target.value        
        props.setRequisitos((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
    }
    
    const onAdd = () => {
        let array = requisitosAdicionales;
        array.push({});
        setRequisitosAdicionales(array)
        setCounter(counter + 1 )
    }

    const onRemove = (id: number) => {
        let array : any [] = [];
        let i = 0;
        requisitosAdicionales.map((x: { id: number; }) => {
            i++;
            if (i !== id) {
                array.push(x)
            }
        })
        setRequisitosAdicionales(array)
        setCounter(counter - 1)
    }

    const renderBodyTable = () => {
        let list: JSX.Element[] = []
        let counter = 0;
        requisitosAdicionales.forEach((requisito: any) => {
            counter ++;
            list.push(
				<Table.Row  key={counter}>
                    <Table.Cell>{counter}</Table.Cell>
                    <Table.Cell>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.TextArea
                                    label='Descripción del requisito a completar'
                                    name={"requisito" + counter}
                                    onBlur={handleChange}
                                    defaultValue={requisito["requisito" + counter] ? requisito["requisito" + counter] : ``} 
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
                <Table  key="requisitosAdicionalesTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}  textAlign="center" > No. </Table.HeaderCell>
                            <Table.HeaderCell width={8}  textAlign="center" > Descripción </Table.HeaderCell>
                            <Table.HeaderCell width={3} textAlign="center" >
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

	//checked={cronogramaActivity.ene} onChange={handleCheckChange}/>

	return (
        <Segment>
            { counter >= 0 && renderTable()}
        </Segment>
	)
}
