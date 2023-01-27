import React, { useState, ReactElement } from 'react'
import FormModal from 'components/FormModal'
import { Button, Form, Header, Table } from 'semantic-ui-react'
import TareaApi from 'api/TareaApi';
import { dictamenTecnicoApi } from 'api/latifoliado';


type Props = {
    open: boolean,
    closeModal: () => void
    tareaData: any
    setClose: () => void
}

type valor = {
    correlativo: number,
    descripcion: string
}

const tareaApi = new TareaApi();

export default function EnmiendaTecnico({
    open,
    closeModal,
    tareaData,
    setClose
}: Props) {

    const [loading, setLoading] = useState(false)
    const [codigo, setCodigo] = useState<string>("")
    const [listaAntecedentes, setListaAntecedentes] = useState<ReactElement[]>([]);
    const [textos, setTextos] = useState<valor[]>([]);
    const [habilitarModificarArea, setHabilitarModificarArea] = useState<boolean>(false)
    const [previewLoading, setPreviewLoading] = useState(false)

    const onSave = () => {

        const HandleResponse = (response: any) => {
            setLoading(false)
            if (response.status === "OK") {
                closeModal()
                setClose()
            }
        }

        const HandleError = (error: any) => {
            setLoading(false)
            console.log("error")
        }

        tareaData.esEnmienda = 1;
        tareaData.aprobado = 2;

        let modificarArea = 0
        if(habilitarModificarArea){
            modificarArea = 1
        }

        tareaData.modificarArea = modificarArea

        if (tareaData.ttSeguimientoTarea == null) {
            tareaData.ttSeguimientoTarea = {}
        }

        tareaData.ttSeguimientoTarea.monto = 30
        tareaData.ttSeguimientoTarea.enmienda = JSON.stringify(textos)
        tareaData.ttSeguimientoTarea.codigo = codigo

        setLoading(true)

        tareaApi.FinalizarTareaTecnica(tareaData, HandleResponse, HandleError);

    }

    const handleChange = (e: any, { name, value }: any) => {
        var xyz = textos;
        xyz[parseInt(name)].descripcion = value;
        setTextos(xyz)
    }

    const add = () => {

        var lista2 = textos;
        lista2.push({
            descripcion: textos.length + "",
            correlativo: textos.length
        })
        setTextos([...lista2])

        var lista = listaAntecedentes;
        lista.push(
            <Form.TextArea name={lista.length + ""} onChange={handleChange} />
        )
        setListaAntecedentes([...listaAntecedentes])

    }


    const quit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {



        var lista2 = textos;

        lista2.splice(parseInt(event.currentTarget.id), 1);

        /*lista2.push({
            descripcion: textos.length + "",
            tareaId: tareaData.tareaId
        })*/

        setTextos([...lista2])

        var lista = listaAntecedentes;
        /*lista.push(
            <Form.Input name={lista.length + ""} onChange={handleChange} />
        )*/

        lista.splice(parseInt(event.currentTarget.id), 1);

        setListaAntecedentes([...listaAntecedentes])


    }

    const onPreview = () => {

        const HandleResponsePreview = (response: any) => {
            console.log(response);
            setPreviewLoading(false);
        }

        const HandleError = (error: any) => {
            console.log('Error', error);
            setPreviewLoading(false);
            alert(error);
        }

        tareaData.esEnmienda = 1;
        tareaData.aprobado = 2;
        if (tareaData.ttSeguimientoTarea == null) {
            tareaData.ttSeguimientoTarea = {}
        }
        tareaData.ttSeguimientoTarea.monto = 30
        tareaData.ttSeguimientoTarea.enmienda = JSON.stringify(textos)
        tareaData.ttSeguimientoTarea.codigo = codigo

        setPreviewLoading(true)
        dictamenTecnicoApi.descargarEnmiendaTecnicoPreview(tareaData, HandleResponsePreview, HandleError)
    }

    const renderBody = () => {

        if (listaAntecedentes.length === 0) {
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
                {listaAntecedentes.map((value: ReactElement, index: number) => (
                    <Table.Row key={"r" + index} >
                        <Table.Cell>
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                            {value}
                        </Table.Cell>
                        <Table.Cell>
                            <Button id={index} onClick={quit} color="red" icon={"delete"} ></Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </>
        )
    }

    const previewButton = () => {
        return <Button color="yellow" content={"Vista previa"} loading={previewLoading} onClick={onPreview} />
    }

    return (
        <FormModal aditionalButtons={previewButton} size="large" loading={loading} header="Lista las enmiendas para el informe técnico" open={open} closeModal={closeModal} onSave={onSave}>
            <Form>
                <Form.Input label="Número de oficio" width="3" value={codigo} onChange={(_e, { value }) => setCodigo(value)} />
                <Form.Button floated="right" style={{ marginBottom: "16px" }} color="green" primary onClick={add} icon="add" />
                <Form.Checkbox label="¿Habilitar modificación de área de aprovechamiento?" checked={habilitarModificarArea} onChange={(_e, { checked }) => setHabilitarModificarArea(checked!!)}/>
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
            </Form>
        </FormModal>
    )
}
