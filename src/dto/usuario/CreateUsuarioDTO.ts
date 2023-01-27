type CreateUsuarioDTO = {
    personaId: string,
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
    estadoId: string,
    fechaRegistro: string,
    confirmado: string,
    fechaUltModif: string,
    sigla: string,
    rfn: string,
    rf: string,
    usuario: any,
    tcUsuario: any,
    tcUsuarioSubregion: any
}


export const createNew = (): CreateUsuarioDTO => {
	return {
        personaId: "",
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
        estadoId: "",
        fechaRegistro: "",
        confirmado: "",
        fechaUltModif: "",
        sigla: "",
        rfn: "",
        rf: "",
        usuario: {},
        tcUsuario: {},
        tcUsuarioSubregion: {}
	}
}



export default CreateUsuarioDTO


{/*
    "personaDesc": "elaborador11", 
    "nit": "201314367", 
    "cui": "10000201314367",
    "fechaVencimiento":"2021-12-25", 
    "direccion": "villa hermosa",
    "fechaNacimiento":"1990-12-25", 
    "telefono": "47529155",
	"correo": "elaborador11@gmail.com",
	"foto": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcA",
    "tcMunicipio": {
                "municipioId": 47,
                "municipioDesc": "Ipala",
                "estadoId": 1,
                "fechaRegistro": "2018-08-07T14:01:58.000+0000",
                "tcDepartamento": {
                    "departamentoId": 4,
                    "departamentoDesc": "Chiquimula",
                    "estadoId": 1,
                    "fechaRegistro": "2018-08-07T13:51:53.000+0000",
                    "tcPais": {
                        "paisId": 1,
                        "paisDesc": "Guatemala",
                        "estadoId": 1,
                        "fechaRegistro": "2018-07-25T18:02:54.000+0000"
                    }
                },
                "codigo": 2011
            },

            
    "tcOcupacion": {
        "ocupacionId": 6,
        "ocupacionDesc": "Agricultor",
        "estadoId": 1,
        "fechaRegistro": "2019-08-01T14:46:01.000+0000"
    },
    "tcCultura": {
        "culturaId": 4,
        "culturaDesc": "Xinka",
        "estadoId": 1,
        "fechaRegistro": "2018-08-28T18:10:52.000+0000"
    },
   "tcIdioma": {
        "idiomaId": 5,
        "idiomaDesc": "Xinka",
        "estadoId": 1,
        "fechaRegistro": "2018-10-18T12:52:59.000+0000"
    },
    "tcEstadoCivil": {
        "estadoCivilId": 2,
        "estadoCivilDesc": "Soltero (a)",
        "estadoId": 1,
        "fechaRegistro": "2018-08-28T18:11:14.000+0000"
    },
    "tcSexo": {
        "sexoId": 2,
        "sexoDesc": "Masculino",
        "estadoId": 1,
        "fechaRegistro": "2019-09-13T08:44:03.000+0000"
    },
    "tcUsuario": {
        "usuarioId": 8,
        "usuarioDesc": "elaborador11",
        "usuario": "elaborador11",
        "correo": "elaborador11@inab.gob.gt",
        "claveUsuario": null,
        "estadoId": 1,
        "fechaRegistro": "2021-01-07T07:22:49.000+0000",
        "requiereCambioClave": 0,
        "tcPerfil": null
    }
*/}