type UpdateGarantiaGestionDTO = {
	tipoGarantiaId: number
	nombreEmpresa: string | null
	nombreFiador: string | null
	tipoFiadorId: number
	dpiFiador: string | null
}

export default UpdateGarantiaGestionDTO