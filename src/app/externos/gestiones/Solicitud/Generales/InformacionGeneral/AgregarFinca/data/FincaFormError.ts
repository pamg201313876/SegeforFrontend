import { isBlankString, isNumberOrEmpty } from "utils/UtilFunctions";
import Finca from "./Finca";



type FincaFormError = {
	isError: boolean,
	area: string | null,
	areaDocumento: string | null,
	direccion: string | null,
	este: string | null,
	fincaDesc: string | null,
	gtmX: string | null,
	gtmY: string | null,
	norte: string | null,
	oeste: string | null,
	sur: string | null,
	tcMunicipio: string | null
}

export const createFormError = (): FincaFormError => {
	return {
		isError: false,
		area: null,
		areaDocumento: null,
		direccion: null,
		este: null,
		fincaDesc: null,
		gtmX: null,
		gtmY: null,
		norte: null,
		oeste: null,
		sur: null,
		tcMunicipio: null
	}
}

const noValueError = "Este campo no puede ir vacio."

export const validateForm = (fincaData: Finca): FincaFormError => {

	let formError = createFormError()
	validateArea(fincaData, formError)
	validateAreaGPS(fincaData, formError)
	validateDireccion(fincaData, formError)
	validateCoordenadaX(fincaData, formError)
	validateCoordenadaY(fincaData, formError)
	validateNombreFinca(fincaData, formError)
	validateMunicipio(fincaData, formError)
	validateColidancias(fincaData, formError)
	return formError
}

const validateArea = (fincaData: Finca, formError: FincaFormError)  => {

	//si el área no es un número o es menor a 0
	if(!isNumberOrEmpty(fincaData.area) || fincaData.area <= 0){
		formError.area = "Área no válida"
		formError.isError = true
	}
	
}

const validateAreaGPS = (fincaData: Finca, formError: FincaFormError)  => {

	//si el área no es un número o es menor a 0
	if(!isNumberOrEmpty(fincaData.areaDocumento) || fincaData.areaDocumento <= 0){
		formError.areaDocumento = "Área no válida"
		formError.isError = true
	}

	//El área gps no puede ser mayor al área total indicada
	else if(fincaData.areaDocumento > fincaData.area){
		formError.areaDocumento = "Área GPS no puede ser mayor al área total"
		formError.isError = true
	}
	
}

const validateDireccion = (fincaData: Finca, formError: FincaFormError) => {

	if (isBlankString(fincaData.direccion)) {
		formError.direccion = noValueError
		formError.isError = true
	}

}

const validateCoordenadaX = (fincaData: Finca, formError: FincaFormError) => {

	if (!isNumberOrEmpty(fincaData.gtmX)) {
		formError.gtmX = noValueError
		formError.isError = true
		return
	}


	if(fincaData.gtmX.length !== 6){
		formError.gtmX = "Coordenada X debe de tener 6 dígitos"
		formError.isError = true
	}

}

const validateCoordenadaY = (fincaData: Finca, formError: FincaFormError) => {

	if (isBlankString(fincaData.gtmY)) {
		formError.direccion = noValueError
		formError.isError = true
	}


	if(fincaData.gtmY.length !== 7){
		formError.gtmY = "Coordenada Y debe de tener 7 dígitos"
		formError.isError = true
	}

}

const validateNombreFinca = (fincaData: Finca, formError: FincaFormError) => {

	if (isBlankString(fincaData.fincaDesc)) {
		formError.fincaDesc = noValueError
		formError.isError = true
	}

}

const validateMunicipio = (fincaData: Finca, formError: FincaFormError) => {
	if (fincaData.municipioId == null) {
		formError.tcMunicipio = noValueError
		formError.isError = true
	}
}

const	validateColidancias = (fincaData: Finca, formError: FincaFormError) => {

	if(isBlankString(fincaData.norte)){
		formError.norte = noValueError
		formError.isError = true
	}

	if(isBlankString(fincaData.sur)){
		formError.sur = noValueError
		formError.isError = true
	}

	if(isBlankString(fincaData.este)){
		formError.este = noValueError
		formError.isError = true
	}

	if(isBlankString(fincaData.oeste)){
		formError.oeste = noValueError
		formError.isError = true
	}

}
	 

export default FincaFormError;