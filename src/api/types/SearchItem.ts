import RelationalOperator from "api/enums/RelationalOperator";
import LogicalOperator from "api/enums/LogicalOperator";

type SearchItem = {
	name: string,
	value: string | number | boolean,
	relationalOperator: RelationalOperator,
	logicalOperator?: LogicalOperator
}

export default SearchItem