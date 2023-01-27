import NuevaGestionApi from 'api/generales/NuevaGestionApi'
import { Form } from 'components/Form'
import RegentesSelect from 'components/Form/CatalogSelect/RegentesSelect'
import { object, requiredObject, SchemaOf } from 'components/Yup'
import React, { useEffect, useState } from 'react'
import { Header } from 'semantic-ui-react'

type RegenteForm = {
	regente: any
}

const validationSchema: SchemaOf<RegenteForm> = object({
	regente: requiredObject()
})

const nuevaGestionApi = new NuevaGestionApi()

type Props = {
    gestion: any
}

export default function RegenteForm({
    gestion
}: Props) {

    const [regente, setRegente] = useState(null)

    const handleSubmit = (data: RegenteForm, onResponse: (res: any) => void, onError: (error: any) => void) => {
        let regenteDTO = {
            nit: data.regente.nit,
            rf: data.regente.noRegistro
        }
        nuevaGestionApi.addRegente(gestion.gestionId, regenteDTO, onResponse, onError)
	}

    const onSuccess = (res: any) => {
        setRegente(res.data[0]?.personaDesc)
    }

    useEffect(() => {
        setRegente(gestion?.ttResumenGestion?.tcRegente?.personaDesc)
    }, [gestion])

    return (
        <Form validationSchema={validationSchema} onSubmit={handleSubmit} onSuccess={onSuccess}>
            <Header size="small" content={"Regente seleccionado: " + (regente != null ? regente : "Ninguno")} />
			<RegentesSelect name="regente" label="Seleccione regente"/>	
		</Form>
    )
}
