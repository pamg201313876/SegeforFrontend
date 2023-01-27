import { AxiosError } from 'axios';
import { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import PaginationTable from 'components/PaginationTable';
import React, { useEffect, useState } from 'react';
import { SemanticCOLORS } from 'semantic-ui-react';
import ExentoApi from '../../../api/ExentoApi';


export default function CargaInicialExento() {

	const [datos, setDatos] = useState<any[]>([])
	const [refresh, setRefresh] = useState<boolean>(true)
	const exentoApi = new ExentoApi()

	var rojo: SemanticCOLORS = 'red';

	const encabezadoBandeja: CTColumn[] = [
		{ header: "RNF", name: 'codigo' },
		{ header: "Solicitante", name: 'tcPersonaCrea.personaDesc' },
		{ header: "Fecha Ingreso", name: 'fechaIngreso', isDate: true },
		{ header: "Estado", name: 'estadoId' }
	];

	const botonesBandeja : CTButton[] = [
        { id: "boton_imprimir", label: "", icon:"file pdf", color: rojo },
	];

	const onButtonClick = (buttonResponse: CTButtonResponse) => {
		if (buttonResponse.id === "boton_imprimir") {
            alert('imprimiendo')
        }
	}
	
	useEffect(() => {

		if (!refresh) {
			return
		}

		const handleResponse = (lista: any[]) => {
			setDatos(lista)
			console.log(lista)
		}

		const handleError = (error: AxiosError) => {
			console.log("error")
		}

		let tokenData = localStorage.getItem("tokenData")

		if (tokenData != null) {
			/*let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
			console.log(tokenObj)

			let objFiltro: ObjFiltro = {
				fechaIni: "2020-12-05T05:59:59.000Z",
				fechaFin: "2021-12-30T05:59:59.000Z",
				estadoId: -1,
				elaboradorId: tokenObj.usuarioId,
			}

            exentoApi.obtenerListaExentos(objFiltro, handleResponse, handleError)*/
            
            let listData = [{"exentoId":1,"tcPersonaCrea":{"personaId":435,"personaDesc":"Lusvi Yaneth Hurtado Domingo","cui":1897730060107,"fechaVencimiento":"2021-11-03T00:00:00.000+00:00","tcMunicipio":{"municipioId":1,"municipioDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-26T13:31:14.000+00:00","tcDepartamento":{"departamentoId":1,"departamentoDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-25T20:05:56.000+00:00","tcPais":{"paisId":1,"paisDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-25T20:02:54.000+00:00"}},"codigo":101},"direccion":"18 avenida 37-00","telefono":"59261941","correo":"lhurtado@inab.gob.gt","foto":null,"tcUsuario":null,"fechaNacimiento":"1988-11-18T00:00:00.000+00:00","tcCultura":{"culturaId":3,"culturaDesc":"Maya","estadoId":1,"fechaRegistro":"2018-08-28T20:10:44.000+00:00"},"tcIdioma":{"idiomaId":8,"idiomaDesc":"Jakalteco o popti‘","estadoId":1,"fechaRegistro":"2018-10-18T14:53:00.000+00:00"},"tcEstadoCivil":{"estadoCivilId":1,"estadoCivilDesc":"Casado (a)","estadoId":1,"fechaRegistro":"2018-08-28T20:11:05.000+00:00"},"tcSexo":{"sexoId":1,"sexoDesc":"Femenino","estadoId":1,"fechaRegistro":"2019-09-13T10:44:03.000+00:00"},"estadoId":1,"fechaRegistro":"2021-01-18T13:55:19.000+00:00","confirmado":1,"passwordTmp":null,"nit":"54939925","fechaUltModif":null,"tcOcupacion":{"ocupacionId":3,"ocupacionDesc":"Dasónomo","estadoId":1,"fechaRegistro":"2019-08-01T16:46:01.000+00:00"},"sigla":null,"rfn":null,"rf":null,"tcUsuarioSubregion":null,"usuario":null},"fechaIngreso":"2021-01-18T20:01:39.000+00:00","fechaRegistro":"2021-01-18T14:41:39.000+00:00","estadoId":5,"codigo":"PV-12280","area":2.74,"tipoRegistroDesc":"Plantacion Voluntaria","tcTipoPropietario":{"tipoPropietarioId":1,"tipoPropietarioDesc":"Individual","estadoId":1,"fechaRegistro":"2018-09-06T14:29:57.000+00:00"},"tcSubregion":{"subregionId":1,"subregionDesc":"I-1","alias":"Metropolitana","estadoId":1,"fechaRegistro":"2018-09-04T13:32:49.000+00:00","codigo":1,"tcMunicipio":{"municipioId":1,"municipioDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-26T13:31:14.000+00:00","tcDepartamento":{"departamentoId":1,"departamentoDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-25T20:05:56.000+00:00","tcPais":{"paisId":1,"paisDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-25T20:02:54.000+00:00"}},"codigo":101},"tcRegion":{"regionId":1,"regionDesc":"I","alias":"Metropolitana","estadoId":1,"fechaRegistro":"2018-09-04T13:29:07.000+00:00","codigo":1,"tcMunicipio":{"municipioId":1,"municipioDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-26T13:31:14.000+00:00","tcDepartamento":{"departamentoId":1,"departamentoDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-25T20:05:56.000+00:00","tcPais":{"paisId":1,"paisDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-25T20:02:54.000+00:00"}},"codigo":101},"direccion":"INAB","regionReferenciaId":0},"direccion":"Direccion","tcSubregional":null,"subregionReferenciaId":0},"tcTipoGestion":{"tipoGestionId":6,"tipoGestionDesc":"Exentos de Licencias","tcModulo":{"moduloId":2,"moduloDesc":"Exentos","codigo":"2.1","estadoId":1,"fechaRegistro":"2018-08-29T19:59:09.000+00:00"},"codigo":"2.1.1","estadoId":1,"fechaRegistro":"2018-11-21T16:25:26.000+00:00"},"tcPersonaRecibe":{"personaId":109,"personaDesc":"Aqui Nombre Secretaria","cui":1234567890111,"fechaVencimiento":"2018-08-31T05:00:00.000+00:00","tcMunicipio":{"municipioId":118,"municipioDesc":"San Juan Comalapa","estadoId":1,"fechaRegistro":"2018-08-07T16:10:40.000+00:00","tcDepartamento":{"departamentoId":11,"departamentoDesc":"Chimaltenango","estadoId":1,"fechaRegistro":"2018-08-07T15:51:54.000+00:00","tcPais":{"paisId":1,"paisDesc":"Guatemala","estadoId":1,"fechaRegistro":"2018-07-25T20:02:54.000+00:00"}},"codigo":404},"direccion":"San Juan Comalapa","telefono":"12345678","correo":"secretaria@inab.gob.gt","foto":null,"tcUsuario":null,"fechaNacimiento":"1990-05-10T05:00:00.000+00:00","tcCultura":null,"tcIdioma":null,"tcEstadoCivil":null,"tcSexo":{"sexoId":1,"sexoDesc":"Femenino","estadoId":1,"fechaRegistro":"2019-09-13T10:44:03.000+00:00"},"estadoId":1,"fechaRegistro":"2018-09-03T13:19:39.000+00:00","confirmado":0,"passwordTmp":"","nit":"123457-7","fechaUltModif":null,"tcOcupacion":{"ocupacionId":2,"ocupacionDesc":"Estudiante","estadoId":1,"fechaRegistro":"2019-08-01T16:03:04.000+00:00"},"sigla":"","rfn":"RNF-1234","rf":null,"tcUsuarioSubregion":null,"usuario":null},"propietarios":null,"representantes":null,"fincas":null,"ttJuridicaExento":null,"notificaciones":null,"especies":null,"rodales":null,"ventas":null}]
            setDatos(listData);
		}else{
            console.error('No tokenData')
		}

		setRefresh(false)

	}, [refresh])

	return (
		<>
			<PaginationTable
				noAddButton
				reload={refresh}
				setReload={setRefresh}
				estadoIdToFilter={-1}
				columns={encabezadoBandeja}
				buttons={botonesBandeja}
				onButtonClick={onButtonClick}
				fetchDataFunction={exentoApi.getPage}
			/>
		</>
	)

}
