export type Finca = {
	area: number,
	areaDocumento: number,
	direccion: string,
	estadoId: number,
	este: string,
	fincaDesc: string,
	gtmX: string,
	gtmY: string,
	municipioId: number | null,
	norte: string,
	oeste: string,
	sur: string,
	tcMunicipio: any
}

export const createNewFinca = (): Finca => {
	return (
		{
			area: 0,
			areaDocumento: 0,
			direccion: "",
			estadoId: 0,
			este: "",
			fincaDesc: "",
			gtmX: "",
			gtmY: "",
			municipioId: null,
			norte: "",
			oeste: "",
			sur: "",
			tcMunicipio: null
		}
	)
}

export default Finca