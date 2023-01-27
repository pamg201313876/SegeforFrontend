import GetPageApi from "./abstract/GetPageApi"

export default class SuspensionApi extends GetPageApi {

	protected relativePath: string = "/gestion"

	constructor() {
		super("/gestion/suspension/lista") //page path
	}
}