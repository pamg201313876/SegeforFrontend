import GestionApi from 'api/GestionApi';
import { AxiosError } from 'axios';
import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

type Props = {
	defaultLabel: string
	url: string,
	buttonLabel?: string
	fileNameLabel?: string
	fileFilter?: string
	contentFile?: any
	loading?: boolean
	name?: String
	style?: any
	error?: any
	handleChange?: (e: any, { name, value }: any) => void

	/*Props added by pamartin 07/02/2021*/	
	gestion?: any			//Gestión debe ser la "Actualizada" para obtener los valores completos de los anexos
	numeroAnexo?: string 	//Con este prop podremos descargar el anexo requerido según el número del tipo de anexo
}

export default function UploadFormButton(props: Props) {

	const gestionApi = new GestionApi(); //Added by pamartin
	const [isDescargable, setDescargable] = React.useState<Boolean>(false) //Added by pamartin
	
	const uploadInput = React.useRef<any>(null);	
	const [isPositive, setPositive] = React.useState<Boolean | null>(null)
	const [label] = React.useState<string>(props.defaultLabel)
	const [buttonLabel, setButtonLabel] = React.useState<string | undefined>(props.fileNameLabel !== undefined ? props.fileNameLabel :  props.buttonLabel != null ? props.buttonLabel : "Subir Archivo")
	const [icon, setIcon] = React.useState<SemanticICONS>("upload")
	const [showClearButton, setShowClearButton] = React.useState<boolean>(false)
	const [file, setFile] = React.useState<any>(null)
	const handleChangeCallback = React.useCallback(props.handleChange !== undefined ? props.handleChange : () => { }, []);

	const handleClick = () => {
		if (uploadInput != null) {
			let current = uploadInput.current
			if (current != null) {
				current.click()
			}
		}
	}

	const clearFileUpload = () => {
		setButtonLabel(props.fileNameLabel !== undefined ? props.fileNameLabel : "Subir Archivo")
		setPositive(null)
		setIcon("upload")
		setShowClearButton(false)
		setFile(null)
		let current = uploadInput.current;
		current.value = null;
	}

	const fileUpload = (e: any) => {
		if (e.target.files != null && e.target.files.length > 0) {
			readBlob(e.target.files[0]);
		}
		else {
			onErrorFile()
		}
	}

	const onErrorFile = () => {
		setButtonLabel(props.fileNameLabel !== undefined ? props.fileNameLabel : "Subir Archivo")
		setPositive(false)
		setIcon("upload")
		setShowClearButton(false)
		setFile(null)
	}

	const readBlob = (file: any) => {
		setFile(file)
		var reader = new FileReader();
		if (file) {

			reader.onerror = () => {
				onErrorFile()
			}

			reader.onload = () => {
				setButtonLabel(file.name)
				setPositive(true)
				setIcon("check")
				setShowClearButton(true)
				// if (reader != null && reader.result != null) {
				// 	setFile(reader.result)
				// }
			};

			reader.readAsDataURL(file);
		}
	}

	React.useEffect(() => {
		console.log('handleChangeCallback')
		if (props.name != null) {
			let name = props.name;
			/*console.log(file)*/
			let value = file;
			console.log('handleChangeCallback x2')
			handleChangeCallback(null, { name, value })
		}
	}, [file, props.name, handleChangeCallback])


	//Modificaciones by pamartin 07/02/2021

	/**
	 * Función by Pamartin 07/02/2021
	 * Creada para el manejo de anexos de gestión
	 *  
	 * @param event 
	 */


	React.useEffect(() => {
		if (props.gestion && props.gestion.gestionId && props.numeroAnexo ) {			
			updateDescargable(props.numeroAnexo)
			//setButtonLabel("Actualizar Archivo")
		}
	}, [props.gestion, isDescargable])

	React.useEffect(() => {
		if(isDescargable){			
			setButtonLabel("Actualizar Anexo")
		}
	}, [isDescargable])

	const getDescarga = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {

		console.log(event.currentTarget.id)

		const handleResponseInicializadora = (entity: any) => {			
			window.navigator.msSaveOrOpenBlob(entity)		
		}

		const handleErrorInicializadora = (error: AxiosError) => {
			console.log(error)
			console.log("Error")
		}

		gestionApi.getGestionFileById(getFileId( props.numeroAnexo ), handleResponseInicializadora, handleErrorInicializadora);

	}

	/**
	 * Función by pamartin
	 * Esta función recibe el tipoAnexoId del anexo, recorre el array 
	 * hasta encontrarlo para obtener el ID del archivo con el cual funciona el 
	 * servicio de descarga
	 * 
	 *  @param tipoAnexoId
	 */

	function getFileId(tipoAnexoId: string | undefined) {

		if(!tipoAnexoId){
			return -1;
		}

		if (props.gestion.anexo) {
			for (var x = 0; x < props.gestion.anexo.length; x++) {
				let anexoActual = props.gestion.anexo[x]
				if (anexoActual && anexoActual.tcTipoAnexo.tipoAnexoId === parseInt(tipoAnexoId)) {					
					return anexoActual.anexoGestionId;
				}
			}
		}
	}


	/**
	 * Función by pamartin
	 * Esta función habilita el botón de descargar, parecido a la funcion anterior
	 * Diferencia es que setea un verdadero al estado Isdescargable
	 *  @param tipoAnexoId
	 */

	function updateDescargable(numero: string) {
		if (props.gestion.anexo) {
			for (var x = 0; x < props.gestion.anexo.length; x++) {
				let anexoActual = props.gestion.anexo[x]
				if (anexoActual && anexoActual.tcTipoAnexo.tipoAnexoId === parseInt(numero)) {
					setDescargable(true)
					return;
				}
			}
			setDescargable(false)
		}		
	}	



	//Fin modificaciones by pamartin

	return (
		<div style={props.style}>
			<div style={{ "fontWeight": "bold" }}>
				<span>{label}</span>
			</div>
			<div style={{ "marginTop": "3px" }}>
				<Button.Group>
					<Button positive={isPositive === true} negative={isPositive === false} loading={props.loading} onClick={handleClick}>
						<Icon size="large" name={icon} />
						{buttonLabel}
					</Button>
					{showClearButton && (<Button negative onClick={clearFileUpload}>
						<Icon name={"trash"} />
					</Button>)}
				</Button.Group>
				<input
					ref={uploadInput}
					type="file"
					accept={props.fileFilter}
					hidden
					onChange={fileUpload}
				/>
			</div>

			{/*Modificación by pamartin 07/02/2021
				Para manejo de anexos de Gestión
			*/}
			{
				isDescargable ?
					
					<div>
						<br></br>
						<Button color="blue" onClick={getDescarga} >
							{"Descargar Anexo Actual"}
						</Button>
					</div>

					:

					<></>

			}
			{/*Fin Modificación by pamartin 07/02/2021*/}

			<div>
				{props.error !== undefined && props.error != null && <Label basic color='red' pointing>
					{props.error}
				</Label>}
			</div>
		</div>
	)
}
