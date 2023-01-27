import React, { useContext, useState, useEffect } from 'react'
import BoletaCensoApi from 'api/latifoliado/hasta90/BoletaCensoApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import CargarBoletaDTO from 'dto/boleta/CargarBoletaDTO'
import { Button, Confirm, Form, Header, Icon, Segment } from 'semantic-ui-react'
import TipoInventarioSelect from 'components/FormCatalogSelect/catalogs/TipoInventarioSelect'

type Props = {
	gestion: any
	setNextButtonDisabled: (disabled: boolean) => void
}

const boletaCensoApi = new BoletaCensoApi()

export default function BoletaCenso({
	gestion,
	setNextButtonDisabled
}: Props) {

	const appDataContext = useContext(AppDataContext);
	const uploadInput = React.useRef<any>(null);
	const [openDialog, setOpenDialog] = useState(false)
	const [loading, setLoading] = useState(false)
	const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false)
	const [fileName, setFileName] = useState<string>()
	const [header, setHeader] = React.useState<string | undefined>("Suba el archivo de censo")
	const [tipoInventario, setTipoInventario] = useState()

	const handleClick = () => {
		if (uploadInput != null) {
			let current = uploadInput.current
			if (current != null) {
				current.click()
			}
		}
	}

	const handleDownloadFile = () => {

		const handleResponse = (res: any) => {
			setLoading(false)
		}

		const handleError = (error: AxiosError) => {
			appDataContext.errorToast("Error en la descarga de archivo. Vuelva a intentarlo")
			setLoading(false)
		}

		boletaCensoApi.getFile(gestion.gestionId, fileName!, handleResponse, handleError)

		setLoading(true)
	}

	const clearFileUpload = () => {

		const handleResponse = (res: any) => {
			if (res.status === "OK") {
				appDataContext.successToast("Archivo eliminado exitosamente")
			}
			else {
				appDataContext.errorToast("Error en la eliminación de archivo. Vuelva a intentarlo")
			}

			setIsFileLoaded(false)
			let current = uploadInput.current;
			current.value = null;
			setOpenDialog(false)
			setLoading(false)
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
			appDataContext.errorToast("Error en la eliminación de archivo. Vuelva a intentarlo")
			setLoading(false)
		}

		setLoading(true)
		boletaCensoApi.removeFile(gestion.gestionId, handleResponse, handleError)

	}

	const fileUpload = (e: any) => {
		if (e.target.files != null && e.target.files.length > 0) {
			readBlob(e.target.files[0]);
		}
		else {
			setIsFileLoaded(false)
		}
	}


	const readBlob = (file: any) => {
		var reader = new FileReader();
		if (file) {
			reader.onerror = () => {
				setIsFileLoaded(false)
			}
			reader.onload = () => {
				handleFileLoad(file)
			};

			reader.readAsDataURL(file);
		}
	}

	const handleFileLoad = (file: any) => {

		if (file != null) {

			const onResponse = (response: any) => {
				if (response.status === "OK") {
					setIsFileLoaded(true)
					setFileName(file.name)
					setHeader(file.name)
					appDataContext.successToast("Archivo cargado exitosamente.")
				}
				else {
					appDataContext.errorToast("Archivo no pudo ser cargado. Intentelo de nuevo.")
				}
				setLoading(false)
			}

			const onError = (axiosError: AxiosError) => {
				console.log(axiosError)
				appDataContext.errorToast("Archivo no pudo ser cargado. Intentelo de nuevo.")
				setLoading(false)
			}

			let cargaBoleta: CargarBoletaDTO = {
				personaId: gestion.personaAnulaId,
				calculadoPorSistema: false
			}

			boletaCensoApi.uploadFile(gestion.gestionId, file, cargaBoleta, onResponse, onError);
			setLoading(true)
		}
	}

	useEffect(() => {
		if (gestion.archivoGestion != null) {
			setIsFileLoaded(true)
			setFileName(gestion.archivoGestion.nombre)
			setHeader(gestion.archivoGestion.nombre)
		}
	}, [gestion])

	useEffect(() => {
		setNextButtonDisabled(!isFileLoaded)
		if (!isFileLoaded) {
			setHeader("Suba archivo de censo")
		}
	}, [isFileLoaded, setNextButtonDisabled])


	return (
		<Segment textAlign="center" placeholder style={{ height: "100%" }}>
			<Header icon>
				<Icon name='file excel' />
				{header}
			</Header>
			<Segment.Inline>
				{!isFileLoaded ?
					<>
						<Form>
							<TipoInventarioSelect
								label="Tipo inventario"
								value={tipoInventario}
								onChange={(e, { value }) => setTipoInventario(value)}
							/>
							<Form.Button compact labelPosition='right' icon size="large" loading={loading} onClick={handleClick}>
								Cargar archivo
								<Icon name="upload" />
							</Form.Button>
						</Form>

					</>
					:
					<>
						<Button compact labelPosition='right' icon size="large" color="instagram" loading={loading} onClick={handleDownloadFile}>
							Descargar archivo
						<Icon name="download" />
						</Button>
						<Button compact labelPosition='right' icon size="large" negative onClick={() => setOpenDialog(true)}>
							Quitar documento
						<Icon name="trash" />
						</Button>
					</>
				}
			</Segment.Inline>
			<input
				ref={uploadInput}
				type="file"
				accept={".xls,.xlsx"}
				hidden
				onChange={fileUpload}
			/>
			<Confirm
				header="Quitar archivo de censo"
				content="¿Desea quitar el archivo de censo? Deberá volver a ingresar la información dependiente de ello."
				confirmButton="Confirmar"
				cancelButton="Cancelar"
				open={openDialog}
				onConfirm={clearFileUpload}
				onCancel={() => setOpenDialog(false)}
			/>
		</Segment>
	)
}
