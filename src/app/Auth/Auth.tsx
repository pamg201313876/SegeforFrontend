import AuthApi from 'api/AuthApi';
import { AppDataContext } from 'app/App';
import UsuarioExternoFormModal from 'app/Auth/UsuarioExterno/UsuarioExternoFormModal';
import { AxiosError } from 'axios';
import TokenResponseDTO from 'dto/auth/TokenResponseDTO';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Logo from 'resources/images/inab_logo.png';
import { Button, Divider, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import styles from './Auth.module.css';
import ValidarLlave from './ValidarLlave';

const authApi = new AuthApi();

export function Auth() {

    const appDataContext = useContext(AppDataContext)
    const [loading, setLoading] = useState(false)
    const [usuario, setUsuario] = useState<string>("");
    const [claveUsuario, setClaveUsuario] = useState<string>("");
    const [open, setOpen] = useState(false)
    const [openValidateForm, setOpenValidateForm] = useState(false)
    const [error, setError] = useState<boolean>(false);
    const history = useHistory();

    const handleRegistroClick = () => {
        setOpen(true)
    }

    const handleValidateClick = () => {
        setOpenValidateForm(true)
    }

    const handleChange = (_e: any, { name, value }: any) => {
        if (name === "usuario") {
            setUsuario(value)
        }
        else {
            setClaveUsuario(value)
        }
    }

    const onResponse = (res: any) => {
        setLoading(false)
        let status = res.status;
        if (status === "OK") {
            let data = res.data[0]
            let tokenResponseDTO: TokenResponseDTO = {
                nombre: data.tcPersona.personaDesc,
                perfil: data.tcUsuario.tcPerfil,
                usuario: data.tcUsuario.usuario,
                usuarioId: data.tcUsuario.usuarioId,
                personaId: data.tcPersona.personaId,
                tcPersona: data.tcPersona,
            }
            localStorage.setItem("tokenData", JSON.stringify(tokenResponseDTO))
            let token = res.singleValue
            localStorage.setItem("token", token)
            appDataContext.setToken(tokenResponseDTO);
            history.push('/');
            localStorage.setItem("actualLink", "inbox")
        }
        else {
            setError(true);
        }
    }

    const onError = (error: AxiosError) => {
        setLoading(false)
        console.error(error)
        setError(true);
    }

    const handleSubmit = () => {
        setLoading(true)
        let encodedPassword = btoa(claveUsuario)
        let authDTO = { usuario: usuario, claveUsuario: encodedPassword, sistemaId: 3 }
        authApi.auth(authDTO, onResponse, onError);
    }

    const loginForm = (
        <Form >
            <Form.Input
                icon="user"
                iconPosition="left"
                placeholder="Usuario"
                name="usuario"
                value={usuario}
                onChange={handleChange}
            />
            <Form.Input
                icon="lock"
                iconPosition="left"
                placeholder="Contraseña"
                type="password"
                name="claveUsuario"
                value={claveUsuario}
                onChange={handleChange}
            />
            <Button
                fluid
                primary
                size="large"
                content="Iniciar sesión"
                loading={loading}
                onClick={handleSubmit}
            />

        </Form>
    )

    return (
        <>
            <ValidarLlave open={openValidateForm} closeModal={() => setOpenValidateForm(false)} />
            <UsuarioExternoFormModal open={open} closeModal={() => setOpen(false)} />
            <Grid textAlign="center" className={styles.body} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image src={Logo} size="medium" spaced />
                    <Header as="h1" inverted textAlign="center">SEGEFOR</Header>
                    <Segment textAlign="center">
                        {loginForm}
                        {
                            error &&
                            <Message
                                id="error"
                                error
                                header='Error de autenticación'
                                content="Nombre de usuario y/o contraseña incorrectos"
                            />
                        }
                        <Divider horizontal>Registro usuario externo</Divider>
                        <div style={{ display: "flex" }}>
                            <Button
                                fluid
                                color="facebook"
                                size="large"
                                onClick={handleRegistroClick}
                                content="Registro"
                            />
                            <Button
                                fluid
                                color="olive"
                                size="large"
                                onClick={handleValidateClick}
                                content="Validar llave" />
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    );
}