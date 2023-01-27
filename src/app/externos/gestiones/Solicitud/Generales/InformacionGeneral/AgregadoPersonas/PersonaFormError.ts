import CreatePersonaDTO from "dto/persona/CreatePersonaDTO"

type PersonaFormError = {
    isError: boolean,
    nombreUsuario: string | null,
    nombre: string | null,
    pais: string | null,
    departamento: string | null,
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

export const newPersonaFormError = (): PersonaFormError => {
    return {
        isError: false,
        nombreUsuario: null,
        nombre: null,
        pais: null,
        departamento: null,
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

const noValueError = "Este campo no puede ir vacio."

export const validateForm = (createDto: CreatePersonaDTO, noImage: boolean): PersonaFormError => {
    console.log("perfilFormError")
    console.log(createDto)
    let formError = newPersonaFormError();
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
    if (!noImage) {
        validatePhoto(createDto, formError);
    }
    return formError;
}


const validateNombre = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.personaDesc.trim() === '') {
        formError.nombre = noValueError;
        formError.isError = true;
    }
}

const validateMunicipio = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.tcMunicipio.municipioId === 0) {
        formError.municipio = noValueError;
        formError.isError = true;
    }
}

const validateDireccion = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.direccion.trim() === '') {
        formError.direccion = noValueError;
        formError.isError = true;
    }
}

const validateCui = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.cui.trim() === '') {
        formError.cui = noValueError;
        formError.isError = true;
    }
}

const validateFechaVencimiento = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.fechaVencimiento.trim() === '') {
        formError.fechaVencimiento = noValueError;
        formError.isError = true;
    }
}

const validateTelefono = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.telefono.trim() === '') {
        formError.telefono = noValueError;
        formError.isError = true;
    }
    else if (createDto.telefono.length < 8) {
        formError.telefono = "Debe tener al menos 8 digitos";
        formError.isError = true;
    }
}

const validateEmail = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.correo.trim() === '') {
        formError.correo = noValueError;
        formError.isError = true;
    }
}

const validateFechaNacimiento = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.fechaNacimiento.trim() === '') {
        formError.fechaNacimiento = noValueError;
        formError.isError = true;
    }
}

const validateSexo = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.tcSexo.sexoId === undefined) {
        formError.sexo = noValueError;
        formError.isError = true;
    }
}

const validateNit = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.nit.trim() === '') {
        formError.nit = noValueError;
        formError.isError = true;
    }
}

const validateOcupacion = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.tcOcupacion.ocupacionId === undefined) {
        formError.ocupacion = noValueError;
        formError.isError = true;
    }
}

const validateComunidad = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.tcIdioma.idiomaId === undefined) {
        formError.comunidad = noValueError;
        formError.isError = true;
    }
}

const validateEstadoCivil = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.tcEstadoCivil.estadoCivilId === undefined) {
        formError.estadoCivil = noValueError;
        formError.isError = true;
    }
}

const validatePueblo = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.tcCultura.culturaId === undefined) {
        formError.pueblo = noValueError;
        formError.isError = true;
    }
}

const validatePhoto = (createDto: CreatePersonaDTO, formError: PersonaFormError) => {
    if (createDto.foto == undefined || createDto.foto == null) {
        formError.foto = noValueError
        formError.isError = true
    }
    else if (createDto.foto.trim() === "") {
        formError.foto = noValueError
        formError.isError = true
    }
}

export default PersonaFormError