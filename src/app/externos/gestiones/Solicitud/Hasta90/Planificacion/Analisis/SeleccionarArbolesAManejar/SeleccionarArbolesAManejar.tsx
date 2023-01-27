import BasicLabel from 'components/BasicLabel/BasicLabel'
import FormModal from 'components/FormModal'
import React, { useEffect, useState } from 'react'
import { Button, Icon, Message, Table } from 'semantic-ui-react'
import RegistroRow from './RegistroRow'

type Props = {
	open: boolean,
	closeModal: () => void,
	registros: any[],
	arbolesCalculados: number
}

export default function SeleccionarArbolesAManejar({
	open,
	closeModal,
	registros,
	arbolesCalculados
}: Props) {

	const [automaticSuccess, setAutomaticSuccess] = useState<boolean>(false)
	const [checkedList, setCheckedList] = useState<(boolean | null)[]>([])

	const setChecks = (value: boolean | null) => {
		for(let i = 0; i < checkedList.length; i++){
			checkedList[i] = value
		}
		setCheckedList(checkedList.slice())
		setAutomaticSuccess(false)
	}

	const handleCheckAll = () => {
		setChecks(true)
	}

	const handleAutomatic = () => {
		setChecks(false)
		for(let i = 0; i < arbolesCalculados; i++){
			checkedList[i] = true
		}
		setCheckedList(checkedList.slice())
		setAutomaticSuccess(true)
	}

	const handleUncheckAll = () => {
		setChecks(false)
	}

	const renderRows = () => {
		if(checkedList.length === 0){ return }
		let rows: any[] = []
		registros.forEach((registro, i) => {
			let row = <RegistroRow registro={registro} checkAll={checkedList[i]} />
			rows.push(row)
		});
		return rows
	}

	const handleClose = () =>{
		setChecks(null)
		closeModal()
	}

	useEffect(() => {
		let listChecked : (boolean | null)[]= []
		for (let _registro of registros) {
			listChecked.push(null)
		}
		setCheckedList(listChecked)
	}, [registros])


	if (registros != null) {
		return (
			<FormModal scrollable header={"Seleccionar arboles a extraer"}
				open={open}
				closeModal={handleClose}
				noConfirmButton
				cancelLabel="Salir"
			>
				<>
				<Message hidden={!automaticSuccess} icon success >
						<Icon name="check"/>
						Asignación automática realizada realizada
					</Message>
					<BasicLabel label="Arboles a extraer según cálculo:" value={arbolesCalculados}/>
					<Button primary icon labelPosition="right" onClick={handleAutomatic}>
						<Icon name="clipboard check"/>
						Asignación automática
					</Button>
					<Button.Group floated="right">
						<Button secondary onClick={handleCheckAll}>Seleccionar todos</Button>
						<Button.Or text="O"/>
						<Button negative onClick={handleUncheckAll}>Deseleccionar todos</Button>
					</Button.Group>
					<Table celled compact striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Número árbol</Table.HeaderCell>
								<Table.HeaderCell>DAP</Table.HeaderCell>
								<Table.HeaderCell>Altura</Table.HeaderCell>
								<Table.HeaderCell>AB</Table.HeaderCell>
								<Table.HeaderCell>Volumen</Table.HeaderCell>
								<Table.HeaderCell>Incluir</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{renderRows()}
						</Table.Body>
					</Table>
				</>
			</FormModal >
		)
	}

	return null;

}
