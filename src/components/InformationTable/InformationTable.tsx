import React from 'react';
import { Button, Header, Icon, Input, SemanticICONS, SemanticWIDTHS, Table } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { toLocalDateString } from 'utils/UtilFunctions';
import InformationRowType from './InformationRowType';

export type InformationRowButtonProps = {
	buttonId: string
	buttonIcon?: SemanticICONS
	buttonColor?: SemanticCOLORS
}

export type InformationInputProps = {
	onInputBlur: (value: string) => void
}


export type InformationRow = {
	header: string
	value: any
	InformationRowType?: InformationRowType
	InformationRowButtonProps?: InformationRowButtonProps
	InformationInputProps?: InformationInputProps
	width?: SemanticWIDTHS
	align?: 'center' | 'left' | 'right'
}

type Props = {
	header?: string,
	headerIcon?: SemanticICONS
	size?: "large" | "small"
	style?: any
	collapseLeft?: boolean
	collapseRight?: boolean
	rows: InformationRow[]
	onButtonClick?: (buttonId: string) => void
}

export default function InformationTable({
	header,
	headerIcon,
	size = "small",
	style,
	collapseLeft = false,
	collapseRight = false,
	rows,
	onButtonClick
}: Props) {

	const renderValue = (row: InformationRow): any => {

		if (row.InformationRowType == null || row.InformationRowType === InformationRowType.Text) {
			return row.value
		}

		switch (row.InformationRowType) {

			case InformationRowType.Date:
				return toLocalDateString(row.value)

			case InformationRowType.Boolean: {
				if (row.value === true) {
					return "Si"
				}
				else {
					return "No"
				}
			}

			case InformationRowType.Input:
				if (row.InformationInputProps != null) {
					return <Input 
						onBlur={(e: any) => row.InformationInputProps?.onInputBlur(e.target.value)} 
						fluid 
						defaultValue={row.value} />
				}
				break

			case InformationRowType.Button: {

				if (row.InformationRowButtonProps != null) {
					return (
						<Button
							primary={row.InformationRowButtonProps.buttonColor == null}
							color={row.InformationRowButtonProps.buttonColor}
							labelPosition="right"
							icon={row.InformationRowButtonProps.buttonIcon != null}
							onClick={() => onButtonClick?.(row.InformationRowButtonProps!.buttonId)}
						>
							{row.InformationRowButtonProps.buttonIcon != null
								? <Icon name={row.InformationRowButtonProps.buttonIcon} />
								: null}
							{row.value}
						</Button>
					)
				}

				break

			}

		}

		return null

	}

	const row = (row: InformationRow, key: number) => {
		return (
			<Table.Row key={"r_" + key}>
				<Table.Cell collapsing={collapseLeft} width={row.width}>{row.header}</Table.Cell>
				<Table.Cell collapsing={collapseRight} textAlign={row.align}  >
					{renderValue(row)}
				</Table.Cell>
			</Table.Row>
		)
	}

	const renderRows = () => {
		let rowList = []
		let i = 1
		for (let r of rows) {
			rowList.push(row(r, i++))
		}
		return rowList
	}

	return (
		<div style={style}>
			{header ?
				<Header size="medium" style={{ "marginLeft": "4px" }} >
					{headerIcon ? <Icon name={headerIcon} /> : null}
					{header}
				</Header>
				: null}
			<Table definition size={size}>
				<Table.Body>
					{renderRows()}
				</Table.Body>
			</Table>
		</div>
	)
}
