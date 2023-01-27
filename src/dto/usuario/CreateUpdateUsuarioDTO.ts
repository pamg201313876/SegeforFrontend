import Sexo from "enums/Sexo";

type CreateUpdateUsuarioDTO = {
	nombreUsuario: string,
	password: string,
	nombre: string,
	perfil: number,
	pais: string,
	departamento: number,
	municipio: number,
	direccion: string,
	cui: string,
	fechaVencimiento: string,
	telefono: string,
	correo: string,
	fechaNacimiento: string,
	sexo: Sexo,
	nit: string,
	ocupacion: string,
	comunidad: number,
	estadoCivil: string,
	pueblo: number,
	//abreviatura: string,
	//ocupacionId: number
	foto: string
}


export const createNew = () : CreateUpdateUsuarioDTO => {
	return {
		nombreUsuario: "",
		password: "",
		nombre: "",
		perfil: 0,
		pais: "",
		departamento: 0,
		municipio: 0,
		direccion: "",
		cui: "",
		fechaNacimiento: "",
		telefono: "",
		correo: "",
		fechaVencimiento: "",
		sexo: Sexo.Hombre,
		nit: "",
		ocupacion: "",
		comunidad: 0,
		estadoCivil: "",
		pueblo: 0,
		//abreviatura: "",
		foto: "",
		//ocupacionId: 0
	}
}



export default CreateUpdateUsuarioDTO