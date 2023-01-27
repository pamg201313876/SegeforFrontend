type CreateUpdateSolicitudDTO = {	
    hectareas: number,
    idUsuarioSolicitante: number,
    idUsuarioElaborador: number,
    fechaCreacion: string    
}

let t = new Date();
const date = ('0' + t.getDate()).slice(-2);
const month = ('0' + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();

export const createNew = () : CreateUpdateSolicitudDTO => {
	return {
	
		hectareas: 0,
		idUsuarioElaborador: 0,
		idUsuarioSolicitante: 0,
		fechaCreacion: year+"-"+month+"-"+date,
		}
}


export default CreateUpdateSolicitudDTO