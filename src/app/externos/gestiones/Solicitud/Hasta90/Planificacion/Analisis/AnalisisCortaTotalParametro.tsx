import React from 'react'
import { Table } from 'semantic-ui-react'

type Props = {
	noIc?: boolean,
	isSubTotal?: boolean,
	letra: string,
	parametroAnalisis: any,
	extraer: number,
	semilleros: number,
	remanentes: number
}

export default function AnalisisCortaTotalParametro({
	noIc,
	isSubTotal,
	letra,
	parametroAnalisis,
	extraer,
	semilleros,
	remanentes
}: Props) {

	return (
		<Table.Row positive={isSubTotal !== true} warning={isSubTotal} >
			<Table.Cell textAlign="right">{letra}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.totalArboles}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.menoresDmc}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.mayoresIgualesDmc}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.decrepitos}</Table.Cell>
			<Table.Cell textAlign="right">{parametroAnalisis.sanos}</Table.Cell>
			{noIc === true ? <Table.Cell rowSpan={3} colSpan={3} collapsing />: null}
			<Table.Cell textAlign="right" style={ noIc ? {"borderTop": "solid 1px"} : null}>{extraer}</Table.Cell>
			<Table.Cell textAlign="right" style={ noIc ? {"borderTop": "solid 1px"} : null} >{semilleros}</Table.Cell>
			<Table.Cell textAlign="right" style={ noIc ? {"borderTop": "solid 1px"} : null}>{remanentes}</Table.Cell>
		</Table.Row>
	)
}
