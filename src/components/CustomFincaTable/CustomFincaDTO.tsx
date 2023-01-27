type CustomFincaDTO = {
    uso: string,
    area: number,
    porcentaje: number,
    value: number,
    usoFincaGestionId: number
}


export const createNew = (): CustomFincaDTO => {
	return {
        uso: "",
		area: 0,
        porcentaje: 0,
        value: 0,
        usoFincaGestionId: 0
    }
}



export default CustomFincaDTO