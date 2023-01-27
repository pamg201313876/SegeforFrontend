import React from 'react'
import Biofisicas from '../Generales/Biofisicas/Biofisicas'
import Cronograma from '../Generales/Cronograma/Cronograma'
import Finca from '../Generales/Finca/Finca'
import DatosGenerales from '../Generales/InformacionGeneral/DatosGenerales'
import MedidasMitigacion from '../Generales/MedidasMitigacion/MedidasMitigacion'
import { SolicitudActivity } from '../SolicitudSteps'
import NuevoAnexos from './Anexos/NuevoAnexos'
import Aprovechamiento from './Aprovechamiento/Aprovechamiento'
import BoletaCenso from './BoletaCenso/BoletaCenso'
import FinalizarHasta90 from './FinalizarHasta90'
import Inventario from './Inventario/Inventario'
import MedidasProteccion from './MedidasProteccion/MedidasProteccion'
import Planificacion from './Planificacion/Planificacion'
import Resumen from './Resumen/Resumen'


type Props = {
	step: SolicitudActivity
	gestion: any
	setNextButtonDisabled: (disabled: boolean) => void
	setPrevButtonDisabled: (disabled: boolean) => void
	nextButtonRef: React.MutableRefObject<() => boolean>
	reloadGestion: () => void
}

export default function Hasta90({
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
				? <DatosGenerales gestion={gestion} setNextButtonDisabled={setNextButtonDisabled} nextButtonRef={nextButtonRef} reloadGestion={reloadGestion} />
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
				? <BoletaCenso gestion={gestion} nextButtonRef={nextButtonRef} />
				: null
			}
			{step === SolicitudActivity.INVENTARIO
				? <Inventario gestion={gestion} nextButtonRef={nextButtonRef} />
				: null
			}
			{step === SolicitudActivity.PLANIFICACION
				? <Planificacion
					gestion={gestion}
					nextButtonRef={nextButtonRef} />
				: null
			}
			{step === SolicitudActivity.APROVECHAMIENTO
				? <Aprovechamiento
					gestion={gestion} />
				: null
			}
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
				? <NuevoAnexos gestion={gestion}/> //<Anexos gestion={gestion} />
				: null
			}
			{step === SolicitudActivity.FINALIZAR
				? <FinalizarHasta90 gestion={gestion} />
				: null
			}
		</>
	)
}
