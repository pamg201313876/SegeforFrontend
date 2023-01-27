import { isBlankString, isNumber } from "utils/UtilFunctions";
import DocumentoFinca from "./DocumentoFinca";



type DocumentoFincaFormError = {
	isError: boolean,
	tcTipoPropiedad: string | null,
	fechaEmision: string | null
	numeroDocumento: string | null
	notario: string | null
	tcMunicipioEmite: string | null
	folio: string | null
	libro: string | null
	tcLibro: string | null
	propietarios: string | null
}

export const createFormError = (): DocumentoFincaFormError => {
	return {
		isError: false,
		tcTipoPropiedad: null,
		fechaEmision: null,
		numeroDocumento: null,
		notario: null,
		tcMunicipioEmite: null,
		folio: null,
		libro: null,
		tcLibro: null,
		propietarios: null
	}
}

const noValueError = "Este campo no puede ir vacio."

export const validateForm = (documentoFinca: DocumentoFinca): DocumentoFincaFormError => {

	let formError = createFormError()

	console.log(documentoFinca.tcTipoPropiedad)
	if (documentoFinca.tcTipoPropiedad === null) {
		formError.isError = true
		formError.tcTipoPropiedad = "Debe de seleccionar el tipo de documento"
		return formError
	}

	validateFechaEmision(documentoFinca, formError)
	validateNumeroDocumento(documentoFinca, formError)
	validateDocumentosActaTestimonio(documentoFinca, formError)
	validateDocumentosCertificado(documentoFinca, formError)
	return formError
}

const validateFechaEmision = (documentoFinca: DocumentoFinca, formError: DocumentoFincaFormError) => {

	if (isBlankString(documentoFinca.fechaEmision)) {
		formError.fechaEmision = noValueError
		formError.isError = true
	}

}

const validateNumeroDocumento = (documentoFinca: DocumentoFinca, formError: DocumentoFincaFormError) => {

	//Si el tipo de documento es de acta notarial no se toma en cuenta
	if (documentoFinca.tcTipoPropiedad.tipoPropiedadId === 2) {
		return
	}


	if (!isNumber(documentoFinca.numeroDocumento)) {
		formError.numeroDocumento = noValueError
		formError.isError = true
		return
	}

}

const validateDocumentosActaTestimonio = (documentoFinca: DocumentoFinca, formError: DocumentoFincaFormError) => {

	//Si el tipo de documento es de certificación no se toma en cuenta
	if (documentoFinca.tcTipoPropiedad.tipoPropiedadId === 3) {
		return
	}

	if (isBlankString(documentoFinca.notario)) {
		formError.notario = noValueError
		formError.isError = true
	}


	if (documentoFinca.tcMunicipioEmite === null) {
		formError.tcMunicipioEmite = noValueError
		formError.isError = true
	}

}

const validateDocumentosCertificado = (documentoFinca: DocumentoFinca, formError: DocumentoFincaFormError) => {

	//Si el tipo de documento no es de certificación no se toma en cuenta
	if (documentoFinca.tcTipoPropiedad.tipoPropiedadId !== 3) {
		return
	}

	if (!isNumber(documentoFinca.folio)) {
		formError.folio = noValueError
		formError.isError = true
	}

	if (isBlankString(documentoFinca.libro)) {
		formError.libro = noValueError
		formError.isError = true
	}

	if (documentoFinca.tcLibro === null) {
		formError.tcLibro = noValueError
		formError.isError = true
	}

}


export default DocumentoFincaFormError;