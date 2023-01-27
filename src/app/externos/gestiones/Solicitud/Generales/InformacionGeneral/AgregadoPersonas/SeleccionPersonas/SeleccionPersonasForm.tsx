import GestionApi from 'api/GestionApi';
import PersonaApi from 'api/PersonaApi';
import CustomTable, { CTButton, CTButtonResponse, CTColumn } from 'components/CustomTable';
import React, { useState } from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

type Props = {
    setSeleccionado: (e: number) => void
    closeModal: () => void
    setPerson: (x: any) => void
    ttGestion: any
    setRepre: (x: any) => void
    bandera: number
}

type Resultados = {
    codigo: number,
    cui: string,
    nit: string,
    nombre: string,
    data: any
}

export default function Perfil(props: Props) {

    var gestionApi = new GestionApi()

    const [seleccion, setSeleccion] = useState(0);
    const [busquedaTexto, setBusquedaTexto] = useState("")
    const [misResultados, setMisResultados] = useState<Resultados[]>([])

    var verde: SemanticCOLORS = 'green';
    var rojo: SemanticCOLORS = 'red';
    var personaApi = new PersonaApi()

    const encabezadoBandeja: CTColumn[] = [
        { header: "DPI", name: 'cui' },
        { header: "NIT", name: 'nit' },
        { header: "Nombre Completo", name: 'nombre' },
    ];

    const botonesBandeja: CTButton[] = [
        { id: "boton_agregar", icon: "check", color: verde },
    ];


    const onButtonClick = (buttonResponse: CTButtonResponse) => {

        let savedata = buttonResponse.rowData.data

        let addPersonaIndi = {
            personaGestionId: 0,
            representanteLegal: props.bandera,
            soloRepresenta: props.bandera,
            tcPersona: savedata,
            ttGestion: props.ttGestion
        }

        console.log(addPersonaIndi)

        const handleResponsePersona = (response: any) => {

            if (response.data.status === "OK") {
                let newPersona = {
                    codigo: savedata.cui,
                    cui: savedata.cui,
                    nombre: savedata.personaDesc,
                    estadoCivil: savedata.tcEstadoCivil.estadoCivilDesc,
                    sexo: savedata.tcSexo.sexoDesc,
                    data: response.data.data[0]
                }
                //console.log(newPersona)

                if (props.bandera === 0) {
                    props.setPerson(newPersona);
                }
                else if (props.bandera === 1) {
                    props.setRepre(response.data.data[0])
                }

                //console.log(response);
                props.closeModal();
            } else {
                console.log("hubo un error")
                alert(response.message)
            }

        }

        const handleErrorPersona = (error: any) => {
            console.error(error);
        }

        gestionApi.agregarPersonaIndividual(addPersonaIndi, handleResponsePersona, handleErrorPersona);

    }

    const onButtonBuscar = () => {

        let busqueda = {
            filtro: busquedaTexto,
            tipoBusquedaId: seleccion
        }

        const HandleResponseBusqueda = (response: any) => {

            //console.log(response)

            let datax = response.data;

            let result: Resultados[] = []

            if (response.status == "OK") {

                datax.map((x: any) => {
                    let res: Resultados = {
                        codigo: x.cui,
                        cui: x.cui,
                        nit: x.nit,
                        nombre: x.personaDesc,
                        data: x,
                    }
                    result.push(res);
                })

                setMisResultados(result)

                //console.log(misResultados)

            } else {
                console.log("error encontrado")
                console.log(response.data.message)
            }
        }

        const HandleErrorBusqueda = (error: any) => {
            console.log("Hubo un error")
            console.log(error)
        }

        personaApi.buscarPersona(busqueda, HandleResponseBusqueda, HandleErrorBusqueda);

    }

    const handleChange = (e: any, { name, value }: any) => {
        setSeleccion(value)
    }

    const onChangeText = (e: any, { name, value }: any) => {
        setBusquedaTexto(value)
    }

    return (
        <Segment>
            <Form>
                <Form.Select
                    fluid
                    name="Tipo de Filtro"
                    label="Tipo de Filtro"
                    value={seleccion}
                    options={[
                        { key: 1, text: 'Búsqueda por DPI', value: 1 },
                        { key: 2, text: 'Búsqueda por NIT', value: 2 },
                        { key: 3, text: 'Búsqueda por Nombre y Apellido', value: 3 },
                    ]}
                    onChange={handleChange}
                />

                <Form.Input
                    label="Ingrese dato de búsqueda"
                    onChange={onChangeText}
                    value={busquedaTexto}
                />
                <Form.Button
                    onClick={onButtonBuscar}
                    color={"olive"}
                    icon
                    labelPosition="right" >
                    <Icon name="search" />
						Buscar Persona
				</Form.Button>


                <CustomTable
                    data={misResultados}
                    buttonsColumnHeader="Agregar"
                    buttons={botonesBandeja}
                    onButtonClick={onButtonClick}
                    columns={encabezadoBandeja}
                />

            </Form>
        </Segment>
    )
}
