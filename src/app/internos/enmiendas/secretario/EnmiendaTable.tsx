import React from 'react';
import { Checkbox, Segment, Table } from 'semantic-ui-react';

type Props = {
	enmiendas: any,
	setEnmiendas: Function
}

export default function EnmiendasTable(props: Props) {
	
	const handleCheckChange = (_e: any, { name, checked }: any) => {        
        props.setEnmiendas((oldValues: any) => ({
			...oldValues,
			[name]: checked,
		}));
		
    }
    
    const renderBodyTable = () => {
        let list: JSX.Element[] = []
        let counter = 0;
		props.enmiendas.forEach((enmienda: { descripcion: string; enmiendaId: number; }) => {
            counter ++;
            list.push(
				<Table.Row key={counter}>
                    <Table.Cell>{counter}</Table.Cell>
                    <Table.Cell>{enmienda.descripcion}</Table.Cell>
                    <Table.Cell textAlign="center"><Checkbox onClick={handleCheckChange} name={"enmienda" + enmienda.enmiendaId}/> </Table.Cell>
                </Table.Row>
			)            
        });
        return list;
    }

    const renderTable = () => {
        let list: JSX.Element [] = []
            list.push(
                <Table  key="enmiendaTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}  textAlign="center" > No. </Table.HeaderCell>
                            <Table.HeaderCell width={8}  textAlign="center" > Descripción </Table.HeaderCell>
                            <Table.HeaderCell width={3} textAlign="center" >Seleccionar</Table.HeaderCell>
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
            {renderTable()}
        </Segment>
	)
}
