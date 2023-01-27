type createUpdateCaracteristicasFincaDTO = {

    /*
     Uso actual de la finca
    */
    areaTotal: number,
    forestal: number,
    agricultura: number,
    ganaderia: number,
    agroforestal: number,
    otros: number,
    //total: number,

    //faltan las imagenes no se como iran (mapa y coordenadas digitales)

    /*
        3.2 Bosques de la finca
    */

    subTipoBosque: number,
    estadoBosque: number,
    descripcionVegetacion: string,


    /*
        3.2.1 Division del bosque        
    */

    areaForestal: number,
    areaProduccion: number,
    areaProteccion: number,
    areaIntervenir: number,

    //pendientes 2 mapas en imagenes

    /** 
     * Especificacion de areas de proteccio
     * */ 
    
    pendiente: number,
    profundidad: number,
    pedregosidad: number,
    anegamiento: number,
    cuerposAgua: number,
    especiesProtegidas: number,
    sitiosSagrados: number,
    otrosProtecc: number,
    //otrosEspecificar: string,
    //totalProtecc: number,

    //falta mapa




}


export const createNew = (): createUpdateCaracteristicasFincaDTO => {
    return {
            /*
     Uso actual de la finca
    */
    areaTotal: 0,
    forestal: 0,
    agricultura: 0,
    ganaderia: 0,
    agroforestal: 0,
    otros: 0,
    //total: number,

    //faltan las imagenes no se como iran (mapa y coordenadas digitales)

    /*
        3.2 Bosques de la finca
    */

    subTipoBosque: 0,
    estadoBosque: 0,
    descripcionVegetacion: '',


    /*
        3.2.1 Division del bosque        
    */

    areaForestal: 0,
    areaProduccion: 0,
    areaProteccion: 0,
    areaIntervenir: 0,

    //pendientes 2 mapas en imagenes

    /** 
     * Especificacion de areas de proteccio
     * */ 
    
    pendiente: 0,
    profundidad: 0,
    pedregosidad: 0,
    anegamiento: 0,
    cuerposAgua: 0,
    especiesProtegidas: 0,
    sitiosSagrados: 0,
    otrosProtecc: 0,
    //otrosEspecificar: string,
    //totalProtecc: number,

    //falta mapa

    }
}

export default createUpdateCaracteristicasFincaDTO