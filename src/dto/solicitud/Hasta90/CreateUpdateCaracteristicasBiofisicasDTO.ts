import ttGestion from '../../ttGestion';
type createUpdateCaracteristicasBiofisicasDTO = {
    biofisicaGestionId: Number
    clima: string
    elevacion: string
    hidrografia: string
    tipoBosque: string
    topografia: string
    zonaVida: string, 
    ttGestion: any
}

export const createNew = (): createUpdateCaracteristicasBiofisicasDTO => {
    return {
        biofisicaGestionId: 0,
        clima: "",
        elevacion: "",
        hidrografia: "",
        tipoBosque: "",
        topografia: "",
        zonaVida: "",
        ttGestion: null
    }
}

export default createUpdateCaracteristicasBiofisicasDTO