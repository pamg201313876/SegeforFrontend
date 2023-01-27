type CreateBosqueFincaDTO = {
    //areaBosque: number,
    areaProteccion: number,
    areaProduccion: number,
    //areaIntervenir: number
}


export const createNewBosqueDTO = (): CreateBosqueFincaDTO => {
    return {
        //areaBosque: 0,
        areaProteccion: 0,
        areaProduccion: 0,
        //areaIntervenir: 0
    }
}



export default CreateBosqueFincaDTO