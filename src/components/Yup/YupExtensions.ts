import * as Yup from 'yup';

const requiredMessage = "Campo requerido"
const minErrorMessage = "El valor debe de ser mayor o igual a "
const maxErrorMessage = "El valor debe de ser menor o igual a "

/**
 * Generates a yup StringSchema with required and nullable options setted
 * @returns NumberSchema
 */
export const requiredString = (): Yup.StringSchema<any> => Yup.string().required(requiredMessage) 

/**
 * Generates a yup NumberSchema with optional min and max values.
 * @param min Minimum number accepted
 * @param max Maximum number accepted
 * @returns NumberSchema
 */
export const requiredNumber = (min?: number, max?: number): Yup.NumberSchema<any> => {

	let isRequiredNumber : Yup.NumberSchema<any> = Yup.number()

	if(min != null){
		let isMin = Yup.number().min(min, minErrorMessage + min)
		isRequiredNumber = isRequiredNumber.concat(isMin)
	}

	if(max != null){
		let isMax = Yup.number().max(max, maxErrorMessage + max)
		isRequiredNumber = isRequiredNumber.concat(isMax)
	}

	return isRequiredNumber.concat(Yup.number().typeError(requiredMessage).required(requiredMessage))
	
}


/**
 * Generates a Yup AnyObjectSchema, with required and nullable setted
 * @returns 
 */
export const requiredObject = (): Yup.AnyObjectSchema => Yup.object().nullable().required(requiredMessage) 

export const defaultSelect = (value: any) => {
	if(value == null){
		return null
	}
	return value
}

export const defaultText = (value: any) => {
	if(value == null){
		return ""
	}
	return value
}