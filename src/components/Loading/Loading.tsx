import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { SemanticSIZES } from 'semantic-ui-react/dist/commonjs/generic'
import styles from './Loading.module.css'

type Props = {
	active: boolean
	text?: string
	inverted?: boolean
	size?: SemanticSIZES
	style?: any
}

export default function Loading({
	active,
	text = "",
	inverted = false,
	size="huge",
	style
}: Props) {
	return (
		<Dimmer style={style} className={styles.body}  inverted={inverted} active={active}>
			<Loader size={size}>{text}</Loader>
		</Dimmer>
	)
}
