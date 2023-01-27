import CulturaSelect from 'components/FormCatalogSelect/catalogs/CulturaSelect';
import EstadoCivilSelect from 'components/FormCatalogSelect/catalogs/EstadoCivilSelect';
import IdiomaSelect from 'components/FormCatalogSelect/catalogs/IdiomaSelect';
import OcupacionSelect from 'components/FormCatalogSelect/catalogs/OcupacionSelect';
import SexoSelect from 'components/FormCatalogSelect/catalogs/SexoSelect';
import FormNumInput from 'components/FormNumInput';
import PaisDepartamentoMunicipioSelect from 'components/PaisDepartamentoMunicipioSelect';
import UploadImageFormButton from 'components/UploadImageButton';
import CreateSolicitanteDTO from 'dto/usuario/CreateSolicitanteDTO';
import React from 'react';
import { Form } from 'semantic-ui-react';
import UsuarioExternoFormError from './UsuarioExternoFormError';

type Props = {
    formData: CreateSolicitanteDTO,
    setFormData: Function,
    formError: UsuarioExternoFormError
}

export function UsuarioExternoForm({
    formData,
    setFormData,
    formError
}: Props) {

    const handleChangeMunicipio = (e: any, { name, value, object }: any) => {
        console.error(value)
        console.error(object)

        value = parseInt(value)
        let tcMunicipio = formData.tcMunicipio
        tcMunicipio[name] = value;

        setFormData((oldValues: any) => ({
            ...oldValues,
            "tcMunicipio": tcMunicipio,
        }));
    }

    const handleChange = (e: any, { name, value }: any) => {
        value = (e.target.type === 'number') ? parseInt(value) : value

        if (e.target.type === 'number' && isNaN(value)) {
            value = ""
        }

        if (name === "usuario" || name === "claveUsuario") {

            let usuario = formData.usuario

            if (name === "usuario") {
                usuario.usuario = value
            }

            else {
                usuario.claveUsuario = value
            }

            setFormData((oldValues: any) => ({
                ...oldValues,
                "usuario": usuario,
            }));
        }
        else {
            setFormData((oldValues: any) => ({
                ...oldValues,
                [name]: value,
            }));
        }
    }

    const handlePhotoChange = (e: any, { name, value }: any) => {
        setFormData((oldValues: any) => ({
            ...oldValues,
            [name]: value,
        }));
    }

    //Using with onBlur
    const handleInputChange = (e: any) => {
        let name = e.target.name
        let value = e.target.value
        handleChange(e, { name, value })
    }





    return (
        <Form error={formError.isError}>
            <UploadImageFormButton
                style={{ marginBottom: "16px"}}
                defaultLabel={'Fotografía'}
                imageSize={'small'}
                fileNameLabel={'Foto'}
                imageBase64={formData.foto != null && formData.foto !== "" ? formData.foto : undefined}
                name='foto'
                error={formError ? formError.foto : null}
                handleChange={handlePhotoChange} />
            <Form.Group widths="equal">
                <PaisDepartamentoMunicipioSelect
                    municipioValue={0}
                    onChange={handleChangeMunicipio}
                    municipioError={formError ? formError.municipio : null}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    label="Nombre completo"
                    placeholder="Nombre completo"
                    name='personaDesc'
                    error={formError ? formError.nombre : null}
                    defaultValue={formData.personaDesc}
                    onBlur={handleInputChange}
                />
                <Form.Input
                    label="Dirección"
                    placeholder="Dirección"
                    name='direccion'
                    error={formError ? formError.direccion : null}
                    defaultValue={formData.direccion}
                    onBlur={handleInputChange}
                />
                <Form.Input
                    label="Fecha nacimiento"
                    name="fechaNacimiento"
                    type="date"
                    error={formError ? formError.fechaNacimiento : null}
                    defaultValue={formData.fechaNacimiento}
                    onBlur={handleInputChange}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <FormNumInput
                    label="CUI -DPI-"
                    placeholder="CUI"
                    name="cui"
                    onlyDigits
                    maxLength={13}
                    error={formError ? formError.cui : null}
                    value={formData.cui}
                    onBlur={handleInputChange}
                />
                <Form.Input
                    label="Fecha vencimiento (CUI)"
                    name="fechaVencimiento"
                    type="date"
                    error={formError ? formError.fechaVencimiento : null}
                    defaultValue={formData.fechaVencimiento}
                    onBlur={handleInputChange}
                />
                <FormNumInput
                    label="Teléfono"
                    name="telefono"
                    onlyDigits
                    error={formError ? formError.telefono : null}
                    value={formData.telefono}
                    onBlur={handleInputChange}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    label="Correo eléctronico"
                    placeholder="Correo eléctronico"
                    name="correo"
                    error={formError ? formError.correo : null}
                    defaultValue={formData.correo}
                    onBlur={handleInputChange}
                />

                <SexoSelect
                    label="Sexo"
                    value={formData.tcSexo}
                    error={formError ? formError.sexo : null}
                    onChange={handleChange}
                />
                <FormNumInput
                    label="NIT (Sin guión)"
                    placeholder="NIT"
                    onlyDigits
                    maxLength={8}
                    name="nit"
                    error={formError ? formError.nit : null}
                    value={formData.nit}
                    onBlur={handleInputChange}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <OcupacionSelect
                    label="Ocupación"
                    value={formData.tcOcupacion}
                    onChange={handleChange}
                    error={formError ? formError.ocupacion : null}
                />
                <IdiomaSelect
                    label="Comunidad Lingüistica"
                    value={formData.tcIdioma}
                    onChange={handleChange}
                    error={formError ? formError.comunidad : null}
                />
                <EstadoCivilSelect
                    label="Estado civil"
                    value={formData.tcEstadoCivil}
                    onChange={handleChange}
                    error={formError ? formError.estadoCivil : null}
                />
                <CulturaSelect
                    label="Pueblo de Pertenencia"
                    value={formData.tcCultura}
                    onChange={handleChange}
                    error={formError ? formError.pueblo : null}
                />
            </Form.Group>
            <h3>Datos de la cuenta</h3>
            <Form.Group widths="equal">
                <Form.Input
                    label="Usuario"
                    placeholder="Nombre de usuario"
                    name="usuario"
                    error={formError ? formError.nombreUsuario : null}
                    defaultValue={formData.usuario.usuario}
                    onBlur={handleInputChange}
                />
                <Form.Input
                    label="Contraseña"
                    placeholder="Contraseña"
                    name="claveUsuario"
                    type="password"
                    error={formError ? formError.password : null}
                    defaultValue={formData.usuario.claveUsuario}
                    onBlur={handleInputChange}
                />
                <Form.Input
                    label="Verificación de contraseña"
                    placeholder="Verificación de contraseña"
                    name="repassword"
                    type="password"
                    error={formError ? formError.repassword : null}
                    value={formData.repassword}
                    onChange={handleChange}
                />
            </Form.Group>
        </Form>
    );
}

