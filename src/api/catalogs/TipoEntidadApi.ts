import TipoEntidadDTO from "dto/catalogs/TipoEntidadDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class TipoEntidadApi extends CatalogApi<TipoEntidadDTO> {

	constructor(){
		super("/tipoentidad")
	}

}