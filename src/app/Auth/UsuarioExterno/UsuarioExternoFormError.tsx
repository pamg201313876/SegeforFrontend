import CreateSolicitanteDTO from 'dto/usuario/CreateSolicitanteDTO';

type UsuarioExternoFormError = {
    isError: boolean,
	nombreUsuario: string | null,
    password: string | null,
    repassword: string | null,
	nombre: string | null,
	perfil: number | null,
	pais: string | null,
	municipio: string | null,
	direccion: string | null,
	cui: string | null,
	fechaVencimiento: string | null,
	telefono: string | null,
	correo: string | null,
	fechaNacimiento: string | null,
	sexo: string | null,
	nit: string | null,
	ocupacion: string | null,
	comunidad: string | null,
	estadoCivil: string | null,
    pueblo: string | null,
    foto: string | null
}

export const newUsuarioExternoFormError = () : UsuarioExternoFormError => {
    return {
        isError: false,
        nombreUsuario: null,
        password: null,
        repassword: null,
        nombre: null,
        perfil: null,
        pais: null,
        municipio: null,
        direccion: null,
        cui: null,
        fechaVencimiento: null,
        telefono: null,
        correo: null,
        fechaNacimiento: null,
        sexo: null,
        nit: null,
        ocupacion: null,
        comunidad: null,
        estadoCivil: null,
        pueblo: null,
        foto: null
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm = (createDto: CreateSolicitanteDTO) : UsuarioExternoFormError => {
    let formError = newUsuarioExternoFormError();    
    validateNombreUsuario(createDto, formError);
    validatePassword(createDto, formError);
    validateNombre(createDto, formError);
    validateMunicipio(createDto, formError);
    validateDireccion(createDto, formError);
    validateCui(createDto, formError);
    validateTelefono(createDto, formError);
    validateEmail(createDto, formError);
    validateFechaNacimiento(createDto, formError);
    validateFechaVencimiento(createDto, formError);
    validateNit(createDto, formError);
    validateOcupacion(createDto, formError);
    validateComunidad(createDto, formError);
    validateSexo(createDto, formError);
    validateEstadoCivil(createDto, formError);
    validatePueblo(createDto, formError);
    validatePhoto(createDto, formError);
    return formError;
}

    const validateNombreUsuario = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.usuario.usuario.trim() === '') {
            formError.nombreUsuario = noValueError;
            formError.isError = true;
        } else if (createDto.usuario.usuario.match(/([^a-zA-Z0-9_])/)) {
            formError.nombreUsuario = 'Unicamente se aceptan letras, números y guión bajo';
            formError.isError = true;
        }
    }

    const validatePassword = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.usuario.claveUsuario === '') {
            formError.password = noValueError;
            formError.isError = true;
        } else if (createDto.usuario.claveUsuario.length < 6) {
            formError.password = 'La contraseña debe tener al menos 6 caracteres';
            formError.isError = true;
        } else if (!createDto.usuario.claveUsuario.match(/([a-z])/) 
                        || !createDto.usuario.claveUsuario.match(/([A-Z])/) 
                        || !createDto.usuario.claveUsuario.match(/([0-9])/)) {
            formError.password = 'Su contraseña debe contener al menos una letra minúscula, una mayúscula y un número';
            formError.isError = true;
        }
        if (createDto.repassword === '') {
            formError.repassword = 'Confirme contraseña';
            formError.isError = true;
        } else if (createDto.usuario.claveUsuario !== createDto.repassword) {
            formError.repassword = 'Las contraseñas deben ser iguales';
            formError.isError = true;
        }
    }

    const validateNombre = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.personaDesc.trim() === '') {
            formError.nombre = noValueError;
            formError.isError = true;
        }
    }

    const validateMunicipio = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.tcMunicipio.municipioId === 0) {
            formError.municipio = noValueError;
            formError.isError = true;
        }
    }

    const validateDireccion = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.direccion.trim() === '') {
            formError.direccion = noValueError;
            formError.isError = true;
        }
    }

    const validateCui = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.cui.trim() === '') {
            formError.cui = noValueError;
            formError.isError = true;
        }
    }

    const validateFechaVencimiento = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.fechaVencimiento.trim() === '') {
            formError.fechaVencimiento = noValueError;
            formError.isError = true;
        }
    }

    const validateTelefono = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.telefono.trim() === '') {
            formError.telefono = noValueError;
            formError.isError = true;
        }
        else if (createDto.telefono.length < 8) {
            formError.telefono = "Debe tener al menos 8 digitos";
            formError.isError = true;
        }
    }

    const validateEmail = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.correo.trim() === '') {
            formError.correo = noValueError;
            formError.isError = true;
        }
    }

    const validateFechaNacimiento = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.fechaNacimiento.trim() === '') {
            formError.fechaNacimiento = noValueError;
            formError.isError = true;
        }
    }

    const validateSexo = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.tcSexo.sexoId === undefined) {
            formError.sexo = noValueError;
            formError.isError = true;
        }
    }

    const validateNit = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.nit.trim() === '') {
            formError.nit = noValueError;
            formError.isError = true;
        }
    }

    const validateOcupacion = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.tcOcupacion.ocupacionId === undefined) {
            formError.ocupacion = noValueError;
            formError.isError = true;
        }
    } 

    const validateComunidad = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.tcIdioma.idiomaId === undefined) {
            formError.comunidad = noValueError;
            formError.isError = true;
        }
    }

    const validateEstadoCivil = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.tcEstadoCivil.estadoCivilId === undefined) {
            formError.estadoCivil = noValueError;
            formError.isError = true;
        }
    }

    const validatePueblo = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.tcCultura.culturaId === undefined) {
            formError.pueblo = noValueError;
            formError.isError = true;
        }
    }

    const validatePhoto = (createDto: CreateSolicitanteDTO, formError: UsuarioExternoFormError) => {
        if (createDto.foto == undefined || createDto.foto == null) {
            formError.foto = noValueError
            formError.isError = true
        }
        else if (createDto.foto.trim() === ""){
            formError.foto = noValueError
            formError.isError = true
        }
    }


export default UsuarioExternoFormError;