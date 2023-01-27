import React from 'react'
import { Step } from 'semantic-ui-react'
import styles from './Solicitud.module.css'
import SolicitudStep from './SolicitudStep'

export enum SolicitudActivity {
	INFORMACION_GENERAL,
	BIOFISICAS,
	FINCA,
	BOLETA,
	INVENTARIO,
	PLANIFICACION,
	APROVECHAMIENTO,
	RESUMEN,
	PROTECCION,
	MITIGACION,
	CRONOGRAMA,
	ANEXOS,
	FINALIZAR,
	NULL
}

type Props = {
	step: SolicitudActivity
	setStep: (step: SolicitudActivity) => void
	lastStep: SolicitudActivity
}

export default function SolicitudSteps({
	step,
	setStep,
	lastStep
}: Props) {

	const steps1 = () => {
		return (
			<Step.Group  attached="top" widths={6} size='mini' className={styles.header} >
				<SolicitudStep
					title="Información General"
					icon='clipboard check'
					activity={SolicitudActivity.INFORMACION_GENERAL}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Características biofísicas"
					icon="leaf"
					activity={SolicitudActivity.BIOFISICAS}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Características de la finca"
					icon="edit"
					activity={SolicitudActivity.FINCA}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Carga de boleta de censo"
					icon="upload"
					activity={SolicitudActivity.BOLETA}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Inventario"
					icon="warehouse"
					activity={SolicitudActivity.INVENTARIO}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Planificación manejo"
					icon="tasks"
					activity={SolicitudActivity.PLANIFICACION}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
			</Step.Group>
		)
	}

	const steps2 = () => {
		return (
			<Step.Group attached="top" widths={7} size='mini' className={styles.header} >
				<SolicitudStep
					title="Aprovechamiento"
					icon='tasks'
					activity={SolicitudActivity.APROVECHAMIENTO}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Resumen"
					icon='tasks'
					activity={SolicitudActivity.RESUMEN}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Medidas de protección"
					icon='clipboard check'
					activity={SolicitudActivity.PROTECCION}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Medidas de mitigación"
					icon='leaf'
					activity={SolicitudActivity.MITIGACION}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Cronograma de actividades"
					icon='edit'
					activity={SolicitudActivity.CRONOGRAMA}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
				<SolicitudStep
					title="Anexos"
					icon='warehouse'
					activity={SolicitudActivity.ANEXOS}
					currentActivity={step}
					setActivity={setStep}
					lastActivity={lastStep}
				/>
			</Step.Group>
		)
	}


	return (
		<>
			{steps1()}
			{steps2()}
		</>
	)
}
