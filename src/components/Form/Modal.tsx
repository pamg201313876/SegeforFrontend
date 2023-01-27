import React, { useState } from 'react'
import { Button, Modal as SModal, ModalProps } from 'semantic-ui-react'

type Props = {
	header?: string
	open: boolean
	closeModal: () => void
	children: any
} & ModalProps

export default function Modal({
	header,
	open,
	closeModal,
	children,
	...props
}: Props) {

	const [submitButton, setSubmitButton] = useState(null)

	return (
		<SModal {...props} open={open}>
			<SModal.Header >
				{header}
			</SModal.Header>
			<SModal.Content >
				<SModal.Description>
					{React.cloneElement(children, { setSubmitButton: setSubmitButton })}
				</SModal.Description>
			</SModal.Content>
			<SModal.Actions>
				{submitButton}
				<Button onClick={closeModal} >
					Cancelar
				</Button>
			</SModal.Actions>
		</SModal>
	)
}
