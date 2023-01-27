import React from 'react'
import { Checkbox, Table } from 'semantic-ui-react'

type Props = {
	requisitos: any,
	setRequisitos: Function
}

export default function RequisitosTable(props: Props) {
	
	// const handleCheckChange = (_e: any, { name, checked }: any) => {        
    //     props.setRequisitos((oldValues: any) => ({
	// 		...oldValues,
	// 		[name]: checked,
	// 	}));
    // }

    const handleCheckChange = (_e: any, { name, checked }: any, requisito: any) => {
        if(checked){
            requisito.marcado = 1
        }
        else{
            requisito.marcado = 0
        }
        props.setRequisitos((oldValues: any) => ({
			...oldValues,
			[name]: checked,
		}));
    }
    
    const renderBodyTable = () => {
        let list: JSX.Element[] = []
        let counter = 0;
		props.requisitos.forEach((requisito: { requisitoDesc: string; requisitoId: number; }) => {
            counter ++;
            list.push(
				<Table.Row key={counter}>
                    <Table.Cell>{counter}</Table.Cell>
                    <Table.Cell>{requisito.requisitoDesc}</Table.Cell>
                    <Table.Cell textAlign="center"><Checkbox onClick={(_e: any, data: any) => handleCheckChange(_e, data, requisito)} name={"requisito" + requisito.requisitoId}/> </Table.Cell>
                </Table.Row>
			)            
        });
        return list;
    }

    const renderTable = () => {
        let list: JSX.Element [] = []
            list.push(
                <Table  key="requisitosTable">
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

	//checked={cronogramaActivity.ene} onChange={handleCheckChange}/>

	return (
        <>
            {renderTable()}
        </>
	)
}
