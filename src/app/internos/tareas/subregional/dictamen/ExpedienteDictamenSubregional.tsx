import { montoGarantiaApi, tareaApi } from 'api';
import { subregionalApi } from 'api/latifoliado';
import { AppDataContext } from 'app/App';
import RequisitosTable from 'app/internos/solicitudes/secretario/IngresarLicencia/RequisitosTable';
import { AxiosError } from 'axios';
import FormModal from 'components/FormModal';
import SeguimientoTareaDTO, { createNew } from 'dto/tarea/SeguimientoTareaDTO';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Header } from 'semantic-ui-react';
import DictamenSubregional from './DictamenSubregional';
import DictamenSubregionalFormError, { newDictamenSubregionalFormError, validateForm } from './DictamenSubregionalFormError';

type Props = {
    tareaData: any
    setClose: () => void
}


export default function ExpedienteDictamenSubregional({
    tareaData,
    setClose
}: Props) {

    const [dataAval, setDataAval] = useState<any>(null)
    const appDataContext = useContext(AppDataContext);
    const [dictamen, setDictamen] = useState<any[]>([])
    const [montogarantia, setMontogarantia] = useState<any[]>([])
    const [formData, setFormData] = useState<SeguimientoTareaDTO>(createNew());
    const [formError, setFormError] = useState<DictamenSubregionalFormError>(newDictamenSubregionalFormError());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openRevisionExp, setOpenRevisionExp] = useState<boolean>(false);
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [requisitosObligatorios] = useState<any[]>([
        { "requisitoId": 1, "requisitoDesc": "Dictamen Jurídico (No. Dictamen, texto, etc. correctamente)", "obligatorio": 1 },
        { "requisitoId": 2, "requisitoDesc": "Dictamen Técnico (No. Dictamen, texto, etc. correctamente)", "obligatorio": 1 },
        { "requisitoId": 3, "requisitoDesc": "Calculo del valor de la madera", "obligatorio": 1 },
        { "requisitoId": 4, "requisitoDesc": "Solicitud de AVAL de garantía fiduciaria (Si aplica)", "obligatorio": 1 },
        { "requisitoId": 5, "requisitoDesc": "El expediente está completo para trasladar a la región", "obligatorio": 1 }
    ])
    const [requisitosCheck, setRequisitosCheck] = useState<any>({})
    const errorToast = useCallback(appDataContext.errorToast, [])
    const successToast = useCallback(appDataContext.successToast, [])
    const [previewLoading, setPreviewLoading] = useState(false)

    const getTipogarantia = () => {
        const HandleResponse = (response: any) => {
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
            montoGarantiaApi.getTipogarantia(tareaData.ttGestion.aprovechamientoDTO.tipoGarantia.tipoGarantiaId, HandleResponse, HandleError);
        }
    }

    const getDictamen = () => {
        const HandleResponse = (response: any) => {
            if (response.status === "OK") {
                setDictamen(response.data)
                getTipogarantia()
            }
            else {
                errorToast('Error al obtener dictamen')
            }
        }

        const HandleError = (error: any) => {
            console.log("Error al obtener dictamen")
        }

        tareaApi.getDictamen(tareaData.ttGestion.gestionId, HandleResponse, HandleError);
    }

    const getEstimacion = () => {

        const handleResponse = (res: any) => {
            if (res.status === "OK") {
                setDataAval(res.data[0])
            }
            else {
                console.log(res)
                console.error(res.message)
                appDataContext.errorToast(res.message)
            }
        }

        const handleError = (axiosError: any) => {
            console.error(axiosError)
            appDataContext.errorToast("Error al descargar datos.")
        }

        if (tareaData == null) {
            return
        }

        subregionalApi.getAvalGarantia(tareaData.tareaId, handleResponse, handleError)
    }

    const closeRevisionExp = () => {
        setOpenRevisionExp(false)
    }

    const closeConfirm = () => {
        setOpenConfirm(false)
    }

    const getFundamentos = () => {
        let fundamento: any = {
            fechaRecepcion: "",
            juridico: {
                fechaFinalizacion: "",
                personaDesc: "",
                codigo: 0
            },
            tecnico: {
                fechaFinalizacion: "",
                personaDesc: "",
                codigo: 0
            },
            garantia: {
                fechaFinalizacion: "",
                personaDesc: "",
                codigo: 0
            },
            montoUtilizar: getMontoUtilizar()
        }

        dictamen.forEach(item => {
            if (item.ttSeguimientoTarea !== null) {
                console.log(item)
                var stateGo = item.tcTask.stateGo ? item.tcTask.stateGo.split('.') : '';
                var field = stateGo[stateGo.length - 1]
                console.log(field)
                fundamento[field].fechaFinalizacion = item.fechaRegistro;
                fundamento[field].personaDesc = item.tcPersonaAsignada ? item.tcPersonaAsignada.personaDesc : '';
                fundamento[field].codigo = item.ttSeguimientoTarea.numeroResolucion ? item.ttSeguimientoTarea.numeroResolucion : 0;
            }
        });
        return fundamento;
    }

    const getMontoUtilizar = () => {
        let monto = 0;
        montogarantia.forEach(item => {
            if (item.tcTipoMonto.tipoMontoId === 1) {
                monto = item.monto;
            }
        });
        return monto;
    }

    const onAccept = () => {
        if (validateRequisitosExpediente(requisitosObligatorios, requisitosCheck)) {
            setOpenConfirm(true)

        }
        else {
            errorToast('Debe marcar todas las casillas.')
        }
    }

    const onSave = () => {

        if (isLoading) {
            return
        }

        let formError = validateForm(formData)
        setFormError(formError)

        if (!formError.isError) {
            if (formData.aprobado === 1) {
                setOpenRevisionExp(true)
            }
            else {
                setOpenConfirm(true)
            }
        }
    }

    const sendRequest = () => {

        const handleResponse = (response: any) => {
            if (response.status === "OK") {
                console.log('OK')
                successToast(response.message)
                setOpenConfirm(false)
                setOpenRevisionExp(false)
                getPDFfinal()
                setClose()
            }
            else {
                errorToast(response.message)
            }
            setIsLoading(false)
        }

        const handleError = (error: any) => {
            setIsLoading(false)
            console.log('Error al ejecutar put Dictamen')
        }

        setDataTarea()

        setIsLoading(true)
        if (formData.agregarEnmienda === false) {
            tareaApi.putDictamenSubregional(tareaData, handleResponse, handleError);
        }
        else {
            tareaApi.postEnmiendaTarea(tareaData, handleResponse, handleError)
        }


    }

    const setDataTarea = () : boolean => {
        //APROBADO == 0 || APROBADO == 1
        if (formData.agregarEnmienda === false) {
            tareaData.aprobado = formData.aprobado;
            tareaData.esEnmienda = 0;
            tareaData.ttSeguimientoTarea = {
                fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
                fundamento: JSON.stringify(getFundamentos()),
                numeroResolucion: formData.numeroResolucion,
                area: dataAval.areaGarantia,
                monto: dataAval.montoGarantia
            };
        }
        else {
            if (formData.enmienda === '[]') {
                errorToast('Debe agregar una enmienda')
                setOpenConfirm(false)
                return false;
            }

            tareaData.aprobado = 2;
            tareaData.esEnmienda = 1;
            tareaData.ttSeguimientoTarea = {
                fechaProvidencia: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
                enmienda: getEnmiendas(),
                codigo: formData.numeroResolucion
            };
        }

        return true
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

    const getPDFfinal = () => {

        const handleResponse = (res: any) => {
            if (res.status === "OK") {

            }
            else {
                console.error(res.message)
                appDataContext.errorToast(res.message)
            }
        }
        const handleError = (axiosError: AxiosError) => {
            console.error(axiosError)
            appDataContext.errorToast("Error al descargar datos.")
        }

        if (tareaData == null) {
            return
        }

        if (!formData.agregarEnmienda) {
            subregionalApi.descargarDictamenSubPDF(tareaData.tareaId, handleResponse, handleError)
        }
        else{
            subregionalApi.descargarEnmiendaSubregional(tareaData.tareaId, handleResponse, handleError)
        }
    }


    const onPreview = () => {

        if (previewLoading) {
            return
        }

        const HandleResponse = (response: any) => {
            if (response.status !== "OK") {
                errorToast(response.message)
            }
            setPreviewLoading(false)
        }

        const HandleError = (error: any) => {
            setPreviewLoading(false)
            errorToast('Error al descargar documento. Intentelo de nuevo')
        }

        if (formData.numeroResolucion.trim() !== '') {
            setPreviewLoading(true)
            setDataTarea()
            if (formData.aprobado === 1) {
                subregionalApi.descargarDictamenSubPreview(tareaData, HandleResponse, HandleError)
            }
            else {
                subregionalApi.descargarEnmiendaSubregionalPreview(tareaData, HandleResponse, HandleError)
            }
        }
        else {
            errorToast('Debe indicar el número de dictamen')
        }
    }

    const validateRequisitosExpediente = (requisitos: any[], data: any) => {
        let flag = true;
        requisitos.forEach(requisito => {
            if (requisito.obligatorio === 1) {
                if (data["requisito" + requisito.requisitoId] === undefined || data["requisito" + requisito.requisitoId] === false) {
                    flag = false;
                }
            }
        });
        return flag;

    }

    useEffect(() => {
        setFormData(createNew());
        setFormError(newDictamenSubregionalFormError());
        getDictamen()
        getEstimacion()
    }, [tareaData])


    const renderButtons = () => {
        return (
            <div style={{ marginTop: "16px" }}>
                <Button floated="right" loading={isLoading} primary onClick={onSave}>
                    Guardar
                </Button>
                <Button floated="right" color={'yellow'} onClick={onPreview} loading={previewLoading}>
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
                loading={isLoading}
            >
                <Header size="small">
                    ¿Está seguro (a) de guardar su opinión? Esta acción no se podrá reversar.
                </Header>
            </FormModal>
            <FormModal
                closeModal={closeRevisionExp}
                open={openRevisionExp}
                onSave={onAccept}
                header={'Revise el expediente y verifique que cumple con (marque las casillas para continuar)'}
                confirmLabel='Aceptar'
                cancelLabel='Cerrar'
                scrollable={true}
            >
                <RequisitosTable requisitos={requisitosObligatorios} setRequisitos={setRequisitosCheck}></RequisitosTable>
            </FormModal>
            <DictamenSubregional
                tareaData={tareaData}
                formError={formError}
                setFormData={setFormData} />
            {renderButtons()}
        </>
    )
}
