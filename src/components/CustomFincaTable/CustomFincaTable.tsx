import React, { useCallback, useEffect } from 'react'
import { Form, Grid, SemanticCOLORS, Button, Icon, Confirm } from 'semantic-ui-react';
import CustomTable, { CTButtonResponse } from 'components/CustomTable';
import CustomFincaDTO from 'components/CustomFincaTable/CustomFincaDTO'
import ItemFilter from './ItemFilter';
import BasicLabel from 'components/BasicLabel/BasicLabel';
import FormNumInput from 'components/FormNumInput';
import { roundDouble } from 'utils/UtilFunctions';

type Props = {
    labelFilter: string
    labelInput: string
    filterElements: ItemFilter[]
    headerTable: any[]
    dataTable: any[]
    errorFilter: string
    errorInput: string
    setOnSaveItem: (e: any) => void
    setOnDeleteItem: (e: any, porcentajeUsado: number) => void
    setOnSaveData: (e: any, porcentajeUsado: number) => void
    areaTotal: number
    areaIntervenir: number
}

export default function CustomFincaTable({
    labelFilter,
    labelInput,
    filterElements,
    headerTable,
    dataTable,
    errorFilter: propErrorFilter,
    errorInput: propErrorInput,
    setOnSaveItem,
    setOnDeleteItem,
    setOnSaveData,
    areaTotal,
    areaIntervenir
}: Props) {
    var rojo: SemanticCOLORS = 'red';

    const [value, setValue] = React.useState<any>();
    const [valueInput, setValueInput] = React.useState<number>(0);
    const [columns, setColumns] = React.useState<CustomFincaDTO[]>(dataTable);
    const [footerTable, setFooterTable] = React.useState<CustomFincaDTO>({
        uso: "Total",
        area: 0,
        porcentaje: 0,
        value: 0,
        usoFincaGestionId: 0
    });

    const botones = [
        { id: "eliminar", label: "Eliminar", color: rojo },
    ];
    const [errorInput, setErrorInput] = React.useState<string | null>(null);
    const [errorFilter, setErrorFilter] = React.useState<string | null>(null);
    const [areaRestante, setAreaRestante] = React.useState<number>(areaTotal);
    const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
    const [messageConfirm, setMessageConfirm] = React.useState<string>();
    const [tmpUsoFinca, setTmpUsoFinca] = React.useState<CustomFincaDTO | null>();


    const handleChange = (_e: any, { value }: any) => {
        if (filterElements != null) {
            let option: any = filterElements.find((x: any) => x.value === value) //obteniendo el objeto completo
            if (option != null) {
                setValue(option)
            }
        }
    }

    const handleChangeInput = (e: any) => {
        setValueInput(Number(e.target.value))
    }

    const resetValues = () => {
        setValueInput(0)
        setValue(undefined)
    }

    const addColumn = () => {
        if (validateData()) {
            let porcentaje = Math.round((100 * valueInput) / areaTotal)

            let column: CustomFincaDTO = {
                uso: value.text,
                area: valueInput,
                porcentaje: porcentaje,
                value: value.value,
                usoFincaGestionId: 0
            };

            let temporalArray: CustomFincaDTO[] = columns;
            temporalArray.push(column);
            setColumns(temporalArray);
            actualizarDatosGenerales(temporalArray);
            setOnSaveItem(column)
            resetValues()
        }
    }

    const saveAreas = () => {
        let tmpAreaUsada = columns.reduce((count, column) => count + column.area, 0);
        let tmpPorcentaje = Math.round((100 * tmpAreaUsada) / areaTotal)
        setOnSaveData(columns, tmpPorcentaje)
    }

    const actualizarDatosGenerales = (array: any[], noSave: boolean = false) => {
        let tmpAreaUsada = array.reduce((count, column) => count + column.area, 0);
        tmpAreaUsada = (roundDouble(tmpAreaUsada))
        setAreaRestante(roundDouble(areaTotal - tmpAreaUsada))
        let tmpPorcentaje = Math.round((100 * tmpAreaUsada) / areaTotal)

        let tmpTotal = tmpAreaUsada;
        let total: CustomFincaDTO = {
            uso: "Total",
            area: tmpTotal,
            porcentaje: tmpPorcentaje > 100 ? 100 : tmpPorcentaje,
            value: 0,
            usoFincaGestionId: 0
        };
        setFooterTable(total);
        if (tmpPorcentaje >= 100 && !noSave) {
            saveAreas()
        }
    }

    const validateData = () => {
        let error = false;

        if (valueInput === 0) {
            error = true;
            setErrorInput(propErrorInput)
        }
        else if (!validateArea(valueInput)) {
            error = true;
            setErrorInput("Debe indicar un número válido o una cantidad menor a " + areaRestante + " para el área")
        }
        else {
            setErrorInput(null)
        }

        if (value == null || value.value === 0) {
            error = true;
            setErrorFilter(propErrorFilter)
        }
        else if (!validateExisteItem(value)) {
            error = true;
            setErrorFilter(value.text + " ya se encuentra en la lista")
        }
        else {
            setErrorFilter(null)
        }

        if (!error) {
            if (value.text.toUpperCase() === "FORESTAL" && valueInput < areaIntervenir) {
                error = true;
                setErrorFilter("El área " + value.text + " no puede ser menor al área a intervenir solicitada")
            }
        }
        return !error;
    }

    const validateExisteItem = (value: any) => {
        let item: any = columns.find((x: any) => x.value === value.value) //obteniendo el objeto completo
        if (item != null)
            return false;
        return true;
    }

    const validateArea = (areaAUsar: number) => {
        if (areaRestante < areaAUsar || areaAUsar < 0)
            return false;
        else
            return true;
    }

    const onButtonClick = (buttonResponse: CTButtonResponse) => {
        let item: CustomFincaDTO = buttonResponse.rowData;
        setTmpUsoFinca(item)

        let tmpAreaUsada = columns.reduce((count, column) => count + column.area, 0);
        let tmpPorcentaje = Math.round((100 * tmpAreaUsada) / areaTotal)

        if (item.uso.toUpperCase() === "FORESTAL" || tmpPorcentaje >= 100) {
            setMessageConfirm('¿Desea eliminar el uso de finca ' + item.uso + ' y eliminar todos los criterios de protección?')
            setOpenConfirm(true)
        } else {
            deleteItem(buttonResponse.rowData.value)
        }
    }

    const deleteItem = (e: number) => {
        let tmpAreaUsada = columns.reduce((count, column) => count + column.area, 0);
        let tmpPorcentaje = Math.round((100 * tmpAreaUsada) / areaTotal)

        let nuevoArray: CustomFincaDTO[] = [];
        columns.map((x) => {
            if (x.value !== e) {
                nuevoArray.push(x)
            }
            else {
                setOnDeleteItem(x, tmpPorcentaje)
            }
        })
        setColumns(nuevoArray);
        actualizarDatosGenerales(nuevoArray)
        setTmpUsoFinca(null)
        setOpenConfirm(false)
    }

    const cloeseConfirm = () => {
        console.log('closeConfirm...')
        setOpenConfirm(false)
        setTmpUsoFinca(null)
    }

    const confirmAction = () => {
        console.log('confirmAction...')
        console.log(tmpUsoFinca)
        if (tmpUsoFinca != null) {
            deleteItem(tmpUsoFinca.value)
        }
    }


    useEffect(() => {
        setAreaRestante(areaTotal)
    }, [areaTotal])

    const actualizarDatosCallback = useCallback(actualizarDatosGenerales, [dataTable])


    useEffect(() => {
        setColumns(dataTable)
        actualizarDatosCallback(dataTable, true)
    }, [dataTable, actualizarDatosCallback])


    return (
        <>
            <Confirm
                header='Uso de Finca'
                content={messageConfirm}
                open={openConfirm}
                onCancel={cloeseConfirm}
                onConfirm={confirmAction}
            />
            <Grid textAlign="center" verticalAlign="middle" style={{ marginBottom: 8, marginTop: 8 }}>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <BasicLabel label="Área total de la finca (ha):" value={areaTotal} />
                    </Grid.Column>
                    <Grid.Column>
                        <BasicLabel label="Área restante (ha):" value={areaRestante} />
                    </Grid.Column>
                    <Grid.Column>
                        <BasicLabel label="Área Intervenir (ha):" value={areaIntervenir} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>
                <Form.Group widths="equal">
                    <Form.Select
                        label={labelFilter !== undefined ? labelFilter : "Uso de finca"}
                        name="usoDeFinca"
                        options={filterElements}
                        error={errorFilter}
                        onChange={handleChange}
                        value={value ? value.value : null}
                    />
                    <FormNumInput
                        name="area"
                        label={labelInput !== undefined ? labelInput : "Área en (ha)"}
                        error={errorInput}
                        value={valueInput}
                        onBlur={handleChangeInput}
                    />
                </Form.Group>

            </Form>
            <Button style={{ "marginBottom": "12px" }} primary onClick={addColumn}>
                <Icon name="add" />
                Agregar
            </Button>
            <CustomTable
                data={columns}
                columns={headerTable}
                buttonsColumnHeader="Quitar"
                buttons={botones}
                onButtonClick={onButtonClick}
                totalData={footerTable}
            />
        </>
    )
}
