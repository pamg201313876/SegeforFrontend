import CatalogApi from "../abstract/CatalogApi";


export default class SubtipoBosqueApi extends CatalogApi<any> {

	constructor(){
		super("/subtipo-bosque")
	}

}