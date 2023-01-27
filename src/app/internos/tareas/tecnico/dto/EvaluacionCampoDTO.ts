type EvaluacionCampoDTO = {
	opinion: number,
	notas: number,
	dictamen: string
}


export const newEvaluacionCampoForm = (): EvaluacionCampoDTO => {
    return {
       dictamen : "",
       notas : 0,
       opinion : 0
    }
}


export default EvaluacionCampoDTO;