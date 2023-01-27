import React from 'react'
import TokenResponseDTO from 'dto/auth/TokenResponseDTO'
import CodigoPerfil from 'dto/perfil/CodigoPerfil'
import Downloads, { DownloadRow } from 'components/Downloads'
import ArchivosSecretaria from './ArchivosSecretaria';
import ArchivosSubregional from './ArchivosSubregional';
import ArchivosTecnico from './ArchivosTecnico'
import ArchivosJuridico from './ArchivosJuridico'
import ArchivosRegional from './ArchivosRegional'
import ArchivosMonitoreo from './ArchivosMonitoreo';

type Props = {
	open: boolean,
	closeModal: () => void
	task: any
}

export default function Archivos({
	open,
	closeModal,
	task
}: Props) {

	const getRowsByTaskOrProfile = (): DownloadRow[] => {

		let tokenData = localStorage.getItem("tokenData");

		if (tokenData) {

			let tokenObj: TokenResponseDTO = JSON.parse(tokenData)

			switch (tokenObj.perfil.codigo) {

				case CodigoPerfil.Secretaria:
					return ArchivosSecretaria(task.ttGestion.gestionId)

				case CodigoPerfil.SubRegional:
					if (task) {
						return ArchivosSubregional(task)
					}
					break;

				case CodigoPerfil.Tecnico:
					return ArchivosTecnico(task)

				case CodigoPerfil.Juridico:
					return ArchivosJuridico(task)

				case CodigoPerfil.Regional:
					return ArchivosRegional(task.tareaId)

				case CodigoPerfil.Monitoreo:
					return ArchivosMonitoreo(task)
			}

		}

		return []
	}

	if (open) {
		return (
			<Downloads
				open={open}
				closeModal={closeModal}
				downloads={getRowsByTaskOrProfile()}
			/>
		)
	}
	return null;
}
