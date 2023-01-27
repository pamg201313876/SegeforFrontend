import React, { useEffect, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { AxiosError } from 'axios';

type Props = {
	onFileLoad: (
		file: any,
		onResponse: (response: any) => void,
		onError: (error: AxiosError) => void
	) => void
	onFileDownload: (
		onResponse: (response: any) => void,
		onError: (error: AxiosError) => void
	) => void
	onUploadSuccess: (res: any) => void
	onUploadError: (error: any) => void
	isFileLoaded?: boolean
	fileFilter?: string
	style?: any
}

export default function UploadButton({
	onFileLoad,
	onFileDownload,
	onUploadSuccess,
	onUploadError,
	isFileLoaded,
	fileFilter,
	style
}: Props) {

	const defaultTitle = "Cargar archivo"
	const uploadedTitle = "Archivo cargado"

	const uploadInput = React.useRef<any>(null);
	const [loading, setLoading] = React.useState(false)
	const [downloadLoading, setDownloadLoading] = useState<boolean>(false)
	const [isPositive, setPositive] = React.useState<boolean>(false)
	const [buttonTitle, setButtonTitle] = useState<string>(defaultTitle)

	const handleClick = () => {
		if (uploadInput != null) {
			let current = uploadInput.current
			if (current != null) {
				current.click()
			}
		}
	}

	const handleUploadSuccess = (response: any) => {
		setButtonTitle(uploadedTitle)
		setPositive(true)
		onUploadSuccess(response)
	}

	const upload = (file: any) => {
		const onResponse = (response: any) => {
			if (response.status === "OK") {
				handleUploadSuccess(response)
			}
			else {
				console.error(response)
				onUploadError(response)
			}
			setLoading(false)
		}
		const onError = (axiosError: AxiosError) => {
			console.error(axiosError)
			onUploadError(axiosError)
			setLoading(false)
		}
		setLoading(true)
		onFileLoad(file, onResponse, onError)
	}

	const fileLoad = (e: any) => {
		if (e.target.files != null && e.target.files.length > 0) {
			upload(e.target.files[0]);
		}
		else {
			onUploadError("Error al subir archivo")
		}
	}

	const fileDownload = () => {
		const onResponse = () => {
			setDownloadLoading(false)
		}

		const onError = (error: AxiosError) => {
			console.log(error)
			console.log("Error")
			setDownloadLoading(false)
		}
		setDownloadLoading(true)
		onFileDownload(onResponse, onError)
	}

	useEffect(() => {
		if (isFileLoaded != null && isFileLoaded) {
			setPositive(true)
			setButtonTitle(uploadedTitle)
		}
	}, [isFileLoaded])

	return (
		<>
			<Button
				style={style}
				icon
				labelPosition="right"
				positive={isPositive}
				loading={loading}
				onClick={handleClick}>
					<Icon name="upload" />
					{buttonTitle}
			</Button>
			<input
				ref={uploadInput}
				type="file"
				hidden
				accept={fileFilter}
				onChange={fileLoad}
			/>
			{isPositive &&
				<Button
					icon
					color="blue"
					onClick={fileDownload}
					loading={downloadLoading}
				>
					<Icon name="download" />
				</Button>
			}

		</>
	)
}
