enum EstadoGestion {
	Anulado = 0,
	SolicitadoParaElaborar = 1,
	AceptadoParaElaborar = 2,
	PlanElaborado = 3,
	Solicitado = 4,
	EnTramite = 5,
	EsperandoEnmienda = 6,
	Finalizado = 7,
	Rechazado = 20,
	SinInformacion = 101
}

export default EstadoGestion