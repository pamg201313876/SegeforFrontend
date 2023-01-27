import ParametroAnalisis from "./ParametroAnalisis";

type TotalAnalisis = {
	id: number,
	extraer: ParametroAnalisis
	semilleros: ParametroAnalisis
	remanentes: ParametroAnalisis
}

const newParametroAnalisis = (): ParametroAnalisis => {
	return {
		numeroArboles: 0,
		ab: 0,
		vol: 0
	}
}

export const newTotal = (id: any): TotalAnalisis => {
	let total: TotalAnalisis = {
		id: id,
		extraer: newParametroAnalisis(),
		semilleros: newParametroAnalisis(),
		remanentes: newParametroAnalisis(),
	}
	return total;
}


export default TotalAnalisis;