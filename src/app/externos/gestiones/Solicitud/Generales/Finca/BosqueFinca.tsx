import CriterioProteccionApi from 'api/CriterioProteccion'
import GestionApi from 'api/GestionApi'
import { AppDataContext } from 'app/App'
import { AxiosError } from 'axios'
import CustomBosqueTable from 'components/CustomFincaTable/CustomBosqueTable'
import CustomFincaDTO from 'components/CustomFincaTable/CustomFincaDTO'
import ItemFilter from 'components/CustomFincaTable/ItemFilter'
import EstadoBosqueSelect from 'components/FormCatalogSelect/catalogs/EstadoBosqueSelect'
import SubTipoBosqueSelect from 'components/FormCatalogSelect/catalogs/SubTipoBosqueSelect'
import TipoBosqueSelect from 'components/FormCatalogSelect/catalogs/TipoBosqueSelect'
import UploadFormButton from 'components/UploadButton'
import CreateBosqueFincaDTO from 'dto/solicitud/CreateBosqueFincaDTO'
import React, { useContext, useEffect, useState } from 'react'
import { Confirm, Form, Grid, Header, Icon } from 'semantic-ui-react'
import { isBlankString } from 'utils/UtilFunctions'
import FielApi from '../../../../../../api/FileApi'

type Props = {
    gestion: any,
    areaBosque: number,
    areaIntervenir: number,
    formData: CreateBosqueFincaDTO,
    setFormData: Function,
    dataTableCriterioProteccion: CustomFincaDTO[]
    tipoBosque: any,
    subtipoBosque: any,
    estadoBosque: any,
    descripcionVegetacion: string,
    anexoBosqueFinca: number,
    removeCriterios: boolean,
    setIsSaved: (value: boolean) => void
}

export default function BosqueFinca(props: Props) {
    const encabezadosCriterioProteccion = [
        { header: "Criterio de protección", name: 'uso' },
        { header: "Área (ha)", name: 'area' },
        { header: "Porcentaje (%)", name: 'porcentaje' },
    ];

    const dataContext = useContext(AppDataContext)
    const saveDataSuccessToast = () => dataContext.successToast("Datos almacenados correctamente")
    const saveDataErrorToast = () => dataContext.errorToast("Error al actualizar la información. Vuelva a intentarlo más tarde.")

    const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
    const [countDataItems, setCountDataItems] = React.useState<number>(0);
    const [deleteAllCriterios, setDeleteAllCriterios] = React.useState<boolean>(false)
    const [dataTableCriterioProteccion, setDataTableCriterioProteccion] = React.useState<CustomFincaDTO[]>(props.dataTableCriterioProteccion);
    const [areaBosque, setAreaBosque] = React.useState<number>(props.areaIntervenir);
    const [tmpAreaProteccion, setTmpAreaProteccion] = React.useState<number>(0);
    const [areaProduccion, setAreaProduccion] = React.useState<number>(props.formData.areaProduccion);
    const [isChangedAreaProteccion, setIsChangedAreaProteccion] = React.useState<boolean>(false);
    const [anexoBosqueFinca, setAnexoBosqueFinca] = React.useState<number>(props.anexoBosqueFinca);
    const [errorProteccion, setErrorProteccion] = React.useState<string | null>(null);
    const [errorProduccion, setErrorProduccion] = React.useState<string | null>(null);
    const [errorTipoBosque, setErrorTipoBosque] = React.useState<string | null>(null);
    const [errorSubtipoBosque, setErrorSubtipoBosque] = React.useState<string | null>(null);
    const [errorEstadoBosque, setErrorEstadoBosque] = React.useState<string | null>(null);
    const [errorVegatacion, setErrorVegetacion] = React.useState<string | null>(null);
    const [filterCriterioProteccion, setFilterCriterioProteccion] = React.useState<ItemFilter[]>([]);
    const [tipoBosque, setTipoBosque] = React.useState<any | null>(props.tipoBosque);
    const [subtipoBosque, setSubtipoBosque] = useState<any | null>(props.subtipoBosque)
    const [estadoBosque, setEstadoBosque] = useState<any | null>(props.estadoBosque)
    const [descripcionVegetacion, setDescripcionVegetacion] = useState<string>(props.descripcionVegetacion)
    const gestionApi = new GestionApi();
    const criterioProteccionApi = new CriterioProteccionApi();
    const fileApi = new FielApi();

    const addAnexo = (e: any) => {
        let anexo = {
            extension: e.extension,
            nombre: e.nombre,
            ruta: e.rutaArchivo,
            size: e.size,
            tcTipoAnexo: {
                tipoAnexoId: "3"
            },
            tipoAnexoId: "3",
            ttGestion: {
                estadoId: props.gestion.estadoId,
                gestionId: props.gestion.gestionId,
                personaAnulaId: props.gestion.personaAnulaId,
                tcElaborador: props.gestion.tcElaborador,
                tcPersonaCrea: props.gestion.tcPersonaCrea,
                tcTipoBosque: props.gestion.tcTipoBosque,
                tcTipoGestion: props.gestion.tcTipoGestion,
                ttTipoPropietarioGestion: props.gestion.ttTipoPropietarioGestion
            }
        };

        const handleResponse = (res: any) => {
            //alert(res.data.message)
            console.log('anexo')
            console.log(res.data)
            setAnexoBosqueFinca(res.data ? res.data.data[0].anexoGestionId : 0)
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
        }

        gestionApi.agregarAnexo(anexo, handleResponse, handleError)
    }

    const cargarDataGestion = () => {
        const handleResponse = (res: any) => {
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
        }

        gestionApi.getGestionById(props.gestion.gestionId, handleResponse, handleError)
    }

    const cargarListadoCriterioProteccion = () => {
        let nuevoArray: any[] = [];
        const handleResponse = (res: any) => {
            if (res) {
                res.map((criterioProteccion: { criterioProteccionDesc: any, criterioProteccionId: any }) => {
                    let item = {
                        key: criterioProteccion.criterioProteccionId,
                        text: criterioProteccion.criterioProteccionDesc,
                        value: criterioProteccion.criterioProteccionId
                    }
                    nuevoArray.push(item)
                });
            }
            setFilterCriterioProteccion(nuevoArray)
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
        }

        criterioProteccionApi.obtenerListaCriterioProteccion(handleResponse, handleError)
    }

    const cloeseConfirm = () => {
        console.log('closeConfirm...')
        props.formData.areaProteccion = tmpAreaProteccion
        setIsChangedAreaProteccion(false)
        setOpenConfirm(false)
    }

    const confirmAction = () => {
        console.log('confirmAction...')
        onSaveValidateAreas()
    }

    const handleChange = (e: any, { name, value }: any) => {
        let file = value;

        if (file !== null) {
            const onResponse = (response: any) => {
                if (response.status === "OK") {
                    addAnexo(response.data[0])
                }
                else {
                    console.error("Error al cargar mapa")
                    dataContext.errorToast(response.message)
                }
            }

            const onError = (axiosError: AxiosError) => {
                console.log(axiosError)
                saveDataErrorToast()
            }

            fileApi.cargarArchivo(file, onResponse, onError)
        }
    }

    const handleChangeInput = (e: any, { name, value }: any) => {
        value = (e.target.type === 'number') ? parseInt(value) : value

        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }

        props.setFormData((oldValues: any) => ({
            ...oldValues,
            [name]: value,
        }));
        setIsChangedAreaProteccion(true)
    }

    const handleChangeSelect = (_e: any, { name, value }: any) => {

        switch (name) {

            case "tipoBosque":
                setTipoBosque(value)
                break

            case "subtipoBosque":
                setSubtipoBosque(value)
                break

            case "estadoBosque":
                setEstadoBosque(value)
                break

        }
    }

    const onDeleteCriterioFinca = (e: CustomFincaDTO, countDataItem: number, isResponseVisible: boolean = true) => {
        let criterioProteccion = {
            area: e.area,
            criterioProteccionGestionId: e.usoFincaGestionId,
            estadoId: 1,//props.gestion.estadoId,
            fechaRegistro: props.gestion.fechaRegistro,
            porcentaje: e.porcentaje,
            tcCriterioProteccion: {
                criterioProteccionDesc: e.uso,
                criterioProteccionId: e.value,
                estadoId: 1,
                fechaRegistro: props.gestion.fechaRegistro
            },
            ttGestion: {
                estadoId: props.gestion.estadoId,
                gestionId: props.gestion.gestionId,
                personaAnulaId: props.gestion.personaAnulaId,
                tcElaborador: props.gestion.tcElaborador,
                tcPersonaCrea: props.gestion.tcPersonaCrea,
                tcTipoBosque: props.gestion.tcTipoBosque,
                tcTipoGestion: props.gestion.tcTipoGestion,
                ttTipoPropietarioGestion: props.gestion.ttTipoPropietarioGestion
            },
            usoFincaGestionId: e.usoFincaGestionId
        };

        const handleResponse = (res: any) => {
            console.log('deleteAllCriterios')
            console.log(deleteAllCriterios)
            if (isResponseVisible) {
                saveDataSuccessToast()
            }
            setCountDataItems(countDataItem)
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
            saveDataErrorToast()
        }

        gestionApi.quitarCriterioProteccion(criterioProteccion, handleResponse, handleError)
    }

    const onFocusInput = () => {
        console.log('onFocusInput')
        console.log(props.formData.areaProteccion)
        let tmpAreaProteccion = props.formData.areaProteccion;
        setTmpAreaProteccion(tmpAreaProteccion)
    }

    const onSaveAreas = () => {
        if (dataTableCriterioProteccion.length == 0 && isChangedAreaProteccion) {
            onSaveValidateAreas();
        }
        else if (dataTableCriterioProteccion.length > 0 && isChangedAreaProteccion) {
            setOpenConfirm(true)
        }
    }

    const onSaveValidateAreas = () => {
        let tmpAreaProduccion = props.areaBosque - props.formData.areaProteccion
        setAreaProduccion(tmpAreaProduccion)

        let isValidateAreas = validateAreas(props.formData.areaProteccion, tmpAreaProduccion)

        if (isValidateAreas) {
            let areas = {
                areaForestal: props.areaBosque,
                areaProduccion: tmpAreaProduccion,
                areaProteccion: props.formData.areaProteccion,
                estadoId: props.gestion.estadoId,
                gestionId: props.gestion.gestionId,
                personaAnulaId: props.gestion.personaAnulaId,
                tcElaborador: props.gestion.tcElaborador,
                tcPersonaCrea: props.gestion.tcPersonaCrea,
                tcTipoBosque: props.gestion.tcTipoBosque,
                tcTipoGestion: props.gestion.tcTipoGestion,
                ttTipoPropietarioGestion: props.gestion.ttTipoPropietarioGestion
            };
            console.log('areas')
            console.log(areas)

            const handleResponse = (res: any) => {
                if (res.data.status === "OK") {
                    // dataContext.successToast("Datos almacenados correctam")
                    deleteCriteriosProteccion()
                    setIsChangedAreaProteccion(false)
                    saveDataSuccessToast()
                }
                else{
                    dataContext.errorToast(res.data.message)
                }
            }

            const handleError = (error: AxiosError) => {
                console.error(error)
                setIsChangedAreaProteccion(false)
                saveDataErrorToast()
            }

            gestionApi.actualizarAreas(areas, handleResponse, handleError)
        }

    }

    const resetAreasYCriterios = () => {
        let areas = {
            areaForestal: props.areaBosque,
            areaProduccion: 0,
            areaProteccion: 0,
            estadoId: props.gestion.estadoId,
            gestionId: props.gestion.gestionId,
            personaAnulaId: props.gestion.personaAnulaId,
            tcElaborador: props.gestion.tcElaborador,
            tcPersonaCrea: props.gestion.tcPersonaCrea,
            tcTipoBosque: props.gestion.tcTipoBosque,
            tcTipoGestion: props.gestion.tcTipoGestion,
            ttTipoPropietarioGestion: props.gestion.ttTipoPropietarioGestion
        };
        console.log('areas')
        console.log(areas)

        const handleResponse = (res: any) => {
            if (res.data.status === "OK") {
                saveDataSuccessToast()
                deleteCriteriosProteccion()
                setIsChangedAreaProteccion(false)
            }

            else {
                dataContext.errorToast(res.data.message)
            }
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
            setIsChangedAreaProteccion(false)
            saveDataErrorToast()
        }

        gestionApi.actualizarAreas(areas, handleResponse, handleError)
    }

    const deleteCriteriosProteccion = () => {
        setDeleteAllCriterios(true)
        dataTableCriterioProteccion.map((x) => {
            onDeleteCriterioFinca(x, 0, false)
        })
    }

    const onSaveCriterioActualFinca = (e: CustomFincaDTO, countDataItem: number) => {
        let criterioProteccion = {
            area: e.area,
            estadoId: 1,//props.gestion.estadoId,
            tcCriterioProteccion: {
                criterioProteccionDesc: e.uso,
                criterioProteccionId: e.value,
                estadoId: 1,
                fechaRegistro: props.gestion.fechaRegistro
            },
            ttGestion: {
                estadoId: props.gestion.estadoId,
                gestionId: props.gestion.gestionId,
                personaAnulaId: props.gestion.personaAnulaId,
                tcElaborador: props.gestion.tcElaborador,
                tcPersonaCrea: props.gestion.tcPersonaCrea,
                tcTipoBosque: props.gestion.tcTipoBosque,
                tcTipoGestion: props.gestion.tcTipoGestion,
                ttTipoPropietarioGestion: props.gestion.ttTipoPropietarioGestion
            }
        };

        const handleResponse = (res: any) => {
            if (res.data.status === "OK") {
                setCountDataItems(countDataItem)
                e.usoFincaGestionId = res.data.data ? res.data.data[0].criterioProteccionGestionId : 0
                saveDataSuccessToast()
            }
            else {
                dataContext.errorToast(res.data.message)
            }
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
            saveDataErrorToast()
        }

        gestionApi.agregarCriterioProteccion(criterioProteccion, handleResponse, handleError)
    }

    const errorDatosBosque = (): boolean => {

        let error = false

        if (tipoBosque == null) {
            setErrorTipoBosque('Debe seleccionar tipo de bosque')
            error = true
        }

        else {
            setErrorTipoBosque(null)
        }

        if (subtipoBosque == null) {
            setErrorSubtipoBosque('Debe seleccionar subtipo de bosque')
            error = true
        }

        else {
            setErrorSubtipoBosque(null)
        }

        if (estadoBosque == null) {
            setErrorEstadoBosque('Debe seleccionar estado de bosque')
            error = true
        }

        else {
            setErrorEstadoBosque(null)
        }

        if (descripcionVegetacion == null || isBlankString(descripcionVegetacion)) {
            setErrorVegetacion('Este campo no puede estar vacio')
            error = true
        }

        else {
            setErrorVegetacion(null)
        }

        return error
    }

    const onSaveData = () => {

        if (errorDatosBosque()) {
            return
        }

        let areas = {
            estadoId: props.gestion.estadoId,
            gestionId: props.gestion.gestionId,
            personaAnulaId: props.gestion.personaAnulaId,
            tcElaborador: props.gestion.tcElaborador,
            tcPersonaCrea: props.gestion.tcPersonaCrea,
            tcTipoBosque: {
                tipoBosqueId: tipoBosque.tipoBosqueId
            },
            tcSubTipoBosque: {
                subTipoBosqueId: subtipoBosque.subTipoBosqueId
            },
            tcEstadoBosque: {
                estadoBosqueId: estadoBosque.estadoBosqueId
            },
            descripcionVegetacion: descripcionVegetacion,
            tcTipoGestion: props.gestion.tcTipoGestion,
            ttTipoPropietarioGestion: props.gestion.ttTipoPropietarioGestion
        };

        const handleResponse = (res: any) => {
            if (res.data.status === "OK") {
                saveDataSuccessToast()
                props.setIsSaved(true)
            }
            else {
                dataContext.errorToast(res.data.message)
            }
        }

        const handleError = (error: AxiosError) => {
            console.error(error)
            saveDataErrorToast()
        }

        gestionApi.moverPanelSiguienteCriterioProteccion(areas, handleResponse, handleError)

    }

    const validateAreas = (areaProteccion: number, areaProduccion: number) => {
        let error = false;
        if (areaProteccion < 0) {
            setErrorProteccion('Debe ingresar un valor válido')
            error = true
        }
        else if (areaProteccion > props.areaBosque) {
            setErrorProteccion('La sumatoría de las áreas es mayor al área forestal, no es posible continuar')
            error = true
        }
        else {
            setErrorProteccion(null)
        }

        if (areaProduccion < props.areaIntervenir) {
            setErrorProduccion('El área de producción no puede ser menor al área a intervenir')
            error = true
        }
        else {
            setErrorProduccion(null)
        }

        return !error;
    }

    const viewBosqueFincaImage = () => {
        const onResponse = (response: any) => {
            var file = new File(response, "j.png")
            /*if (response.status === "OK") {
                alert(response.message)
            }
            else {
                console.error("Error al cargar mapa")
            }*/
        }

        const onError = (axiosError: AxiosError) => {
            console.log(axiosError)
        }

        gestionApi.getGestionFileById(anexoBosqueFinca, onResponse, onError)
    }

    useEffect(() => {
        //cargarDataGestion()
        setIsChangedAreaProteccion(false)
        setDeleteAllCriterios(false)
        cargarListadoCriterioProteccion()
    }, [])

    useEffect(() => {
        setTipoBosque(props.tipoBosque)
    }, [props.tipoBosque])

    useEffect(() => {
        setAreaBosque(props.anexoBosqueFinca)
        console.log('setAreaBosque*******************')
        console.log(areaBosque)
    }, [props.anexoBosqueFinca])

    useEffect(() => {
        setAreaBosque(props.areaBosque)
    }, [props.areaBosque])

    useEffect(() => {
        if (props.removeCriterios === true) {
            console.log("entro aquí")
            resetAreasYCriterios()
        }
    }, [props.removeCriterios])

    useEffect(() => {
        setCountDataItems(dataTableCriterioProteccion.length)
        console.log('Longitud dataTableCriterioProteccion ..... ' + dataTableCriterioProteccion.length)
        setDataTableCriterioProteccion(props.dataTableCriterioProteccion)
    }, [props.dataTableCriterioProteccion])

    useEffect(() => {
        console.log('countDataItems ' + countDataItems)
        if (deleteAllCriterios) {
            if (countDataItems === 0) {
                let nuevoArray: CustomFincaDTO[] = []
                setDataTableCriterioProteccion(nuevoArray)
                setDeleteAllCriterios(false)
                setOpenConfirm(false)
            }
        }
    }, [countDataItems])


    useEffect(() => {
        console.log('props.formData ' + countDataItems)
        setAreaProduccion(props.formData.areaProduccion);
    }, [props.formData])

    const renderCriteriosProteccion = () => {

        if(props.formData.areaProteccion == null || props.formData.areaProteccion <= 0){
            return null
        }


        return(
            <>
            <CustomBosqueTable
                labelFilter="Criterio de protección"
                labelInput="Área en (ha)"
                errorFilter="Este campo no puede ir vacio"
                errorInput="Debe de ser mayor a 0"
                filterElements={filterCriterioProteccion}
                headerTable={encabezadosCriterioProteccion}
                setOnSaveItem={onSaveCriterioActualFinca}
                setOnDeleteItem={onDeleteCriterioFinca}
                setOnSaveData={onSaveData}
                areaTotal={props.formData.areaProteccion}
                dataTable={dataTableCriterioProteccion}
            />

            <Grid textAlign="center" verticalAlign="bottom" style={{ "marginTop": "12px" }}>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <UploadFormButton defaultLabel={"Clic para cambiar mapa"} name={"mapa"} url="/" handleChange={handleChange} />
                    </Grid.Column>
                    <Grid.Column>
                        {anexoBosqueFinca !== 0 &&
                            <Form.Button label="‌‌ " icon labelPosition="left" primary onClick={viewBosqueFincaImage}>
                                <Icon name="map" />
                            Ver mapa
                            </Form.Button>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </>
        )
    }

    return (
        <div>
            <Confirm
                header='Criterios de protección'
                content='¿Desea cambiar el área de protección y eliminar todos los criterios de protección?'
                open={openConfirm}
                onCancel={cloeseConfirm}
                onConfirm={confirmAction}
            />
            <Header>3.2. Bosque de la finca</Header>

            <Form>
                <Form.Group >
                    <TipoBosqueSelect
                        label={"Tipo bosque"}
                        name="tipoBosque"
                        value={tipoBosque}
                        error={errorTipoBosque}
                        onChange={handleChangeSelect}
                    />
                    <SubTipoBosqueSelect
                        label="Subtipo bosque"
                        name="subtipoBosque"
                        value={subtipoBosque}
                        error={errorSubtipoBosque}
                        onChange={handleChangeSelect}
                    />
                    <EstadoBosqueSelect
                        label="Estado de bosque"
                        name="estadoBosque"
                        value={estadoBosque}
                        error={errorEstadoBosque}
                        onChange={handleChangeSelect}
                    />
                </Form.Group>
                <Form.TextArea
                    label="Descripción vegetación"
                    error={errorVegatacion}
                    defaultValue={descripcionVegetacion}
                    onBlur={(e: any) => setDescripcionVegetacion(e.target.value)}
                />
                <Form.Button floated="right" primary onClick={onSaveData} icon labelPosition="right">
                    <Icon name="save" />
					Guardar
				</Form.Button>
            </Form>

            <Header>3.2.1. División del bosque</Header>

            <Form >
                <Form.Group widths="equal">
                    <Form.Input
                        label='Área con bosque (ha)'
                        value={areaBosque}
                        readOnly
                    />
                    <Form.Input
                        label='Área de protección (ha)'
                        value={props.formData.areaProteccion}
                        name='areaProteccion'
                        type="number"
                        onChange={handleChangeInput}
                        onBlur={onSaveAreas}
                        onFocus={onFocusInput}
                        error={errorProteccion}
                    />
                    <Form.Input
                        label='Área con producción (ha)'
                        value={areaProduccion}
                        error={errorProduccion}
                        readOnly
                    />
                    <Form.Input
                        label='Área a intervenir (ha)'
                        value={props.areaIntervenir ? props.areaIntervenir : ''}
                        readOnly
                    />
                </Form.Group>

            </Form>
            {renderCriteriosProteccion()}
        </div>
    )
}
