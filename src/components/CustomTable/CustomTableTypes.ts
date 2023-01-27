import { SemanticICONS, SemanticCOLORS, SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic';
import SortType from 'api/enums/SortType';

export type CTButtonResponse = {
	/* Id of the button pressed. The same one  */
	id: string, 
	/* Row data related to the button pressed  */
	rowData: any,
	/* Position of the row */
	pos: number
}

export type CTButton = {
	id: string
	label?: string
	color?: SemanticCOLORS
	icon?: SemanticICONS,
	hint?: string,
	/**
	 * (Optional) if false, the button disappear
	 * if null this is set to true
	 */
	isEnabled?: (rowData: any) => boolean
}

/** Column that represents an attribute */
export type CTColumn = {
	/** Header name on table */
	header: string
	/** Name of the object's attribute */
	name: string
	/** (Optional) Width of the column. If null the table assigns a default value */
	width?: SemanticWIDTHS
	/** (Optional) If true, the boolean value is represented as a string on the table.
	 * Yes/Si if the boolean is true.
	 * No if the boolean is false.
	 * If null this is set to false.  */
	isBool?: boolean
	isDate?: boolean
	isSearcheable?: boolean
}

export type CTSearchSort = {
	searchData: any,
	sortedColumn: string,
	sortType: SortType
}

export type CTProps = {
	/** Data to show on table*/
	data: Array<object>
	/** Columns of the table. See Column type for more information of the data type. */
	columns: CTColumn[];
	/** Buttons for fire events for individuals rows on the table. */
	buttons?: CTButton[];
	/** Extra row for totals */
	totalData?: object
	/**Name for buttons column */
	buttonsColumnHeader: string;
	/** Evento to fire on click on buttons  */
	onButtonClick?: (buttonResponse: CTButtonResponse) => void;
	/** Event to fire on click on a row */
	onRowClick?: (row: any) => void;
	/** Event to fire on columns searching */
	onSearchSort?: (searchSort: CTSearchSort) => void;
}