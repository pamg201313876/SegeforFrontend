import SaveDmcEspecieDTO from "./SaveDmcEspecieDTO"
import SaveEspecieProtegerDTO from "../gestion/latifoliado/UpdateEspecieProtegerDTO"
import SaveIcEspecieEstratoDTO from "./SaveIcEspecieEstratoDTO"

type SavePlanificacionDTO = {
	ttGestionId: number
	tcSistemaCortaId: number
	tcTratamientoSilviculturalId: number
	descripcionSistemaManejo: string
	vigencia: number
	aniosRevisionActualizacion: number
	descripcionCicloAprovechamiento: string
	dmcEspecies: SaveDmcEspecieDTO[]
	especiesIc: SaveIcEspecieEstratoDTO[]
	especiesProteger: SaveEspecieProtegerDTO[]
}

export default SavePlanificacionDTO