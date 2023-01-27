type CreateUpdateClaveUsuarioDTO = {
    claveUsuario: string,
    confirmacion: string,
    oldPassword: string,
    usuario: string,
    usuarioId: string
}


export const createNew = (): CreateUpdateClaveUsuarioDTO => {
	return {
        claveUsuario: "",
        confirmacion: "",
        oldPassword: "",
        usuario: "",
        usuarioId: ""
	}
}



export default CreateUpdateClaveUsuarioDTO


{/*
    "claveUsuario": "MTIzNDU2Nzg=",
    "confirmacion": "12345678",
    "oldPassword": "RWwxMjM0NTY3OA==",
    "usuario": "elaborador10",
    "usuarioId": 7
*/}