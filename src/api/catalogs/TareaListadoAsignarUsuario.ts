import CatalogApi from "api/abstract/CatalogApi"

export default class TareaListadoAsignarUsuario extends CatalogApi<any> {

	constructor( perfilId: number, subregionId: number ){
		super("/tarea/"+subregionId+"/"+perfilId)
	}	
}