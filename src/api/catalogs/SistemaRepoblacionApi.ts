import CatalogApi from "../abstract/CatalogApi";


export default class SistemaRepoblacionApi extends CatalogApi<any> {

	constructor(){
		super("/sistemarepoblacion")
	}

}