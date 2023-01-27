import Loading from 'components/Loading'
import React, { useContext, useState } from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic'
import { AppDataContext } from '../App'
import Content from './Content'
import styles from './Dashboard.module.css'
import Menu from './DashboardMenu'

export default function Dashboard() {

	const [header, setHeader] = useState("Dashboard");
	const [headerIcon, setHeaderIcon] = useState<SemanticICONS>("dashboard");

	const appDataContext = useContext(AppDataContext);

	const onMenuItemClick = (name: string, icon: SemanticICONS) => {
		setHeader(name);
		setHeaderIcon(icon);
		if (appDataContext.isHeaderHidden) {
			appDataContext.setIsHeaderHidden(false)
		}
	}

	return (
		<div className={styles.body}>
			<Menu onItemClick={onMenuItemClick} userProfile={appDataContext.tokenData?.perfil.codigo} userName={appDataContext.tokenData?.nombre} />
			<div className={styles.main}>
				{!appDataContext.isHeaderHidden 
				?	<Segment attached="top" inverted color="green" >
						<Header>
							<Icon name={headerIcon} />
							<Header.Content>{header}</Header.Content>
						</Header>
					</Segment>
					: null}
				<Segment /* inverted color="blue" */ attached="bottom" className={styles.content} >
					<Loading style={{ minHeight: "100%" }} active={appDataContext.loading} text={appDataContext.loadingMessage} />
					<Content />
				</Segment>

			</div>

		</div>
	)
}
