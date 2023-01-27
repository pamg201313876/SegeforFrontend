type createUpdateCaracteristicasBiofisicasDTO = {
    elevacion: string,
    topografia: string,
    climaticas: string,
    hidrografia: string,
    bosques: string
}

export const createNew = (): createUpdateCaracteristicasBiofisicasDTO => {
    return {
        elevacion: "",
        topografia: "",
        climaticas: "",
        hidrografia: "",
        bosques: ""
    }
}

export default createUpdateCaracteristicasBiofisicasDTO