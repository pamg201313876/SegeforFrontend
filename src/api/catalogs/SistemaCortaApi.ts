import CatalogApi from "../abstract/CatalogApi";


export default class SistemaCortaApi extends CatalogApi<any> {

	constructor(){
		super("/sistemacorta")
	}

}