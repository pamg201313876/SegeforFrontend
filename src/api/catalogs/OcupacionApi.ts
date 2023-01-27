import OcupacionDTO from "dto/catalogs/OcupacionDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class OcupacionApi extends CatalogApi<OcupacionDTO> {

	constructor(){
		super("/ocupacion")
	}

}