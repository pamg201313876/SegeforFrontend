import SexoDTO from "dto/catalogs/SexoDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class SexoApi extends CatalogApi<SexoDTO> {

	constructor(){
		super("/sexo")
	}

}