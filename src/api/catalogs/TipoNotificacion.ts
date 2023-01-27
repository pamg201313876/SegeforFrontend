import TipoEntidadDTO from "dto/catalogs/TipoEntidadDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class TipoNotificacionApi extends CatalogApi<TipoEntidadDTO> {

	constructor(){
		super("/tiponotificacion")
	}

}