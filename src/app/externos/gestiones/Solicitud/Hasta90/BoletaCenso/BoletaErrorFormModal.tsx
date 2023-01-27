import FormModal from 'components/FormModal'
import React from 'react'
import { Header, Table } from 'semantic-ui-react'

type Props = {
	open: boolean,
	closeModal: () => void,
	errors: string[]
}

export default function BoletaErrorFormModal({
	open,
	closeModal,
	errors
}: Props) {

	const renderRows = () => {

		let rows: any[] = []

		let i = 1;
		for (let error of errors) {
			let row =
				<Table.Row>
					<Table.Cell>{i++}</Table.Cell>
					<Table.Cell>{error}</Table.Cell>
				</Table.Row>

			rows.push(row)
		}

		return rows
	}

	return (
		<FormModal scrollable size="large" header={"Error al cargar boleta"} open={open} closeModal={closeModal} noConfirmButton cancelLabel="Salir" >
			<Header size="small"> Se encontraron los siguientes errores al subir la boleta de censo: </Header>
			<Table definition>
				<Table.Body>
					{renderRows()}
				</Table.Body>
			</Table>
		</FormModal>
	)
}
