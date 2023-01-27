import TcPerfilDTO from 'dto/perfil/TcPerfilDTO'

type TokenResponseDTO = {
	nombre: string,
	perfil: TcPerfilDTO,
	usuario: string,
	usuarioId: number, //quitar esto
	personaId: number,
	tcPersona: any
}

// export const createNew = () : TokenResponseDTO => {
// 	return {
// 		nombre: "",
// 		tcPerfil: {},
// 		usuario: ""
// 	}
// }

export default TokenResponseDTO