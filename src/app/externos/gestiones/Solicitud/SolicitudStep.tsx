import React from 'react'
import { Icon, SemanticICONS, Step } from 'semantic-ui-react'
import { SolicitudActivity } from './SolicitudSteps'

type Props = {
	title: string,
	icon: SemanticICONS,
	activity: SolicitudActivity,
	currentActivity: SolicitudActivity
	setActivity: (step: SolicitudActivity) => void
	lastActivity: SolicitudActivity
}

export default function SolicitudStep({
	title,
	icon,
	activity,
	currentActivity,
	setActivity,
	lastActivity
}: Props) {

	//Si la última actividad realizada es menor a la actividad 
	if(lastActivity < activity){
		return null
	}

	const handleOnClick = () => {
		setActivity(activity)
	}

	return (
		<Step onClick={handleOnClick} active={currentActivity === activity ? true : false}    >
			<Icon name={icon} />
			<Step.Content>
				<Step.Title>{title}</Step.Title>
			</Step.Content>
		</Step>
	)
}
