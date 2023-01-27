import GetDeleteProps from "./GetDeleteProps";

export type PostPutProps = {
	/** Cuerpo de la solicitud */
	body: object;
} & GetDeleteProps

export default PostPutProps;