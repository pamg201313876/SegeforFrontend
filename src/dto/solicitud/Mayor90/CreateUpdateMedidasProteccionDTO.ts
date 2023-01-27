type createUpdateMedidasProteccionDTO = {
    justificacion: string
    cortafuego: string
    vigilancia: string
    combustible: string
    areaCritica: string
    respuestaIf: string
    ampliacionRonda: string
    rondaCortafuego: string
    rutaEscape: string
    justificacionPf: string
    monitoreoPlaga: string
    controlPlaga: string
    ttGestion: any
}

export const createNew = (): createUpdateMedidasProteccionDTO => {
    return {
        justificacion: "",
        cortafuego: "",
        vigilancia: "",
        combustible: "",
        areaCritica: "",
        respuestaIf: "",
        ampliacionRonda: "",
        rondaCortafuego: "",
        rutaEscape: "",
        justificacionPf: "",
        monitoreoPlaga: "",
        controlPlaga: "",
        ttGestion: null
    }
}

export default createUpdateMedidasProteccionDTO