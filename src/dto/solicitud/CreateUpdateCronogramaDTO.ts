import CronogramaDTO from "./CronogramaDTO"

type CreateUpdateCronogramaDTO = {
    cronogramas: CronogramaDTO[],
    ttGestion: any
}


export const createNew = (): CreateUpdateCronogramaDTO => {
    return {
        cronogramas: [],
        ttGestion: null
    }
}



export default CreateUpdateCronogramaDTO