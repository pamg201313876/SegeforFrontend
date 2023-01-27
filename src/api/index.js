import AgregarApi from "./AgregarApi";
import CriterioProteccionApi from "./CriterioProteccion";
import EnmiendasApi from "./EnmiendasApi";
import ExentoApi from "./ExentoApi";
import AuthApi from "./AuthApi";
import GestionApi from "./GestionApi";
import GestionHasta90Api from "./latifoliado/hasta90/GestionHasta90Api";
import FileApi from "./FileApi";
import FincaApi from "./FincaApi";
import MontogarantiaApi from "./MontogarantiaApi";
import PersonaApi from "./PersonaApi";
import PreciosApi from "./PreciosApi";
import ResolucionApi from "./ResolucionApi";
import SolicitudApi from "./SolicitudApi";
import SolicitudesApi from "./SolicitudesApi";
import SuspensionApi from "./SuspensionApi";
import TareaApi from "./TareaApi";
import UsoFincaApi from "./UsoFincaApi";
import UsuarioApi from "./UsuarioApi";
import UsuarioPerfilSistemaApi from "./UsuarioPerfilSistemaApi";
import UsuarioSubregionApi from "./UsuarioSubregionApi";
import BridgeApi from "./BridgeApi";

export const agregarApi = new AgregarApi()
export const authApi = new AuthApi()
export const bridgeApi = new BridgeApi()
export const criterioProteccionApi = new CriterioProteccionApi()
export const enmiendasApi = new EnmiendasApi()
export const exentoApi = new ExentoApi()
export const fileApi = new FileApi()
export const fincaApi = new FincaApi()
export const gestionApi = new GestionApi()
export const montoGarantiaApi = new MontogarantiaApi()
export const personaApi = new PersonaApi()
export const preciosApi = new PreciosApi()
export const resolucionApi = new ResolucionApi()
export const solicitudApi = new SolicitudApi()
export const solicitudesApi = new SolicitudesApi()
export const suspensionApi = new SuspensionApi()
export const tareaApi = new TareaApi()
export const usofincaApi = new UsoFincaApi()
export const usuarioApi = new UsuarioApi()
export const usuarioPerfilSistemaApi = new UsuarioPerfilSistemaApi()
export const usuarioSubregionApi = new UsuarioSubregionApi()
