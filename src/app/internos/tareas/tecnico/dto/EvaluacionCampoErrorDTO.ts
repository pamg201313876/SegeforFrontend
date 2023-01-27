import { Console } from "console"
import EvaluacionCampoDTO from "./EvaluacionCampoDTO"


type EvaluacionCampoErrorDTO = {
    isError: boolean,
    opinion: string | null,
    notas: string | null,
    dictamen: string | null
}

export const newEvaluacionCampoErrorDTO = (): EvaluacionCampoErrorDTO => {
    return {
       isError : false,
       dictamen: null,
       opinion: null,
       notas: null
    }
}

const noValueError = "Este campo no puede ir vacio."

export const validateEvaluacionCampoDTO = (createDto: EvaluacionCampoDTO): EvaluacionCampoErrorDTO => {
    let formError = newEvaluacionCampoErrorDTO()

    //validateOpinion(createDto, formError)  

    if( createDto.opinion === 1 ){ 
        validateNotas(createDto, formError)
    }      
    validateDictamen(createDto, formError)    
    return formError
}

const validateOpinion = (createDto: EvaluacionCampoDTO, formError: EvaluacionCampoErrorDTO) => {     
    if(!createDto.opinion){
        formError.opinion = noValueError
        formError.isError = true
    }
}

const validateNotas = (createDto: EvaluacionCampoDTO, formError: EvaluacionCampoErrorDTO) => {
    if(createDto.notas <= 0){
        formError.notas = 'Este valor debe ser mayor a 0'
        formError.isError = true
    }
}

const validateDictamen = (createDto: EvaluacionCampoDTO, formError: EvaluacionCampoErrorDTO) => {
    if(createDto.dictamen.trim() === ''){
        formError.dictamen = noValueError
        formError.isError = true
    }
}


export default EvaluacionCampoErrorDTO