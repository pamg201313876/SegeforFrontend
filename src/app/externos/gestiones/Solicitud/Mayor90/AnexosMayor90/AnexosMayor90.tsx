import FielApi from 'api/FileApi'
import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import UploadFormButton from 'components/UploadButton/UploadFormButton'
import React, { useContext, useEffect, useState } from 'react'
import { Divider, Form, Header, Segment } from 'semantic-ui-react'


type Props = {
	gestion: any,
}

const fileApi = new FielApi();
const gestionApi = new GestionApi();

export default function AnexosMayor90({
	gestion
}: Props) {

	const dataContext = useContext(AppDataContext)
	const [dataInicializadora, setDataInicializadora] = useState<any>({});

	const notifyInfo = () => dataContext.successToast("Proceso exitoso");
	const error = (cadena: string) => dataContext.errorToast(cadena);

	//use effect para darle get al servicio
	useEffect(() => {
		if (gestion != null) {
			setDataInicializadora(gestion)
		}
	}, [gestion]);


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


	return (
		<Segment raised>
			<Form>
				<Header textAlign={"justified"}>NOTA: Todos los mapas deben de llevar su orientación al Norte, escala gráfica y numérica, Identificación de vértices georeferenciados con DATUM WGS 84,
				sistema de coordenadas GTM y grilla de coordenadas, los cuales deberán aparecer en la leyenda debidamente anotado como parte de las referencias. Con respecto a la protección del recurso hídrico se deberá considerar la Normativa Forestal Vigente (Ley Forestal y su Reglamento, Lineamientos Técnicos de Manejo Forestal Sostenible, Código de Salud, entre otros).  
				</Header>
				<UploadFormButton defaultLabel={"1. Croquis de acceso al área desde el casco municipal"} name={"4"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="4" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"2. Mapa integral del área total de la finca y colindantes (Ortofoto)"} name={"5"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="5" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"3. Mapa de uso actual de la finca"} name={"6"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="6" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"4. Mapa de estratificación del área de manejo y ubicación de parcelas de muestreo"} name={"7"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="7" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"5. Archivo digital en formato Excel de las coordenadas de las áreas de intervención"} name={"8"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="8" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"6. Mapa de caminos y bacadillas (actuales y por construir) "} name={"9"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="9" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"7. Mapa de actividades por año (turno, estratos, cuarteles de corta)"} name={"10"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="10" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"8. Mapa de pendientes de áreas de protección y recursos hídricos"} name={"11"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="11" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"9. Archivo digital en formato Excel de las coordenadas del área de protección"} name={"12"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="12" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"10. Mapa de área de compromiso de repoblación forestal y ubicación de ronda"} name={"13"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="13" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"11. Archivo digital en formato Excel de las coordenadas del compromiso y descuento"} name={"14"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="14" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"12. Libreta de campo y resumen del inventario forestal"} name={"17"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="17" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"13. Libreta de campo de regeneración natural"} name={"16"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="16" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"14. Presentar la información en formato digital editable de las coordenadas de los polígonos propuestos en el plan de manejo"} name={"15"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="15" />				
				<Divider></Divider>				
				<UploadFormButton defaultLabel={"15. Copia de solicitud de licencia de aprovechamiento forestal"} name={"18"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="18" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"16. Copia de documento(s) de indentificación personal del solicitante y copropietarios del bosque a intervenir"} name={"19"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="19" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"17. Copia del documento de identificación personal del representante legal (cuando aplique)"} name={"20"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="20" />				
				<Divider></Divider>				
				<UploadFormButton defaultLabel={"18. Copia del documento de nombramiento del representante legal (cuando aplique)"} name={"21"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="21" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"19. Copia de constancia de Registro vigente del elaborador de planes de manejo"} name={"22"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="22" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"20. Copia de constancia de colegiado activo del elaborador (cuando su categoría es Profesional)"} name={"23"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="23" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"21. Copia del documento que acredita los derechos sobre el bien inmueble"} name={"24"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="24" />
				<Divider></Divider>
				<UploadFormButton defaultLabel={"22. Boleta de campo de la información del inventario (con datos de área basal y volumen estimado)"} name={"25"} url="/" gestion={dataInicializadora} handleChange={handleChange} numeroAnexo="25" />
				<Divider></Divider>
			</Form>
		</Segment>
	)
}
