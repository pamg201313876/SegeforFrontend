
import CreateUpdateCaracteristicasFincaDTO from 'dto/solicitud/Hasta90/CreateUpdateCaracteristicasFincaDTO';

type FincaError = {    
    isError : boolean
    isSaved : boolean
    areaTotal: string | null,
    forestal: string | null,
    agricultura: string | null,
    ganaderia: string | null,
    agroforestal: string | null,
    otros: string | null,
    //total: string | null,

    //faltan las imagenes no se como iran (mapa y coordenadas digitales)

    /*
        3.2 Bosques de la finca
    */

    subTipoBosque: string | null,
    estadoBosque: string | null,
    descripcionVegetacion: string | null,


    /*
        3.2.1 Division del bosque        
    */

    areaForestal: string | null,
    areaProduccion: string | null,
    areaProteccion: string | null,
    areaIntervenir: string | null,

    //pendientes 2 mapas en imagenes

    /** 
     * Especificacion de areas de proteccio
     * */ 
    
    pendiente: string | null,
    profundidad: string | null,
    pedregosidad: string | null,
    anegamiento: string | null,
    cuerposAgua: string | null,
    especiesProtegidas: string | null,
    sitiosSagrados: string | null,
    otrosProtecc: string | null,
    //otrosEspecificar: string,
    //totalProtecc: string | null,

    //falta mapa


}

export const newFincaError = () : FincaError => {
    return {
        isError: false,
        isSaved: false,
        areaTotal:  null,
        forestal:  null,
        agricultura:  null,
        ganaderia:  null,
        agroforestal:  null,
        otros:  null,
        //total:  null,
    
        //faltan las imagenes no se como iran (mapa y coordenadas digitales)
    
        /*
            3.2 Bosques de la finca
        */
    
        subTipoBosque:  null,
        estadoBosque:  null,
        descripcionVegetacion:  null,
    
    
        /*
            3.2.1 Division del bosque        
        */
    
        areaForestal:  null,
        areaProduccion:  null,
        areaProteccion:  null,
        areaIntervenir:  null,
    
        //pendientes 2 mapas en imagenes
    
        /** 
         * Especificacion de areas de proteccio
         * */ 
        
        pendiente:  null,
        profundidad:  null,
        pedregosidad:  null,
        anegamiento:  null,
        cuerposAgua:  null,
        especiesProtegidas:  null,
        sitiosSagrados:  null,
        otrosProtecc: null,
        //otrosEspecificar: string,
        //totalProtecc:  null,
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm = (createDto: CreateUpdateCaracteristicasFincaDTO) : FincaError => {
    let formError = newFincaError();

    validateDescripcion(createDto,formError)
    validateAreaTotal(createDto,formError)
    validateAgricultura(createDto,formError)
    validateGanaderia(createDto,formError)
    validateAgroforestal(createDto,formError)
    validateOtros(createDto,formError)
    validateAreaForestal(createDto,formError)
    validateAreaProduccion(createDto,formError)
    validateAreaProteccion(createDto,formError)
    validateAreaIntervenir(createDto,formError)
    validatePendiente(createDto,formError)
    validateProfundidad(createDto,formError)
    validatePedregosidad(createDto,formError)
    validateAnegamiento(createDto,formError)
    validateCuerposAgua(createDto,formError)
    validateEspeciesProtegidas(createDto,formError)
    validateSitiosSagrados(createDto,formError)
    validateOtrosProtecc(createDto,formError)  
    validateForestal(createDto,formError)  

    return formError;
}

const validateDescripcion = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.descripcionVegetacion.trim() === '') {
        formError.descripcionVegetacion = noValueError;
        formError.isError = true;
    }
}

const validateForestal = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.forestal === 0) {
        formError.forestal = noValueError;
        formError.isError = true;
    }
}

const validateAreaTotal = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.areaTotal === 0) {
        formError.areaTotal = noValueError;
        formError.isError = true;
    }
}

const validateAgricultura = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.agricultura === 0) {
        formError.agricultura = noValueError;
        formError.isError = true;
    }
}

const validateGanaderia = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.ganaderia === 0) {
        formError.ganaderia = noValueError;
        formError.isError = true;
    }
}


const validateAgroforestal = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.agroforestal === 0) {
        formError.agroforestal = noValueError;
        formError.isError = true;
    }
}

const validateOtros = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.otros === 0) {
        formError.otros = noValueError;
        formError.isError = true;
    }
}

const validateAreaForestal = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.areaForestal === 0) {
        formError.areaForestal = noValueError;
        formError.isError = true;
    }
}

const validateAreaProduccion= (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.areaProduccion === 0) {
        formError.areaProduccion = noValueError;
        formError.isError = true;
    }
}

const validateAreaProteccion = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.areaProteccion === 0) {
        formError.areaProteccion = noValueError;
        formError.isError = true;
    }
}

const validateAreaIntervenir= (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.areaIntervenir === 0) {
        formError.areaIntervenir = noValueError;
        formError.isError = true;
    }
}


const validatePendiente= (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.pendiente === 0) {
        formError.pendiente = noValueError;
        formError.isError = true;
    }
}

const validateProfundidad = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.profundidad === 0) {
        formError.profundidad = noValueError;
        formError.isError = true;
    }
}

const validatePedregosidad= (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.pedregosidad === 0) {
        formError.pedregosidad = noValueError;
        formError.isError = true;
    }
}

const validateAnegamiento = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.anegamiento === 0) {
        formError.anegamiento = noValueError;
        formError.isError = true;
    }
}

const validateCuerposAgua = (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.cuerposAgua === 0) {
        formError.cuerposAgua = noValueError;
        formError.isError = true;
    }
}

const validateEspeciesProtegidas= (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.especiesProtegidas === 0) {
        formError.especiesProtegidas = noValueError;
        formError.isError = true;
    }
}

const validateSitiosSagrados= (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.sitiosSagrados === 0) {
        formError.sitiosSagrados = noValueError;
        formError.isError = true;
    }
}

const validateOtrosProtecc= (createDto: CreateUpdateCaracteristicasFincaDTO, formError: FincaError) => {
    if (createDto.otrosProtecc === 0) {
        formError.otrosProtecc = noValueError;
        formError.isError = true;
    }
}




export default FincaError;