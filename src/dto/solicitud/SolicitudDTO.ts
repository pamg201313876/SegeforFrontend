import UsuarioDTO from "dto/usuario/UsuarioDTO"

type SolicitudDTO = {
	id: number,
    hectareas: number,
    usuarioSolicitante: UsuarioDTO,
    usuarioElaborador: UsuarioDTO,
    fechaCreacion: string,
    estado?: string
}

export default SolicitudDTO