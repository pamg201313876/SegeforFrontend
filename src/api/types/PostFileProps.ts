import GetDeleteProps from "./GetDeleteProps";

export type PostFileProps = {
	/** Nombre del archivo */
	filename?: string;
    /** Cuerpo de la solicitud */
	body: object;
} & GetDeleteProps

export default PostFileProps;