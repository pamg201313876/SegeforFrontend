type CreateRequisitoExpedienteDTO = {
    solicitudAutenticada: boolean,
    documentoOriginal: boolean,
	documentoIdentificacion: boolean,
	planManejoForestal: boolean,
	constanciaElaborador: boolean,
    nombre: string,
    cantidadFolios: number,
    numeroExpediente: number
}


export const createNew = (): CreateRequisitoExpedienteDTO => {
	return {
        solicitudAutenticada: false,
        documentoOriginal: false,
        documentoIdentificacion: false,
        planManejoForestal: false,
        constanciaElaborador: false,
        nombre: "",
        cantidadFolios: -1,
        numeroExpediente: -1           
	}
}



export default CreateRequisitoExpedienteDTO