import CatalogApi from "../abstract/CatalogApi";

export default class TipoRepresentacionApi extends CatalogApi<any> {

	constructor(){
		super("/tiporepresentacion")
	}

}