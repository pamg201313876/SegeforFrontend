import BasicLabel from 'components/BasicLabel/BasicLabel'
import TipoMuestreoSelect from 'components/FormCatalogSelect/catalogs/TipoMuestreoSelect'
import React from 'react'
import { Form, Header, Segment } from 'semantic-ui-react'

type Props = {
	tipoMuestreo: any
	setTipoMuestreo: (value: any) => void
}

export default function Maderables({
	tipoMuestreo,
	setTipoMuestreo
}: Props) {


	return (
		<Form>
			<Segment>
				<Header >
					Tipo de inventario
				</Header>

				<TipoMuestreoSelect width="3" value={tipoMuestreo} onChange={(_e, { value }) => setTipoMuestreo(value)} />
				<BasicLabel label="Total estratos identificados" value="0" />
				<BasicLabel label="No. de parcelas" value="0" />
				<BasicLabel label="Diametro mínimo de muestreo" value="0" />


			</Segment>
		</Form>
	)
}
