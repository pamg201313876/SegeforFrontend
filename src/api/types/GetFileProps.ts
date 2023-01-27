import GetDeleteProps from "./GetDeleteProps";

export type GetFileProps = {
	/** Nombre del archivo */
	filename?: string;
} & GetDeleteProps

export default GetFileProps;