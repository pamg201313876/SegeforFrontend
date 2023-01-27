import CatalogApi from "../abstract/CatalogApi";


export default class TratamientoSilviculturalApi extends CatalogApi<any> {

	constructor(){
		super("/tratamientosilvicultural")
	}

}