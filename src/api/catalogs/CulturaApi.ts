import CulturaDTO from "dto/catalogs/CulturaDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class CulturaApi extends CatalogApi<CulturaDTO> {

	constructor(){
		super("/cultura")
	}

}