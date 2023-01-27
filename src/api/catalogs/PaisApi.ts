import PaisDTO from "dto/catalogs/PaisDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class PaisApi extends CatalogApi<PaisDTO> {

	constructor(){
		super("/pais")
	}

}