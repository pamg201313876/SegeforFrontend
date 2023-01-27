import SeguimientoTareaDTO from 'dto/tarea/SeguimientoTareaDTO';

type DictamenSubregionalFormError = {
    isError: boolean,
    enmienda: string | null,
	numeroResolucion: string | null
}

export const newDictamenSubregionalFormError = () : DictamenSubregionalFormError => {
    return {
        isError: false,
		enmienda: null,
		numeroResolucion: null
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm = (createDto: SeguimientoTareaDTO) : DictamenSubregionalFormError => {
    let formError = newDictamenSubregionalFormError();    
    validateEnmienda(createDto, formError);
    validateNumeroResolucion(createDto, formError);
    return formError;
}

const validateEnmienda = (createDto: SeguimientoTareaDTO, formError: DictamenSubregionalFormError) => {
    if (createDto.enmienda.trim() === '') {
        formError.enmienda = noValueError;
        formError.isError = true;
    }
}

const validateNumeroResolucion = (createDto: SeguimientoTareaDTO, formError: DictamenSubregionalFormError) => {
    if (createDto.numeroResolucion.trim() === '') {
        formError.numeroResolucion = noValueError;
        formError.isError = true;
    }
}

export default DictamenSubregionalFormError;