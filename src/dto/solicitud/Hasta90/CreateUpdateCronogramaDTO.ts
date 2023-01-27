type mesCronogramaDTO = {
    mes: number,
    activo: number,
    mostrar: boolean,
    esObligatorio: boolean
}

type actividadCronogramaDTO = {
    actividadDesc: string,
    obligatorio: string,
    esObligatorio: number,
    mes: mesCronogramaDTO[]
}

type createUpdateCronogramaDTO = {
    anio: number,
    actividad: actividadCronogramaDTO[]
}

export const createNewMes = (): mesCronogramaDTO => {
    return {
        mes: 0,
        activo: 0,
        mostrar: false,
        esObligatorio: false
    }
}

export const createNewActividad = (): actividadCronogramaDTO => {
    return {
        actividadDesc: "",
        obligatorio: "",
        esObligatorio: 0,
        mes: []
    }
}

export const createNew = (): createUpdateCronogramaDTO => {
    return {
        anio: 0,
        actividad: []
    }
}

export default createUpdateCronogramaDTO