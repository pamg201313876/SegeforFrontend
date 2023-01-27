import GetPageApi from "./abstract/GetPageApi"

export default class EnmiendasApi extends GetPageApi {

	protected relativePath: string = "/gestion"

	constructor() {
		super("/gestion/subregion/enmiendas") //page path
	}
}