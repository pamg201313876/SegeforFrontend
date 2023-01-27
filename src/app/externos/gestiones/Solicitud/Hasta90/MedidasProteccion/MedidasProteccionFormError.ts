import CreateUpdateMedidasProteccionDTO from "dto/solicitud/Hasta90/CreateUpdateMedidasProteccionDTO";

type MedidasProteccionError = {
    isError : boolean
    isSaved : boolean
    recorridosPerimetrales: string | null
    recorridosInternos: string | null
    identificacionAreasCriticas: string | null
    construccionBrechasRondasPerimetrales: string | null
    construccionBrechasIntermedias: string | null
    manejoCombustibleSilviculturaPreventiva: string | null
    identificacionPuntosMonitoreo: string | null
    patrullajesMonitoreoTerrestre: string | null
    capacitacionPersonal: string | null
    equipacion: string | null
    medidasImplementarControlLiquidacionIncendios: string | null
    monitoreoEvaluacionIncendios: string | null
    medidasPrevencionContraPlagasEnfermedades: string | null
    medidasControlContraPlagasEnfermedades: string | null
    monitoreoPlagasEnfermedades: string | null
    otrasActividades: string | null
}

export const newMedidasProteccionError = () : MedidasProteccionError => {
    return {
        isError: false,
        isSaved: false,
        recorridosPerimetrales: null,
        recorridosInternos: null,
        identificacionAreasCriticas: null,
        construccionBrechasRondasPerimetrales: null,
        construccionBrechasIntermedias: null,
        manejoCombustibleSilviculturaPreventiva: null,
        identificacionPuntosMonitoreo: null,
        patrullajesMonitoreoTerrestre: null,
        capacitacionPersonal: null,
        equipacion: null,
        medidasImplementarControlLiquidacionIncendios: null,
        monitoreoEvaluacionIncendios: null,
        medidasPrevencionContraPlagasEnfermedades: null,
        medidasControlContraPlagasEnfermedades: null,
        monitoreoPlagasEnfermedades: null,
        otrasActividades: null,
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm = (createDto: CreateUpdateMedidasProteccionDTO) : MedidasProteccionError => {
    let formError = newMedidasProteccionError();
    validateRecorridosPerimetrales(createDto, formError);
    validateRecorridosInternos(createDto, formError);
    validateIdentificacionAreasCriticas(createDto, formError);
    validateConstruccionBrechasRondasPerimetrales(createDto, formError);
    validateConstruccionBrechasIntermedias(createDto, formError);
    validateManejoCombustibleSilviculturaPreventiva(createDto, formError);
    validateIdentificacionPuntosMonitoreo(createDto, formError);
    validatePatrullajesMonitoreoTerrestre(createDto, formError);
    validateCapacitacionPersonal(createDto, formError);
    validateEquipacion(createDto, formError);
    validateMedidasImplementarControlLiquidacionIncendios(createDto, formError);
    validateMedidasPrevencionContraPlagasEnfermedades(createDto, formError);
    validateMedidasControlContraPlagasEnfermedades(createDto, formError);
    validateMonitoreoPlagasEnfermedades(createDto, formError);
    validateOtrasActividades(createDto, formError);
    validateMonitoreoEvaluacionIncendios(createDto, formError);
    return formError;
}

const validateRecorridosPerimetrales = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.recorridosPerimetrales || createDto.recorridosPerimetrales.trim() === '') {
        formError.recorridosPerimetrales = noValueError;
        formError.isError = true;
    }
}

const validateRecorridosInternos = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.recorridosInternos || createDto.recorridosInternos.trim() === '') {
        formError.recorridosInternos = noValueError;
        formError.isError = true;
    }
}

const validateIdentificacionAreasCriticas = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.identificacionAreasCriticas || createDto.identificacionAreasCriticas.trim() === '') {
        formError.identificacionAreasCriticas = noValueError;
        formError.isError = true;
    }
}

const validateConstruccionBrechasRondasPerimetrales = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.construccionBrechasRondasPerimetrales || createDto.construccionBrechasRondasPerimetrales.trim() === '') {
        formError.construccionBrechasRondasPerimetrales = noValueError;
        formError.isError = true;
    }
}

const validateConstruccionBrechasIntermedias = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.construccionBrechasIntermedias || createDto.construccionBrechasIntermedias.trim() === '') {
        formError.construccionBrechasIntermedias = noValueError;
        formError.isError = true;
    }
}

const validateManejoCombustibleSilviculturaPreventiva = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.manejoCombustibleSilviculturaPreventiva || createDto.manejoCombustibleSilviculturaPreventiva.trim() === '') {
        formError.manejoCombustibleSilviculturaPreventiva = noValueError;
        formError.isError = true;
    }
}

const validateIdentificacionPuntosMonitoreo = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.identificacionPuntosMonitoreo || createDto.identificacionPuntosMonitoreo.trim() === '') {
        formError.identificacionPuntosMonitoreo = noValueError;
        formError.isError = true;
    }
}

const validatePatrullajesMonitoreoTerrestre = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.patrullajesMonitoreoTerrestre || createDto.patrullajesMonitoreoTerrestre.trim() === '') {
        formError.patrullajesMonitoreoTerrestre = noValueError;
        formError.isError = true;
    }
}

const validateCapacitacionPersonal = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.capacitacionPersonal || createDto.capacitacionPersonal.trim() === '') {
        formError.capacitacionPersonal = noValueError;
        formError.isError = true;
    }
}

const validateEquipacion = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.equipacion || createDto.equipacion.trim() === '') {
        formError.equipacion = noValueError;
        formError.isError = true;
    }
}

const validateMedidasImplementarControlLiquidacionIncendios = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.medidasImplementarControlLiquidacionIncendios || createDto.medidasImplementarControlLiquidacionIncendios.trim() === '') {
        formError.medidasImplementarControlLiquidacionIncendios = noValueError;
        formError.isError = true;
    }
}

const validateMedidasPrevencionContraPlagasEnfermedades = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.medidasPrevencionContraPlagasEnfermedades || createDto.medidasPrevencionContraPlagasEnfermedades.trim() === '') {
        formError.medidasPrevencionContraPlagasEnfermedades = noValueError;
        formError.isError = true;
    }
}

const validateMedidasControlContraPlagasEnfermedades = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.medidasControlContraPlagasEnfermedades || createDto.medidasControlContraPlagasEnfermedades.trim() === '') {
        formError.medidasControlContraPlagasEnfermedades = noValueError;
        formError.isError = true;
    }
}

const validateMonitoreoPlagasEnfermedades = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.monitoreoPlagasEnfermedades || createDto.monitoreoPlagasEnfermedades.trim() === '') {
        formError.monitoreoPlagasEnfermedades = noValueError;
        formError.isError = true;
    }
}

const validateOtrasActividades = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.otrasActividades || createDto.otrasActividades.trim() === '') {
        formError.otrasActividades = noValueError;
        formError.isError = true;
    }
}

const validateMonitoreoEvaluacionIncendios = (createDto: CreateUpdateMedidasProteccionDTO, formError: MedidasProteccionError) => {
    if (!createDto || !createDto.monitoreoEvaluacionIncendios || createDto.monitoreoEvaluacionIncendios.trim() === '') {
        formError.monitoreoEvaluacionIncendios = noValueError;
        formError.isError = true;
    }
}
export default MedidasProteccionError;