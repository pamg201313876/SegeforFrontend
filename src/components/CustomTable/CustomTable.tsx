import React, { useState, useEffect } from 'react'
import { Button, Table, Header } from 'semantic-ui-react'
import styles from './CustomTable.module.css'
import { CTProps, CTButtonResponse, CTColumn, CTSearchSort, CTButton } from './CustomTableTypes';
import ColumnFilter from './ColumnFilter';
import SortType from 'api/enums/SortType';

export default function CustomTable(props: CTProps) {

	// const [enabledButtonsCounter, setEnabledButtonsCounter] = useState(0)
	const [isSearcheable, setIsSearcheable] = useState(false)
	const [searchData, setSearchData] = useState({})
	const [currentSortedColumn, setCurrentSortedColumn] = useState<string>("")
	const [sortedDirection, setSortedDirection] = useState<"ascending" | "descending">("ascending")

	const handleRowClick = (row: any) => {
		if (props.onRowClick) props.onRowClick(row);
	}

	const handleButtonClick = (id: string, rowData: any, pos: number) => {
		let clickedButton: CTButtonResponse;
		clickedButton = {
			id: id,
			rowData: rowData,
			pos: pos
		}
		if (props.onButtonClick) props.onButtonClick(clickedButton);
	}

	const handleHeaderClick = (column: CTColumn) => {

		let direction: "ascending" | "descending" = "ascending"

		if (currentSortedColumn === column.name) {
			if (sortedDirection === "ascending") {
				direction = "descending"
			}
			else {
				direction = "ascending"
			}
		}
		else {
			setCurrentSortedColumn(column.name)
		}
		setSortedDirection(direction)
		search(column.name, direction)
	}

	const setNewSearchValues = (name: string, value: any) => {
		setSearchData((oldValues: any) => ({
			...oldValues,
			[name]: value,
		}))
	}

	const search = (sortedColumn: string, direction: "ascending" | "descending") => {

		if (props.onSearchSort) {
			let sortType: SortType = SortType.Asc

			if (direction === "descending") {
				sortType = SortType.Desc
			}

			let searchSort: CTSearchSort = {
				searchData: searchData,
				sortedColumn: sortedColumn,
				sortType: sortType
			}
			props.onSearchSort(searchSort)
		}

	}

	// useEffect(() => {
	// 	if (props.buttons != null) {
	// 		let counter = 0
	// 		props.buttons.forEach(_button => {
	// 			counter++
	// 		});
	// 		setEnabledButtonsCounter(counter)
	// 	}
	// }, [props.buttons])

	useEffect(() => {
		if (props.columns.length !== 0) {
			setCurrentSortedColumn(props.columns[0].name)
		}
	}, [props.columns])

	useEffect(() => {
		for (let column of props.columns) {
			if (column.isSearcheable != null && column.isSearcheable === true) {
				setIsSearcheable(true)
				return
			}
		}
	}, [props.columns])

	const renderHeaders = () => {
		return (
			<Table.Header fullWidth>
				<Table.Row>
					{props.columns.map((column, i) => (
						<Table.HeaderCell
							sorted={currentSortedColumn === column.name ? sortedDirection : undefined}
							width={column.width ? column.width : undefined}
							key={"h" + i}
							onClick={() => handleHeaderClick(column)}
						>
							{column.header}
						</Table.HeaderCell>
					))}
					{props.buttons
						? <Table.HeaderCell >{props.buttonsColumnHeader}</Table.HeaderCell>
						: null
					}
				</Table.Row>
				{
					isSearcheable ?
						<Table.Row>
							{props.columns.map((column, i) => (
								<Table.HeaderCell
									width={column.width ? column.width : undefined}
									key={"s" + i}
								>
									{column.isSearcheable != null && column.isSearcheable === true ?
										<ColumnFilter name={column.name} search={() => search(currentSortedColumn, sortedDirection)} searchData={setSearchData} setSearchData={setNewSearchValues} />
										: null
									}
								</Table.HeaderCell>
							))}
							{props.buttons
								? <Table.HeaderCell></Table.HeaderCell>
								: null
							}
						</Table.Row>
						: null
				}

			</Table.Header >
		)
	}

	const renderColumn = (column: CTColumn, rowData: any) => {

		let value = column.name.split('.').reduce(function (o, key) {
			if (o != null) {
				return o[key];
			}
			return ""
		}, rowData)

		if(value === null){
			return ""
		}

		return (
			column.isBool
				? value === true || value === 1
					? "Si"
					: "No"
				: column.isDate
					? new Date(value).toLocaleDateString("es-GT")
					: value
		)
	}

	const renderColumns = (rowData: any, IsFooter: boolean = false) => {
		return (
			<>
				{props.columns.map((column, i) => (
					IsFooter ?
						<Table.HeaderCell key={"c" + i} >
							<b>
								{renderColumn(column, rowData)}
							</b>
						</Table.HeaderCell>
						:
						<Table.Cell key={"f" + i} >
							{renderColumn(column, rowData)}
						</Table.Cell>
				))}
			</>
		)
	}

	const renderButton = (button: CTButton, rowData: any, rowPos: number, i: number) => {

		if (button.isEnabled != null && button.isEnabled(rowData) === false) {
			return
		}

		return (
			<Button
				key={"b_" + i}
				style={{"marginLeft":"4px", "marginRight": "4px"}}
				color={button.color ? button.color : undefined}
				secondary={button.color ? false : true}
				onClick={() => handleButtonClick(button.id, rowData, rowPos)}
				icon={button.icon}
				content={button.label}
				title={button.hint}
			>
			</Button>
		)

	}

	const renderButtons = (rowData: any, rowPos: number) => {
		if (props.buttons == null) {
			return null
		}

		return (
			<Table.Cell key={"buttons"} collapsing textAlign="center" >
				{props.buttons.map((button, i) => (
					renderButton(button, rowData, rowPos, i)
				))}
			</Table.Cell>
		)
	}

	const renderBody = () => {

		if (props.data.length === 0) {
			return (
				<Table.Row  >
					<Table.Cell textAlign="center" colSpan={props.columns.length + 1} >
						<Header as='h3' >
							Sin datos que mostrar
          	</Header>
					</Table.Cell>
				</Table.Row>
			)
		}

		return (
			<>
				{props.data.map((rowData: any, i: any) => (
					<Table.Row key={"r" + i} className={props.onRowClick ? styles.selectableRow : ""} onClick={() => handleRowClick(rowData)}>
						{renderColumns(rowData)}
						{renderButtons(rowData, i)}
					</Table.Row>
				))}

			</>
		)
	}

	const renderTotalFooter = () => {

		if (props.data.length === 0) {
			return null
		}

		return (
			props.totalData ?
				<Table.Footer fullWidth>
					<Table.Row key={"total"}  >
						{renderColumns(props.totalData, true)}
					</Table.Row>
				</Table.Footer>
				: null
		)
	}

	return (
		<div className={styles.table}  >
			<Table sortable celled compact striped selectable  >
				{renderHeaders()}
				<Table.Body>
					{renderBody()}
				</Table.Body>
				{renderTotalFooter()}
			</Table>
		</div>
	)
}

CustomTable.defaultProps = {
	buttonsColumnHeader: 'Acciones'
}
