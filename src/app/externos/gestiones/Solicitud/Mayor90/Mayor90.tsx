import React from 'react'
import Biofisicas from '../Generales/Biofisicas/Biofisicas'
import Cronograma from '../Generales/Cronograma/Cronograma'
import Finca from '../Generales/Finca/Finca'
import DatosGenerales from '../Generales/InformacionGeneral/DatosGenerales'
import MedidasMitigacion from '../Generales/MedidasMitigacion/MedidasMitigacion'
import Resumen from '../Hasta90/Resumen/Resumen'
import { SolicitudActivity } from '../SolicitudSteps'
import AnexosMayor90 from './AnexosMayor90/AnexosMayor90'
import Aprovechamiento from './Aprovechamiento/Aprovechamiento'
import BoletaCenso from './BoletaCenso/BoletaCenso'
import Inventario from './Inventario/Inventario'
import MedidasProteccion from './MedidasProteccion/MedidasProteccion'

type Props = {
	step: SolicitudActivity
	gestion: any
	setNextButtonDisabled: (disabled: boolean) => void
	setPrevButtonDisabled: (disabled: boolean) => void
	nextButtonRef: React.MutableRefObject<() => boolean>
	reloadGestion: () => void
}

export default function Mayor90({
	step,
	gestion,
	setNextButtonDisabled,
	setPrevButtonDisabled,
	nextButtonRef,
	reloadGestion
}: Props) {


	return (
		<>
			{step === SolicitudActivity.INFORMACION_GENERAL
				? <DatosGenerales gestion={gestion} setNextButtonDisabled={setNextButtonDisabled}  nextButtonRef={nextButtonRef} reloadGestion={reloadGestion}/>
				: null
			}
			{step === SolicitudActivity.BIOFISICAS
				? <Biofisicas gestion={gestion} nextButtonRef={nextButtonRef} />
				: null
			}
			{step === SolicitudActivity.FINCA
				? <Finca gestion={gestion} nextButtonRef={nextButtonRef} />
				: null
			}
			{step === SolicitudActivity.BOLETA
				? <BoletaCenso gestion={gestion} setNextButtonDisabled={setNextButtonDisabled} />
				: null
			}
			{step === SolicitudActivity.INVENTARIO
				? <Inventario />
				: null
			}
			{step === SolicitudActivity.APROVECHAMIENTO
				? <Aprovechamiento />
				: null
			}
			{/* {step === SolicitudActivity.PLANIFICACION
				? <Planificacion
					gestion={gestion} />
				: null
			}
			 */}
			{step === SolicitudActivity.RESUMEN
				? <Resumen
					gestion={gestion} />
				: null
			} 
			{step === SolicitudActivity.PROTECCION
				? <MedidasProteccion gestion={gestion} setNextButtonDisabled={setNextButtonDisabled} />
				: null
			}
			{step === SolicitudActivity.MITIGACION
				? <MedidasMitigacion gestion={gestion} setNextButtonDisabled={setNextButtonDisabled} />
				: null
			}
			{step === SolicitudActivity.CRONOGRAMA
				? <Cronograma gestion={gestion} setNextButtonDisabled={setNextButtonDisabled} />
				: null
			}
			{step === SolicitudActivity.ANEXOS
				? <AnexosMayor90 gestion={gestion} />
				: null
			}
			{/* {step === Steps.FINALIZAR
				? <FinalizarHasta90 gestion={gestion} />
				: null
			}  */}
		</>
	)
}
