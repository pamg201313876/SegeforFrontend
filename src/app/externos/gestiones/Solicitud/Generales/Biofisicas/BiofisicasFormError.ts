import CreateUpdateCaracteristicasBiofisicasDTO from 'dto/solicitud/Hasta90/CreateUpdateCaracteristicasBiofisicasDTO';

type CaracteristicasBiofisicasError = {
    isError : boolean
    isSaved: boolean
    clima: string | null
    elevacion: string | null
    hidrografia: string | null
    tipoBosque: string | null
    topografia: string | null
    zonaVida: string | null
}

export const newBiofisicasError = () : CaracteristicasBiofisicasError => {
    return {
        isError: false,
        isSaved: false,
        elevacion: null,
        topografia: null,
        clima: null,
        hidrografia: null,
        zonaVida: null,
        tipoBosque: null
    }
}

const noValueError = 'Este campo no puede ir vacio.';

export const validateForm = (createDto: CreateUpdateCaracteristicasBiofisicasDTO) : CaracteristicasBiofisicasError => {
    let formError = newBiofisicasError();
    validateAltitud(createDto, formError);
    validateTopografia(createDto, formError);
    validateClimas(createDto, formError);
    validateHidrografia(createDto, formError);
    validateZonaVida(createDto, formError);
    return formError;
}

const validateAltitud = (createDto: CreateUpdateCaracteristicasBiofisicasDTO, formError: CaracteristicasBiofisicasError) => {
    if (!createDto || !createDto.elevacion || createDto.elevacion.trim() === '') {
        formError.elevacion = noValueError;
        formError.isError = true;
    }
}

const validateTopografia = (createDto: CreateUpdateCaracteristicasBiofisicasDTO, formError: CaracteristicasBiofisicasError) => {
    if (!createDto || !createDto.topografia || createDto.topografia.trim() === '') {
        formError.topografia = noValueError;
        formError.isError = true;
    }
}


const validateClimas = (createDto: CreateUpdateCaracteristicasBiofisicasDTO, formError: CaracteristicasBiofisicasError) => {
    if (!createDto || !createDto.clima || createDto.clima.trim() === '') {
        formError.clima = noValueError;
        formError.isError = true;
    }
}

const validateHidrografia = (createDto: CreateUpdateCaracteristicasBiofisicasDTO, formError: CaracteristicasBiofisicasError) => {
    if (!createDto || !createDto.hidrografia || createDto.hidrografia.trim() === '') {
        formError.hidrografia = noValueError;
        formError.isError = true;
    }
}


const validateZonaVida = (createDto: CreateUpdateCaracteristicasBiofisicasDTO, formError: CaracteristicasBiofisicasError) => {
    if (!createDto || !createDto.zonaVida || createDto.zonaVida.trim() === '') {
        formError.zonaVida = noValueError;
        formError.isError = true;
    }
}

export default CaracteristicasBiofisicasError;