type createUpdateMedidasMitigacionDTO = {
    reserva: boolean,
    cortaLianas: boolean,
    delimitacionUnidadManejo: boolean,
    delimitacionAreasProduccion: boolean,
    manejoDesechosPreAprovechamiento: boolean,
    prevencionIncendios: boolean,
    prevencionPlagas: boolean,
    mantenimientoLinderos: boolean,
    talaDirigida: boolean,
    caminoSecundario: boolean,
    caminoArrastre: boolean,
    bacadilla: boolean,
    clarosTumba: boolean,
    maquinariaLiviana: boolean,
    arrastreTransporte: boolean,
    proteccionFuentesAgua: boolean,
    proteccionSitios: boolean,
    reservaArboles: boolean,
    manejoDesechosAprovechamiento: boolean,
    dispercionResiduos: boolean,
    cierreCaminos: boolean,
    tratamientosSilviculturales: boolean,
    repoblacionForestal: boolean,
    otrasActividades: string,
    ttGestion: any
}

export const createNew = (): createUpdateMedidasMitigacionDTO => {
    return {
        reserva: false,
        cortaLianas: false,
        delimitacionUnidadManejo: false,
        delimitacionAreasProduccion: false,
        manejoDesechosPreAprovechamiento: false,
        prevencionIncendios: false,
        prevencionPlagas: false,
        mantenimientoLinderos: false,
        talaDirigida: false,
        caminoSecundario: false,
        caminoArrastre: false,
        bacadilla: false,
        clarosTumba: false,
        maquinariaLiviana: false,
        arrastreTransporte: false,
        proteccionFuentesAgua: false,
        proteccionSitios: false,
        reservaArboles: false,
        manejoDesechosAprovechamiento: false,
        dispercionResiduos: false,
        cierreCaminos: false,
        tratamientosSilviculturales: false,
        repoblacionForestal: false,
        otrasActividades: "",
        ttGestion: null
    }
}

export default createUpdateMedidasMitigacionDTO