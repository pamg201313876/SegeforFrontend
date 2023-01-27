import React, { useCallback, useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'
import useFetchCatalog from 'hooks/useFetchCatalog'
import PaisApi from 'api/catalogs/PaisApi'
import DepartamentoApi from 'api/catalogs/DepartamentoApi'
import MunicipioApi from 'api/catalogs/MunicipioApi'

type Props = {
	municipioValue: any
	onChange: (e: any, { name, value }: any) => void
	paisLabel?: string
	paisError?: string | null
	
	departamentoLabel?: string
	departamentoName?: string
	departamentoError?: string | null
	
	municipioLabel?: string
	municipioName?: string
	municipioError?: string | null

	required?: boolean,
	upward?: boolean,
	disabled?: boolean
}

const paisApi = new PaisApi()
const departamentoApi = new DepartamentoApi()
const municipioApi = new MunicipioApi()

export default function PaisDepartamentoMunicipioSelect({
	municipioValue,
	onChange,
	paisLabel = "Pais",
	paisError = null,
	departamentoLabel = "Departamento",
	departamentoName = "Departamento",
	departamentoError = null,
	municipioLabel = "Municipio",
	municipioName = "municipioId",
	municipioError = null,
	required,
	upward,
	disabled
}: Props) {

	const { catalog } = useFetchCatalog(paisApi.getList, "paisDesc", "paisId")

	const [departamentoCatalog, setDepartamentoCatalog] = useState<any[]>([])
	const [municipioCatalog, setMunicipioCatalog] = useState<any[]>([])
	const [pais, setPais] = useState<number>()
	const [departamento, setDepartamento] = useState<number>()
	const [municipio, setMunicipio] = useState<number>()
	const onChangeCallback = useCallback(onChange, [])

	/**
	 * Acción a realizar en caso de cambio de pais
	 * @param e Evento
	 * @param param1 
	 */
	const handlePaisChange = (e: any, { value }: any) => {
		setPais(value)
		setDepartamento(0)
		setMunicipio(0)
		setMunicipioCatalog([])
		defaultChangeCallback(e)
	}

	/**
	 * Acción a realizar en caso de cambio de departamento
	 * @param e Evento
	 * @param param1 
	 */
	const handleDepartamentoChange = (e: any, { value }: any) => {
		setDepartamento(value)
		setMunicipio(0)
		defaultChangeCallback(e)
	}

	const defaultChangeCallback = (e: any) =>{
		let name = municipioName
		let value = 0
		let object = {}
		onChangeCallback(e, { name, value, object })
		
	}

	/**
	 * Se genera el catalogo de los departamentos provenientes del pais
	 * @param departamentos catalogo de departamentos
	 */
	const updateDeptoCatalog = (departamentos: any[]) => {
		let myCatalog = departamentos.map((departamento: any, i) => (
			{ key: i, text: departamento.departamentoDesc, object: departamento, value: departamento.departamentoId }
		))
		setDepartamentoCatalog(myCatalog)
	}


	/**
	 * Se genera el catalogo de los municipios provenientes del departamento
	 * @param municipios catalogo de municipios
	 */
	const updateMuniCatalog = (municipios: any[]) => {
		let myCatalog = municipios.map((municipio: any, i) => (
			{ key: i, text: municipio.municipioDesc, object: municipio, value: municipio.municipioId }
		))
		setMunicipioCatalog(myCatalog)
	}
	
	/**
	 * Acción a realizar en caso de cambio de municipio
	 * @param e Evento
	 * @param param1 Objeto que contiene el nombre y el valor a asignar
	 */
	const handleMunicipioChange = (e: any, { name, value }: any) => {
		setMunicipio(value)

		if (municipioCatalog != null) {
			let option: any = municipioCatalog.find((x: any) => x.value === value) //obteniendo el objeto completo
			if (option != null) {
				let object = option.object
				onChangeCallback(e, { name, value, object })
			}
		}
	}


	useEffect(() => {
		if(pais != null && pais != 0){
			const handleResponse = (list: any[]) => {
				updateDeptoCatalog(list)
			}
			const handleError = () => {}
			departamentoApi.getByPaisId(pais, handleResponse, handleError)
		}
	
	}, [pais])


	useEffect(() => {
		if(departamento != null && departamento != 0){
			const handleResponse = (list: any[]) => {
				updateMuniCatalog(list)
			}
			const handleError = () => {}
			
			municipioApi.getByDepartamentoId(departamento, handleResponse, handleError)
		}
	}, [departamento])

	useEffect(() => {
		setPais(municipioValue ? municipioValue?.tcDepartamento?.tcPais?.paisId : 0)
		setDepartamento(municipioValue ? municipioValue?.tcDepartamento?.departamentoId : 0)
		setMunicipio(municipioValue ? municipioValue?.municipioId : 0)
	}, [municipioValue])

	return (
		<>
			<Form.Select
				search
				options={catalog ? catalog : []}
				label={paisLabel}
				name="pais"
				value={pais}
				onChange={handlePaisChange}
				required={required}
				selectOnNavigation={false}
				upward={upward}
				error={paisError}
				disabled={disabled}
			/>
			<Form.Select
				search
				options={departamentoCatalog ? departamentoCatalog : []}
				label={departamentoLabel}
				name={departamentoName}
				value={departamento}
				selectOnNavigation={false}
				onChange={handleDepartamentoChange}
				required={required}
				upward={upward}
				error={departamentoError}
				disabled={disabled}
			/>

			<Form.Select
				search
				options={municipioCatalog ? municipioCatalog : []}
				label={municipioLabel}
				name={municipioName}
				value={municipio}
				selectOnNavigation={false}
				onChange={handleMunicipioChange}
				required={required}
				upward={upward}
				error={municipioError}
				disabled={disabled}
			/>
		</>
	)
}
