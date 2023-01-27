export type DocumentoFinca = {
	fincaGestionId: number,
	tcTipoPropiedad: any,
	fechaEmision: string
	numeroDocumento: number
	notario: string
	tcMunicipioEmite: any
	folio: number
	libro: string
	tcLibro: any
}

export const nuevo = (): DocumentoFinca => {
	return (
		{
			fincaGestionId: 0,
			tcTipoPropiedad: null,
			fechaEmision: "",
			numeroDocumento: 0,
			notario: "",
			tcMunicipioEmite: null,
			folio: 0,
			libro: "",
			tcLibro: null
		}
	)
}

export default DocumentoFinca