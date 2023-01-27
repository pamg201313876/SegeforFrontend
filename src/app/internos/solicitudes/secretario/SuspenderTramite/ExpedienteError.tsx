
type ExpedienteFormError = {
    isError: boolean,
    fechaIngreso: string | null
}

export const newExpedienteFormError = (): ExpedienteFormError => {
	return {
        isError: false,
        fechaIngreso: null	}
}

const noValueError = "Este campo no puede ir vacio."

export const validateForm = (createDto: any): ExpedienteFormError => {
	let formError = newExpedienteFormError();    
    validateFechaIngreso(createDto, formError);
    return formError;
}
   

    const validateFechaIngreso = (createDto: any, formError: ExpedienteFormError) => {
        if (!createDto || !createDto.fechaIngreso || createDto.fechaIngreso.trim() === '') {
            formError.fechaIngreso = noValueError;
            formError.isError = true;
        }
    }

export default ExpedienteFormError