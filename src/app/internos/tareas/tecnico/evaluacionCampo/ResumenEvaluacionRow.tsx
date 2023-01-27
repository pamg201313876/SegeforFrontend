import React, { useEffect, useState } from 'react'
import { Checkbox, CheckboxProps, Input, Table } from 'semantic-ui-react'
import { TextArea } from 'components/TextArea'

type Props = {
    estrato: any
}

export default function ResumenEvaluacionRow({
    estrato
}: Props) {

    const [area, setArea] = useState<any>()
    const [aplicaArea, setAplicaArea] = useState<boolean | undefined>(false)

    const [pendientePromedio, setPendientePromedio] = useState<any>()
    const [aplicaPendientePromedio, setAplicaPendientePromedio] = useState<boolean | undefined>(false)

    const [codigoClase, setCodigoClase] = useState<any>()
    const [aplicaCodigoClase, setAplicaCodigoClase] = useState<boolean | undefined>(false)

    const [incremento, setIncremento] = useState<any>()
    const [aplicaIncremento, setAplicaIncremento] = useState<boolean | undefined>(false)

    const [edad, setEdad] = useState<any>()
    const [aplicaEdad, setAplicaEdad] = useState<boolean | undefined>(false)

    const [especies, setEspecies] = useState<any>()
    const [aplicaEspecies, setAplicaEspecies] = useState<boolean | undefined>(false)

    const changeAreaCheckBox = (_e: any, data: CheckboxProps) => {
        setAplicaArea(data.checked)
        estrato.aplicaArea = data.checked
        if(data.checked){
            areaChange(estrato.datosEstrato.area)
        }
        else{
            areaChange("")
        } 
    }

    const changePendienteCheckBox = (_e: any, data: CheckboxProps) => {
        setAplicaPendientePromedio(data.checked)
        estrato.aplicaPendientePromedio = data.checked
        if(data.checked){
            pendienteChange(estrato.datosEstrato.pendientePromedio)
        }
        else{
            pendienteChange("")
        } 
    }


    const changeCodigoClaseCheckBox = (_e: any, data: CheckboxProps) => {
        setAplicaCodigoClase(data.checked)
        estrato.aplicaCodigoClase = data.checked
        if(data.checked){
            codigoChange(estrato.datosEstrato.codigoClase)
        }
        else{
            codigoChange("")
        } 
    }


    const changeIncrementoCheckBox = (_e: any, data: CheckboxProps) => {
        setAplicaIncremento(data.checked)
        estrato.aplicaIncremento = data.checked
        if(data.checked){
            incrementoChange(estrato.datosEstrato.incremento)
        }
        else{
            incrementoChange("")
        } 
    }


    const changeEdadCheckBox = (_e: any, data: CheckboxProps) => {
        setAplicaEdad(data.checked)
        estrato.aplicaEdad = data.checked
        if(data.checked){
            edadChange(estrato.datosEstrato.edad)
        }
        else{
            edadChange("")
        } 
    }

    const changeEspeciesCheckBox = (_e: any, data: CheckboxProps) => {
        setAplicaEspecies(data.checked)
        estrato.aplicaEspecies = data.checked
        if(data.checked){
            especiesChange(estrato.datosEstrato.especies)
        }
        else{
            especiesChange("")
        } 
    }

    const areaChange = (value: any) => {
        setArea(value)
        estrato.evaluacionEstrato.area = value
    }

    const handleAreaChange = (_e: any, {value}: any) => areaChange(value)

    const pendienteChange = (value: any) => {
        setPendientePromedio(value)
        estrato.evaluacionEstrato.pendientePromedio = value
    }

    const handlePendienteChange = (_e: any, {value}: any) => pendienteChange(value)

    const codigoChange = (value: any) => {
        setCodigoClase(value)
        estrato.evaluacionEstrato.codigoClase = value
    }

    const handleCodigoChange = (_e: any, {value}: any) => codigoChange(value)

    const incrementoChange = (value: any) => {
        setIncremento(value)
        estrato.evaluacionEstrato.incremento = value
    }

    const handleIncrementoChange = (_e: any, {value}: any) => incrementoChange(value)

    const edadChange = (value: any) => {
        setEdad(value)
        estrato.evaluacionEstrato.edad = value
    }

    const handleEdadChange = (_e: any, {value}: any) => edadChange(value)

    const especiesChange = (value: any) => {
        setEspecies(value)
        estrato.evaluacionEstrato.especies = value
    }

    const handleEspeciesChange = (_e: any, {value}: any) => especiesChange(value)

    useEffect(() => {
        setAplicaArea(estrato.aplicaArea)
        setAplicaPendientePromedio(estrato.aplicaPendientePromedio)
        setAplicaCodigoClase(estrato.aplicaCodigoClase)
        setAplicaIncremento(estrato.aplicaIncremento)
        setAplicaEdad(estrato.aplicaEdad)
        setAplicaEspecies(estrato.aplicaEspecies)

        let evalEstrato = estrato.evaluacionEstrato

        setArea(evalEstrato.area)
        setPendientePromedio(evalEstrato.pendientePromedio)
        setCodigoClase(evalEstrato.codigoClase)
        setIncremento(evalEstrato.incremento)
        setEdad(evalEstrato.edad)
        setEspecies(evalEstrato.especies)
    }, [estrato])

    return (
        <>
            <Table.Row  >
                <Table.Cell collapsing textAlign="center" rowSpan={7}>{estrato.estrato}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Área</Table.Cell>
                <Table.Cell>{estrato.datosEstrato.area}</Table.Cell>
                <Table.Cell>
                    <Checkbox checked={aplicaArea} onChange={changeAreaCheckBox} />
                </Table.Cell>
                <Table.Cell><Input placeholder="Verificación de campo" value={area} onChange={handleAreaChange} /></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Pendiente (%)</Table.Cell>
                <Table.Cell>{estrato.datosEstrato.pendientePromedio}</Table.Cell>
                <Table.Cell>
                    <Checkbox checked={aplicaPendientePromedio } onChange={changePendienteCheckBox} />
                </Table.Cell>
                <Table.Cell><Input placeholder="Verificación de campo" value={pendientePromedio} onChange={handlePendienteChange} /></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Clase de desarollo</Table.Cell>
                <Table.Cell>{estrato.datosEstrato.codigoClase}</Table.Cell>
                <Table.Cell>
                    <Checkbox checked={aplicaCodigoClase} onChange={changeCodigoClaseCheckBox} />
                </Table.Cell>
                <Table.Cell><Input placeholder="Verificación de campo" value={codigoClase} onChange={handleCodigoChange} /></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Incremento (m3/ha/año)</Table.Cell>
                <Table.Cell>{estrato.datosEstrato.incremento}</Table.Cell>
                <Table.Cell>
                    <Checkbox checked={aplicaIncremento} onChange={changeIncrementoCheckBox} />
                </Table.Cell>
                <Table.Cell><Input placeholder="Verificación de campo" value={incremento} onChange={handleIncrementoChange} /></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Edad (Años)</Table.Cell>
                <Table.Cell>{estrato.datosEstrato.edad}</Table.Cell>
                <Table.Cell>
                    <Checkbox checked={aplicaEdad} onChange={changeEdadCheckBox} />
                </Table.Cell>
                <Table.Cell><Input placeholder="Verificación de campo" value={edad} onChange={handleEdadChange} /></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Especies</Table.Cell>
                <Table.Cell><TextArea value={estrato.datosEstrato.especies}/></Table.Cell>
                <Table.Cell>
                    <Checkbox checked={aplicaEspecies} onChange={changeEspeciesCheckBox} />
                </Table.Cell>
                <Table.Cell><TextArea placeholder="Verificación de campo" value={especies} onChange={handleEspeciesChange} /></Table.Cell>
            </Table.Row>
        </>
    )


    
}
