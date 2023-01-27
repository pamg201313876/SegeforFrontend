import React, { useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'

type props = {
    observaciones: string
    onBlurValue: (value: string) => void
}

export default function CronogramaTextBox({
    observaciones: observacionesProps,
    onBlurValue
}: props) {

    const [observaciones, setObservaciones] = useState<string>("")
    const handleObservacionesChange = (_e: any, { value }: any) => {
        setObservaciones(value)
    }

    const handleBlur = (e: any) => {
        onBlurValue(e.target.value)
    }

    useEffect(() => {
        setObservaciones(observacionesProps)
    }, [observacionesProps])

    return (
        <Form.TextArea
            name='observaciones'
            label="Observaciones generales"
            onChange={handleObservacionesChange}
            onBlur={handleBlur}
            value={observaciones}
        />
    )
}
