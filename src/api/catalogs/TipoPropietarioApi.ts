import TipoPropietarioDTO from "dto/catalogs/TipoPropietarioDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class TipoPropietarioApi extends CatalogApi<TipoPropietarioDTO> {

	constructor(){
		super("/tipopropietario")
	}

}