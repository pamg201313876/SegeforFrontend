import CatalogApi from "../abstract/CatalogApi";


export default class TipoMuestreoApi extends CatalogApi<any> {

	constructor(){
		super("/tipomuestreo")
	}

}