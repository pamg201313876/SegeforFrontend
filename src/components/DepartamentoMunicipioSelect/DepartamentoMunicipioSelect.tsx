import DepartamentoApi from 'api/catalogs/DepartamentoApi'
import MunicipioApi from 'api/catalogs/MunicipioApi'
import useFetchCatalog from 'hooks/useFetchCatalog'
import React, { useCallback, useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'

type Props = {	
	municipioValue: any
	onChange: (e: any, { name, value }: any) => void
	departamentoLabel?: string
	municipioLabel?: string
	municipioName?: string
	municipioError?: string | null
	required?: boolean,
	upward?: boolean
}

const departamentoApi = new DepartamentoApi()
const municipioApi = new MunicipioApi()

export default function DepartamentoMunicipioSelect({	
	municipioValue,
	onChange,
	departamentoLabel = "Departamento",
	municipioLabel = "Municipio",
	municipioName = "municipio",
	municipioError = null,
	required,
	upward
}: Props) {

	const { catalog } = useFetchCatalog(departamentoApi.getList, "departamentoDesc", "departamentoId")

	const [municipioCatalog, setMunicipioCatalog] = useState<any[]>([])
	const [departamento, setDepartamento] = useState<number>()
	const [municipio, setMunicipio] = useState<number>()

	const onChangeCallback = useCallback(onChange, [])

	/**
	 * Acción a realizar en caso de cambio de departamento
	 * @param e Evento
	 * @param param1 
	 */
	const handleDepartamentoChange = (e: any, { value }: any) => {
		setDepartamento(value)
		setMunicipioDefault(e)
		defaultChangeCallback(e)
	}

	const defaultChangeCallback = (e: any) =>{
		let name = municipioName
		let value = 0
		let object = {}
		onChangeCallback(e, { name, value, object })
		
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
	 * Remueve el valor del municipio cuando el usuario cambia el departamento
	 * @param e Evento
	 */
	const setMunicipioDefault = (e: any) => {
		let name = municipioName
		let value = 0
		onChangeCallback(e, { name, value })
	}


	/**
	 * Acción a realizar en caso de cambio de municipio
	 * @param e Evento
	 * @param param1 Objeto que contiene el nombre y el valor a asignar
	 */
	const handleMunicipioChange = (e: any, { name, value }: any) => {
		if (municipioCatalog != null) {
			let option: any = municipioCatalog.find((x: any) => x.value === value) //obteniendo el objeto completo
			if (option != null) {
				let object = option.object
				onChangeCallback(e, { name, value, object })
			}
		}
	}



	useEffect(() => {
		if(departamento != null){
				const handleResponse = (list: any[]) => {
					updateMuniCatalog(list)
				}
				const handleError = () => {}
				municipioApi.getByDepartamentoId(departamento, handleResponse, handleError)

		}
	}, [departamento])


	useEffect(() => {		
		setDepartamento(municipioValue ? municipioValue?.tcDepartamento?.departamentoId : 0)
		setMunicipio(municipioValue ? municipioValue?.municipioId : 0)
	}, [municipioValue])


	return (
		<>
			<Form.Select
				search
				options={catalog ? catalog : []}
				label={departamentoLabel}
				name="departamento"
				value={departamento}
				onChange={handleDepartamentoChange}
				required={required}
				selectOnNavigation={false}
				upward={upward}
				error={municipioError}
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
			/>
		</>
	)
}
