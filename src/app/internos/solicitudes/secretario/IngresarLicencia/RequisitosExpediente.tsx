import React, { useState, useEffect, useContext, useCallback } from 'react'
import FormModal from 'components/FormModal'
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'semantic-ui-react'
import RequisitosExpedienteFormError, { validateForm } from './RequisitosExpedienteFormError';
import { AxiosError } from 'axios';
import SolicitudApi from 'api/SolicitudApi';
import RequisitosTable from './RequisitosTable';
import GestionApi from 'api/GestionApi';
import TokenResponseDTO from 'dto/auth/TokenResponseDTO';
import RequisitosAdicionalesTable from './RequisitosAdicionalesTable';
import { AppDataContext } from 'app/App';

enum Tipo {
    RECIBIR_EXPEDIENTE,
    ENVIAR_ENMIENDA
}

type Props = {
    open: boolean
    closeModal: () => void
    setFormData: Function
    formData: any
    formError: RequisitosExpedienteFormError
    setFormError: Function
    solicitud: any
    tipo: number
}

const solicitudApi = new SolicitudApi()
const gestionApi = new GestionApi()

export default function RequisitosExpediente({
    open,
    closeModal,
    setFormData,
    formData,
    formError,
    setFormError,
    solicitud,
    tipo
}: Props) {
    const appDataContext = useContext(AppDataContext);
    const [requisitosObligatorios, setRequisitosObligatorios] = useState<any[]>([])
    const [requisitosNoObligatorios, setRequisitosNoObligatorios] = useState<any[]>([])
    const [requisitosAdicionales, setRequisitosAdicionales] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const errorToast = useCallback(appDataContext.errorToast, [])
    const successToast = useCallback(appDataContext.successToast, [])

    const onSaveEnviarEnmienda = () => {

    }

    const onSaveRecibirExpediente = () => {
        let formError = validateForm(formData)
        setFormError(formError)
        console.log(formData)
        console.log(solicitud)
        let validateRequisitos = validateRequisitosExpediente(requisitosObligatorios, formData)
        console.log(validateRequisitos)

        let tokenData = localStorage.getItem("tokenData")

        if (!formError.isError && tokenData !== null) {
            if (validateRequisitos) {
                let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
                let solicitudData = {
                    folios: formData.cantidadFolios ? formData.cantidadFolios : 0,
                    personaEntregaDesc: formData.nombre,
                    requisito: getRequisitosExpediente(requisitosObligatorios, requisitosNoObligatorios),
                    solicitudId: solicitud.solicitudId,
                    ttGestion: {
                        estadoId: solicitud.ttGestion.estadoId,
                        expediente: formData.numeroExpediente ? formData.numeroExpediente : 0,
                        gestionId: solicitud.ttGestion.gestionId,
                        personaAnulaId: tokenObj.personaId,
                        tcElaborador: solicitud.ttGestion.tcElaborador,
                        tcPersonaCrea: solicitud.ttGestion.tcPersonaCrea,
                        tcTipoBosque: solicitud.ttGestion.tcTipoBosque,
                        tcTipoGestion: solicitud.ttGestion.tcTipoGestion,
                        ttTipoPropietarioGestion: solicitud.ttGestion.ttTipoPropietarioGestion
                    }
                }

                const handleResponse = (res: any) => {
                    console.log('handleResponse ')
                    console.log(res)
                    if (res.data.status === "OK") {
                        obtenerRecepcion()
                    }
                    else {
                        errorToast(res.data.message)
                    }
                    setLoading(false)
                }

                const handleError = (error: AxiosError) => {
                    console.error(error)
                    setLoading(false)
                }
                setLoading(true)
                solicitudApi.recibirExpediente(solicitudData, handleResponse, handleError)
            }
            else {
                errorToast('Todos los requisitos indicados con asterísto son obligatorios.')
            }
        }
    }

    const onSave = () => {
        if (Tipo.RECIBIR_EXPEDIENTE === tipo) {
            onSaveRecibirExpediente()
        }
        else {
            onSaveEnviarEnmienda()
        }
    }

    const obtenerRecepcion = () => {
        console.log(solicitud.solicitudId)

        const handleResponse = (res: any) => {
            console.log('handleResponse ')
            console.log(res)
            if (res.status === "OK") {
                closeModal()
                successToast(res.message)
            }
            else {
                errorToast(res.message)
            }
            setLoading(false)
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
            setLoading(false)
        }
        setLoading(true)
        solicitudApi.getRecepcionById(solicitud.solicitudId, handleResponse, handleError)
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

    const getRequisitosExpediente = (requisitosObligatorios: any[], requisitosNoObligatorios: any[]) => {
        let requisitosExpediente: any[] = [];
        requisitosObligatorios.forEach(requisito => {
            let tmpRequisito = {
                requisitoDesc: requisito.requisitoDesc,
                requisitoId: requisito.requisitoId
            };
            requisitosExpediente.push(tmpRequisito)
        });

        requisitosNoObligatorios.forEach(requisito => {
            let tmpRequisito = {
                requisitoDesc: requisito.requisitoDesc,
                requisitoId: requisito.requisitoId
            };
            requisitosExpediente.push(tmpRequisito)
        });
        return requisitosExpediente;
    }

    const catalogarRequisitos = (requisitos: any[]) => {
        let requisitosObligatorios: any[] = [];
        let requisitosNoObligatorios: any[] = [];
        requisitos.forEach(requisito => {
            requisito.marcado = 0
            if (requisito.obligatorio === 1)
                requisitosObligatorios.push(requisito)
            else
                requisitosNoObligatorios.push(requisito)
        })
        setRequisitosObligatorios(requisitosObligatorios)
        setRequisitosNoObligatorios(requisitosNoObligatorios)
    }

    useEffect(() => {
        if (solicitud) {
            const handleResponse = (res: any) => {
                let requisitos = res.data;
                if (res.status === "OK") {
                    catalogarRequisitos(requisitos)
                }
                else {
                    errorToast(res.message)
                }
                setLoading(false)
            }

            const handleError = (error: AxiosError) => {
                console.error(error)
                setLoading(false)
            }
            setLoading(true)
            console.log('gestionId ' + solicitud.ttGestion.gestionId)
            gestionApi.getRequisitoById(solicitud.ttGestion.gestionId, handleResponse, handleError)
        }
    }, [solicitud, errorToast])

    const handleChange = (e: any, { name, value }: any) => {
        value = (e.target.type === 'number') ? parseInt(value) : value

        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }

        setFormData((oldValues: any) => ({
            ...oldValues,
            [name]: value,
        }));
    }

    return (
        <FormModal size="large" loading={loading} header="Marque los requisitos que incluye el expediente" open={open} closeModal={closeModal} confirmLabel="Aceptar" onSave={onSave} >
            <RequisitosTable requisitos={requisitosObligatorios} setRequisitos={setFormData}></RequisitosTable>
            {requisitosNoObligatorios.length > 0 && <h4>Otros documentos a recibir</h4>}
            {requisitosNoObligatorios.length > 0 && <RequisitosTable requisitos={requisitosNoObligatorios} setRequisitos={setFormData}></RequisitosTable>}
            {tipo === Tipo.ENVIAR_ENMIENDA && <RequisitosAdicionalesTable requisitos={requisitosAdicionales} setRequisitos={setRequisitosAdicionales}></RequisitosAdicionalesTable>}
            {tipo === Tipo.RECIBIR_EXPEDIENTE &&
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            label='* Nombre de quien entrega'
                            name='nombre'
                            error={formError ? formError.nombre : null}
                            onChange={handleChange}
                            value={formData.nombre ? formData.nombre : ``} />

                        <Form.Input
                            label='Cantidad de folios'
                            name='cantidadFolios'
                            error={formError ? formError.cantidadFolios : null}
                            onChange={handleChange}
                            value={formData.cantidadFolios ? formData.cantidadFolios : ``} />

                        <Form.Input
                            label='Número de expediente'
                            name='numeroExpediente'
                            error={formError ? formError.numeroExpediente : null}
                            onChange={handleChange}
                            value={formData.numeroExpediente ? formData.numeroExpediente : ``} />
                    </Form.Group>
                </Form>
            }
        </FormModal>
    )
}
