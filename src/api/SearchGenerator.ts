import SearchItem from './types/SearchItem'

const SearchGenerator = (searchItems: SearchItem[]): string => {

		let searchString = ""

		for(let i = 0; i < searchItems.length; i ++){

			let searchItem = searchItems[i]
			searchString += generateRelation(searchItem)

			if(i + 1 !== searchItems.length){

				if(searchItem.logicalOperator == null){
					throw Error("No viene el operador lógico requerido")
				}

				searchString += searchItem.logicalOperator
			}

		}

		return searchString
}

const generateRelation = (searchItem: SearchItem) : string => {

	let likeValue = "'" + searchItem.value + "*'" 
	return searchItem.name + searchItem.relationalOperator + likeValue

}

export default SearchGenerator