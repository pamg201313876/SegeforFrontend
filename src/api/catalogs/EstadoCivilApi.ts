import EstadoCivilDTO from "dto/catalogs/EstadoCivilDTO";
import CatalogApi from "../abstract/CatalogApi";


export default class EstadoCivilApi extends CatalogApi<EstadoCivilDTO> {

	constructor(){
		super("/estadocivil")
	}

}