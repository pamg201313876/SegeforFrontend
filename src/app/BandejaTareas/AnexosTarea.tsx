import GestionApi from 'api/GestionApi';
import TareaApi from 'api/TareaApi';
import { AxiosError } from 'axios';
import FormModal from 'components/FormModal';
import React, { ReactElement, useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';


type Props = {
    open: boolean
    closeModal: () => void
    anexosData: any[]
    setTareaData: (x: any) => void
}

export default function AnexosTarea(props: Props) {

    const tareaApi = new TareaApi();
    const gestionApi = new GestionApi();
    const cantidadAnexos = 32;
    const [boto, setBotones] = useState<any[]>([]);


    const onSave = () => {
        props.closeModal()
    }


    const getDescarga = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {

        console.log(event.currentTarget.id)

        const handleResponseInicializadora = (entity: any) => {
            window.navigator.msSaveOrOpenBlob(entity)
        }

        const handleErrorInicializadora = (error: AxiosError) => {
            console.log(error)
            console.log("Error")
        }

        gestionApi.getGestionFileById(parseInt(event.currentTarget.id), handleResponseInicializadora, handleErrorInicializadora);

    }

    function getFileId(tipoAnexoId: number) {

        if (!tipoAnexoId) {
            return -1;
        }

        if (props.anexosData) {
            for (var x = 0; x < props.anexosData.length; x++) {
                let anexoActual = props.anexosData[x]
                if (anexoActual && anexoActual.tcTipoAnexo.tipoAnexoId === (tipoAnexoId)) {
                    return anexoActual.anexoGestionId;
                }
            }
        }


    }

    useEffect(() => {

        if (props.open) {


        }

    }, [props.open])


    useEffect(() => {

        renderBotonesDescarga()


    }, [props.anexosData])

    function renderBotonesDescarga() {


        const botones: ReactElement[] = [];


        for (var j = 0; j < props.anexosData.length; j++) {

            var anexoActual = props.anexosData[j];


            switch (anexoActual.tcTipoAnexo.tipoAnexoId) {

                case 4:
                    botones.push(
                        <Form.Button icon="download" label={"1. Mapa de acceso al ??rea desde el casco municipal"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 5:
                    botones.push(
                        <Form.Button icon="download" label={"2. Mapa de uso actual de la finca y colindantes (Google earth, Landsat u otro reciente)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;


                case 6:
                    botones.push(
                        <Form.Button icon="download" label={"3. Mapa de pendientes"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;


                case 7:
                    botones.push(
                        <Form.Button icon="download" label={"4. Mapa de ubicaci??n del bosque a manejar y protejer en el contexto de la finca"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 8:
                    botones.push(
                        <Form.Button icon="download" label={"5. Mapa de distribuci??n espacial de los ??rboles a extraer, recursos h??dricos, caminos y bacadillas"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 9:
                    botones.push(
                        <Form.Button icon="download" label={"6. Mapa de distribuci??n de ??rboles semilleros, remanentes y futura cosecha "} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 10:
                    botones.push(
                        <Form.Button icon="download" label={"7. Mapa de ??rea de compromiso de repoblaci??n forestal."} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 11:
                    botones.push(
                        <Form.Button icon="download" label={"8. Coordenadas de las ??reas de aprovechamiento y de las ??reas de protecci??n"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 12:
                    botones.push(
                        <Form.Button icon="download" label={"9. Coordenadas de descuento para los poligonos a intervenir"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 13:
                    botones.push(
                        <Form.Button icon="download" label={"10. Informacion digital del inventario forestal (boleta del censo en formato de excel"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 14:
                    botones.push(
                        <Form.Button icon="download" label={"11. Solicitud con firma autenticada"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 15:
                    botones.push(
                        <Form.Button icon="download" label={"14. Documento original que acredite la tenencia de la tierra (Testimonio de la escritura P??blica de posesi??n del terreno)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 16:
                    botones.push(
                        <Form.Button icon="download" label={"13. Documento original que acredite la tenencia de la tierra (Acta notarial de posesi??n del terreno)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 17:
                    botones.push(
                        <Form.Button icon="download" label={"12. Documento original que acredite la tenencia de la tierra (Certificacion de registro de la propiedad)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 18:
                    botones.push(
                        <Form.Button icon="download" label={"15. Copia del (los) documento (s) personal (es) de identificaci??n del (los) propietario (s)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 19:
                    botones.push(
                        <Form.Button icon="download" label={"16. Copia del documento personal de identificaci??n del Representante Legal"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 20:
                    botones.push(
                        <Form.Button icon="download" label={"17. Copia legalizada del nombramiento de representante legal, inscrito en el Registro correspondiente"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 21:
                    botones.push(
                        <Form.Button icon="download" label={"18. Plan de manejo forestal"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 22:
                    botones.push(
                        <Form.Button icon="download" label={"19. Fotocopia de constancia del Elaborador Plan de Manejo (y Regente cuando aplique)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 23:
                    botones.push(
                        <Form.Button icon="download" label={"20. Plan de Comercio"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 24:
                    botones.push(
                        <Form.Button icon="download" label={"21. Plan de sociedad"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 25:
                    botones.push(
                        <Form.Button icon="download" label={"25. Documento de Personal de Identificaci??n del Fiador"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 26:
                    botones.push(
                        <Form.Button icon="download" label={"26. Estado patrimonial del fiador"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 27:
                    botones.push(
                        <Form.Button icon="download" label={"27. Propuesta de regente forestal"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 28:
                    botones.push(
                        <Form.Button icon="download" label={"28. Constancia de inscripci??n de las motosierras que ser??n empleadas durante el aprovechamiento"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 29:
                    botones.push(
                        <Form.Button icon="download" label={"29. Fotocopia simple del Documento Personal de Identificaci??n (DPI) del Representante Legal de la Sociedad (Fiadora)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 30:
                    botones.push(
                        <Form.Button icon="download" label={"30. Fotocopia simple del documento que acredite la representaci??n legal de la Sociedad, vigente y debidamente inscrito en el registro respectivo (Fiadora)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 31:
                    botones.push(
                        <Form.Button icon="download" label={"31. Acta Notarial que contenga la transcripci??n del Punto de Acta de Asamblea General de Accionistas donde se autoriza a la Sociedad para que pueda ser fiadora a trav??s de su Representante Legal y poder suscribir los documentos donde la Sociedad figure como fiadora"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 32:
                    botones.push(
                        <Form.Button icon="download" label={"32. Fotocopia simple de Patente de Comercio de Empresa y de Sociedad (Fiadora)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 33:
                    botones.push(
                        <Form.Button icon="download" label={"33. Balance general de la empresa fiadora, certificado por contador debidamente registrado y autorizado (Fiadora)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

                case 34:
                    botones.push(
                        <Form.Button icon="download" label={"34. Estado de resultados de la empresa fiadora, certificado por contador debidamente registrado y autorizado (Fiadora)"} id={getFileId(anexoActual.tcTipoAnexo.tipoAnexoId)} color={"green"} onClick={getDescarga} />
                    )
                    break;

            }

        }

        setBotones(botones);
    }

    return (
        <>
            <FormModal header="Anexos" open={props.open} closeModal={props.closeModal} confirmLabel="Aceptar" onSave={onSave} noConfirmButton scrollable >
                <Form>

                    {boto.map((value, index) => {
                        return boto[index]
                    })}
                </Form>
            </FormModal>
        </>
    )
}
