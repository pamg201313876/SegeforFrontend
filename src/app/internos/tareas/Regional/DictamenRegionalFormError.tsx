import SeguimientoTareaDTO from 'dto/tarea/SeguimientoTareaDTO';

type DictamenRegionalFormError = {
    isError: boolean,
    enmienda: string | null,
	numeroResolucion: string | null,
    numeroProvidencia: string | null,
    fechaEmision: string | null,
    fechaVencimiento: string | null
}

export const newDictamenRegionalFormError = () : DictamenRegionalFormError => {
    return {
        isError: false,
		enmienda: null,
		numeroResolucion: null,
        numeroProvidencia: null,
        fechaEmision: null,
        fechaVencimiento: null
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm = (createDto: SeguimientoTareaDTO, anios: number) : DictamenRegionalFormError => {
    let formError = newDictamenRegionalFormError(); 
    
    if(createDto.agregarEnmienda === true){
        validateNumeroResolucion(createDto, formError);
    }
    else if(createDto.aprobado === 0){
        validateNumeroResolucion(createDto, formError);
        validateNumeroProvidencia(createDto, formError);
    
    }
    else if(createDto.aprobado === 1){
        validateNumeroResolucion(createDto, formError);
        validateNumeroProvidencia(createDto, formError);
        validateFechas(createDto, formError, anios);  
    }
    return formError;
}

const validateNumeroProvidencia = (createDto: SeguimientoTareaDTO, formError: DictamenRegionalFormError) => {
    if (!(createDto.numeroProvidencia && createDto.numeroProvidencia.trim() !== '')) {
        formError.numeroProvidencia = noValueError;
        formError.isError = true;
    }
}

const validateNumeroResolucion = (createDto: SeguimientoTareaDTO, formError: DictamenRegionalFormError) => {
    if (createDto.numeroResolucion.trim() === '') {
        formError.numeroResolucion = noValueError;
        formError.isError = true;
    }
}

const validateFechas = (createDto: SeguimientoTareaDTO, formError: DictamenRegionalFormError, anios: number) => {
    if (createDto.fechaEmision && createDto.fechaEmision.trim() !== '') {
        let fechaEmision = new Date (createDto.fechaEmision)

        if (createDto.fechaVencimiento && createDto.fechaVencimiento.trim() !== '') {
            let fechaVencimiento = new Date (createDto.fechaVencimiento)
            if(fechaEmision <= fechaVencimiento){
                let fechaTmp = new Date (createDto.fechaEmision)
                fechaTmp.setDate(fechaTmp.getDate() - 1);
                fechaTmp.setMonth(fechaTmp.getMonth() + (12 * anios));
                if(fechaVencimiento <= fechaTmp){
                    formError.fechaVencimiento = "La fecha de vencimiento no posee una cantidad de años válida.";
                    formError.isError = true;  
                }
            }
            else{
                formError.fechaVencimiento = "La fecha de vencimiento debe ser mayor a la fecha de emisión.";
                formError.isError = true;            
            }
        }
        else{
            formError.fechaVencimiento = noValueError;
            formError.isError = true;        
        }
    }
    else {
        formError.fechaEmision = noValueError;
        formError.isError = true;    
    }
}

export default DictamenRegionalFormError;