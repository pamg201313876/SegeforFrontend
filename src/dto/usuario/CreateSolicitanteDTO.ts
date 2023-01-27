type UsuarioDTO = {
	usuario: string,
	claveUsuario: string
}

type CreateSolicitanteDTO = {
	personaDesc: string,
	nit: string,
	cui: string,
	fechaVencimiento: string,
	direccion: string,
	fechaNacimiento: string,
	telefono: string,
	correo: string,
	foto: string,
	tcMunicipio: any,
	tcOcupacion: any,
	tcCultura: any,
	tcIdioma: any,
	tcEstadoCivil: any,
	tcSexo: any,
	usuario: UsuarioDTO,
	repassword: String
}


export const createNew = (): CreateSolicitanteDTO => {
	return {
		personaDesc: "",
		nit: "",
		cui: "",
		fechaVencimiento: "",
		direccion: "",
		fechaNacimiento: "",
		telefono: "",
		correo: "",
		foto: "",
		tcMunicipio: {
			municipioId: 0
		},
		tcOcupacion: {},
		tcCultura: {},
		tcIdioma: {},
		tcEstadoCivil: {},
		tcSexo: {},
		usuario: {
			usuario: "",
			claveUsuario: ""
		},
		repassword: ""
	}
}



export default CreateSolicitanteDTO