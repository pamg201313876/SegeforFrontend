import React, { useContext, useEffect, useState } from 'react'
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import PaginationTable from 'components/PaginationTable';
import 'react-toastify/dist/ReactToastify.css';
import { AppDataContext } from 'app/App';
import ListadoEnmiendas from './ListadoEnmiendas';
import {enmiendasApi} from 'api';
import { subregionalApi } from 'api/latifoliado';

export default function Enmiendas() {

	const appDataContext = useContext(AppDataContext);
	const [refresh, setRefresh] = useState<boolean>(true)
	const [formDataEnmiendas, setFormDataEnmiendas] = useState<any>({})
	const [openListadoEnmiendas, setOpenListadoEnmiendas] = useState(false)
	const [currentData, setCurrentData] = useState<any>()

	const encabezadoBandeja: CTColumn[] = [
		{ header: "NUG", name: 'ttGestion.nug' },
		{ header: "Expediente", name: 'ttGestion.expediente' },
        { header: "Elaborador", name: 'ttGestion.tcElaborador.personaDesc' },
		{ header: "Fecha notificación", name: 'fechaRegistro', isDate: true },
		{ header: "Área", name: 'ttGestion.area' },
        { header: "Estado", name: '' },
		{ header: "Fecha aceptación", name: '' }
	];

	const botonesBandeja: CTButton[] = [
		{ id: "boton_ver_enmienda", icon: "truck", color: 'green' },
		{ id: "boton_recibir_enmienda", icon: "ordered list", color: 'grey' },
	];


	const onButtonClick = (buttonResponse: CTButtonResponse) => {
		var enmienda: any = buttonResponse.rowData;
		if (buttonResponse.id === "boton_ver_enmienda") {
			console.log(enmienda)
			const handleResponse = () => {
				appDataContext.desactivateLoading()
			}	
			const handleError = () => {
				appDataContext.desactivateLoading()
			}
			appDataContext.activateLoading()
			subregionalApi.descargarEnmiendaSubregional(enmienda.tareaId, handleResponse, handleError);
        }
		else if (buttonResponse.id === "boton_recibir_enmienda") {
            setOpenListadoEnmiendas(true);
		}
		setCurrentData(enmienda)
	}

	const closeListadoEnmiendasDialog = () => {
		setOpenListadoEnmiendas(false)
	}

	useEffect(() => {
		console.log('refresh')
		setRefresh(true)
	}, [])


	return (
		<>
			<ListadoEnmiendas refresh={refresh} setRefresh={setRefresh} open={openListadoEnmiendas} closeModal={closeListadoEnmiendasDialog} enmienda={currentData} setFormData={setFormDataEnmiendas} formData={formDataEnmiendas} />
			
            <PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
                subregionIdToFilter={1}
                estadoIdToFilter={1}
                fetchDataFunction={enmiendasApi.getPage}
			/>
		</>
	)

}
