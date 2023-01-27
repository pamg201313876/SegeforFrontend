import TareaApi from 'api/TareaApi';
import { AppDataContext } from 'app/App';
import { AxiosError } from 'axios';
import FormModal from 'components/FormModal';
import TokenResponseDTO from 'dto/auth/TokenResponseDTO';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Dimmer, Form, Loader } from 'semantic-ui-react';
import AnexosTable from './AnexosTable';
import ExpedienteFormError, { validateForm } from './ExpedienteError';
import PersonasTable from './PersonasTable';

type File = {
    extension: string,
    nombre: string,
    ruta: string,
    size: number   
}

type Props = {
	open: boolean
    closeModal: () => void
    setFormData: Function
    formData: any
    formError: ExpedienteFormError
    setFormError: Function
    /*personas: any[]
    setPersonas: Function
    anexos: any[]
    setAnexos: Function
    counterPersonas: number
    setCounterPersonas: Function*/
}

type Persona = {
    opositorDesc: string,
    cui: string,
    telefono: string,
    correo: string
}

type Opositor = {
    estadoId: number,
    tcOpositor: Persona
}

export default function Expediente(props: Props) {
	const appDataContext = useContext(AppDataContext);
    const [showLoader, setShowLoader] = useState<boolean>(true)
    const [personas, setPersonas] = useState<any[]> ([])
    const [counterPersonas, setCounterPersonas] = useState<number> (0)
    const [anexos, setAnexos] = useState<any[]> ([])
    const tareaApi = new TareaApi()

    const activateLoading = useCallback(appDataContext.activateLoading, [])
	const desactivateLoading = useCallback(appDataContext.desactivateLoading, [])
	const errorToast = useCallback(appDataContext.errorToast, [])
    const successToast = useCallback(appDataContext.successToast, []);

    const onSave = () => {
        console.log(anexos)
        console.log(personas)
        console.log(props.formData)
        console.log(counterPersonas)
        console.log(getOpositores(personas))
        console.log(props.formData.fechaIngreso)

        let tokenData = localStorage.getItem("tokenData")
        let formError = validateForm(props.formData)
        props.setFormError(formError)
		console.log(props.formData)
		
        if(!formError.isError){
            if(counterPersonas > 0 && tokenData !== null){
                if(anexos.length > 0){
                    let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
    
                    let suspension = {
                        anexos: anexos,
                        estadoId: 3, //subRegionReplace
                        fechaIngreso: props.formData.fechaIngreso,
                        opositores: getOpositores(personas),
                        tcPersonaCrea: {
                            personaId: tokenObj.personaId
                        },
                        ttGestion: props.formData
                    }
    
                    console.log(suspension)
                    console.log(JSON.stringify(suspension))
    
                    const handleResponse = (res: any) => {
                        console.log(res)
                        if(res.status === "OK")    {
                            successToast(res.message)
                            props.closeModal()
                        }
                        else {
                            errorToast(res.message)
                        }
                        desactivateLoading()
                    }
            
                    const handleError = (error: AxiosError) => {
                        console.error(error)
                        desactivateLoading()
                    }	
                    activateLoading('Guardando...')
                    tareaApi.agregar(suspension, handleResponse, handleError)
                }
                else{
                    errorToast('Debe agregar al menos la copia digital del memorial presentado')
                }
         
            }
            else{
                errorToast('Debe agregar al menos una persona que presente oposición')
            }    
        }
    }

    
    const getOpositores = (data: any) => {
        let array = [];
        for(let i = 0; i < counterPersonas; i++){
            let tcOpositor: Persona = {
                opositorDesc: data["nombre" + counterPersonas],
                cui: data["dpi" + counterPersonas],
                telefono: data["telefono" + counterPersonas],
                correo: data["correo" + counterPersonas]
            }

            let opositor: Opositor = {
                estadoId: 1,
                tcOpositor: tcOpositor
            }
            array.push(opositor);
        }
        return array;
    }

    useEffect(() => {
        console.log(props.formData)
        setShowLoader(false)
    }, [])

    useEffect(() => {
        if(!props.open){
            setPersonas([])
            setAnexos([])
            setCounterPersonas(0)    
        }
    }, [props.open])

    useEffect(() => {
        console.log(props.formData)
        props.setFormData(props.formData)
    }, [props.formData])

    const handleChange = (e: any, { name, value }: any) => {
		value = (e.target.type === 'number') ? parseInt(value) : value

		if (e.target.type === 'number' && isNaN(value)) {
			value = ""
		}

		props.setFormData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}));
    }

    const onRemove = (archivo: File) => {
        let array = anexos;
        console.log(anexos)
        let counter = 0;
        array.map((x: File) => {
            if (archivo.ruta === x.ruta) {
                console.log(counter);
                array.splice(counter, 1);
            }
            counter ++;
        })
        setAnexos([...anexos])
    }
    
    const onAdd = (infoFile: any, label: string, message: string) => {
        let array = anexos;
        let file : File = {
            extension: infoFile.extension,
            nombre: label,
            ruta: infoFile.rutaArchivo,
            size: infoFile.size
        }
        array.push(file)
        setAnexos([...anexos])
        console.log(anexos)
        successToast(message)
    }

	return (
		<>

			<FormModal header="" size={'large'} open={props.open} closeModal={props.closeModal} confirmLabel="Aceptar" onSave={onSave} >			
                <Dimmer active={showLoader} inverted>
                    <Loader />
                </Dimmer>
                <h4>Expediente: {props.formData.expediente ? props.formData.expediente : ''}</h4>
                <h4>Propietario/Responsable: {props.formData.tcPersonaCrea && props.formData.tcPersonaCrea.personaDesc ? props.formData.tcPersonaCrea.personaDesc : ''}</h4>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            label='Fecha Ingreso'
                            name='fechaIngreso'
                            error={props.formError ? props.formError.fechaIngreso : null}
                            onChange={handleChange}
                            type='date'
                            value={props.formData.fechaIngreso ? props.formData.fechaIngreso : ``} />
                    </Form.Group>
                </Form>
                {props.open && <PersonasTable personas={personas} setPersonas={setPersonas} counter={counterPersonas} setCounter={setCounterPersonas}></PersonasTable>}
                {props.open && <AnexosTable archivos={anexos} setArchivos={setAnexos} formData={props.formData} setFormData={props.setFormData} setOnAdd={onAdd} setOnRemove={onRemove}></AnexosTable>}
			</FormModal>
		</>
	)
}
