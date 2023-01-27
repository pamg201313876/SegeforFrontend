import CatalogApi from "../abstract/CatalogApi";


export default class TipoInventarioApi extends CatalogApi<any> {

	constructor(){
		super("/tipoinventario")
	}

}