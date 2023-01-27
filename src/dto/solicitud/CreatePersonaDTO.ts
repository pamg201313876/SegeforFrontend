import Sexo from "enums/Sexo";

type CreatePersonaDTO = {
    nombre: string,
    fechaNacimiento: string,
    sexo: Sexo,
    cui: string,    
    telefono: string,
    municipio: number, // y depto
    direccion: string,
    correo: string,
    nit: string,
    comunidad: number,
    pueblo: number,
    estado: string, //
    ocupacion: string
    pais: string,
    fechaVencimiento: string,
    estadoCivil: string
}


export const createNew = (): CreatePersonaDTO => {
    return {
        nombre: "",
        fechaNacimiento: "",
        sexo: Sexo.Hombre,
        cui: "",
        //fechaVencimiento
        telefono: "",
        municipio: 0,
        direccion: "",
        correo: "",
        nit: "",
        comunidad: 0,
        pueblo: 0,
        estado: "",
        ocupacion: "",
        pais: "Guatemala",
        fechaVencimiento: "2030-01-26",
        estadoCivil: ""
    }
}



export default CreatePersonaDTO