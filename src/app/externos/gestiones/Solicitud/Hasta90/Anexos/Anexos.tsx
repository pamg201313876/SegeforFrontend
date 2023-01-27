import FielApi from 'api/FileApi'
import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import UploadFormButton from 'components/UploadButton/UploadFormButton'
import React, { useContext } from 'react'
import { Divider, Form, Segment } from 'semantic-ui-react'


type Props = {
	gestion: any,
}

const fileApi = new FielApi();
const gestionApi = new GestionApi();

export default function Anexos({
	gestion
}: Props) {

	const dataContext = useContext(AppDataContext)

	const notifyInfo = () => dataContext.successToast("Proceso exitoso");
	const error = (cadena: string) => dataContext.errorToast(cadena);

	const handleChange = (e: any, { name, value }: any) => {
		let file = value;
		let numero_anexo = name;

		if (file !== null) {
			const onResponse = (response: any) => {
				if (response.status === "OK") {
					addAnexo(response.data[0], numero_anexo)
				}
				else {
					console.error(response)
					dataContext.errorToast(response.message)
				}
			}

			const onError = (axiosError: AxiosError) => {
				console.error(axiosError)
				dataContext.errorToast("Error al agregar anexo. Intentelo de nuevo.")
			}

			fileApi.cargarArchivo(file, onResponse, onError)
		}
	}


	const addAnexo = (e: any, numero_anexo: string) => {
		let anexo = {
			extension: e.extension,
			nombre: e.nombre,
			ruta: e.rutaArchivo,
			size: e.size,
			tcTipoAnexo: {
				tipoAnexoId: numero_anexo
			},
			tipoAnexoId: numero_anexo,
			ttGestion: {
				estadoId: gestion.estadoId,
				gestionId: gestion.gestionId,
				personaAnulaId: gestion.personaAnulaId,
				tcElaborador: gestion.tcElaborador,
				tcPersonaCrea: gestion.tcPersonaCrea,
				tcTipoBosque: gestion.tcTipoBosque,
				tcTipoGestion: gestion.tcTipoGestion,
				ttTipoPropietarioGestion: gestion.ttTipoPropietarioGestion
			}
		};

		const handleResponse = (res: any) => {
			if (res.data.status === "OK") {
				dataContext.successToast("Anexo agregado exitosamente")
			}
			else {
				dataContext.errorToast(res.data.message)
			}
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			dataContext.errorToast("Error al agregar anexo. Intentelo de nuevo.")
		}

		gestionApi.agregarAnexo(anexo, handleResponse, handleError)
	}

	const renderDatosFiador = () => {

		if (gestion.ttFiadorGestion != null) {
			return (
				<>

					<UploadFormButton defaultLabel={"25. Documento de Personal de Identificación del Fiador"} name={"25"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="25" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"26. Estado patrimonial del fiador"} name={"26"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="26" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"27. Propuesta de regente forestal"} name={"27"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="27" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"28. Constancia de inscripción de las motosierras que serán empleadas durante el aprovechamiento"} name={"28"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="28" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"29. Fotocopia simple del Documento Personal de Identificación (DPI) del Representante Legal de la Sociedad (Fiadora)"} name={"29"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="29" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"30. Fotocopia simple del documento que acredite la representación legal de la Sociedad, vigente y debidamente inscrito en el registro respectivo (Fiadora)"} name={"30"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="30" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"31. Acta Notarial que contenga la transcripción del Punto de Acta de Asamblea General de Accionistas donde se autoriza a la Sociedad para que pueda ser fiadora a través de su Representante Legal y poder suscribir los documentos donde la Sociedad figure como fiadora"} name={"31"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="31" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"32. Fotocopia simple de Patente de Comercio de Empresa y de Sociedad (Fiadora)"} name={"32"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="32" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"33. Balance general de la empresa fiadora, certificado por contador debidamente registrado y autorizado (Fiadora)"} name={"33"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="33" />
					<Divider></Divider>
					<UploadFormButton defaultLabel={"34. Estado de resultados de la empresa fiadora, certificado por contador debidamente registrado y autorizado (Fiadora)"} name={"34"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="34" />
					<Divider></Divider>
				</>
			)
		}
	}

	return (
		<Segment raised>
			<Form>
				{/* <ArchivoAnexo gestion={gestion} label="Ejemplo" name={"ej"} numAnexo={2} onFileChange={() => null} /> */}
				<UploadFormButton defaultLabel={"1. Mapa de acceso al área desde el casco municipal"} name={"4"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="4" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"2. Mapa de uso actual de la finca y colindantes (Google earth, Landsat u otro reciente)"} name={"5"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="5" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"3. Mapa de pendientes"} name={"6"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="6" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"4. Mapa de ubicación del bosque a manejar y protejer en el contexto de la finca"} name={"7"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="7" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"5. Mapa de distribución espacial de los árboles a extraer, recursos hídricos, caminos y bacadillas"} name={"8"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="8" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"6. Mapa de distribución de árboles semilleros, remanentes y futura cosecha "} name={"9"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="9" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"7. Mapa de área de compromiso de repoblación forestal."} name={"10"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="10" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"8. Coordenadas de las áreas de aprovechamiento y de las áreas de protección"} name={"11"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="11" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"9. Coordenadas de descuento para los poligonos a intervenir"} name={"12"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="12" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"10. Informacion digital del inventario forestal (boleta del censo en formato de excel"} name={"13"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="13" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"11. Solicitud con firma autenticada"} name={"14"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="14" />
				<Divider></Divider>


				{
					gestion.ttTipoPropietarioGestion && gestion.fincas.length > 0 && gestion.fincas[0].tcTipoPropiedad != null && gestion.fincas[0].tcTipoPropiedad.tipoPropiedadId === 1 ?
						<>	<UploadFormButton defaultLabel={"12. Documento original que acredite la tenencia de la tierra (Certificacion de registro de la propiedad)"} name={"17"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="17" />
						</>
						:
						<>
						</>
				}

				{
					gestion.ttTipoPropietarioGestion && gestion.fincas.length > 0 && gestion.fincas[0].tcTipoPropiedad != null && gestion.fincas[0].tcTipoPropiedad.tipoPropiedadId === 2 ?
						<>	<UploadFormButton defaultLabel={"13. Documento original que acredite la tenencia de la tierra (Acta notarial de posesión del terreno)"} name={"16"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="16" />
						</>
						:
						<>
						</>
				}


				{
					gestion.ttTipoPropietarioGestion && gestion.fincas.length > 0 && gestion.fincas[0].tcTipoPropiedad != null && gestion.fincas[0].tcTipoPropiedad.tipoPropiedadId === 3 ?
						<>	<UploadFormButton defaultLabel={"14. Documento original que acredite la tenencia de la tierra (Testimonio de la escritura Pública de posesión del terreno)"} name={"15"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="15" />
						</>
						:
						<>
						</>
				}

				<Divider></Divider>

				{/**/}

				<UploadFormButton defaultLabel={"15. Copia del (los) documento (s) personal (es) de identificación del (los) propietario (s)"} name={"18"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="18" />

				<Divider></Divider>

				<UploadFormButton defaultLabel={"16. Copia del documento personal de identificación del Representante Legal"} name={"19"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="19" />
				<Divider></Divider>


				{
					gestion.ttTipoPropietarioGestion && gestion.representantes.length > 0 ?
						<>	<UploadFormButton defaultLabel={"17. Copia legalizada del nombramiento de representante legal, inscrito en el Registro correspondiente"} name={"20"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="20" />
						</>
						:
						<>
						</>
				}


				<UploadFormButton defaultLabel={"18. Plan de manejo forestal"} name={"21"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="21" />
				<Divider></Divider>

				<UploadFormButton defaultLabel={"19. Fotocopia de constancia del Elaborador Plan de Manejo (y Regente cuando aplique)"} name={"22"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="22" />
				<Divider></Divider>

				{/*Renderizar bien estos 2*/}

				<UploadFormButton defaultLabel={"20. Plan de Comercio"} name={"23"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="23" />
				<Divider></Divider>

				<UploadFormButton defaultLabel={"21. Plan de sociedad"} name={"24"} url="/" gestion={gestion} handleChange={handleChange} numeroAnexo="24" />
				<Divider></Divider>

				{renderDatosFiador()}

			</Form>
		</Segment>
	)
}
