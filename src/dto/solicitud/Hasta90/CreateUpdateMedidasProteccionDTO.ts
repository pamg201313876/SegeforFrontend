type createUpdateMedidasProteccionDTO = {
    recorridosPerimetrales: string
    recorridosInternos: string
    identificacionAreasCriticas: string
    construccionBrechasRondasPerimetrales: string
    construccionBrechasIntermedias: string
    manejoCombustibleSilviculturaPreventiva: string
    identificacionPuntosMonitoreo: string
    patrullajesMonitoreoTerrestre: string
    capacitacionPersonal: string
    equipacion: string
    medidasImplementarControlLiquidacionIncendios: string
    monitoreoEvaluacionIncendios: string
    medidasPrevencionContraPlagasEnfermedades: string
    medidasControlContraPlagasEnfermedades: string
    monitoreoPlagasEnfermedades: string
    otrasActividades: string,
    ttGestion: any
}

export const createNew = (): createUpdateMedidasProteccionDTO => {
    return {
        recorridosPerimetrales: "",
        recorridosInternos: "",
        identificacionAreasCriticas: "",
        construccionBrechasRondasPerimetrales: "",
        construccionBrechasIntermedias: "",
        manejoCombustibleSilviculturaPreventiva: "",
        identificacionPuntosMonitoreo: "",
        patrullajesMonitoreoTerrestre: "",
        capacitacionPersonal: "",
        equipacion: "",
        medidasImplementarControlLiquidacionIncendios: "",
        monitoreoEvaluacionIncendios: "",
        medidasPrevencionContraPlagasEnfermedades: "",
        medidasControlContraPlagasEnfermedades: "",
        monitoreoPlagasEnfermedades: "",
        otrasActividades: "",
        ttGestion: null
    }
}

export default createUpdateMedidasProteccionDTO