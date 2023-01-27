import CatalogApi from "../abstract/CatalogApi";


export default class TipoBosqueApi extends CatalogApi<any> {

	constructor(){
		super("/tipobosque")
	}

}