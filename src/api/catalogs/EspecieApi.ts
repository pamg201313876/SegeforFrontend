import CatalogApi from "../abstract/CatalogApi";


export default class EspecieApi extends CatalogApi<any> {

	constructor(){
		super("/especie")
	}

}