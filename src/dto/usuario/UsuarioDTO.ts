import ComunidadDTO from "dto/comunidad/ComunidadDTO"
import MunicipioDTO from "dto/municipio/MunicipioDTO"
import PerfilDTO from "dto/perfil/PerfilDTO"
import PuebloDTO from "dto/pueblo/PuebloDTO"
import DepartamentoDTO from '../departamento/DepartamentoDTO';

type UsuarioDTO = {
	id: number,
	nombreUsuario: string,
	nombre: string,
	perfil: PerfilDTO,
	pais: string,
	departamento: DepartamentoDTO,
	municipio: MunicipioDTO,
	direccion: string,
	cui: string,
	fechaVencimiento: string,
	telefono: string,
	correo: string,
	fechaNacimiento: string,
	sexo: number,
	nit: string,
	ocupacion: string,
	comunidad: ComunidadDTO,
	estadoCivil: string,
	pueblo: PuebloDTO,
	estaActivo: Boolean,
	//abreviatura: string,
	foto: string,
	ocupacionId: number
}

export default UsuarioDTO