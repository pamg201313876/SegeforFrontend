import React from 'react'
import { Form, Header } from 'semantic-ui-react'


type Props = {
    setNumeroResolucion: (a: string) => void
    error?: string | null
}

export default function AdmitirExpediente({
    setNumeroResolucion,
    error
}: Props) {

    const handleChange = (e: any, { name, value }: any) => {
        if (name === "numeroResolucion") {
            setNumeroResolucion(value)
        }
    }

    return (

        <Form>
            <Header size="small">
                El siguiente paso es admitir el expediente. ¿Quiere realizarlo ahora?. Presione el botón de siguiente,
                de lo contrario puede cancelar y regresar a la lista de tareas. Por favor ingrese el número de resolución.
            </Header>
            <Form.Input
                width="3"
                type={"text"}
                name={"numeroResolucion"}
                onChange={handleChange}
                placeholder="Ingrese número de Resolución"
                error={error}
            />
        </Form>
    )
}
