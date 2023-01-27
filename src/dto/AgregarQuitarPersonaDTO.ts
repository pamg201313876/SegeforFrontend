type AgregarQuitarPersonaDTO = {
    estadoId?: number, //solo para eliminar persona
    fechaRegistro?: string, //solo para eliminar persona
    personaGestionId?: number, //cambia por el numero de id de la person apara eliminar
    representanteLegal?: number, //0 o 1 
    soloRepresenta?: number,
    tcPersona?: any,
    ttGestion?: any,   
}

export default AgregarQuitarPersonaDTO;