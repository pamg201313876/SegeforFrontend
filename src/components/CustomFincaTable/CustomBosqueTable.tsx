import BasicLabel from 'components/BasicLabel/BasicLabel';
import CustomFincaDTO from 'components/CustomFincaTable/CustomFincaDTO';
import CustomTable, { CTButtonResponse } from 'components/CustomTable';
import FormNumInput from 'components/FormNumInput';
import React, { useEffect } from 'react';
import { Button, Form, Grid, Header, Icon, SemanticCOLORS } from 'semantic-ui-react';
import ItemFilter from './ItemFilter';

type Props = {
    labelFilter: string
    labelInput: string
    filterElements: ItemFilter[]
    headerTable: any[]
    dataTable: any[]
    errorFilter: string
    errorInput: string
    setOnSaveItem: (e: any, countDataItem: number) => void
    setOnDeleteItem: (e: any, countDataItem: number) => void
    setOnSaveData: (e: any, porcentajeUsado: number) => void
    areaTotal: number
}

export default function CustomBosqueTable(props: Props) {
    var rojo: SemanticCOLORS = 'red';

    const [filterElements, setFilterElements] = React.useState<ItemFilter[]>(props.filterElements);
    const [value, setValue] = React.useState<any>();
    const [valueInput, setValueInput] = React.useState<number>(0);
    const [headerTable] = React.useState<any[]>(props.headerTable);
    const [columns, setColumns] = React.useState<CustomFincaDTO[]>(props.dataTable);
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
    const [errorFilter, setErrorFilter] = React.useState<string | null>(null);
    const [errorInput, setErrorInput] = React.useState<string | null>(null);
    const [areaTotal, setAreaTotal] = React.useState<number>(props.areaTotal);
    const [areaRestante, setAreaRestante] = React.useState<number>(props.areaTotal);
    const [showSaveButton, setShowSaveButton] = React.useState<boolean>(false);

    const onClickSave = () => {
        let tmpAreaUsada = columns.reduce((count, column) => count + column.area, 0);
        let tmpPorcentaje = Math.round((100 * tmpAreaUsada) / areaTotal)
        //props.setOnSaveData(columns, tmpPorcentaje)
    }

    const handleChange = (_e: any, { name, value }: any) => {
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
            props.setOnSaveItem(column, temporalArray.length)
            resetValues()
        }
    }

    const actualizarDatosGenerales = (array: any[]) => {
        let tmpAreaUsada = array.reduce((count, column) => count + column.area, 0);
        setAreaRestante(areaTotal - tmpAreaUsada)
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
        setShowSaveButton(tmpPorcentaje >= 100 ? true : false);
    }

    const validateData = () => {
        let error = false;

        if (valueInput === 0) {
            error = true;
            setErrorInput(props.errorInput)
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
            setErrorFilter(props.errorFilter)
        }
        else if (!validateExisteItem(value)) {
            error = true;
            setErrorFilter(value.text + " ya se encuentra en la lista")
        }
        else {
            setErrorFilter(null)
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
        deleteItem(buttonResponse.rowData.value)
    }

    const deleteItem = (e: number) => {
        let nuevoArray: CustomFincaDTO[] = [];
        columns.map((x) => {
            if (x.value !== e) {
                nuevoArray.push(x)
            }
            else {
                props.setOnDeleteItem(x, columns.length - 1)
            }
        })
        setColumns(nuevoArray);
        actualizarDatosGenerales(nuevoArray)
    }

    useEffect(() => {
        setAreaTotal(props.areaTotal)
        setAreaRestante(props.areaTotal)
    }, [props.areaTotal])

    useEffect(() => {
        console.log(props.dataTable)
        setColumns(props.dataTable)
        actualizarDatosGenerales(props.dataTable)
    }, [props.dataTable])

    useEffect(() => {
        setFilterElements(props.filterElements)
    }, [props.filterElements])

    return (
        <>
            <Grid verticalAlign="middle" style={{marginBottom:"8px", marginTop: "8px"}}>
                <Grid.Row columns={2}>
                    <Grid.Column textAlign="left">
                        <Header >Especificación de áreas de protección</Header>
                    </Grid.Column>
                    <Grid.Column  textAlign="right">
                        <BasicLabel label="Área pendiente a segmentar:" value={areaRestante} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>
                <Form.Group widths="equal">
                    <Form.Select
                        label={props.labelFilter !== undefined ? props.labelFilter : "Uso de finca"}
                        name="usoDeFinca"
                        options={filterElements}
                        error={errorFilter}
                        onChange={handleChange}
                        value={value ? value.value : null}
                    />
                    <FormNumInput
                        name="area"
                        label={props.labelInput !== undefined ? props.labelInput : "Área en (ha)"}
                        value={valueInput}
                        error={errorInput}
                        onBlur={handleChangeInput}
                    />
                </Form.Group>

            </Form>
            <Button style={{ "marginBottom": "12px" }} primary onClick={() => addColumn()}>
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
            {/* <Form style={{ "marginTop": "12px" }}>
                {showSaveButton && <Form.Button floated="right" primary onClick={onClickSave}>Guardar</Form.Button>}
            </Form> */}

        </>
    )
}
