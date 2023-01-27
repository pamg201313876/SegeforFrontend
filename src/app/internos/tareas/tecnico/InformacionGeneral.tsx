import DictamenTecnicoApi from 'api/latifoliado/DictamenTecnicoApi';
import { AppDataContext } from 'app/App';
import InformationTable, { InformationRow } from 'components/InformationTable';
import InformationRowType from 'components/InformationTable/InformationRowType';
import React, { useContext, useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';


type Props = {
    tareaData: any
}

const dictamenTecnicoApi = new DictamenTecnicoApi();

export default function InformacionGeneral({
    tareaData
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [informacionGeneral, setInformacionGeneral] = useState<any>()

    const onInputBlur = (value: string) => {
        tareaData.ttSeguimientoTarea.observaciones = value
    }

    const rows = (): InformationRow[] => {

        if(informacionGeneral == null){
            return []
        }

        return ([
            {
                header: "Tipo de plan",
                value: "Plan de manejo forestal"
            },
            {
                header: "Nombre (s) del (los) solicitante (s)",
                value: informacionGeneral.solicitantes
            },
            {
                header: "Nombre de la finca",
                value: informacionGeneral.nombreFinca
            },
            {
                header: "Área total de la finca",
                value: informacionGeneral.areaTotal
            },
            {
                header: "Área con bosque",
                value: informacionGeneral.areaBosque
            },
            {
                header: "Área de producción",
                value: informacionGeneral.areaProduccion
            },
            {
                header: "Área de protección",
                value: informacionGeneral.areaProteccion
            },

            {
                header: "Otros usos",
                value: informacionGeneral.areaOtrosUsos
            },
            {
                header: "Localización",
                value: informacionGeneral.localizacion
            },
            {
                header: "Zona de vida",
                value: informacionGeneral.zonaVida
            },
            {
                header: "Fuentes de agua",
                value: informacionGeneral.fuentesAgua,
                InformationRowType: InformationRowType.Input,
                InformationInputProps: {
                    onInputBlur: onInputBlur
                }
            },
            {
                header: "Ubicación política",
                value: informacionGeneral.ubicacion
            },
            {
                header: "Colindancias",
                value: informacionGeneral.colidancias
            }
        ])
    }

    useEffect(() => {

        if (tareaData) {

            const HandleResponse = (response: any) => {
                appDataContext.desactivateLoading()
                if (response.status === "OK") {
                    setInformacionGeneral(response.data[0])
                }
            }

            const HandleError = (error: any) => {
                appDataContext.desactivateLoading()
                console.log(error)
            }

            appDataContext.activateLoading()
            dictamenTecnicoApi.getInformacionGeneral(tareaData.tareaId, HandleResponse, HandleError);
        }

    }, [tareaData])

    if(informacionGeneral != null){
        return <Segment basic><InformationTable  collapseLeft size="large" rows={rows()} /></Segment>   
    }
    
    return null
}
