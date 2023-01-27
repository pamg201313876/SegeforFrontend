import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Form as SForm, Icon } from 'semantic-ui-react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from "react-hook-form";
import { SemanticCOLORS, SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios';
import { AnyObjectSchema } from 'components/Yup';

export type FormProps = {
	/** Yup validation schema */
	validationSchema: AnyObjectSchema
	onSubmit: (
		data: any,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
	) => void
	/** Optional onSuccess callback.  */
	onSuccess?: (res: any) => void
	/** Optional error callback */
	onError?: (res: any) => void
	/** Optional axios error callback */
	onAxiosError?: (error: AxiosError) => void
	/** Disables onSuccess message if true */
	noSuccessMessage?: boolean
	children: any,
	/** Default values for Form */
	defaultValues?: any,
	/** Save button label */
	submitButtonLabel?: string,
	/** Save button icon */
	submitButtonIcon?: SemanticICONS,
	/** Set custom submit button */
	setSubmitButton?: (button: any) => void,
	buttons?: FormAdditionalButton[],
	onButtonClick?: (
		id: string, 
		data: any,
		onResponse: (res: any) => void,
		onError: (error: AxiosError) => void
		) => void
}

export type ControlProps = {
	name: string
}

export type FormAdditionalButton = {
	id: string,
	label: string,
	color: SemanticCOLORS
}

export default function Form({
	validationSchema,
	onSubmit: propOnSubmit,
	onSuccess,
	onError,
	onAxiosError,
	noSuccessMessage = false,
	children,
	defaultValues,
	submitButtonLabel = "Guardar",
	submitButtonIcon = "save",
	setSubmitButton,
	buttons,
	onButtonClick
}: FormProps) {

	const methods = useForm<any>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: yupResolver(validationSchema),
		defaultValues
	});

	const { isValid } = methods.formState
	const { successToast, errorToast } = useContext(AppDataContext)
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [buttonLoading, setButtonLoading] = useState<string | null>(null)

	const handleResponse = (res: any) => {
		setIsSubmitting(false)
		if (res.status === "OK") {
			if (!noSuccessMessage) {
				successToast(res.message)
			}
			onSuccess?.(res)
		}
		else {
			if (onError != null) {
				onError?.(res)
			}
			else {
				errorToast(res.message)
			}
		}
	}

	const handleError = (axiosError: AxiosError) => {
		setIsSubmitting(false)
		console.error(axiosError)
		errorToast("Error al guardar informacion. Intente de nuevo.")
		onAxiosError?.(axiosError)
	}

	const onSubmit = (data: any) => {
		setIsSubmitting(true)
		propOnSubmit(data, handleResponse, handleError)
	}

	const handleAdditionalResponse = (res: any) => {
		setButtonLoading(null)
		if (res.status !== "OK") {
			errorToast(res.message)
		}
	}

	const handleAdditionalError = (axiosError: AxiosError) => {
		setButtonLoading(null)
		errorToast("Error al realizar actividad. Intentelo de nuevo.")
		onAxiosError?.(axiosError)
	}

	const onAdditionalButtonClick = (id: string) => {
		if (onButtonClick != null) {
			onButtonClick?.(id, methods.getValues(), handleAdditionalResponse, handleAdditionalError)
			setButtonLoading(id)
		}
	}

	const saveButton = (withClick: boolean = false) => {
		return (
			<SForm.Button type={withClick ? undefined : 'submit'} onClick={withClick ? methods.handleSubmit(onSubmit) : undefined} icon primary floated="right" labelPosition='right' disabled={isSubmitting || !isValid} loading={isSubmitting}>
				{submitButtonLabel}
				<Icon name={submitButtonIcon} />
			</SForm.Button>
		)
	}

	const additionalButtons = () => {
		if (buttons == null) {
			return null
		}
		let buttonList = []
		for (let button of buttons) {
			let b =
				<SForm.Button type="button" loading={buttonLoading === button.id} disabled={buttonLoading === button.id || !isValid} color={button.color} onClick={() => onAdditionalButtonClick(button.id)} floated="right" >
					{button.label}
				</SForm.Button>
			buttonList.push(b)
		}
		return buttonList
	}

	const callbackButton = () => {
		return saveButton(true)
	}

	const saveButtonCallback = useCallback(callbackButton, [submitButtonIcon, submitButtonLabel, isSubmitting, isValid, onSuccess])

	useEffect(() => {
		if (setSubmitButton != null) {
			setSubmitButton(saveButtonCallback())
		}
	}, [setSubmitButton, saveButtonCallback])

	return (
		<FormProvider {...methods}>
			<SForm onSubmit={methods.handleSubmit(onSubmit)}>
				{React.Children.map(children, child => {
					return child?.props?.name
						? React.createElement(child.type, {
							...{
								...child.props,
								key: child.props.name
							}
						})
						: child;
				})}
				{!setSubmitButton && saveButton()}
			</SForm>
			{additionalButtons()}
		</FormProvider>
	)
}

