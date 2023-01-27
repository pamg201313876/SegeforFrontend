export type SistemaRepoblacionDTO = {
	id: number,
	valor: number
}

export type SaveSistemasRepoblacionDTO = {
	ttGestionId: number,
	sistemasRepoblacion: SistemaRepoblacionDTO[]
}

export default SaveSistemasRepoblacionDTO