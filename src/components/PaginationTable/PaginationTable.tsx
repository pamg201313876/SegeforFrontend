import React, { useEffect, useState } from 'react'
import CustomTable, { CTProps, CTColumn, CTSearchSort } from "components/CustomTable"
import CustomPagination from 'components/CustomPagination/CustomPagination'
import { PaginationProps, Select, DropdownProps, Button, Icon, Form } from 'semantic-ui-react'
import { AxiosError } from 'axios'
import styles from './PaginationTable.module.css'
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic'
import Sort from 'api/types/Sort'
import SearchItem from 'api/types/SearchItem'
import LogicalOperator from 'api/enums/LogicalOperator'
import RelationalOperator from 'api/enums/RelationalOperator'
import PageResponse from 'api/types/PageResponse'
import ObjFiltro from 'dto/ObjFiltro'
import TokenResponseDTO from 'dto/auth/TokenResponseDTO'
import { toDate } from 'utils/UtilFunctions'

export type PaginationTableProps = {
	columns: CTColumn[]
	/** (Optional) Disable Add Button */
	noAddButton: boolean
	/** (Optional) Add button label. */
	addButtonLabel: string
	/** (Optional) Add button icon. If null, no icon it's shown. */
	addButtonIcon: SemanticICONS
	/** (Optional) On add button click pressed. */
	onAddButtonClick?: () => void;
	reload: boolean
	setReload: Function
	estadoIdToFilter: number,
	personaIdToFilter?: number,
	elaboradorIdToFilter?: number,
	subregionIdToFilter?: number,
	noDate?: boolean,
	fetchDataFunction: (
		filter: ObjFiltro,
		pageNumber: number,
		size: number,
		onResponse: (pageResponse: PageResponse) => void,
		onError: (error: AxiosError) => void,
		search?: SearchItem[],
		sort?: Sort[]
	) => void
} & CTProps

type SearchSortItem = {
	sort: Sort[],
	search: SearchItem[]
}

export default function PaginationTable(props: PaginationTableProps) {

	const [currentData, setCurrentData] = useState<any>([])
	const [activePage, setActivePage] = useState(1)
	const [size, setSize] = useState(10)
	const [totalPages, setTotalPages] = useState(1)
	const [estadoIdToFilter] = useState(props.estadoIdToFilter)
	const [searchSortItem, setSearchSortItem] = useState<SearchSortItem>()
	const [initDate, setInitDate] = useState<string>( )
	const [endDate, setEndDate] = useState<string>()
	const tokenData = localStorage.getItem("tokenData")
	const fetchData = props.fetchDataFunction
	const { reload, setReload } = props

	const sizeOptions = [
		{ key: 1, text: '10', value: 10 },
		{ key: 2, text: '25', value: 25 },
		{ key: 3, text: '50', value: 50 },
		{ key: 4, text: '100', value: 100 },
	];

	const onAddButtonClick = () => {
		if (props.onAddButtonClick) props.onAddButtonClick();
	}

	const handleResponse = (pageResponse: PageResponse) => {
		let page = pageResponse.page
		setCurrentData(page.list)
		setTotalPages(page.totalPages)

	}

	const handleError = (error: AxiosError) => {
		console.log(error)
		console.log("error")
	}

	const handlePageChange = (_e: any, data: PaginationProps) => {
		if (data.activePage == null) {
			return
		}
		let pageNumber = data.activePage as number
		setActivePage(pageNumber)
	}

	const handleSizeChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		setSize(data.value as number)
		setActivePage(1)
	}

	const handleSearchSort = (searchSort: CTSearchSort) => {

		let sort: Sort[] = getSortList(searchSort)
		let search: SearchItem[] = getSearchItems(searchSort)

		let searchSortItem: SearchSortItem = {
			sort,
			search
		}

		setSearchSortItem(searchSortItem)

	}

	const getSortList = (searchSort: CTSearchSort): Sort[] => {

		let sort: Sort = {
			name: searchSort.sortedColumn,
			value: searchSort.sortType
		}

		return [sort]
	}

	const getSearchItems = (searchSort: CTSearchSort): SearchItem[] => {

		let searchItems: SearchItem[] = []
		let lastSearchItem: SearchItem | null = null

		for (let property in searchSort.searchData) {

			if (searchSort.searchData[property] != null
				&& searchSort.searchData[property] !== "") {
				if (lastSearchItem != null) {
					lastSearchItem.logicalOperator = LogicalOperator.AND
				}

				let searchItem: SearchItem = {
					name: property,
					value: searchSort.searchData[property],
					relationalOperator: RelationalOperator.EQUAL
				}

				searchItems.push(searchItem)
				lastSearchItem = searchItem
			}

		}

		return searchItems
	}

	useEffect(() => {
		if (reload) {
			setReload(false)
		}

		if (tokenData != null && initDate != null && endDate != null) {
			let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
			console.log(tokenObj)

			let personaId = 0
			if(props.personaIdToFilter != null){
				personaId = props.personaIdToFilter
			}
			let elaboradorId = tokenObj.usuarioId
			if(props.elaboradorIdToFilter != null){
				elaboradorId = props.elaboradorIdToFilter
			}
			let subregionId = 0
			if(props.subregionIdToFilter != null){
				subregionId = props.subregionIdToFilter
			}

			let endDayNext = toDate(endDate)
			endDayNext.setDate(endDayNext.getDate() + 1)

			let objFiltro: ObjFiltro = {
				fechaIni: initDate,
				fechaFin: endDayNext.toLocaleDateString('en-CA'),
				estadoId: estadoIdToFilter,
				personaId: personaId,
				elaboradorId: elaboradorId,
				subregionId: subregionId
			}
			fetchData(objFiltro, activePage, size, handleResponse, handleError, searchSortItem?.search, searchSortItem?.sort)
		}

	}, [tokenData, initDate, endDate, estadoIdToFilter, props.personaIdToFilter, props.subregionIdToFilter, props.elaboradorIdToFilter, fetchData, reload, setReload, activePage, size, searchSortItem])


	useEffect(() => {
		let tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1)
		let init = new Date()
		init.setMonth(0)
		init.setDate(1)		
		setInitDate(init.toLocaleDateString('en-CA'))
		setEndDate(tomorrow.toLocaleDateString('en-CA'))
	}, [])

	const renderCreateButton = () => {
		if (props.noAddButton) {
			return null
		}
		return (
			<Button secondary floated='right' size="large" icon labelPosition='left' onClick={onAddButtonClick}>
				<Icon name={props.addButtonIcon} />
				{props.addButtonLabel}
			</Button>
		)
	}

	const renderHeader = () => {

		if(props.noDate === true){
			return null
		}

		return (
			<div className={styles.header} >
				<Form>
					<Form.Group>
						<Form.Input
							label="Fecha de inicio"
							type="date"
							defaultValue={initDate}
							onBlur={(e:any) => setInitDate(e.target.value)}
						/>
						<Form.Input
							label="Fecha fin"
							type="date"
							defaultValue={endDate}
							onBlur={(e:any) => setEndDate(e.target.value)}
						/>
					</Form.Group>
				</Form>

				{renderCreateButton()}
			</div>
		)
	}

	const renderFooter = () => {
		return (
			<div className={styles.footer} >
				<div className={styles.pagination} >
					<Select labeled options={sizeOptions} value={size} compact onChange={handleSizeChange} />
				</div>
				<CustomPagination
					activePage={activePage}
					totalPages={totalPages}
					handlePageChange={handlePageChange}
				/>
			</div>
		)
	}

	return (
		<div className={styles.content} >
			{renderHeader()}
			<div className={styles.table} >
				<CustomTable
					data={currentData}
					columns={props.columns}
					buttons={props.buttons}
					buttonsColumnHeader={props.buttonsColumnHeader}
					onSearchSort={handleSearchSort}
					onButtonClick={props.onButtonClick}
					onRowClick={props.onRowClick}
				/>
			</div>
			{renderFooter()}
		</div>
	)

}

PaginationTable.defaultProps = {
	noAddButton: false,
	addButtonIcon: 'add',
	addButtonLabel: 'Agregar',
	buttonsColumnHeader: 'Acciones'
} as Partial<PaginationTableProps>