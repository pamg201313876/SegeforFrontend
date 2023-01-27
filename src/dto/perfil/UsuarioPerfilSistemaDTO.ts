import TcUsuarioDTO from "dto/usuario/TcUsuarioDTO"
import TcPerfilDTO from "./TcPerfilDTO"

type UsuarioPerfilSistemaDTO = {
	usuarioPerfilSistemaId: number
	tcUsuario: TcUsuarioDTO
	tcPerfil: TcPerfilDTO,
	tcSistema: any,
	rfn: string | null
}

export default UsuarioPerfilSistemaDTO