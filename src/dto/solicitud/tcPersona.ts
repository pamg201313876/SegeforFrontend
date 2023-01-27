type tcPersona = {
    confirmado?: number,    
    correo?: string,
    cui?: any,
    direccion?:string,
    estadoId?: number,
    fechaNacimiento?: string,
    fechaRegistro?: string,
    fechaUltModif?: string,
    fechaVencimiento?: string,
    foto?: string,
    nit?: string,
    passwordTmp?: string,
    personaDesc?: string,
    personaId?: number,
    rf?: string,
    rfn?: string,
    sigla?: string,
    tcCultura?: any,
    tcEstadoCivil?:any,
    tcIdioma?: any,
    tcMunicipio?: any,
    tcOcupacion?: any,
    tcSexo?:any,
    tcUsuario?: any,    
    telefono?: string,
    usuario?: any,    
}
//--fecha se envia año-mes-dia


export default tcPersona;