import TareaApi from 'api/TareaApi';
import { AppDataContext } from 'app/App';
import FormModal from 'components/FormModal';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import EnmiendaTable from './EnmiendaTable';

type Props = {
    open: boolean
    closeModal: () => void
    enmienda: any
    setFormData: Function
    formData: any
    refresh: boolean
    setRefresh: ( f : boolean) => void
}

const tareaApi = new TareaApi()

export default function ListadoEnmiendas(props: Props) {
    const appDataContext = useContext(AppDataContext);
    const [enmiendasObligatorios, setEnmiendasObligatorios] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [dataTarea, setDataTarea] = useState<any>({});
    const [tokenData, setTokenData] = useState<any>({})

    const errorToast = useCallback(appDataContext.errorToast, [])
    const successToast = useCallback(appDataContext.successToast, [])


    const onSave = () => {
        if (validateEnmiendas(enmiendasObligatorios, props.formData)) {
            sendRequest();
        }
        else {
            errorToast(`Hay requisitos que no fueron marcados`)
        }
    }

    const sendRequest = () => {
        console.log(dataTarea)

        props.enmienda.ttGestion.personaAnulaId = tokenData.personaId;

        let enmienda = {
            enmiendaId: props.enmienda.enmiendaId,
            estadoId: props.enmienda.estadoId,
            fechaEnmienda: props.enmienda.fechaEnmienda,
            fechaRegistro: props.enmienda.fechaRegistro,
            folios: props.enmienda.folios,
            paraGarantia: props.enmienda.paraGarantia,
            personaEntregaDesc: props.enmienda.personaEntregaDesc,
            plan: props.enmienda.plan,
            soloSubregional: props.enmienda.soloSubregional,
            tareaId: props.enmienda.tareaId,
            ttGestion: props.enmienda.ttGestion,
            ttTarea: props.enmienda.ttTarea
        };

        console.log(enmienda);

        const HandleResponse = (response: any) => {
            console.log(response)
            setLoading(false)

            if (response.status === "OK") {
                successToast("Proceso exitoso")
                props.setRefresh(true)
                props.closeModal()
            } else {
                errorToast(response.message)
            }
        }

        const HandleError = (error: any) => {
            console.error(error)
            setLoading(false)
            errorToast('Error al procesar, intentelo de nuevo')
        }

        setLoading(true)
        tareaApi.putRecibirEnmienda(enmienda, HandleResponse, HandleError);
    }

    const validateEnmiendas = (enmiendas: any[], data: any) => {
        console.log(data)
        let flag = true;
        enmiendas.forEach(enmienda => {
            if (data["enmienda" + enmienda.enmiendaId] === undefined || data["enmienda" + enmienda.enmiendaId] === false) {
                flag = false;
            }
        });
        return flag;

    }

    const catalogarEnmiendas = (enmienda: string) => {

        let arrEnmiendas = JSON.parse(enmienda);
        let enmiendasObligatorios: any[] = [];

        let i = 1;
        for (let catEnmienda of arrEnmiendas) {
            for (let enmienda of catEnmienda.enmienda) {
                var tmpEnmienda = {
                    enmiendaId: i++,
                    descripcion: enmienda.descripcion
                }
                enmiendasObligatorios.push(tmpEnmienda)
            }
        }

        setEnmiendasObligatorios(enmiendasObligatorios)
    }

    const consumirDataTarea = () => {

        const HandleResponse = (response: any) => {
            console.log(response)
            setDataTarea(response.data[0])
            console.log(response.data[0].ttSeguimientoTarea)
            catalogarEnmiendas(response.data[0].ttSeguimientoTarea ? response.data[0].ttSeguimientoTarea.enmienda : "")
            setLoading(false)
        }

        const HandleError = (error: any) => {
            console.log("error")
            console.log(error)
            setLoading(false)
        }

        setLoading(false)
        tareaApi.getTareaData(props.enmienda.tareaId, HandleResponse, HandleError);
    }



    useEffect(() => {
        if (props.enmienda) {
            setLoading(true)
            consumirDataTarea()

            let td = localStorage.getItem("tokenData")

            if (td != null) {
                td = JSON.parse(td)
                setTokenData(td)
                console.log(tokenData)
                console.log(td)
            }
        }
    }, [props.enmienda, errorToast])

    return (
        <FormModal loading={loading} header={"Lista de chequeo para la recepción de enmiendas, del expediente" + props.formData && props.formData.ttGestion ? props.formData.ttGestion.expediente : ''} open={props.open} closeModal={props.closeModal} confirmLabel="Aceptar" onSave={onSave} >
            <EnmiendaTable enmiendas={enmiendasObligatorios} setEnmiendas={props.setFormData}></EnmiendaTable>
        </FormModal>
    )
}
