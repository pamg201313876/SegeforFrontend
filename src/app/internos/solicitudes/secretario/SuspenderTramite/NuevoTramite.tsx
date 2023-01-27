import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import React, { useState } from 'react';
import { Button, SemanticCOLORS } from 'semantic-ui-react';
import Expediente from './Expediente';
import ExpedienteFormError, { newExpedienteFormError } from './ExpedienteError';
import InvolucradoApi from './PaginationSuspensionTable/InvolucradoApi';
import PaginationSuspencionTable from './PaginationSuspensionTable/PaginationSuspencionTable';

type Props = {
	formData: any,
	setFormData: Function,
	formError: any,
	setOnCancel: (e: any) => void
}


export default function NuevoTramite(props: Props) {

	const [datos, setDatos] = useState<any[]>([])
	const [refresh, setRefresh] = useState<boolean>(true)
	const [formDataExpediente, setFormDataExpediente] = useState<any>({})
    const [formErrorExpediente, setFormErrorExpediente] = useState<ExpedienteFormError>(newExpedienteFormError())
	const [currentData, setCurrentData] = useState<any>()	

    const onCancelTramite = React.useCallback(props.setOnCancel != undefined ? props.setOnCancel : () => {} , []);
	const involucradoApi = new InvolucradoApi();

	var azul: SemanticCOLORS = 'blue';
    var gris: SemanticCOLORS = 'grey';
    
	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'nug' },
		{ header: "Propietario/Representante", name: 'tcPersonaCrea.personaDesc' },
        { header: "Fecha solicitud", name: 'fechaRegistro', isDate: true },
        { header: "Área", name: 'area' },
        { header: "Expediente", name: 'expediente'},
        { header: "Gestión", name: 'tcTipoGestion.tipoGestionDesc'}    
    ];

	const botonesBandeja : CTButton[] = [
        { id: "boton_puntero", icon:"hand point up outline", color: gris },
        { id: "boton_imprimir", icon:"print", color: azul },
    ];

	const onButtonClick = (buttonResponse: CTButtonResponse) => {
		var gestion: any = buttonResponse.rowData;
		if (buttonResponse.id === "boton_puntero") {
			console.log(gestion)
            setFormDataExpediente(gestion)
            setOpenExpediente(true)
        }
		setCurrentData(gestion)
    }

	const handleChange = (e: any, { name, value }: any) => {
		value = (e.target.type === 'number') ? parseInt(value) : value

		if (e.target.type === 'number' && isNaN(value)) {
			value = ""
		}

		props.setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
	}
    
	const [openExpediente, setOpenExpediente] = useState(false)
    
    const onCancel = () => {
        onCancelTramite(false);
	}
    
    const closeExpedienteDialog = () => {
		setOpenExpediente(false)
	}

	return (
		<>
			<Expediente open={openExpediente} closeModal={closeExpedienteDialog} setFormData={setFormDataExpediente} formData={formDataExpediente} formError={formErrorExpediente} setFormError={setFormErrorExpediente}/>
			<h4>Indique el NUG del trámite que desea suspender</h4>
			<Button color='red' style={{ "marginTop": "24px", "marginBottom": "12px" }} onClick={() => onCancel()} >Cancelar</Button>
		
			<PaginationSuspencionTable
			noAddButton
			reload={refresh}
			setReload={setRefresh}
			tipoBusquedaIdToFilter={3}
			columns={encabezadoBandeja}
			buttons={botonesBandeja}
			onButtonClick={onButtonClick}
			fetchDataFunction={involucradoApi.getPage2}
			/>		
		</>
	)

}
