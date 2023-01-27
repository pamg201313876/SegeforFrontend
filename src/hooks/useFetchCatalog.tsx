import { AxiosError } from 'axios'
import { useState, useEffect, useCallback } from 'react'
import useDataFetching from './useDataFetching'


export default function useFetchCatalog(
	fetchDataFunction: (onResponse: (data: any[]) => void, onError: (error: AxiosError) => void) => void,
	label = "nombre",
	id = "id",
	customCatalog?: (rows: any[]) => any[]) {

	const [reload, setReload] = useState(false)
	const [catalog, setCatalog] = useState<any>([])

	let fetchDataSource =
	{
		fetchDataFunction: fetchDataFunction,
		reload: reload,
		setReload: setReload
	}

	const { rows } = useDataFetching(fetchDataSource)

	const generateCatalog = (rows: any[]) => {
		if (rows && rows.length !== 0) {
			let myCatalog = rows.map((data: any, i) => (
				{ key: i, text: data[label], object: data, value: data[id] }
			))
			setCatalog(myCatalog)
		}
		else if (rows && rows.length === 0) {
			setCatalog(null)
		}
	}

	const generateCatalogCallback = useCallback(generateCatalog, [label])

	useEffect(() => {
		let isMounted = true
		if (customCatalog == null) {
			generateCatalogCallback(rows)
		}
		else {
			let catalog = customCatalog(rows)
			setCatalog(catalog)
		}
		return () => {
			isMounted = false
		}
	}, [rows, generateCatalogCallback, customCatalog])

	return {
		catalog
	}

}

