import React from 'react'
import { Confirm } from 'semantic-ui-react'
import {  AxiosError } from 'axios';

type Props = {
	header: string
	entityId: number
	description: string
	open: boolean
	closeModal: () => void
	onSuccess: () => void
	deleteFunction : (
		id: number,
		onSuccess : () => void, 
		onError: (error: AxiosError) => void
	) =>  void
}

export default function DeleteModal({
	header,
	entityId,
	description,
	open,
	closeModal,
	onSuccess,
	deleteFunction
} : Props) {


	const onDeleteSuccess = () => {
		onSuccess();
		closeModal()
	}

	const onError = (error: AxiosError) => {
		console.log(error);
		
	}

	const onConfirm = () => {
		deleteFunction(
			entityId,
			onDeleteSuccess,
			onError
		);
	}

	const onCancel = () => {
		closeModal()
	}

	return (
		<div>
			<Confirm
				open={open}
				header={header}
				content={description}
				cancelButton='Cancelar'
				confirmButton="Confirmar"
				onConfirm={onConfirm}
				onCancel={onCancel}
			/>
		</div>
	)
}
