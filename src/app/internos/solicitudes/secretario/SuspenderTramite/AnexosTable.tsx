import FielApi from 'api/FileApi';
import { AxiosError } from 'axios';
import UploadFormButton from 'components/UploadButton';
import React, { useEffect } from 'react'
import { Button, Segment, Table } from 'semantic-ui-react'

type Props = {
	archivos: any,
    setArchivos: Function,
    formData: any,
    setFormData: Function,
    setOnAdd: (item: any, label: string, message: string) => void,
    setOnRemove: (item: any) => void
}

export default function AnexosTable(props: Props) {
	const [archivos, setArchivos] = React.useState<any> (props.archivos)
    const [counter, setCounter] = React.useState<number> (0)
    const fileApi = new FielApi();
	const [tokenData, setTokenData] = React.useState<any>({})
    const onAddItem = React.useCallback(props.setOnAdd != undefined ? props.setOnAdd : () => { }, []);
    const onRemoveItem = React.useCallback(props.setOnRemove != undefined ? props.setOnRemove : () => { }, []);
    
    
    const onAdd = (infoFile: any, label: string, message: string) => {
        /*let array = archivos;
        let file : File = {
            extension: infoFile.extension,
            nombre: label,
            ruta: infoFile.rutaArchivo,
            size: infoFile.size
        }
        array.push(file)
        setArchivos([...archivos])
        let tmp = archivos.length
        setCounter(tmp)
        console.log(tmp)
        console.log(archivos.length)
        console.log(archivos)*/
        onAddItem(infoFile, label, message)
        setCounter(archivos.length)
    }

    const onRemove = (archivo: File) => {
        onRemoveItem(archivo)
        setCounter(archivos.length - 1)
    }

    const handleFileChange = (e: any, { name, value }: any) => {
        let file = value;
       
		if (file !== null) {
			const onResponse = (response: any) => {
				if (response.status === "OK") {
                    onAdd(response.data[0], file.name, response.message)
				}
				else {
					console.error("Error al cargar archivo")
				}
			}

			const onError = (axiosError: AxiosError) => {
				console.log(axiosError)
			}

			fileApi.cargarArchivo(file, onResponse, onError)
		}
	}

    useEffect(() => {
        setArchivos(props.archivos)
    }, [props.archivos])


    useEffect(() => {
        console.log(props.formData)
        props.setFormData(props.formData)

        let td = localStorage.getItem("tokenData")
		if (td != null) {
			td = JSON.parse(td)
			setTokenData(td)
			console.log(tokenData)
			console.log(td)
		}
    }, [props.formData])


    const addAnexo = () => {
		let suspencion = {
			anexo: [],
            estadoId: "1",
            fechaIngreso: "",
            opositores: [],
            tcPersonaCrea: {
                personaId: tokenData.personaId
            },
			ttGestion: props.formData
		};

		const handleResponse = (res: any) => {
			alert(res.data.message)
		}

		const handleError = (error: AxiosError) => {
			console.error(error)
		}

        console.log(suspencion);
	}

    const renderBodyTable = () => {
        let list: JSX.Element[] = []
        let counter = 0;
        archivos.forEach((archivo: any) => {
            counter ++;
            list.push(
				<Table.Row  key={counter}>
                    <Table.Cell>{counter}</Table.Cell>
                    <Table.Cell>
                        {archivo.nombre}
                    </Table.Cell>
                    <Table.Cell>
                        <Button color='red' icon='minus'  onClick={ () => {onRemove(archivo)}}>
                        </Button>
                    </Table.Cell>
                </Table.Row>
			)            
        });
        return list;
    }

    const renderTable = () => {
        let list: JSX.Element [] = []
            list.push(
                <Table key="personasTable">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}  textAlign="center" > No. </Table.HeaderCell>
                            <Table.HeaderCell width={2}  textAlign="center" > Descripción </Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign="center" ></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {renderBodyTable()}
                    </Table.Body>
                </Table>    
            )
        return list;
    }

	return (
        <Segment>
            <h3>Lista de anexos para el trámite</h3>
            <UploadFormButton defaultLabel='Clic para agregar anexo' url='' name="anexo" handleChange={handleFileChange}></UploadFormButton>
            { counter >= 0 && renderTable()}
        </Segment>
	)
}
