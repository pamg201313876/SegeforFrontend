import React, { useContext, useState, useEffect, useCallback } from 'react'
import BoletaCensoApi from 'api/latifoliado/hasta90/BoletaCensoApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import CargarBoletaDTO from 'dto/boleta/CargarBoletaDTO'
import { Button, Confirm, Header, Icon, Segment, Radio } from 'semantic-ui-react'
import BoletaErrorFormModal from './BoletaErrorFormModal'

type Props = {
	gestion: any
	nextButtonRef: React.MutableRefObject<() => boolean>
}

const boletaCensoApi = new BoletaCensoApi()

export default function BoletaCenso({
	gestion,
	nextButtonRef
}: Props) {

	const appDataContext = useContext(AppDataContext);
	const uploadInput = React.useRef<any>(null);
	const [openDialog, setOpenDialog] = useState(false)
	const [openError, setOpenError] = useState(false)
	const [errors, setErrors] = useState<string[]>([])
	const [loading, setLoading] = useState(false)
	const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false)
	const [fileName, setFileName] = useState<string>()
	const [header, setHeader] = React.useState<string | undefined>("Suba el archivo de censo")
	const [calculadoPorSistema, setCalculadoPorSistema] = useState(true)

	const handleTipoDocumentoChange = (_e: any, { checked }: any) => {
		if (checked != null) {
			setCalculadoPorSistema(checked)
		}
	}

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
		e.target.value = null //Para permitir volver a subir el mismo archivo
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
					if (response.errors != null) {
						setOpenError(true)
						setErrors(response.errors)
					}
					else {
						appDataContext.errorToast("Archivo no pudo ser cargado. Intentelo de nuevo.")
					}
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
				calculadoPorSistema: calculadoPorSistema
			}

			boletaCensoApi.uploadFile(gestion.gestionId, file, cargaBoleta, onResponse, onError);
			setLoading(true)
		}
	}

	const closeErrorModal = () => {
		setOpenError(false)
	}

	useEffect(() => {
		if (gestion.archivoGestion != null) {
			setIsFileLoaded(true)
			setFileName(gestion.archivoGestion.nombre)
			setHeader(gestion.archivoGestion.nombre)
		}
	}, [gestion])

	//Validamos datos antes de continuar
	const isDataValid = (): boolean => {
		if (!isFileLoaded) {
			appDataContext.errorToast("Debe cargar la boleta de censo")
		}
		return isFileLoaded
	}

	const isDataValidCallback = useCallback(
		isDataValid,
		[isFileLoaded],
	)

	useEffect(() => {
		nextButtonRef.current = isDataValidCallback
	}, [nextButtonRef, isDataValidCallback])


	return (
		<Segment textAlign="center" placeholder style={{ height: "100%" }}>
			<Header icon>
				<Icon name='file excel' />
				{header}
			</Header>
			<Segment.Inline>
				{!isFileLoaded ?
					<div>
						<Radio label="Datos calculados por sistema" checked={calculadoPorSistema} onChange={(_e) => setCalculadoPorSistema(true)}/>
						<Radio style={{marginLeft: "16px"}} label="Datos ingresados manualmente" checked={!calculadoPorSistema} onChange={(_e) => setCalculadoPorSistema(false)}/>
						<Button style={{marginTop: "16px"}} compact labelPosition='right' icon size="large" loading={loading} onClick={handleClick}>
							Cargar archivo
							<Icon name="upload" />
						</Button>
					</div>
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
			<BoletaErrorFormModal
				open={openError}
				closeModal={closeErrorModal}
				errors={errors}
			/>
		</Segment>
	)
}
