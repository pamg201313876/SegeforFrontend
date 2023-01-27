import GetPageApi from "./abstract/GetPageApi"
export default class ExentoApi extends GetPageApi {

	protected relativePath: string = "/exento"

	constructor() {
		super("/exento/subregion/lista") //page path
	}
}