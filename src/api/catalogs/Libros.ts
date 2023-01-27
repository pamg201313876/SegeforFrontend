import CatalogApi from "../abstract/CatalogApi";


export default class LibroApi extends CatalogApi<any> {

	constructor(){
		super("/libro")
	}

}