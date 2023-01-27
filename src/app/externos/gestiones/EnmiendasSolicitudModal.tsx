import FormModal from 'components/FormModal'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { gestionApi, tareaApi } from 'api'
import { subregionalApi } from 'api/latifoliado'
import CustomTable, { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable'
import { AxiosError } from 'axios'
import Loading from 'components/Loading'
import { AppDataContext } from 'app/App'

type Props = {
    open: boolean,
    closeModal: () => void,
    ttGestion: any
}


export default function EnmiendasSolicitudModal({
    open,
    closeModal,
    ttGestion
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [enmiendas, setEnmiendas] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const columns: CTColumn[] = [
        {
            header: "No.",
            name: "numero"
        },
        {
            header: "Expediente",
            name: "ttGestion.expediente"
        },
        {
            header: "Fecha de enmienda",
            name: "fechaRegistro",
            isDate: true

        },
        {
            header: "Está activo",
            name: "estadoId",
            isBool: true
        }
    ]

    const buttons: CTButton[] = [
        {
            id: "enmienda",
            icon: "file pdf",
            hint: "Ver enmienda",
            color: "blue"
        },
        {
            id: "oficio",
            icon: "file pdf outline",
            hint: "Generar oficio para la entrega de enmienda(s)",
            color: "red"
        }
    ]

    const getEnmiendas = () => {

        const onResponse = (res: any) => {
            setLoading(false)
            if (res.status === "OK") {
                let enmiendas = res.data
                let i = 1;
                for (let enmienda of enmiendas) {
                    enmienda.numero = i++;
                }
                setEnmiendas(enmiendas)
            }
            else {
                appDataContext.errorToast(res.message)
            }
        }

        const onError = (error: AxiosError) => {
            console.error(error)
            appDataContext.errorToast("Error al cargar información. Intente más tarde")
            setLoading(false)
        }

        setLoading(true)
        gestionApi.getListaEnmiendas(ttGestion.gestionId, onResponse, onError);

    }

    const onButtonClick = (buttonResponse: CTButtonResponse) => {
        let data = buttonResponse.rowData

        const handleResponse = (res: any) => {
            setLoading(false)
        }	
        const handleError = () => {
            appDataContext.errorToast("Error al descargar archivo. Intentelo más tarde.")
            setLoading(false)
        }

        setLoading(true)

        if (buttonResponse.id === "enmienda") {
			subregionalApi.descargarEnmiendaSubregional(data.tareaId, handleResponse, handleError);
        }
        else {
			tareaApi.descargarOficioEnmienda(data.tareaId, handleResponse, handleError);
        }
    }

    const getEnmiendasCallback = useCallback(getEnmiendas, [ttGestion])

    useEffect(() => {
        getEnmiendasCallback()
    }, [getEnmiendasCallback])

    return (
        <FormModal
            size="large"
            header={"Historial de la gestión: " + ttGestion?.expediente}
            noConfirmButton
            open={open}
            closeModal={closeModal}
        >
            {loading && <Loading active={loading} />}
            <CustomTable
                data={enmiendas}
                columns={columns}
                buttonsColumnHeader="Opciones"
                buttons={buttons}
                onButtonClick={onButtonClick}
            />
        </FormModal>
    )
}
