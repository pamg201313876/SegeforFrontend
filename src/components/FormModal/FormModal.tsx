import React from 'react';
import { Button, Message, Modal } from 'semantic-ui-react'

type Props = {
	header: any
	open: boolean
	onSave?: () => void
	closeModal: () => void
	children: any
	cancelLabel?: string
	confirmLabel?: string
	size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
	scrollable?: boolean
	aditionalButtons?: () => JSX.Element
	noConfirmButton?: boolean
	noCancelButton?: boolean
	cancelButtonFloat?: 'left' | 'right'
	loading?: boolean
	error?: string | null
}

const FormModal = ({
	header,
	open,
	onSave,
	closeModal,
	children,
	cancelLabel = "Cancelar",
	confirmLabel = "Confirmar",
	size = "small",
	scrollable,
	aditionalButtons,
	noConfirmButton = false,
	noCancelButton = false,
	cancelButtonFloat,
	loading,
	error = null
}: Props) => {

	

	const handleSave = () => {
		if (loading != true) {
			onSave?.()
		}
	}

	return (
		<Modal open={open} size={size}>
			<Modal.Header >
				{header}
			</Modal.Header>
			<Modal.Content scrolling={scrollable}>
				<Message
					hidden={error == null}
					error
					content={error != null ? error : null}
				/>
				<Modal.Description>
					{children}
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				{!noCancelButton &&
					<Button floated={cancelButtonFloat} onClick={closeModal} >
						{cancelLabel}
					</Button>
				}
				{aditionalButtons ? aditionalButtons() : null}
				{!noConfirmButton &&
					<Button primary onClick={handleSave} loading={loading}>
						{confirmLabel}
					</Button>
				}
			</Modal.Actions>
		</Modal>
	)
}
export default FormModal
