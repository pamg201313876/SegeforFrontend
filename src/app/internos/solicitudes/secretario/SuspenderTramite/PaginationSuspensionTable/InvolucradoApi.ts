import GetPageApi from "./GetPageApi"

export default class InvolucradoApi extends GetPageApi {

	protected relativePath: string = "/gestion"

	constructor() {
		super("/gestion/por/involucrado") //page path
	}
}