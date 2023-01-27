import CodigoPerfil from 'dto/perfil/CodigoPerfil';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Accordion, Icon, Menu } from 'semantic-ui-react';


type Props = {
    selectedItem: string
    handleClick: any
    userProfile: CodigoPerfil | undefined
}

export default function UsersMenus(props: Props) {

    const [active, setActive] = React.useState(true);
    const history = useHistory();

    //usuarios internos
    const secretaria = CodigoPerfil.Secretaria;
    const tecnico = CodigoPerfil.Tecnico;
    const juridico = CodigoPerfil.Juridico;
    const regional = CodigoPerfil.Regional;
    const subregional = CodigoPerfil.SubRegional;

    //usuarios externos
    const solicitante = CodigoPerfil.Solicitante;
    const elaborador = CodigoPerfil.Elaborador;


    //manejo del menú
    const [activeGenerales, setActiveGenerales] = React.useState(true);
    const [activeAprovechamientoForestal, setActiveAprovechamientoForestal] = React.useState(true);
    const [activeGestiones, setActiveGestiones] = React.useState(true);
    const [activeTareas, setActiveTareas] = React.useState(true);
    const [activeNotas, setActiveNotas] = React.useState(true);
    const [activeSolicitudes, setActiveSolicitudes] = React.useState(true);
    const [activeResoluciones, setActiveResoluciones] = React.useState(true);
    const [activeEnmiendas, setActiveEnmiendas] = React.useState(true);
    const [activePOA, setActivePOA] = React.useState(true);

    //const handleItemClick = ( { userType }: any)  //para manejo con props es asi

    const renderGenerales = (userType: string | undefined) => {

        var retorno: any = [];

        switch (userType) {

            case solicitante:
            case elaborador:

                // retorno.push(
                //     <div key="generalesMenuArea">
                //         <div>
                //             {/*<Header as="h4" inverted header content='Generales' className={styles.separador} /> */}

                //             <Accordion.Title onClick={() => setActiveGenerales(!activeGenerales)}>
                //                 Catálogo
                //             </Accordion.Title>



                //             <Accordion.Content active={activeGenerales}>
                //                 <Menu.Item
                //                     name='misfincas'
                //                     active={props.selectedItem === 'misfincas'}
                //                     onClick={props.handleClick}
                //                 >
                //                     <Icon name='location arrow' />
                //             Mis Fincas
                //             </Menu.Item>
                //             </Accordion.Content>
                //         </div>
                //     </div>
                // )

                break;

        }

        return (
            retorno
        )

    }

    const renderLicencias = (userType: string | undefined) => {

        var retorno: any = [];

        switch (userType) {

            case elaborador:
            case solicitante:
                retorno.push(
                    <div key="licenciasMenuArea">
                        <div>
                            {/*<Header as="h4" inverted header content='Licencias' className={styles.separador} /> */}
                            <Accordion.Title onClick={() => setActiveAprovechamientoForestal(!activeAprovechamientoForestal)}>
                                Aprovechamiento Forestal
                            </Accordion.Title>
                            <Accordion.Content active={activeAprovechamientoForestal}>
                                <Menu.Item
                                    name='licNuevo'
                                    active={props.selectedItem === 'licNuevo'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='add' />
                            Nuevo
                            </Menu.Item>
                            </Accordion.Content>
                        </div>
                    </div>
                )

        }

        return (retorno)

    }

    const renderGestiones = (userType: string | undefined) => {

        var retorno: any = [];

        // retorno.push(<Header key="gestHeader" as="h4" inverted content="Gestiones" textAlign='left' />);        

        switch (userType) {

            case elaborador:
            case solicitante:

                retorno.push(
                    <div key="gestionesMenuArea">
                        <div>

                            <Accordion.Title onClick={() => setActiveGestiones(!activeGestiones)}>
                                Gestiones
                            </Accordion.Title>
                            <Accordion.Content active={activeGestiones}>
                                {/*<Menu.Item
                                    name='misgestiones'
                                    active={props.selectedItem === 'misgestiones'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='sort amount down' />
                            Mis Gestiones
                            </Menu.Item>*/}

                                {userType !== solicitante ? <Menu.Item
                                    name='bandejasolicitudes'
                                    active={props.selectedItem === 'bandejasolicitudes'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='inbox' />
                            Bandeja de Solicitudes
                            </Menu.Item>
                                    : <div></div>
                                }

                                {userType !== solicitante ? <Menu.Item
                                    name='solicitudesok'
                                    active={props.selectedItem === 'solicitudesok'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='check square' />
                            Solicitudes Aceptadas
                            </Menu.Item> : <div></div>}

                                {userType !== solicitante ? <Menu.Item
                                    name='solicitudesfinish'
                                    active={props.selectedItem === 'solicitudesfinish'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='flag checkered' />
                            Solicitudes Finalizadas
                            </Menu.Item> : <div></div>}

                            </Accordion.Content>
                        </div>
                    </div>
                )
                break;

            case juridico:
            case regional:
            case secretaria:
            case subregional:
            case tecnico:
                retorno.push(
                    <div key="tareasMenuArea">

                        <Accordion.Title onClick={() => setActiveTareas(!activeTareas)} >
                            Tareas
                            </Accordion.Title>

                        <Accordion.Content active={activeTareas}>

                            <Menu.Item
                                name='asignadas'
                                active={props.selectedItem === 'asignadas'}
                                onClick={props.handleClick}
                            >
                                <Icon name='pencil alternate' />
                            Asignadas
                            </Menu.Item>

                            <Menu.Item
                                name='finalizadas'
                                active={props.selectedItem === 'finalizadas'}
                                onClick={props.handleClick}
                            >
                                <Icon name='check' />
                            Finalizadas
                            </Menu.Item>

                        </Accordion.Content>
                    </div>
                )

                if (userType === regional || userType === secretaria || userType === subregional) {/*

                    retorno.push(
                        <div key="notasMenuArea">
                            <Accordion.Title onClick={() => setActiveNotas(!activeNotas)}>
                                Notas de Envío
                                </Accordion.Title>

                            <Accordion.Content active={activeNotas}>

                                <Menu.Item
                                    name='inventarione'
                                    active={props.selectedItem === 'inventarione'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='th list' />
                                Inventario de NE
                                </Menu.Item>


                                {(userType === regional || userType === subregional) ? <Menu.Item
                                    name='solicitudesne'
                                    active={props.selectedItem === 'solicitudesne'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='marker' />
                                Solicitudes de NE
                                </Menu.Item>
                                    : <div></div>
                                }

                                {userType === regional ? <Menu.Item
                                    name='autorizarne'
                                    active={props.selectedItem === 'autorizarne'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='check' />
                                Autorizar NE
                                </Menu.Item>
                                    : <div></div>
                                }

                                {userType === secretaria ? <Menu.Item
                                    name='movimiento'
                                    active={props.selectedItem === 'movimiento'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='cog' />
                                Movimiento
                                </Menu.Item>
                                    : <div></div>
                                }

                                {userType === secretaria ? <Menu.Item
                                    name='reserva'
                                    active={props.selectedItem === 'reserva'}
                                    onClick={props.handleClick}
                                >
                                    <Icon name='box' />
                                Reserva
                                </Menu.Item>
                                    : <div></div>
                                }

                            </Accordion.Content>
                        </div>
                    )*/

                }

                if (userType === secretaria) {

                    retorno.push(
                        <div key="bigMenuArea">
                            <div>
                                <Accordion.Title onClick={() => setActiveSolicitudes(!activeSolicitudes)}>
                                    Solicitudes
                                </Accordion.Title>

                                <Accordion.Content active={activeSolicitudes}>
                                    {/*<Menu.Item
                                            name='cargaInicialExento'
                                            active={props.selectedItem === 'cargaInicialExento'}
                                            onClick={props.handleClick}
                                        >
                                            <Icon name='list' />
                                    Carga inicial de Exento
                                    </Menu.Item>*/}
                                    <Menu.Item
                                        name='ingresarLicencia'
                                        active={props.selectedItem === 'ingresarLicencia'}
                                        onClick={props.handleClick}
                                    >
                                        <Icon name='list' />
                                    Ingresar licencia
                                    </Menu.Item>
                                    <Menu.Item
                                        name='licenciasRecibidas'
                                        active={props.selectedItem === 'licenciasRecibidas'}
                                        onClick={props.handleClick}
                                    >
                                        <Icon name='list' />
                                    Licencias Recibidas
                                    </Menu.Item>
                                    <Menu.Item
                                        name='suspenderTramite'
                                        active={props.selectedItem === 'suspenderTramite'}
                                        onClick={props.handleClick}
                                    >
                                        <Icon name='list' />
                                    Suspender trámite
                                    </Menu.Item>
                                    
                                    {/*<Menu.Item
                                        name='entrantes'
                                        active={props.selectedItem === 'entrantes'}
                                        onClick={props.handleClick}
                                    >
                                        <Icon name='list' />
                                    Lista de solicitudes entrantes
                                    </Menu.Item>

                                    <Menu.Item
                                        name='aceptadas'
                                        active={props.selectedItem === 'aceptadas'}
                                        onClick={props.handleClick}
                                    >
                                        <Icon name='list ol' />
                                    Lista de solicitudes aceptadas
                                    </Menu.Item>*/}
                                </Accordion.Content>                                
                            </div>
                            <div>
                                <Accordion.Title onClick={() => setActiveSolicitudes(!activeSolicitudes)}>
                                    Enmiendas
                                </Accordion.Title>
                                <Accordion.Content active={activeSolicitudes}>
                                    <Menu.Item
                                        name='recibirenmiendas'
                                        active={props.selectedItem === 'recibirenmiendas'}
                                        onClick={props.handleClick}
                                    >
                                            <Icon name='inbox' />
                                    Enmiendas
                                    </Menu.Item>
                                </Accordion.Content>
                            </div>
                            <div>
                                <Accordion.Title onClick={() => setActiveSolicitudes(!activeSolicitudes)}>
                                    Resoluciones
                                </Accordion.Title>
                                <Accordion.Content active={activeSolicitudes}>
                                    <Menu.Item
                                        name='resoluciones'
                                        active={props.selectedItem === 'resoluciones'}
                                        onClick={props.handleClick}
                                    >
                                            <Icon name='info' />
                                    Resoluciones
                                    </Menu.Item>
                                </Accordion.Content>
                            </div>

                            {
                                //resoluciones
                            }
                            {/*<div>
                                <Accordion.Title content="Resoluciones" onClick={() => setActiveResoluciones(!activeResoluciones)}>
                                    Resoluciones
                                </Accordion.Title>

                                <Accordion.Content active={activeResoluciones}>

                                    <Menu.Item
                                        name='lista'
                                        active={props.selectedItem === 'lista'}
                                        onClick={props.handleClick}
                                    >
                                        <Icon name='tasks' />
                                Lista
                                </Menu.Item>
                                </Accordion.Content>
                            </div>*/}

                            {
                                //enmiendas
                            }
                            {/*<div>
                                <Accordion.Title onClick={() => setActiveEnmiendas(!activeEnmiendas)}>
                                    Enmiendas
                                </Accordion.Title>

                                <Accordion.Content active={activeEnmiendas}>

                                    <Menu.Item
                                        name='recibirenmiendas'
                                        active={props.selectedItem === 'recibirenmiendas'}
                                        onClick={props.handleClick}
                                    >
                                        <Icon name='inbox' />
                                Recibir Enmiendas
                                </Menu.Item>
                                </Accordion.Content>
                            </div>*/}


                            {
                                //POA
                            }
                            {/*<div>
                                <Accordion.Title onClick={() => setActivePOA(!activePOA)}>
                                    POA
                            </Accordion.Title>
                                <Accordion.Content active={activePOA}>

                                    <Menu.Item
                                        name='ingresopoa'
                                        active={props.selectedItem === 'ingresopoa'}
                                        onClick={props.handleClick}
                                    >
                                        <Icon name='pen square' />
                                Ingreso POA
                                </Menu.Item>
                                </Accordion.Content>
                            </div>*/}
                        </div>



                    )
                }

                break;




            default:
                return (
                    <div></div>
                )
        }


        return retorno;

    }

    return (
        <div>
            {renderGenerales(props.userProfile)}
            {renderGestiones(props.userProfile)}
            {renderLicencias(props.userProfile)}
        </div>
    )



}
