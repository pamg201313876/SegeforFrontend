import CatalogApi from "../abstract/CatalogApi";


export default class EstadoBosqueApi	 extends CatalogApi<any> {

	constructor(){
		super("/estado-bosque")
	}

}