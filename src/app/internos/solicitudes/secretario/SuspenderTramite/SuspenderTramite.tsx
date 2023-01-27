import GestionApi from 'api/GestionApi';
import SuspensionApi from 'api/SuspensionApi';
import { AppDataContext } from 'app/App';
import AnexosTarea from 'app/BandejaTareas/AnexosTarea';
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import PaginationTable from 'components/PaginationTable';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, SemanticCOLORS } from 'semantic-ui-react';
import NuevoTramite from './NuevoTramite';

export default function SuspenderTramite() {

	const appDataContext = useContext(AppDataContext);
	const [datos, setDatos] = useState<any[]>([])
	const [refresh, setRefresh] = useState<boolean>(true)
	const [showTramite, setShowTramite] = useState<boolean>(false)
	const suspensionApi = new SuspensionApi()
	const [tokenData, setTokenData] = useState<any>({})

	const [formDataNuevoTramite, setFormDataNuevoTramite] = useState<any>({})
	const [formErrorNuevoTramite, setFormErrorNuevoTramite] = useState<any>({})
	const [openAnexos, setOpenAnexos] = useState<boolean>(false)
	const [anexosData, setAnexosData] = useState<any[]>([])	
	const [currentData, setCurrentData] = useState<any>()	
	const gestionApi = new GestionApi()
    
	var azul: SemanticCOLORS = 'blue';
    var celeste: SemanticCOLORS = 'teal';
    var gris: SemanticCOLORS = 'grey';
    
	const activateLoading = useCallback(appDataContext.activateLoading, [])
	const desactivateLoading = useCallback(appDataContext.desactivateLoading, [])
	const errorToast = useCallback(appDataContext.errorToast, [])

	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'ttGestion.nug' },
		{ header: "Solicitante", name: 'ttGestion.tcPersonaCrea.personaDesc' },
		{ header: "Área", name: 'ttGestion.area' },
        { header: "Tipo", name: 'ttGestion.tcPlanTipoGestion.planTipoGestionDesc' },
        { header: "Gestión", name: 'ttGestion.tcTipoGestion.tipoGestionDesc'},
        { header: "Fecha registro", name: 'fechaRegistro', isDate: true }
	];

	const botonesBandeja : CTButton[] = [
        { id: "boton_imprimir_plan", icon:"print", color: celeste },
        { id: "boton_imprimir_constancia", icon:"file pdf", color: gris },
        { id: "boton_anexos", icon:"file archive", color: azul },
    ];

	const onButtonClick = (buttonResponse: CTButtonResponse) => {
		var gestion: any = buttonResponse.rowData;
		if (buttonResponse.id === "boton_imprimir") {
            alert('imprimiendo')
        }
		else if (buttonResponse.id === "boton_anexos") {
			getOpenAnexos(buttonResponse.rowData)
		}
		setCurrentData(gestion)
	}

	
	const getOpenAnexos = ( data : any) => {

		const handleDataAnexos = (entity: any) => {
			if(entity.status === "OK"){
				setAnexosData(entity.data[0].anexo)			
				setOpenAnexos(true)				
			}else{
				errorToast("Error en la obtención de anexos de tarea")
			}
			desactivateLoading()
		}

		const errorDataAnexos = (error: any) => {
			console.log("Error al obtener los anexos de la tarea")
			desactivateLoading()
		}
		activateLoading("Cargando...")
		gestionApi.getGestionById(data.ttGestion.gestionId, handleDataAnexos, errorDataAnexos);
	}

	const onNew = () => {
		setShowTramite(true)
	}
	
	const onCancel = () => {
		setShowTramite(false)
	}

	useEffect(() => {
		let td = localStorage.getItem("tokenData")
		if (td != null) {
			td = JSON.parse(td)
			setTokenData(td)
			console.log(tokenData)
			console.log(td)
		}
	}, [])

	return (
		<>
			{!showTramite && 
				<AnexosTarea
				closeModal={() => { setOpenAnexos(false) }}
				open={openAnexos}
				anexosData={anexosData}
				setTareaData={setCurrentData}
			/>
			}
			{!showTramite && <Button  primary style={{ "marginTop": "12px", "marginBottom": "12px" }} onClick={() => onNew()} >Nuevo</Button>}
			{!showTramite && 
			<PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={1}
				elaboradorIdToFilter={3}  //subRegionReplace
				personaIdToFilter={tokenData.personaId}
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={suspensionApi.getPage}
			/>
			}

			{showTramite && <NuevoTramite setOnCancel={onCancel} formData={formDataNuevoTramite} setFormData={setFormDataNuevoTramite} formError={formErrorNuevoTramite}/>}
		</>
	)

}
