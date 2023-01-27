import FincaApi from 'api/FincaApi'
import GestionApi from 'api/GestionApi'
import FormModal from 'components/FormModal'
import React, { useEffect, useState } from 'react'
import AgregadoNotificacionForm from './AgregadoNotificacionForm'


type Props = {
	open: boolean
	closeModal: () => void
	gestion: any
	setNotificacionesTable: (x: any) => void	
};


export type NotificacionData = {
	departamentoDesc?: string,
	municipioId?: number | null,
	notificacionGestionDesc: string,
	tcMunicipio?: any,
	tcTipoNotificacion: any,
	ttGestion: any
}

const createNewNotificacion = () : NotificacionData => {
	return (
		{
			/*departamentoDesc: "",
			municipioId:null,	
			tcMunicipio:{},*/
			notificacionGestionDesc: "",
			tcTipoNotificacion:{},
			ttGestion: {}
		}
	)
}

export default function AgregadoNotificacion(props: Props) {	

	const fincaApi = new FincaApi()
	const gestionApi = new GestionApi()
	const [formData, setFormData] = useState<NotificacionData>(createNewNotificacion())

	const onSave= () => {	


		formData.ttGestion = props.gestion;
		
		//console.log(formData)

		

		const handleResponse = (response: any) => {

			if (response.data.status == "OK") {
				console.log(response)				
				//onAddFincaGestion(response.data.data[0].fincaId, response.data.data[0].fechaRegistro)	
				props.setNotificacionesTable(response.data.data[0])	
				props.closeModal()	
				
			} else {
				console.log("hubo un error guardando la finca")
				console.log(response)
			}
		}

		const handleError = (error: any) => {
			console.error(error)
		}

		gestionApi.agregarNotificacion(formData,handleResponse, handleError)
	}
	

	const onAddFincaGestion= (fincaId: number, fecha : string) => {		
		
		let finca = {
			fechaEmision: fecha ,
			tcFinca:{
				fincaId: fincaId
			},
			ttGestion: props.gestion
		}

		console.log(finca)

		const handleResponse = (response: any) => {

			if (response.data.status == "OK") {
				console.log(response)
				//props.setNotificacionesTable(response.data.data[0])
				props.closeModal()
			} else {
				console.log("hubo un error añadiendo la finca a gestion")				
			}
		}

		const handleError = (error: any) => {
			console.error(error)
		}

		gestionApi.agregarFinca(finca,handleResponse,handleError)
	}
    
	useEffect(() => {
		        
	}, [props.open])


	return (
		<>
			<FormModal header="Crear Finca" open={props.open} closeModal={props.closeModal} confirmLabel="Guardar" onSave={onSave} >
				<AgregadoNotificacionForm formData={formData} setFormData={setFormData} />
			</FormModal>
		</>
	)
}
