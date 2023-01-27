import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'

type Props = {
	downloadFunction: (onResponse: () => void, onError: (error: AxiosError) => void) => void
} & ButtonProps

export default function DownloadButton({
	downloadFunction,
	content = "Descargar",
	...props
}: Props) {

	const [loading, setLoading] = useState<boolean>(false)

	const handleResponse = () => {
		setLoading(false)
	}

	const handleError = (error: AxiosError) => {
		console.error(error)
		setLoading(false)
	}

	const handleClick = () => {
		if (!loading) {
			setLoading(true)
			downloadFunction(handleResponse, handleError)
		}
	}


	return (
		<Button content={content} icon="download" labelPosition="right" color="blue" onClick={handleClick} loading={loading} {...props}/>
	)
}
