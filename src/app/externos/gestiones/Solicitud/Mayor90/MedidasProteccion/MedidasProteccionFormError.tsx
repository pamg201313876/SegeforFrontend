import createUpdateMedidasProteccionDTO from "dto/solicitud/Mayor90/CreateUpdateMedidasProteccionDTO";

type MedidasProteccionError = {
    isError : boolean
    isSaved : boolean
    justificacion: string | null
    cortafuego: string | null
    vigilancia: string | null
    combustible: string | null
    areaCritica: string | null
    respuestaIf: string | null
    ampliacionRonda: string | null
    rondaCortafuego: string | null
    rutaEscape: string | null
    justificacionPf: string | null
    monitoreoPlaga: string | null
    controlPlaga: string | null
}

export const newMedidasProteccionError = () : MedidasProteccionError => {
    return {
        isError: false,
        isSaved: false,
        justificacion: null,
        cortafuego: null,
        vigilancia: null,
        combustible: null,
        areaCritica: null,
        respuestaIf: null,
        ampliacionRonda: null,
        rondaCortafuego: null,
        rutaEscape: null,
        justificacionPf: null,
        monitoreoPlaga: null,
        controlPlaga: null
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm2 = (createDto: createUpdateMedidasProteccionDTO) : MedidasProteccionError => {
    let formError = newMedidasProteccionError();
    validateJustificacion(createDto, formError);
    validateCortafuego(createDto, formError);
    validateVigilancia(createDto, formError);
    validateCombustible(createDto, formError);
    validateAreaCritica(createDto, formError);
    validateRespuestaIf(createDto, formError);
    validateAmpliacionRonda(createDto, formError);
    validateRondaCortafuego(createDto, formError);
    validateRutaEscape(createDto, formError);
    validateJustificacionPf(createDto, formError);
    validateMonitoreoPlaga(createDto, formError);
    validateControlPlaga(createDto, formError);
    return formError;
}

const validateJustificacion = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.justificacion || createDto.justificacion.trim() === '') {
        formError.justificacion = noValueError;
        formError.isError = true;
    }
}

const validateCortafuego = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.cortafuego || createDto.cortafuego.trim() === '') {
        formError.cortafuego = noValueError;
        formError.isError = true;
    }
}

const validateVigilancia = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.vigilancia || createDto.vigilancia.trim() === '') {
        formError.vigilancia = noValueError;
        formError.isError = true;
    }
}

const validateCombustible = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.combustible || createDto.combustible.trim() === '') {
        formError.combustible = noValueError;
        formError.isError = true;
    }
}

const validateAreaCritica = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.areaCritica || createDto.areaCritica.trim() === '') {
        formError.areaCritica = noValueError;
        formError.isError = true;
    }
}

const validateRespuestaIf = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.respuestaIf || createDto.respuestaIf.trim() === '') {
        formError.respuestaIf = noValueError;
        formError.isError = true;
    }
}

const validateAmpliacionRonda = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.ampliacionRonda || createDto.ampliacionRonda.trim() === '') {
        formError.ampliacionRonda = noValueError;
        formError.isError = true;
    }
}

const validateRondaCortafuego = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.rondaCortafuego || createDto.rondaCortafuego.trim() === '') {
        formError.rondaCortafuego = noValueError;
        formError.isError = true;
    }
}

const validateRutaEscape = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.rutaEscape || createDto.rutaEscape.trim() === '') {
        formError.rutaEscape = noValueError;
        formError.isError = true;
    }
}

const validateJustificacionPf = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.justificacionPf || createDto.justificacionPf.trim() === '') {
        formError.justificacionPf = noValueError;
        formError.isError = true;
    }
}

const validateMonitoreoPlaga = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.monitoreoPlaga || createDto.monitoreoPlaga.trim() === '') {
        formError.monitoreoPlaga = noValueError;
        formError.isError = true;
    }
}

const validateControlPlaga = (createDto: createUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.controlPlaga || createDto.controlPlaga.trim() === '') {
        formError.controlPlaga = noValueError;
        formError.isError = true;
    }
}
export default MedidasProteccionError;