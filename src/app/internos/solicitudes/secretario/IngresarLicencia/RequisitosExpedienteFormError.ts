import CreateRequisitoExpedienteDTO from '../../../../../dto/ingresarLicencia/CreateRequisitoExpedienteDTO';

type RequisitosExpedienteFormError = {
    isError: boolean,
    solicitudAutenticada: string | null,
    documentoOriginal: string | null,
	documentoIdentificacion: string | null,
	planManejoForestal: string | null,
	constanciaElaborador: string | null,
    nombre: string | null,
    cantidadFolios: string | null,
    numeroExpediente: string | null
}

export const newRequisitosExpedienteFormError = (): RequisitosExpedienteFormError => {
	return {
        isError: false,
        solicitudAutenticada: null,
        documentoOriginal: null,
        documentoIdentificacion: null,
        planManejoForestal: null,
        constanciaElaborador: null,
        nombre: null,
        cantidadFolios: null,
        numeroExpediente: null
	}
}

const noValueError = "Este campo no puede ir vacio."

export const validateForm = (createDto: CreateRequisitoExpedienteDTO): RequisitosExpedienteFormError => {
	console.log("RequisitosExpedienteFormError")
	console.log(createDto)
	let formError = newRequisitosExpedienteFormError();    
    validateNombre(createDto, formError);
    validateCantidadFolios(createDto, formError);
    validateNumeroExpediente(createDto, formError);
    return formError;
}
   

    const validateNombre = (createDto: CreateRequisitoExpedienteDTO, formError: RequisitosExpedienteFormError) => {
        if (!createDto || !createDto.nombre || createDto.nombre.trim() === '') {
            formError.nombre = noValueError;
            formError.isError = true;
        }
    }

    const validateCantidadFolios = (createDto: CreateRequisitoExpedienteDTO, formError: RequisitosExpedienteFormError) => {
        if (!createDto || !createDto.cantidadFolios || createDto.cantidadFolios < 0) {
            formError.cantidadFolios = noValueError;
            formError.isError = true;
        }
    }

    const validateNumeroExpediente = (createDto: CreateRequisitoExpedienteDTO, formError: RequisitosExpedienteFormError) => {
        if (!createDto || !createDto.numeroExpediente || createDto.numeroExpediente < 0) {
            formError.numeroExpediente = noValueError;
            formError.isError = true;
        }
    }

export default RequisitosExpedienteFormError