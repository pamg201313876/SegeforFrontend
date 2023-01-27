import CatalogApi from "../abstract/CatalogApi";


export default class TipoGarantiaApi extends CatalogApi<any> {

	constructor(){
		super("/tipogarantia")
	}

}