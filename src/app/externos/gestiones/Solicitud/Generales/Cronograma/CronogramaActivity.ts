type CronogramaActivity = {
	label: string,
	name: string,
	ene: boolean,
	feb: boolean,
	mar: boolean,
	abr: boolean,
	may: boolean,
	jun: boolean,
	jul: boolean,
	ago: boolean,
	sep: boolean,
	oct: boolean,
	nov: boolean,
	dic: boolean
}

export const createNewActivity = (label: string, name: string): CronogramaActivity => {

	return {
		label: label,
		name: name,
		ene: false,
		feb: false,
		mar: false,
		abr: false,
		may: false,
		jun: false,
		jul: false,
		ago: false,
		sep: false,
		oct: false,
		nov: false,
		dic: false
	}

}

export const createActivity = (label: string, name: string, cronogramaActivity: boolean[]): CronogramaActivity => {
	if (cronogramaActivity == null) {
		return {
			label: label,
			name: name,
			ene: false,
			feb: false,
			mar: false,
			abr: false,
			may: false,
			jun: false,
			jul: false,
			ago: false,
			sep: false,
			oct: false,
			nov: false,
			dic: false
		}
	}
	return {
		label: label,
		name: name,
		ene: cronogramaActivity[0] ? cronogramaActivity[0] : false,
		feb: cronogramaActivity[1] ? cronogramaActivity[1] : false,
		mar: cronogramaActivity[2] ? cronogramaActivity[2] : false,
		abr: cronogramaActivity[3] ? cronogramaActivity[3] : false,
		may: cronogramaActivity[4] ? cronogramaActivity[4] : false,
		jun: cronogramaActivity[5] ? cronogramaActivity[5] : false,
		jul: cronogramaActivity[6] ? cronogramaActivity[6] : false,
		ago: cronogramaActivity[7] ? cronogramaActivity[7] : false,
		sep: cronogramaActivity[8] ? cronogramaActivity[8] : false,
		oct: cronogramaActivity[9] ? cronogramaActivity[9] : false,
		nov: cronogramaActivity[10] ? cronogramaActivity[10] : false,
		dic: cronogramaActivity[11] ? cronogramaActivity[11] : false
	}
}

export default CronogramaActivity