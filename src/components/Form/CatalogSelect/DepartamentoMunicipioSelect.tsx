import React, { useState, useEffect } from 'react'
import { Form as SForm, StrictFormFieldProps } from 'semantic-ui-react'
import { ControlProps } from '../Form'
import { Controller, useFormContext } from "react-hook-form";
import DepartamentoApi from 'api/catalogs/DepartamentoApi';
import MunicipioApi from 'api/catalogs/MunicipioApi'
import useFetchCatalog from 'hooks/useFetchCatalog'

type Props = {
	departamentoLabel?: string
	municipioLabel?: string
	departamentoPlaceholder?: string
	municipioPlaceholder?: string
} & ControlProps & StrictFormFieldProps

const departamentoApi = new DepartamentoApi()
const municipioApi = new MunicipioApi()

export default function DepartamentoMunicipioSelect({
	name,
	departamentoLabel = "Departamento",
	municipioLabel = "Municipio",
	departamentoPlaceholder = "Seleccionar departamento",
	municipioPlaceholder = "Seleccionar municipio",
	...inputProps
}: Props) {

	const [departamento, setDepartamento] = useState<number>()
	const { control, formState: { errors }, setValue, getValues } = useFormContext()
	const { catalog } = useFetchCatalog(departamentoApi.getList, "departamentoDesc", "departamentoId")
	const [municipioCatalog, setMunicipioCatalog] = useState<any[]>([])

	/**
	 * Acción a realizar en caso de cambio de departamento
	 * @param e Evento
	 * @param param1 
	 */
	const handleDepartamentoChange = (_e: any, { value }: any) => {
		setDepartamento(value)
		setMunicipioDefault()
	}

	/**
	 * Remueve el valor del municipio cuando el usuario cambia el departamento
	 */
	const setMunicipioDefault = () => {
		setValue(name, null)
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

	useEffect(() => {
		if (departamento != null) {
			const handleResponse = (list: any[]) => {
				updateMuniCatalog(list)
			}
			const handleError = () => { }
			municipioApi.getByDepartamentoId(departamento, handleResponse, handleError)

		}
	}, [departamento])

	/**
	 * Acción a realizar cuando se cambia un municipio
	 * @param value Municipio value
	 * @param onChange react hook form onChange function
	 */
	const handleSelectChange = (value: any, onChange: (value: any) => void) => {
		if (municipioCatalog != null) {
			let option: any = municipioCatalog.find((x: any) => x.value === value) //obteniendo el objeto completo
			if (option != null) {
				let object = option.object
				onChange(object)
			}
		}
	}

	//Esto solo se haría una vez ya que getValues no causa una reactualización
	useEffect(() => {
		let municipio = getValues(name) //obtener el valor por defecto
		if(municipio != null){
			setDepartamento(municipio ? municipio?.tcDepartamento?.departamentoId : 0)
		}
	}, [getValues, name])


	const render = ({ field: { name, onBlur, onChange, value } }: any) => {
		return (
			<>
				<SForm.Select
					{...inputProps}
					search
					options={catalog ? catalog : []}
					onChange={handleDepartamentoChange}
					value={departamento}
					// error={errors[name]?.message}
					label={departamentoLabel}
					placeholder={departamentoPlaceholder}
					selectOnBlur={false}
				/>
				<SForm.Select
					{...inputProps}
					search
					options={municipioCatalog ? municipioCatalog : []}
					name={name}
					onBlur={onBlur}
					onChange={(_e: any, { value }: any) => handleSelectChange(value, onChange)}
					label={municipioLabel}
					value={value != null ? value?.municipioId : 0}
					selectOnBlur={false}
					error={errors[name]?.message}
					placeholder={municipioPlaceholder}
				/>
			</>
		)
	}

	return (
		<Controller
			name={name}
			control={control}
			render={render}
		/>
	)
}
