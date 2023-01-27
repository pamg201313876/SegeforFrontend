import React, { useState, useEffect } from 'react'
import FormModal from 'components/FormModal'

import SeleccionPersonasForm from './SeleccionPersonasForm'

type Props = {
	open: boolean
	closeModal: () => void
	setSeleccionado: (e: number) => void
	ttGestion: any
	setPerson: (x: any) => void
	setRepre: (x: any) => void
	bandera: number
}

export default function Perfil(props: Props) {


	const [personSeleccionada, setPersonaSeleccionada] = useState<number>(0);


	useEffect(() => {
		if (props.open) {

		}
	}, [props.open])


	useEffect(() => {
		if (props.open) {

		}
	}, [props.open])


	if (props.open) {
		return (
			<FormModal noConfirmButton header="Buscar Persona" open={props.open} closeModal={props.closeModal}  >
				<SeleccionPersonasForm setRepre={props.setRepre} bandera={props.bandera} setPerson={props.setPerson} ttGestion={props.ttGestion} setSeleccionado={setPersonaSeleccionada} closeModal={props.closeModal} />
			</FormModal>
		)
	}

	return null
}
