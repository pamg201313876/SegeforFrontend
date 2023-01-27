import React, { useState, useEffect, ReactElement, useCallback, useContext } from 'react'
import { Button, Form, Header, Table } from 'semantic-ui-react'
import { AppDataContext } from 'app/App';
import { isBlankString } from 'utils/UtilFunctions';


type Props = {
    tipo: number,
    tareaData: any
    nextButtonRef: React.MutableRefObject<() => boolean>
}

type valor = {
    tareaId: number,
    descripcion: string
}

export default function AntecedentesConclusiones({
    tipo,
    tareaData,
    nextButtonRef
}: Props) {

    const appDataContext = useContext(AppDataContext)
    const [textos, setTextos] = useState<valor[]>([]);

    const onSave = (): boolean => {

        for (let texto of textos) {
            if (isBlankString(texto.descripcion)) {
                let tipoDato = "el antecedente"
                if (tipo === 2) {
                    tipoDato = "la conclusión"
                }
                appDataContext.errorToast("Existen campos vacios. Ingrese la información o quite " + tipoDato + " de la lista.")
                return false
            }
        }

        if (tipo === 1) {
            tareaData.ttSeguimientoTarea.tab = 4
            tareaData.ttSeguimientoTarea.antecedente = JSON.stringify(textos)
        }

        else {

            if (textos.length < 3) {
                appDataContext.errorToast("Debe de ingresar al menos 3 conclusiones")
                return false
            }

            else {
                tareaData.ttSeguimientoTarea.tab = 5
                tareaData.ttSeguimientoTarea.analisis = JSON.stringify(textos)
            }
        }

        return true

    }

    const isSaveCallback = useCallback(onSave, [tareaData, textos])

    useEffect(() => {
        nextButtonRef.current = isSaveCallback
    }, [nextButtonRef, isSaveCallback])

    useEffect(() => {

        if (tipo === 1 && tareaData.ttSeguimientoTarea.antecedente == null) {
            return
        }

        if (tipo === 2 && tareaData.ttSeguimientoTarea.analisis == null) {
            for (let x = 0; x < 3; x++) {
                add()
            }
            return
        }

        if (tareaData.ttSeguimientoTarea) {

            let array;

            if (tipo === 1) {
                array = JSON.parse(tareaData.ttSeguimientoTarea.antecedente);
            }

            else {
                array = JSON.parse(tareaData.ttSeguimientoTarea.analisis)
            }

            setTextos([])
            for (let x = 0; x < array.length; x++) {
                textos.push(array[x]);
            }
            setTextos([...textos])
        }

    }, [tareaData])

    const getPlaceholder = (index: number): string => {
        if (tipo === 1) {
            return ""
        }

        let placeholder = ""

        switch (index) {
            case 0:
                placeholder = "Conclusiones sobre las características biofísicas (suelo, agua, pendiente, -detalle todo lo relevante-) de la finca o terreno que se evaluó versus propuesta de manejo."
                break

            case 1:
                placeholder = "Conclusiones sobre los resultados y veracidad de la información presentada en el inventario forestal, estratificación y/o rodalización del bosque."
                break

            case 2:
                placeholder = "Conclusiones sobre la propuesta de manejo forestal, versus Corta Anual Permisible."
                break

            default:
                break;
        }

        return placeholder
    }

    const onChange = (value: any, index: number) => {
        textos[index].descripcion = value
        setTextos([...textos]) //Para provocar nuevo render de la lista
    }

    const add = () => {
        textos.push({
            descripcion: "",
            tareaId: tareaData.tareaId
        })
        setTextos([...textos]) //Para provocar nuevo render de la lista
    }


    const remove = (index: number) => {
        textos.splice(index, 1);
        setTextos([...textos]) //Para provocar nuevo render de la lista
    }

    const renderBody = () => {

        if (textos.length === 0) {
            return (
                <Table.Row  >
                    <Table.Cell textAlign="center" colSpan={3} >
                        <Header as='h3' >
                            Sin datos que mostrar
                        </Header>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <>
                {textos.map((value: valor, index: number) => (
                    <Table.Row key={"r" + index} >
                        <Table.Cell>
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                            <Form.TextArea 
                                onChange={(_e: any, {value}) => onChange(value, index)} 
                                placeholder={getPlaceholder(index)} 
                                value={value.descripcion}
                                />
                        </Table.Cell>
                        <Table.Cell>
                            {tipo !== 2 || index > 2 ?
                                <Button id={index} onClick={() => remove(index)} color="red" icon={"delete"} ></Button>
                                : null
                            }
                        </Table.Cell>
                    </Table.Row>
                ))}
            </>
        )
    }


    return (
        <>
            <Form>
                <Form.Button color="green" primary floated='right' onClick={add} icon="add" />
                <div style={{ marginBottom: "8px" }}>
                    {tipo === 1 ? "Liste las circunstancia porla cual se demoró el expediente en su trámite"
                        : 'Liste las conclusiones necesarias'}
                </div>
                <div style={{ marginBottom: "8px" }} >Para agregar presione sobre el botón con signo más</div>
                <Form.Group>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>No.</Table.HeaderCell>
                                <Table.HeaderCell>Descripción</Table.HeaderCell>
                                <Table.HeaderCell>Eliminar</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {renderBody()}
                        </Table.Body>
                    </Table>
                </Form.Group>
            </Form>
        </>
    )
}
