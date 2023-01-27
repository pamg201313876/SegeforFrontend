import createUpdateMedidasMitigacionDTO from "dto/solicitud/Hasta90/CreateUpdateMedidasMitigacionDTO";


type MedidasMitigacionFormError = {
    isError : boolean
    isSaved : boolean
    otrasActividades: string | null
}

export const newMedidasMitigacionError = () : MedidasMitigacionFormError => {
    return {
        isError: false,
        isSaved: false,
        otrasActividades: null
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm = (createDto: createUpdateMedidasMitigacionDTO) : MedidasMitigacionFormError => {
    let formError = newMedidasMitigacionError();
    //validateObservaciones(createDto, formError);
    return formError;
}

const validateObservaciones = (createDto: createUpdateMedidasMitigacionDTO, formError: MedidasMitigacionFormError) => {
    if (!createDto || !createDto.otrasActividades || createDto.otrasActividades.trim() === '') {
        formError.otrasActividades = noValueError;
        formError.isError = true;
    }
}

export default MedidasMitigacionFormError;