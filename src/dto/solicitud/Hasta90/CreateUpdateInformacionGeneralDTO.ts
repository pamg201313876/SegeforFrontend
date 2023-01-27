type CreateUpdateInformacionGeneralDTO = {
    /*
        Datos del Solicitante
    */

    //Persona Individual/Varios
    tipoPersona: string, /*Será "individual" o "juridico"*/
    
    /*
    Si es tipoPersona es 'individual' vendrán los siguientes datos
    */
    personasIndividuales: any[],
    representantesLegales: any[],

    /*
        Si es jurídica permitiremos ingresar los datos por lo mismo los mandaresmos
        o buscarla si ya existe
    */
    

    razonSocial : string,
    tipoEntidad : string,
    nombreComercial : string,
    nit : string,
    idJuridica: number,
    

    /*
        Datos notificación
    */

    direccionDomiciliar: string,
    telefono: string,
    celular: string,
    email: string,


    /*
        1.3 Datos de la finca
    */ 
    
    nombreFinca: string,
    propietario: string,
    idMunicipio: number,
    aldeaCantonCaserio: string,
    coordenadasX: string,
    coordenadasY: string,
    

    /*
        Tipos Documento:
        1 = acta notarial de declaracion
        2 = testimonio de escritura publica
        3 = certificacion de registro
    */ 
    tipoDocumento: number,

    /*
        Si es 1 o 2
        Estos datos vienen, si es 3 vendran null
    */ 

    numeroEscritura: number,
    nombreNotario: string,
    municipioEmision: number,

    /*
        si es 3
        estos datos vienen, sino vendran null
    */ 

    numeroFinca: number,
    numeroFolio: number,
    numeroLibro: number,
    deCertificacion: string,

    /*
        La fecha emision siempre vendrá, sin importar si es 1,2 o 3
    */

    fechaEmision: string,

    /*
        Colindancias
    */

    norte: string,
    sur: string,
    este: string,
    oeste: string,
    areaTotalFinca: number   ,
    
    /*
        Area Final habla acerca de datos del elaborador
    */

    idElaborador: number,

    nombreRepresentanteLegal: string,

    numeroCUIRepresentante: string,

    areaDocumentada?: number,
    
    direccionFinca?: string

    tcMunicipio?:any,

    municipioNoti? : number, 

    fincasActuales : any[],


    telefonoId?:  number,
    direccionId?: number
    correoId?:number,
    celularId?:number
}





export const createNew = () : CreateUpdateInformacionGeneralDTO => {
	return {
		  /*
        Datos del Solicitante
    */

    //Persona Individual/Varios
    tipoPersona: "", /*Será "individual" o "juridico"*/
    
    /*
    Si es tipoPersona es 'individual' vendrán los siguientes datos
    */
    personasIndividuales: [],
    representantesLegales: [],

    fincasActuales: [],

    /*
        Si es jurídica permitiremos crearla o buscarla sino existe, en ambos casos
        lo que devolveremos será solo el id de la  persona jurídica
    */
   razonSocial : "",
   tipoEntidad : "",
   nombreComercial : "",
   nit : "",
   idJuridica: 0,
   

    /*
        Datos notificación
    */

    direccionDomiciliar: "",
    telefono: "",
    celular: "",
    email: "",


    /*
        1.3 Datos de la finca
    */ 
    
    nombreFinca: "",
    propietario: "",
    idMunicipio: 0,
    aldeaCantonCaserio: "",
    coordenadasX: "",
    coordenadasY: "",

    /*
        Tipos Documento:
        1 = acta notarial de declaracion
        2 = testimonio de escritura publica
        3 = certificacion de registro
    */ 
    tipoDocumento: 0,

    /*
        Si es 1 o 2
        Estos datos vienen, si es 3 vendran null
    */ 

    numeroEscritura: 0,
    nombreNotario: "",
    municipioEmision: 0,

    /*
        si es 3
        estos datos vienen, sino vendran null
    */ 

    numeroFinca: 0,
    numeroFolio: 0,
    numeroLibro: 0,
    deCertificacion: "",

    /*
        La fecha emision siempre vendrá, sin importar si es 1,2 o 3
    */

    fechaEmision: "",

    /*
        Colindancias
    */

    norte: "",
    sur: "",
    este: "",
    oeste: "",
    areaTotalFinca: 0   ,
    
    /*
        Area Final habla acerca de datos del elaborador
    */

    idElaborador: 0,


    nombreRepresentanteLegal: "",

    numeroCUIRepresentante: "",
    

    areaDocumentada: 0,

    direccionFinca: "",

    tcMunicipio : {},

    municipioNoti: 0
    
	}
}


export default CreateUpdateInformacionGeneralDTO;