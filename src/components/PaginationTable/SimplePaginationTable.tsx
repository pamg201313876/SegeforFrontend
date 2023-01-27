import LogicalOperator from 'api/enums/LogicalOperator'
import RelationalOperator from 'api/enums/RelationalOperator'
import PageResponse from 'api/types/PageResponse'
import SearchItem from 'api/types/SearchItem'
import Sort from 'api/types/Sort'
import { AxiosError } from 'axios'
import CustomPagination from 'components/CustomPagination/CustomPagination'
import CustomTable, { CTColumn, CTProps, CTSearchSort } from "components/CustomTable"
import React, { useEffect, useState } from 'react'
import { Button, DropdownProps, Icon, PaginationProps, Select } from 'semantic-ui-react'
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic'
import styles from './PaginationTable.module.css'

export type SimplePaginationTableProps = {
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
	fetchDataFunction: (
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

export default function SimplePaginationTable(props: SimplePaginationTableProps) {

	const [currentData, setCurrentData] = useState<any>([])
	const [activePage, setActivePage] = useState(1)
	const [size, setSize] = useState(10)
	const [totalPages, setTotalPages] = useState(1)
	const [searchSortItem, setSearchSortItem] = useState<SearchSortItem>()
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
		fetchData(activePage, size, handleResponse, handleError, searchSortItem?.search, searchSortItem?.sort)
	}, [fetchData, reload, setReload, activePage, size, searchSortItem])

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
		return (
			<div className={styles.header} >
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

SimplePaginationTable.defaultProps = {
	noAddButton: false,
	addButtonIcon: 'add',
	addButtonLabel: 'Agregar',
	buttonsColumnHeader: 'Acciones'
} as Partial<SimplePaginationTableProps>