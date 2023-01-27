import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import SeguimientoTareaDTO, { createNewRegional } from 'dto/tarea/SeguimientoTareaDTO';
import DictamenRegionalFormError, { newDictamenRegionalFormError, validateForm } from './DictamenRegionalFormError';
import FormModal from 'components/FormModal';
import DictamenRegional from './DictamenRegional';
import { tareaApi, gestionApi, montoGarantiaApi } from 'api';
import { AppDataContext } from 'app/App';
import { regionalApi } from 'api/latifoliado';

type Props = {
    tareaData: any
    setClose: () => void
}

export default function ExpedienteDictamenRegional({
    tareaData,
    setClose
}: Props) {

    const appDataContext = useContext(AppDataContext);
    const [ttGestion, setTtGestion] = useState<any>()
    const [montogarantia, setMontogarantia] = useState<any[]>([])
    const [formData, setFormData] = useState<SeguimientoTareaDTO>(createNewRegional());
    const [formError, setFormError] = useState<DictamenRegionalFormError>(newDictamenRegionalFormError());
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const errorToast = useCallback(appDataContext.errorToast, [])
    const successToast = useCallback(appDataContext.successToast, [])
    const [loading, setLoading] = useState(false)
    const [previewLoading, setPreviewLoading] = useState(false)

    useEffect(() => {
        setFormData(createNewRegional());
        setFormError(newDictamenRegionalFormError());
        if (tareaData) {
            getPadre()
        }

        

    }, [tareaData])

    const closeConfirm = () => {
        setOpenConfirm(false)
    }

    const getPadre = () => {
        const HandleResponse = (response: any) => {
            if (response.status === "OK") {                
                setTtGestion(response.data[0])
                console.log(response.data)
                getTipogarantia()
            }
            else {
                errorToast('Error al obtener gestión')
            }
        }

        const HandleError = (error: any) => {
            console.log("Error al obtener gestión padre")
        }

        gestionApi.getPadre(tareaData.tareaId, HandleResponse, HandleError);
    }

    const getTipogarantia = () => {
        console.log('tipoGarantia')
        const HandleResponse = (response: any) => {
            console.log(response)
            if (response.status === "OK") {
                setMontogarantia(response.data)
            }
            else {
                errorToast('Error al obtener tipogarantia')
            }
        }

        const HandleError = (error: any) => {
            console.log('Error al obtener tipogarantia')
        }

        if (tareaData.ttGestion.aprovechamientoDTO !== null) {
            montoGarantiaApi.getTipogarantia(ttGestion.aprovechamientoDTO.tipoGarantia.tipoGarantiaId, HandleResponse, HandleError);
        }
    }

    const onSave = () => {
        console.log(ttGestion)
        let formError = validateForm(formData, ttGestion.planificacionDTO && ttGestion.planificacionDTO.aniosRevisionActualizacion ? ttGestion.planificacionDTO.aniosRevisionActualizacion : 0)
        setFormError(formError)

        if (!formError.isError) {
            setOpenConfirm(true)
        }
    }

    const getFundamentos = () => {
        let fundamento: any = {
            enmienda: [],
            aprobado: 1,
            approved: true,
            amendment: false,
            fechaIni: formData.fechaEmision,
            fechaFin: formData.fechaVencimiento,
            montoUtilizar: getMontoUtilizar()
        }
        return fundamento;
    }

    const getMontoUtilizar = () => {
        let monto = 0;
        return monto;
    }

    const getEnmiendas = (): string => {
        let row: any = {
            codigo: formData.numeroResolucion,
            taskId: tareaData.tcTask.taskId,
            tareaId: tareaData.tareaId,
            personaId: tareaData.tcPersonaAsignada.personaId,
            personaDesc: tareaData.tcPersonaAsignada.personaDesc,
            enmienda: []
        };

        var enmiendas: any[] = []
        let enmienda = JSON.parse(formData.enmienda);
        for (var j = 0; j < enmienda.length; j++) {
            var item = {
                descripcion: enmienda[j].descripcion
            };
            row.enmienda.push(item);
        }
        enmiendas.push(row);
        return JSON.stringify(enmiendas)
    }

    const setTareaData = () => {
        let ttTarea = tareaData;   
        //AgregarEnmienda == True || APROBADO == 0 (false) || APROBADO == 1 (true)
        if (formData.agregarEnmienda === true) {

            let enmiendas = getEnmiendas()

            if (enmiendas === '[]') {
                errorToast('Debe agregar una enmienda')
                setOpenConfirm(false)
                return;
            }
            ttTarea.aprobado = 2;
            tareaData.esEnmienda = 1;
            ttTarea.ttSeguimientoTarea = {
                fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
                fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
                enmienda: enmiendas,
                codigo: formData.numeroResolucion,
                fundamento: formData.fundamentos
            };
        }
        else if (formData.aprobado === 0) {
            if (formData.fundamentos === '[]') {
                errorToast('Debe agregar una condición o fundamento')
                setOpenConfirm(false)
                return;
            }
            tareaData.esEnmienda = 0;
            ttTarea.aprobado = formData.aprobado;
            ttTarea.ttSeguimientoTarea = {
                fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
                analisis: null,
                numeroResolucion: formData.numeroResolucion,
                providencia: formData.numeroProvidencia,
                fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
                fundamento: formData.fundamentos
            };

        }
        else if (formData.aprobado === 1) {
            ttTarea.aprobado = formData.aprobado;
            tareaData.esEnmienda = 0;
            ttTarea.ttSeguimientoTarea = {
                fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
                analisis: JSON.stringify('[]'),
                numeroResolucion: formData.numeroResolucion,
                providencia: formData.numeroProvidencia,
                fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
                fundamento: JSON.stringify(getFundamentos())
            };
        }
    }

    const sendRequest = () => {

        // let ttTarea = tareaData;
        // //AgregarEnmienda == True || APROBADO == 0 (false) || APROBADO == 1 (true)
        // if (formData.agregarEnmienda === true) {
        //     if (formData.enmienda === '[]') {
        //         errorToast('Debe agregar una enmienda')
        //         setOpenConfirm(false)
        //         return;
        //     }
        //     ttTarea.aprobado = 2;
        //     ttTarea.ttSeguimientoTarea = {
        //         fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         enmienda: formData.enmienda,
        //         codigo: formData.numeroResolucion,
        //         fundamento: formData.fundamentos
        //     };
        // }
        // else if (formData.aprobado === 0) {
        //     if (formData.fundamentos === '[]') {
        //         errorToast('Debe agregar una condición o fundamento')
        //         setOpenConfirm(false)
        //         return;
        //     }
        //     ttTarea.aprobado = formData.aprobado;
        //     ttTarea.ttSeguimientoTarea = {
        //         fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         analisis: null,
        //         numeroResolucion: formData.numeroResolucion,
        //         providencia: formData.numeroProvidencia,
        //         fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         fundamento: formData.fundamentos
        //     };

        // }
        // else if (formData.aprobado === 1) {
        //     ttTarea.aprobado = formData.aprobado;
        //     ttTarea.ttSeguimientoTarea = {
        //         fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         analisis: JSON.stringify('[]'),
        //         numeroResolucion: formData.numeroResolucion,
        //         providencia: formData.numeroProvidencia,
        //         fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         fundamento: JSON.stringify(getFundamentos())
        //     };
        // }


        const handleResponse = (response: any) => {
            if (response.status === "OK") {
                successToast(response.message)
                setOpenConfirm(false)
                onPreview()
                setClose()
            }
            else {
                errorToast(response.message)
            }
            setLoading(false)
        }

        const handleError = (error: any) => {
            setLoading(false)
            console.log('Error al ejecutar put Regional')
        }

        setTareaData()
        setLoading(true)
        tareaApi.putDictamenRegional(tareaData, handleResponse, handleError);
    }

    const onPreview = () => {        

        // let ttTarea = tareaData;   
             
        // //AgregarEnmienda == True || APROBADO == 0 (false) || APROBADO == 1 (true)
        // if (formData.agregarEnmienda === true) {

        //     let enmiendas = getEnmiendas()

        //     if (enmiendas === '[]') {
        //         errorToast('Debe agregar una enmienda')
        //         setOpenConfirm(false)
        //         return;
        //     }
        //     ttTarea.aprobado = 2;
        //     tareaData.esEnmienda = 1;
        //     ttTarea.ttSeguimientoTarea = {
        //         fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         enmienda: enmiendas,
        //         codigo: formData.numeroResolucion,
        //         fundamento: formData.fundamentos
        //     };
        // }
        // else if (formData.aprobado === 0) {
        //     if (formData.fundamentos === '[]') {
        //         errorToast('Debe agregar una condición o fundamento')
        //         setOpenConfirm(false)
        //         return;
        //     }
        //     ttTarea.aprobado = formData.aprobado;
        //     ttTarea.ttSeguimientoTarea = {
        //         fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         analisis: null,
        //         numeroResolucion: formData.numeroResolucion,
        //         providencia: formData.numeroProvidencia,
        //         fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         fundamento: formData.fundamentos
        //     };

        // }
        // else if (formData.aprobado === 1) {
        //     ttTarea.aprobado = formData.aprobado;
        //     ttTarea.ttSeguimientoTarea = {
        //         fechaAdmision: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         analisis: JSON.stringify('[]'),
        //         numeroResolucion: formData.numeroResolucion,
        //         providencia: formData.numeroProvidencia,
        //         fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
        //         fundamento: JSON.stringify(getFundamentos())
        //     };
        // }

        const handleResponse = (response: any) => {
            setPreviewLoading(false)
            if (response.status === "OK") {
                console.log('OK')
                successToast(response.message)
                setOpenConfirm(false)
                setClose()
            }
            else {
                errorToast(response.message)
            }
        }

        const handleError = (error: any) => {
            setPreviewLoading(false)
            console.log('Error al ejecutar put Regional')
        }


        if (formData.numeroResolucion.trim() !== '') {
            setTareaData()
            setPreviewLoading(true)
            if (formData.agregarEnmienda === false) {
                //DOCUMENTO DICTAMEN
                regionalApi.descargarDictamenPreview(tareaData, handleResponse, handleError);
            }
            else {
                //DOCUMENTO ENMIENDA
                regionalApi.descargarDictamenPreview(tareaData, handleResponse, handleError);
            }
        }
        else {
            errorToast('Debe indicar el número de dictamen')
        }
    }

    const renderButtons = () => {
        return (
            <div style={{ marginTop: "16px" }}>
                <Button floated="right" loading={loading} primary onClick={onSave}>
                    Guardar
                </Button>
                <Button color={'yellow'} onClick={onPreview} floated="right" loading={previewLoading}>
                    Vista Previa
                </Button>
            </div>)
    }

    return (
        <>
            <FormModal
                closeModal={closeConfirm}
                open={openConfirm}
                onSave={sendRequest}
                header={'Confirmación'}
                scrollable={true}
                confirmLabel='Confirmar'
                loading={loading}
            >
                <h4>
                    ¿Está seguro (a) de guardar su opinión? Esta acción no se podrá reversar
                </h4>
            </FormModal>
            <DictamenRegional
                gestionData={ttGestion}
                tareaData={tareaData}
                formError={formError}
                seguimientoData={formData}
                setFormData={setFormData} />

            {renderButtons()}
        </>
    )
}
