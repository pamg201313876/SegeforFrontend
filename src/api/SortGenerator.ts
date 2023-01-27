import Sort from "./types/Sort"

const SortGenerator = (sort: Sort): string => {
		return sort.name + ',' + sort.value	
}



export default SortGenerator