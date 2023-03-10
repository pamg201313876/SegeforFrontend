import React, { useContext } from 'react'
import { gestionHasta90Api } from 'api/latifoliado/hasta90'
import { AppDataContext } from 'app/App'
import InformationTable, { InformationRow } from 'components/InformationTable'
import ArchivoAnexo from './ArchivoAnexo'
import DownloadButton from 'components/Downloads/DownloadButton'

type Props = {
	gestion: any
}

export default function Anexos({
	gestion
}: Props) {

	const dataContext = useContext(AppDataContext)

	const Anexo = (numeroAnexo: number) => {
		return (
			<ArchivoAnexo
				numAnexo={numeroAnexo}
				gestion={gestion}
				dataContext={dataContext}
			/>
		)
	}

	/**
	 * Valida los documentos de las fincas para habilitar los anexos
	 * @param gestion Gestion
	 * @returns array de booleano donde 0 = RegistroPropiedad, 1 = Acta Notarial, 2 = Escritura Publica
	 */
	const validarDocsFincas = (): boolean[] => {
		let conRegistroPropiedad = false
		let conActaNotarial = false
		let conEscrituraPublica = false

		for (let finca of gestion.fincas) {

			if (finca.tcTipoPropiedad != null) {

				switch (finca.tcTipoPropiedad.tipoPropiedadId) {

					case 1:
						conRegistroPropiedad = true
						break

					case 2:
						conActaNotarial = true
						break

					case 3:
						conEscrituraPublica = true
						break

				}

			}

			//Si ya se encontraron de los tres tipos
			if (conRegistroPropiedad && conActaNotarial && conEscrituraPublica) {
				break
			}
		}

		return [conRegistroPropiedad, conActaNotarial, conEscrituraPublica]
	}

	const fincaAnexos = (): InformationRow[] => {

		let anexos: InformationRow[] = []
		let conDocsFincas = validarDocsFincas()
		let conRegistroPropiedad = conDocsFincas[0]
		let conActaNotarial = conDocsFincas[1]
		let conEscrituraPublica = conDocsFincas[2]

		if (conRegistroPropiedad) {
			anexos.push({
				header: "Documento original que acredite la tenencia de la tierra (Certificacion de registro de la propiedad)",
				value: Anexo(17)
			})
		}
		if (conActaNotarial) {
			anexos.push({
				header: "Documento original que acredite la tenencia de la tierra (Acta notarial de posesi??n del terreno)",
				value: Anexo(16)
			})
		}
		if (conEscrituraPublica) {
			anexos.push({
				header: "Documento original que acredite la tenencia de la tierra (Testimonio de la escritura P??blica de posesi??n del terreno)",
				value: Anexo(15)
			})
		}


		return anexos
	}

	const representanteAnexos = (): InformationRow[] => {

		let anexos: InformationRow[] = []

		if (gestion.representantes != null && gestion.representantes.length !== 0) {
			anexos.push({
				header: "Copia del documento personal de identificaci??n del Representante Legal",
				value: Anexo(18)
			})
			anexos.push({
				header: "Copia legalizada del nombramiento de representante legal, inscrito en el Registro correspondiente",
				value: Anexo(19)
			})
		}

		return anexos

	}

	const planesAnexos = (): InformationRow[] => {
		let anexos: InformationRow[] = []
		if (gestion.ttGarantiaGestion != null) {
			anexos.push({
				header: "Plan de Comercio",
				value: Anexo(20)
			})
			anexos.push({
				header: "Plan de sociedad",
				value: Anexo(21)
			})
		}
		return anexos
	}

	const garantiaAnexos = (): InformationRow[] => {
		let anexos: InformationRow[] = []
		if (gestion.ttGarantiaGestion != null && gestion.ttGarantiaGestion.tipoGarantia.tipoGarantiaId === 1) {
			anexos.push({
				header: "Documento de Personal de Identificaci??n del Fiador",
				value: Anexo(23)
			})
			anexos.push({
				header: "Estado patrimonial del fiador",
				value: Anexo(24)
			})
		}

		return anexos
	}



	const generateRows = (): InformationRow[] => {

		let anexos: InformationRow[] = [
			{
				header: "Mapa de acceso al ??rea desde el casco municipal",
				value: Anexo(4),
			},
			{
				header: "Mapa de uso actual de la finca y colindantes (Google earth, Landsat u otro reciente)",
				value: Anexo(2),
			},
			{
				header: "Mapa de pendientes y recursos h??dricos",
				value: Anexo(5),
			},
			{
				header: "Mapa de ubicaci??n del bosque a manejar y protejer en el contexto de la finca",
				value: Anexo(3),
			},
			{
				header: "Mapa de distribuci??n espacial de los ??rboles a extraer, recursos h??dricos, caminos y bacadillas",
				value: Anexo(8),
			},
			{
				header: "Mapa integral (rodalizaci??n del ??rea de manejo y ubicaci??n de parcelas de muestreo y protecci??n)", //"Mapa de distribuci??n de ??rboles semilleros, remanentes y futura cosecha",
				value: Anexo(6),
			},
			{
				header: "Mapa de ??rea de compromiso de repoblaci??n forestal",
				value: Anexo(7),
			},
			{
				header: "Coordenadas de las ??reas de aprovechamiento, protecci??n y descuento",
				value: Anexo(9),
			},
			{
				header: "Informacion digital del inventario forestal (boleta del censo en formato de excel)",
				value: Anexo(10),
			},
			{
				header: "Solicitud con firma autenticada",
				value: Anexo(11),
			}
		]
		anexos.push(...fincaAnexos())
		anexos.push({
			header: "Copia del (los) documento (s) personal (es) de identificaci??n del (los) propietario (s)",
			value: Anexo(12),
		})
		anexos.push(...representanteAnexos())
		anexos.push({
			header: "Plan de manejo forestal",
			value: Anexo(13),
		})
		anexos.push(...planesAnexos())
		anexos.push(...garantiaAnexos())
		anexos.push(
			{
				header: "Constancia de inscripci??n de las motosierras que ser??n empleadas durante el aprovechamiento",
				value: Anexo(28)
			}
		)
		return anexos
	}

	const downloadPlan = (onResponse: () => void, onError: (error: any) => void) => {
		gestionHasta90Api.descargarPlanManejoPDF(gestion.gestionId, onResponse, onError)
	}

	if (gestion == null) {
		return null
	}

	return (
		<div>
			<DownloadButton
				content="Descargar plan de manejo"
				floated="right"
				labelPosition="right"
				primary
				icon="download"
				downloadFunction={downloadPlan}
				style={{ marginBottom: "12px" }} />
			<InformationTable
				rows={generateRows()}
			/>
		</div>
	)
}
