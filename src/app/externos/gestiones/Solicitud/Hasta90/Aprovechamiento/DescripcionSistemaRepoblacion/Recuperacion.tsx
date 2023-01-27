import FormNumInput from 'components/FormNumInput'
import React from 'react'
import { Form, Header } from 'semantic-ui-react'
import { SistemaRepoblacionValor } from '../Aprovechamiento'

type Props = {
	sistemasCatalog: SistemaRepoblacionValor[],
	// tcSistemaRepoblacion: any
	// valorSistemaRepoblacion: any
	// setTcSistemaRepoblacion: (tcSistemaRepoblacion: any) => void
	// setValorSistemaRepoblacion: (valorSistemaRepoblacion: any) => void
}

export default function Recuperacion({
	sistemasCatalog
}: Props) {

	const handleUpdate = (index: number, value: any) => {
		sistemasCatalog[index].valor = value
	}

	const renderSistemas = () => {

		let index1 = sistemasCatalog.findIndex((s: SistemaRepoblacionValor) => s.tcSistemaRepoblacion.sistemaRepoblacionId === 1)
		let index2 = sistemasCatalog.findIndex((s: SistemaRepoblacionValor) => s.tcSistemaRepoblacion.sistemaRepoblacionId === 2)
		let index3 = sistemasCatalog.findIndex((s: SistemaRepoblacionValor) => s.tcSistemaRepoblacion.sistemaRepoblacionId === 3)
		let index4 = sistemasCatalog.findIndex((s: SistemaRepoblacionValor) => s.tcSistemaRepoblacion.sistemaRepoblacionId === 4)

		return (
			<Form.Group style={{marginLeft: "4px"}}>
				{index1 !== -1
					? <div >
						<Header size="tiny">{sistemasCatalog[index1].tcSistemaRepoblacion.sistemaRepoblacionDesc}</Header>
						<FormNumInput
							label={"Número de árboles padres/ha"}
							value={sistemasCatalog[index1].valor}
							name="valor1"
							onBlur={(e: any) => handleUpdate(index1, e.target.value)}
						/>
					</div>
					: null}
				{index2 !== -1
					? <div style={{marginLeft: "16px"}}>
						<Header size="tiny">{sistemasCatalog[index2].tcSistemaRepoblacion.sistemaRepoblacionDesc}</Header>
						<FormNumInput
							label={"Número de tocones"}
							value={sistemasCatalog[index2].valor}
							name="valor2"
							onBlur={(e: any) => handleUpdate(index2, e.target.value)}
						/>
					</div>
					: null}
				{index3 !== -1
					? <div style={{marginLeft: "16px"}}>
						<Header size="tiny">{sistemasCatalog[index3].tcSistemaRepoblacion.sistemaRepoblacionDesc}</Header>
						<FormNumInput
							label={"Número de plantas"}
							value={sistemasCatalog[index3].valor}
							name="valor3"
							onBlur={(e: any) => handleUpdate(index3, e.target.value)}
						/>
					</div>
					: null}
				{index4 !== -1
					? <div style={{marginLeft: "16px"}}>
						<Header size="tiny">{sistemasCatalog[index4].tcSistemaRepoblacion.sistemaRepoblacionDesc}</Header>
						<FormNumInput
							label={"Número de semillas/ha (lbs)"}
							value={sistemasCatalog[index4].valor}
							name="valor4"
							onBlur={(e: any) => handleUpdate(index4, e.target.value)}
						/>
					</div>
					: null}
			</Form.Group>
		)

	}

	return (
			renderSistemas()
	)
}
