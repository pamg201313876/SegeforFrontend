import SeguimientoTareaDTO from 'dto/tarea/SeguimientoTareaDTO';

type DictamenJuridicoFormError = {
    isError: boolean,
    analisis: string | null,
	antecedente: string | null,
	codigo: string | null,
	enmienda: string | null,
	fechaAdmision: string | null,
	fundamento: string | null,
	numeroResolucion: string | null,
	seguimientoTareaId: number | 0,
    observaciones: string | null
}

export const newDictamenJuridicoFormError = () : DictamenJuridicoFormError => {
    return {
        isError: false,
        analisis: null,
		antecedente: null,
		codigo: null,
		enmienda: null,
		fechaAdmision: null,
		fundamento: null,
		numeroResolucion: null,
		seguimientoTareaId: 0,
        observaciones: null
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm = (createDto: SeguimientoTareaDTO) : DictamenJuridicoFormError => {
    let formError = newDictamenJuridicoFormError();    
    validateAnalisis(createDto, formError);
    validateAntecedente(createDto, formError);
    // validateCodigo(createDto, formError);
    validateEnmienda(createDto, formError);
    validateFundamento(createDto, formError);
    validateNumeroResolucion(createDto, formError);
    // validateObservaciones(createDto, formError);
    return formError;
}

const validateAnalisis = (createDto: SeguimientoTareaDTO, formError: DictamenJuridicoFormError) => {
    if (createDto.analisis.trim() === '') {
        formError.analisis = noValueError;
        formError.isError = true;
    }
}

const validateAntecedente = (createDto: SeguimientoTareaDTO, formError: DictamenJuridicoFormError) => {
    if (createDto.antecedente.trim() === '') {
        formError.antecedente = noValueError;
        formError.isError = true;
    }
}

const validateCodigo = (createDto: SeguimientoTareaDTO, formError: DictamenJuridicoFormError) => {
    if (createDto.codigo.trim() === '') {
        formError.codigo = noValueError;
        formError.isError = true;
    }
}

const validateEnmienda = (createDto: SeguimientoTareaDTO, formError: DictamenJuridicoFormError) => {
    if (createDto.enmienda.trim() === '') {
        formError.enmienda = noValueError;
        formError.isError = true;
    }
}

const validateFundamento = (createDto: SeguimientoTareaDTO, formError: DictamenJuridicoFormError) => {
    if (createDto.fundamento.trim() === '') {
        formError.fundamento = noValueError;
        formError.isError = true;
    }
}

const validateNumeroResolucion = (createDto: SeguimientoTareaDTO, formError: DictamenJuridicoFormError) => {
    if (createDto.numeroResolucion.trim() === '') {
        formError.numeroResolucion = noValueError;
        formError.isError = true;
    }
}

const validateObservaciones = (createDto: SeguimientoTareaDTO, formError: DictamenJuridicoFormError) => {
    if (createDto.observaciones.trim() === '') {
        formError.observaciones = noValueError;
        formError.isError = true;
    }
}

export default DictamenJuridicoFormError;