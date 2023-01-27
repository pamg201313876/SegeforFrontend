import CreateUpdateInformacionGeneralDTO from "dto/solicitud/Hasta90/CreateUpdateInformacionGeneralDTO"
import { isBlankString } from "utils/UtilFunctions"


type DatosGeneralesFormError = {

    isError: boolean,
    tipoPersona: string | null, /*Será "individual" o "juridico"*/
    personasIndividuales: string | null,
    representantesLegales: string | null,

    razonSocial: string | null,
    tipoEntidad: string | null,
    nombreComercial: string | null,
    nit: string | null,
    idJuridica: string | null,



    direccionDomiciliar: string | null,
    telefono: string | null,
    celular: string | null,
    email: string | null,


    nombreFinca: string | null,
    propietario: string | null,
    idMunicipio: string | null,
    aldeaCantonCaserio: string | null,
    coordenadasX: string | null,
    coordenadasY: string | null,

    tipoDocumento: string | null,

    /*
        Si es 1 o 2
        Estos datos vienen, si es 3 vendran null
    */

    numeroEscritura: string | null,
    nombreNotario: string | null,
    municipioEmision: string | null,

    /*
        si es 3
        estos datos vienen, sino vendran null
    */

    numeroFinca: string | null,
    numeroFolio: string | null,
    numeroLibro: string | null,
    deCertificacion: string | null,

    /*
        La fecha emision siempre vendrá, sin importar si es 1,2 o 3
    */

    fechaEmision: string | null,

    /*
        Colindancias
    */

    norte: string | null,
    sur: string | null,
    este: string | null,
    oeste: string | null,
    areaTotalFinca: string | null,

    /*
        Area Final habla acerca de datos del elaborador
    */

    idElaborador: string | null,

    nombreRepresentanteLegal: string | null,
    numeroCUIRepresentante: string | null,
    
    fincasActuales : string | null
}

export const newDatosGeneralesFormError = (): DatosGeneralesFormError => {

    return {
        nombreRepresentanteLegal: null,
        numeroCUIRepresentante: null,
        isError: false,
        tipoPersona: null, /*Será "individual" o "juridico"*/
        personasIndividuales: null,
        representantesLegales: null,

        razonSocial: null,
        tipoEntidad: null,
        nombreComercial: null,
        nit: null,
        idJuridica: null,


        direccionDomiciliar: null,
        telefono: null,
        celular: null,
        email: null,


        nombreFinca: null,
        propietario: null,
        idMunicipio: null,
        aldeaCantonCaserio: null,
        coordenadasX: null,
        coordenadasY: null,

        tipoDocumento: null,

        /*
            Si es 1 o 2
            Estos datos vienen, si es 3 vendran null
        */

        numeroEscritura: null,
        nombreNotario: null,
        municipioEmision: null,

        /*
            si es 3
            estos datos vienen, sino vendran null
        */

        numeroFinca: null,
        numeroFolio: null,
        numeroLibro: null,
        deCertificacion: null,

        /*
            La fecha emision siempre vendrá, sin importar si es 1,2 o 3
        */

        fechaEmision: null,

        /*
            Colindancias
        */

        norte: null,
        sur: null,
        este: null,
        oeste: null,
        areaTotalFinca: null,

        /*
            Area Final habla acerca de datos del elaborador
        */

        idElaborador: null,

        fincasActuales : null
    }
}

const noValueError = "Este campo no puede ir vacio."

export const validateDatosSolicitante = (ttTipoPropietarioGestion: any) : DatosGeneralesFormError => {
    
    let formError = newDatosGeneralesFormError()

    if (ttTipoPropietarioGestion.tcTipoPropietario.tipoPropietarioId !== 1) {
        if(isBlankString(ttTipoPropietarioGestion.razonSocial)){
            formError.isError = true
            formError.razonSocial = noValueError
        }
        if(isBlankString(ttTipoPropietarioGestion.nombreComercial)){
            formError.isError = true
            formError.nombreComercial = noValueError
        }
        if(isBlankString(ttTipoPropietarioGestion.nitEntidad)){
            formError.isError = true
            formError.nit = noValueError
        }
        if(ttTipoPropietarioGestion.tcTipoEntidad == null){
            formError.isError = true
            formError.tipoEntidad = noValueError
        }
    }

    return formError
}

export const validateForm = (createDto: CreateUpdateInformacionGeneralDTO): DatosGeneralesFormError => {

    let formError = newDatosGeneralesFormError()

    validateTipoPersona(createDto, formError)

    if (createDto.tipoPersona !== 'Individual') {
        validateRazonSocial(createDto, formError)
        validateTipoEntidad(createDto, formError)
        validateNombreComercial(createDto, formError)
        validateNIT(createDto, formError)
    }

    validatePersonasIndividuales(createDto, formError)
    // validateRepresentantesLegales(createDto, formError)

    validateDireccion(createDto, formError)
    validateTelefono(createDto, formError)
    validateCelular(createDto, formError)
    validateEmail(createDto, formError)

    validateFincas(createDto,formError)

   /* validateNombreFinca(createDto, formError)
    validateMunicipio(createDto, formError)
    validatePropietario(createDto, formError)
    validateCoordenadasX(createDto, formError)
    validateCoordenadasY(createDto, formError)

    validateTipoDocumento(createDto, formError)


    if (createDto.tipoDocumento === 1 || createDto.tipoDocumento === 2) {

        validateNumeroEscritura(createDto, formError)
        validateNombreNotario(createDto, formError)
        validateMunicipioEmision(createDto, formError)
    } else {
        validateNumeroFinca(createDto, formError)
        validateNumeroLibro(createDto, formError)
        validateNumeroFolio(createDto, formError)
        validateDe(createDto, formError)
    }

    validateFechaEmision(createDto, formError)

    validarNorte(createDto, formError)
    validarSur(createDto, formError)
    validarEste(createDto, formError)
    validarOeste(createDto, formError)
    validarnombreRepresentanteLegal(createDto, formError)
    validateCUIRepLegal(createDto, formError)*/



    return formError
}

const validateTipoPersona = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.tipoPersona.toString() === '') {        
        formError.tipoPersona = noValueError
        formError.isError = true
    }    

}


const validateRazonSocial = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.razonSocial.trim() === "") {
        formError.razonSocial = noValueError
        formError.isError = true
    }
}

const validateTipoEntidad = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.tipoEntidad.trim() === "") {
        formError.tipoEntidad = noValueError
        formError.isError = true
    }
}

const validateNombreComercial = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.nombreComercial.trim() === "") {
        formError.nombreComercial = noValueError
        formError.isError = true
    }
}

const validateNIT = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {


    if (createDto.nit.trim() === "") {
        formError.nit = noValueError
        formError.isError = true

    }
    else if (createDto.nit.trim().length < 2) {
        formError.nit = "NIT inválido"
        formError.isError = true
    }
    else if (! /^[0-9]+[A-Za-z]?$/.test(createDto.nit.trim())) {
        formError.nit = "NIT inválido"
        formError.isError = true
    }

}

const validatePersonasIndividuales = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.personasIndividuales.length == 0) {
        formError.personasIndividuales = "Se debe ingresar al menos una persona involucrada"
        formError.isError = true
    }
}


const validateRepresentantesLegales = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.representantesLegales.length == 0) {
        formError.representantesLegales = "Se debe ingresar al menos un representante legal"
        formError.isError = true
    }
}

const validateFincas = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.fincasActuales.length == 0) {
        formError.fincasActuales = "Se debe ingresar al menos un finca"
        formError.isError = true
    }
}

const validateDireccion = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.direccionDomiciliar.trim() === '') {
        formError.direccionDomiciliar = noValueError
        formError.isError = true
    }
}

const validateTelefono = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.telefono.trim() === "") {
        formError.telefono = noValueError
        formError.isError = true
    }
    else if (createDto.telefono.trim().length !== 8) {
        formError.telefono = "Teléfono inválido"
        formError.isError = true

    } else if (! /^[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(createDto.telefono)) {
        formError.telefono = "Teléfono inválido"
        formError.isError = true
    }

}

const validateCelular = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.celular.trim() === "") {
        formError.celular = noValueError
        formError.isError = true
    }
    else if (createDto.celular.trim().length !== 8) {
        formError.celular = "Teléfono inválido"
        formError.isError = true

    } else if (! /^[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(createDto.celular)) {
        formError.celular = "Teléfono inválido"
        formError.isError = true
    }

}

const validateEmail = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.email.trim() === "") {
        formError.email = noValueError
        formError.isError = true
    }
    else if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(createDto.email.trim()))) {
        formError.email = "El email es inválido, revise por favor."
        formError.isError = true
    }

}

/*
const validateNombreFinca = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.nombreFinca.trim() === "") {
        formError.nombreFinca = noValueError
        formError.isError = true
    }
}

const validatePropietario = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.propietario.trim() === "") {
        formError.propietario = noValueError
        formError.isError = true
    }
}

const validateMunicipio = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.idMunicipio == 0) {
        formError.idMunicipio = noValueError
        formError.isError = true

    }
}

const validateCoordenadasX = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.coordenadasX.trim() === '') {
        formError.coordenadasX = noValueError
        formError.isError = true
    }
}

const validateCoordenadasY = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.coordenadasY.trim() === '') {
        formError.coordenadasY = noValueError
        formError.isError = true
    }
}

const validateTipoDocumento = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.tipoDocumento === 0) {
        formError.tipoDocumento = 'Debe seleccionar un tipo de documento válido'
        formError.isError = true
    }
}

//1 o 2



const validateNumeroEscritura = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.numeroEscritura === 0) {
        formError.numeroEscritura = noValueError
        formError.isError = true
    }
}

const validateNombreNotario = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.nombreNotario.trim() === '') {
        formError.nombreNotario = noValueError
        formError.isError = true
    }
}

const validateMunicipioEmision = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.municipioEmision === 0) {
        formError.municipioEmision = noValueError
        formError.isError = true
    }
}


//3

const validateNumeroFinca = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {


    if (createDto.numeroFinca === 0) {
        formError.numeroFinca = noValueError
        formError.isError = true
    }
}

const validateNumeroFolio = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.numeroFinca === 0) {
        formError.numeroFolio = noValueError
        formError.isError = true
    }
}

const validateNumeroLibro = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.numeroFinca === 0) {
        formError.numeroLibro = noValueError
        formError.isError = true
    }
}

const validateDe = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.deCertificacion.trim() === '') {
        formError.deCertificacion = noValueError + " de certificacion"
        formError.isError = true
    }
}


//1,2,3
const validateFechaEmision = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.fechaEmision.trim() === '') {
        formError.fechaEmision = noValueError
        formError.isError = true
    }
}

const validarNorte = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.norte.trim() === '') {
        formError.norte = noValueError
        formError.isError = true
    }
}

const validarSur = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.sur.trim() === '') {
        formError.sur = noValueError
        formError.isError = true
    }
}

const validarEste = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.este.trim() === '') {
        formError.este = noValueError
        formError.isError = true
    }
}

const validarOeste = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.oeste.trim() === '') {
        formError.oeste = noValueError
        formError.isError = true
    }
}


const validateCUIRepLegal = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.nombreRepresentanteLegal.trim() === '') {
        formError.nombreRepresentanteLegal = noValueError
        formError.isError = true
    }
}

const validarnombreRepresentanteLegal = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.numeroCUIRepresentante.trim() === '') {
        formError.numeroCUIRepresentante = noValueError
        formError.isError = true
    }
}







/*
const validateEmail = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.email.trim() === "") {
        formError.email = noValueError
        formError.isError = true
    }
    else if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(createDto.email.trim()))) {
        formError.email = "El email es inválido, revise por favor."
        formError.isError = true
    }

}

const validateNombre = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.nombre.trim() === "") {
        formError.nombre = noValueError
        formError.isError = true
    } else if (createDto.nombre.trim().includes('0') || createDto.nombre.trim().includes('1') || createDto.nombre.trim().includes('2') ||
        createDto.nombre.trim().includes('3') || createDto.nombre.trim().includes('4') || createDto.nombre.trim().includes('5') ||
        createDto.nombre.trim().includes('6') || createDto.nombre.trim().includes('7') || createDto.nombre.trim().includes('8') ||
        createDto.nombre.trim().includes('9')
    ) {
        formError.nombre = "El nombre parece contener errores."
        formError.isError = true
    }

}

const validateDPI = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    //console.log(createDto.cui)
    if (createDto.cui.trim() === "") {
        formError.cui = noValueError
        formError.isError = true
    }

    else if (createDto.cui.trim().length !== 13) {
        formError.cui = "CUI inválido"
        formError.isError = true

    } else if (! /^[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(createDto.cui)) {
        formError.cui = "CUI inválido"
        formError.isError = true
    }

}

const validateSexo = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    // if (createDto.sexo === " ") {
    // 	formError.email = noValueError
    // 	formError.isError = true
    // }

}



const validateNIT = (createDto: CreateUpdateInformacionGeneralDTO, formError: DatosGeneralesFormError) => {

    if (createDto.nit.trim() === "") {
        formError.nit = noValueError
        formError.isError = true
    }
    else if (createDto.nit.trim().length < 2) {
        formError.nit = "NIT inválido"
        formError.isError = true
    }
    else if (! /^[0-9]+[A-Za-z]?$/.test(createDto.nit.trim())) {
        formError.nit = "NIT inválido"
        formError.isError = true
    }

}*/

export default DatosGeneralesFormError