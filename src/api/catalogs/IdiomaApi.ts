import IdiomaDTO from "dto/catalogs/IdiomaDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class IdiomaApi extends CatalogApi<IdiomaDTO> {

	constructor(){
		super("/idioma")
	}

}