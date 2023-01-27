
/**
 * Check if the string is blank (null or empty with or without whitespaces)
 * @param str string to check
 * @returns true if is blank, else false
 */
 export const isBlankString = (str: string): boolean => {
	return str === null || str.match(/^\s*$/) !== null
}

export const formatDate = (str: string): string => {
	//replaces the - to /. 
	return str.replaceAll("-", "/")
}

/**
 * Transform string to Date object. The string should be like this: (YYYY-MM-dd)
 * @param str string to convert
 * @returns Date object
 */
export const toDate = (str: string): Date => {
	//replaces the - to /. This is to prevent javascript to substract a day when converting to Date because of timestamp
	let date = new Date(formatDate(str))
	return date
}

/**
 * Transform string to a string in local time. The string should be like this: (YYYY-MM-dd)
 * @param str string to convert
 * @returns Date object
 */
export const toLocalDateString = (str: string): string => {
	let options: any = { year: 'numeric', month: 'numeric', day: 'numeric' };
	let date = toDate(str)
	return date.toLocaleDateString("es-GT", options)
}


/**
 * Transform string to Iso string. The string should be like this: (YYYY-MM-dd)
 * @param str string to convert
 * @returns ISO String object
 */
export const toDateIsoString = (str: string): string => {
	let date = toDate(str)
	return date.toISOString()
}

/**
 * Transform string to Iso string with timezone. The string should be like this: (YYYY-MM-dd)
 * @param str string to convert
 * @returns ISO String object
 */
export const toLocalDateIsoString = (str: string): string => {
	let date = toDate(str)
	var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
	return isoDateTime
}

export const isEmail = (email: string): boolean => {
	const res = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
	return res.test(email)
}

export const isOnlyDigits = (value: string): boolean => {
	const res = /^\d+$/
	return res.test(value)
}

export const isOnlyDigitsOrBlank = (value: string): boolean => {
	if (!isOnlyDigits(value) && !isBlankString(value)) {
		return false
	}
	return true
}

/**
 * Chequea si el valor ingresado es un número o una cadena vacia
 * @param value 
 * @param allowNegative Si se permiten números negativos
 * @returns 
 */
export const isNumberOrEmpty = (value: any, allowNegative: boolean = false): boolean => {

	if (isNaN(value) && !isBlankString(value)) {

		if (allowNegative && value === "-") {
			return true
		}

		return false
	}

	else if (!allowNegative && value < 0) {
		return false
	}

	return true
}

export const isNumber = (value: any): boolean => {
	if(typeof value === 'string' && isBlankString(value)){
		return false
	}
  return isNumberOrEmpty(value,true)
}

export const roundDouble = (value: number) : number => {
	return Math.round((value + Number.EPSILON) * 1000) / 1000;
}

export const formatDouble = (value: number): string => {
	if (value != null) {
		return roundDouble(value).toString()
	}
	return ""
}

export const isDateGreaterThanToday = (date: string) => {
	var varDate = new Date(date); //MM-dd-YYYY
	var today = new Date();
	today.setHours(0, 0, 0, 0);
	return varDate > today
}

export const convertNit = (nit: string) => {
	return nit.slice(0, nit.length - 1) + "-" + nit.slice(nit.length - 1)
}