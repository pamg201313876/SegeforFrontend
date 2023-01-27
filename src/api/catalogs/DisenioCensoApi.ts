import CatalogApi from "../abstract/CatalogApi";


export default class DisenioCensoApi extends CatalogApi<any> {

	constructor(){
		super("/disenio-censo")
	}

}