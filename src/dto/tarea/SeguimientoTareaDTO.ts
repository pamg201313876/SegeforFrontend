type SeguimientoTareaDTO = {
	analisis: string,
	antecedente: string,
    aprobado: number,
	codigo: string,
	enmienda: string,
	fundamentos?: string,
	fechaAdmision: string,
	fundamento: string,
	numeroResolucion: string,
	numeroProvidencia?: string,
	seguimientoTareaId: number,
    observaciones: string,
	agregarEnmienda?: boolean,
	fechaEmision?: string,
	fechaVencimiento?: string
}

export const createNew = (): SeguimientoTareaDTO => {
	return {
		analisis: '',
		antecedente: '',
        aprobado: 1,
		codigo: '',
		enmienda: '[]',
		fundamentos: '[]',
		fechaAdmision: new Date().toLocaleDateString('en-CA'),
		fundamento: '',
		numeroResolucion: '',
		numeroProvidencia: '',
		seguimientoTareaId: 0,
        observaciones: '',
		agregarEnmienda: false,
		fechaEmision: '',
		fechaVencimiento: ''
	}
}

export const createNewRegional = (): SeguimientoTareaDTO => {
	return {
		analisis: '',
		antecedente: '',
        aprobado: 1,
		codigo: '',
		enmienda: '[]',
		fundamentos: '[]',
		fechaAdmision: new Date().toLocaleDateString('en-CA'),
		fundamento: '',
		numeroResolucion: '',
		numeroProvidencia: '',
		seguimientoTareaId: 0,
        observaciones: '',
		agregarEnmienda: false,
		fechaEmision: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString(),
		fechaVencimiento: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
	}
}

export default SeguimientoTareaDTO