import React, { useState, useEffect, useContext, useCallback } from 'react'
import FormModal from 'components/FormModal'
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import SolicitudApi from 'api/SolicitudApi';
import RequisitosTable from './RequisitosTable';
import GestionApi from 'api/GestionApi';
import { AppDataContext } from 'app/App';
import NuevosRequisitos from './NuevosRequisitos';

type Props = {
    open: boolean
    closeModal: () => void
    setFormData: Function
    solicitud: any
}

const solicitudApi = new SolicitudApi()
const gestionApi = new GestionApi()

export default function FaltantesExpediente({
    open,
    closeModal,
    setFormData,
    solicitud
}: Props) {

    const appDataContext = useContext(AppDataContext);
    const [requisitosObligatorios, setRequisitosObligatorios] = useState<any[]>([])
    const [requisitosNoObligatorios, setRequisitosNoObligatorios] = useState<any[]>([])
    const [requisitosAdicionales, setRequisitosAdicionales] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const errorToast = useCallback(appDataContext.errorToast, [])

    const onSave = () => {
        solicitud.incompleto = JSON.stringify(getRequisitosExpediente())
        const handleResponse = (res: any) => {
            console.log(res)
            if (res.status === "OK") {
                closeModal()
                appDataContext.successToast(res.message)
            }
            else {
                appDataContext.errorToast(res.message)
            }
            setLoading(false)
        }
        const handleError = (error: AxiosError) => {
            console.error(error)
            setLoading(false)
            appDataContext.errorToast("Error al ingresar información. Intentelo más tarde")
        }
        solicitudApi.marcarEnmienda(solicitud, handleResponse, handleError)
    }

    const getRequisitosExpediente = () => {
        let requisitosExpediente: any[] = [];
        requisitosExpediente.push(...requisitosObligatorios)
        requisitosExpediente.push(...requisitosNoObligatorios)
        let i = 1;
        console.log(requisitosAdicionales)
        requisitosAdicionales.forEach(requisito => {
            let tmpRequisito = {
                correlativo: i++,
                descripcion: null,
                requisitoDesc: requisito.descripcion,
                marcado: 1
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
            gestionApi.getRequisitoById(solicitud.ttGestion.gestionId, handleResponse, handleError)
        }
    }, [solicitud, errorToast])

    return (
        <FormModal size="large" loading={loading} header="Marque los requisitos que debe completar el solicitante" open={open} closeModal={closeModal} confirmLabel="Aceptar" onSave={onSave} >
            <RequisitosTable requisitos={requisitosObligatorios} setRequisitos={setFormData}></RequisitosTable>
            {requisitosNoObligatorios.length > 0 && <h4>Otros documentos a recibir</h4>}
            {requisitosNoObligatorios.length > 0 && <RequisitosTable requisitos={requisitosNoObligatorios} setRequisitos={setFormData}></RequisitosTable>}
            <NuevosRequisitos requisitos={requisitosAdicionales} setRequisitos={setRequisitosAdicionales} />
        </FormModal>
    )
}
