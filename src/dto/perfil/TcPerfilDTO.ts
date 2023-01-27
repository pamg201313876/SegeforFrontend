import CodigoPerfil from "./CodigoPerfil";

type TcPerfilDTO = {
	perfilId: number
	perfilDesc: string
	estadoId: number
	fechaRegistro: string
	fechaUltModif: string | null
	codigo: CodigoPerfil
}

export default TcPerfilDTO;