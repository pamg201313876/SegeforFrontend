import DictamenTecnicoApi from "./DictamenTecnicoApi";
import EspeciesProtegerApi from "./EspeciesProtegerApi";
import JuridicoApi from "./JuridicoApi";
import SubregionalApi from "./SubregionalApi";
import TurnosApi from "./TurnosApi";
import MonitreoApi from "./MonitoreoApi";
import RegionalApi from "./RegionalApi";


export const dictamenTecnicoApi = new DictamenTecnicoApi()
export const especiesProtegerApi = new EspeciesProtegerApi()
export const subregionalApi = new SubregionalApi()
export const turnosApi = new TurnosApi()
export const juridicoApi = new JuridicoApi()
export const monitoreoApi = new MonitreoApi()
export const regionalApi = new RegionalApi();
