type Medida = {
	name: string,
	value: boolean
}

export const createMedida = (name: string, value: boolean) : Medida => {

	return {
		name: name,
		value: value
	}

}

export default Medida	