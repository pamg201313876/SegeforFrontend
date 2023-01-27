import CreateUpdateClaveUsuarioDTO from "dto/usuario/CreateUpdateClaveUsuarioDTO";


type CambioCredencialesFormError = {
	isError: boolean,
    claveUsuario: string | null,
    confirmacion: string | null,
    oldPassword: string | null,
    usuario: string | null,
    usuarioId: string | null
}

export const newCambioCredencialesError = (): CambioCredencialesFormError => {
	return {
		isError: false,
        claveUsuario: null,
        confirmacion: null,
        oldPassword: null,
        usuario: null,
        usuarioId: null
	}
}

const noValueError = "Este campo no puede ir vacio."

export const validateForm = (createDto: CreateUpdateClaveUsuarioDTO): CambioCredencialesFormError => {
	console.log("perfilFormError")
	console.log(createDto)
	let formError = newCambioCredencialesError();    
    validateClaveUsuario(createDto, formError);
    validateConfirmacion(createDto, formError);
    validateOldPassword(createDto, formError);
    return formError;
}
   
    const validateClaveUsuario = (createDto: CreateUpdateClaveUsuarioDTO, formError: CambioCredencialesFormError) => {
        if (createDto.claveUsuario.trim() === '') {
            formError.claveUsuario = noValueError;
            formError.isError = true;
        }
        else if (createDto.claveUsuario.length < 6) {
            formError.claveUsuario = 'La contraseña debe tener al menos 6 caracteres';
            formError.isError = true;
        } else if (!createDto.claveUsuario.match(/([a-z])/) 
                        || !createDto.claveUsuario.match(/([A-Z])/) 
                        || !createDto.claveUsuario.match(/([0-9])/)) {
            formError.claveUsuario = 'Su contraseña debe contener al menos una letra minúscula, una mayúscula y un número';
            formError.isError = true;
        }
    }

    const validateConfirmacion = (createDto: CreateUpdateClaveUsuarioDTO, formError: CambioCredencialesFormError) => {
        if (createDto.confirmacion.trim() === '') {
            formError.confirmacion = noValueError;
            formError.isError = true;
        }
        else if(createDto.confirmacion !== createDto.claveUsuario){
            formError.confirmacion = "Confirmación de contraseña incorrecta";
            formError.isError = true;
        }
    }

    const validateOldPassword = (createDto: CreateUpdateClaveUsuarioDTO, formError: CambioCredencialesFormError) => {
        if (createDto.oldPassword.trim() === '') {
            formError.oldPassword = noValueError;
            formError.isError = true;
        }
    }
export default CambioCredencialesFormError