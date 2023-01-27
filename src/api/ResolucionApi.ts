import GetPageApi from "./abstract/GetPageApi"

export default class ResolucionApi extends GetPageApi {

	protected relativePath: string = "/gestion"

	constructor() {
		super("/gestion/subregion/resolucion") //page path
	}
}