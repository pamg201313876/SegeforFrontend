import DepartamentoDTO from "dto/departamento/DepartamentoDTO"

type MunicipioDTO = {
	id: number,
	codigoMunicipal: number,
	nombre: string,
	departamento: DepartamentoDTO
}

export default MunicipioDTO