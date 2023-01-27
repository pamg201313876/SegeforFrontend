import { useEffect, useState, useCallback } from 'react';
import { AxiosError } from 'axios';


type Props = {
	fetchDataFunction: (
		onResponse: (data: any[]) => void,
		onError: (error: AxiosError) => void
	) => void
	reload: boolean
	setReload: (value: boolean) => void
}

export default function useDataFetching({
	fetchDataFunction,
	reload,
	setReload
}: Props) {

	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [loading, setLoading] = useState(true);
	const [rows, setRows] = useState<any[]>([]);
	const [error, setError] = useState<AxiosError>();

	const getData = () => {

		setReloadCallback(false)

		const onResponse = (data: any[]) => {
			setRows(data);
			setLoading(false);
		}

		const onError = (error: AxiosError) => {
			setError(error);
			setLoading(false);
		}

		setLoading(true);

		if (fetchDataFunction != null) {
			fetchDataFunction(onResponse, onError)
		}
	}

	const fetchDataCallback = useCallback(fetchDataFunction, [fetchDataFunction])
	const getDataCallback = useCallback(getData, [fetchDataCallback])
	const setReloadCallback = useCallback(setReload, [])

	useEffect(() => {
		setReloadCallback(true)
	}, [setReloadCallback, getDataCallback])

	useEffect(() => {
		if (reload && isMounted) {
			getDataCallback()
		}
	}, [isMounted, getDataCallback, reload])

	useEffect(() => {
		setIsMounted(true)
		return () => {
			setIsMounted(false)
		}
	}, [])


	return {
		loading,
		rows,
		error
	};
}
