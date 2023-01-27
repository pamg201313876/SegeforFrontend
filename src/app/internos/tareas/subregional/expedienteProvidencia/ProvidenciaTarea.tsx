import React, { useEffect } from 'react'
import { Form, Label } from 'semantic-ui-react'
import PersonaAsignarTareaSelect from 'components/TipoNotificacionSelect/PersonaAsignarTareaSelect';


type Props = {
    tareaData: any
    setPersonaJuridica: (x: any) => void
    setPersonaTecnica: (x: any) => void
    personaTecnica: any
    personaJuridica: any
}

export default function ProvidenciaTarea({
    tareaData,
    setPersonaJuridica,
    setPersonaTecnica,
    personaTecnica,
    personaJuridica
}: Props) {

    useEffect(() => {
        setPersonaJuridica({})
    }, [])


    const handleChangeJuridico = (e: any, { name, value }: any) => {
        setPersonaJuridica(value)
    }

    const handleChangeTecnico = (e: any, { name, value }: any) => {
        setPersonaTecnica(value)
    }


    const handleChange = (e: any, { name, value }: any) => {

        value = (e.target.type === 'number') ? parseInt(value) : value
        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }

        if (name === "providencia") {
            tareaData.ttSeguimientoTarea.providencia = value;

        }
        console.log(tareaData)
    }


    return (
        <>
            {
                tareaData.ttSeguimientoTarea ?

                    <>
                        <Form>
                            <Form.Group>
                                <h4>
                                    Seleccione las personas para asignarlse la siguiente tarea
                                </h4>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    label="Número de Providencia"
                                    type={"text"}
                                    name={"providencia"}
                                    onChange={handleChange}

                                />
                            </Form.Group>

                            <Form.Group>

                                <PersonaAsignarTareaSelect
                                    onChange={handleChangeJuridico}
                                    perfilId={6}
                                    subregionId={tareaData.ttGestion.tcSubregion.subregionId ? tareaData.ttGestion.tcSubregion.subregionId : 1}
                                    value={personaJuridica}
                                    name={"tcPersonaJuridico"}
                                    label={"Seleccionar Persona Juridica"}
                                />

                                <PersonaAsignarTareaSelect
                                    onChange={handleChangeTecnico}
                                    perfilId={7}
                                    subregionId={tareaData.ttGestion.tcSubregion.subregionId ? tareaData.ttGestion.tcSubregion.subregionId : 1}
                                    value={personaTecnica}
                                    name={"tcPersonaTraslado"}
                                    label={"Seleccionar Persona Técnica"}
                                />

                            </Form.Group>

                        </Form>

                    </>

                    :

                    <Label>
                        Primero Debe adimitir el expediente
                    </Label>

            }

        </>
    )
}
