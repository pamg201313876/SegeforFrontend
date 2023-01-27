import NumInput from 'components/FormNumInput/NumInput'
import React from 'react'
import { Button, Icon, Table } from 'semantic-ui-react'

type Props = {
	nombre?: string,
	extraer: number,
	semilleros: number,
	remanentes: number,
	letra: string,
	parametroAnalisis: any,
	arbolesCalculados?: number,
	error: boolean,
	ic?: number,
	onEditClick?: () => void,
	setIc?: (value: number) => void
}

export default function AnalisisCortaParametro({
	nombre,
	extraer,
	semilleros,
	remanentes,
	letra,
	parametroAnalisis,
	arbolesCalculados,
	error,
	ic,
	setIc,
	onEditClick
}: Props) {

	const handleIcChange = (e: any) => {
		if (setIc != null) {
			setIc(e.target.value)
		}
	}

	return (
		<Table.Row>
			{nombre ? <Table.Cell rowSpan={3}>{nombre}</Table.Cell> : null}
			<Table.Cell textAlign="center">{letra}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.totalArboles}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.menoresDmc}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.mayoresIgualesDmc}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.decrepitos}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.sanos}</Table.Cell>
			{ic != null ?
				<>
					<Table.Cell rowSpan={3} textAlign="center" collapsing>
						<NumInput
							name="ic"
							style={{ width:"60px" }}
							minValue={0}
							maxValue={80}
							value={ic}
							onBlur={handleIcChange}
						/>
					</Table.Cell>
					<Table.Cell textAlign="center" rowSpan={3}>{arbolesCalculados}</Table.Cell>
				</>
				: null}
			{onEditClick ?
				<Table.Cell textAlign="center" rowSpan={3} >
					<Button color="blue" icon onClick={onEditClick}>
						<Icon name="edit" />
					</Button>
				</Table.Cell>
				: null}
			<Table.Cell negative={error}  textAlign="right">{extraer}</Table.Cell>
			<Table.Cell negative={error} textAlign="right">{semilleros}</Table.Cell>
			<Table.Cell negative={error} textAlign="right">{remanentes}</Table.Cell>
		</Table.Row>
	)
}
