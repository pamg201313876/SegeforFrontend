import React, { useState, createContext, useEffect } from 'react'
import Dashboard from 'app/Dashboard'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Auth } from './Auth';
import TokenResponseDTO from 'dto/auth/TokenResponseDTO'
import Loading from '../components/Loading/Loading'
import { UsuarioExternoForm } from './Auth/UsuarioExterno/UsuarioExternoForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'semantic-ui-react';


export type AppContextInterface = {
  tokenData: TokenResponseDTO | null,
  setToken: (token: TokenResponseDTO) => void,
  deleteToken: () => void,
  successToast: (message: string) => void,
  errorToast: (message: string) => void,
  showAlertMessage: (message: string, header?: string) => void
  loading: boolean,
  loadingMessage: string,
  activateLoading: (message?: string) => void,
  desactivateLoading: () => void,
  isHeaderHidden: boolean,
  setIsHeaderHidden: (value: boolean) => void,
}

export const AppDataContext = createContext<AppContextInterface>({
  tokenData: null,
  setToken: () => null,
  deleteToken: () => null,
  successToast: () => null,
  errorToast: () => null,
  showAlertMessage: () => null,
  loading: false,
  loadingMessage: "",
  activateLoading: () => null,
  desactivateLoading: () => null,
  isHeaderHidden: false,
  setIsHeaderHidden: () => null,
});

export const AppDataContextProvider = AppDataContext.Provider;
export const AppDataContextConsumer = AppDataContext.Consumer;

type alert = {
  header: string,
  message: string
}

const App: React.FC = () => {

  const [tokenData, setTokenData] = useState<TokenResponseDTO | null>(null)
  const [isTokenRefreshed, setTokenRefreshed] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string>("Cargando...")
  const [loading, setLoading] = useState(false)
  const [isHeaderHidden, setisHeaderHidden] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState<alert | null>(null)

  const successToast = (message: string) => {
    toast.success(message);
  }

  const errorToast = (message: string) => {
    toast.error(message);
  }

  const showAlertMessage = (message: string, header: string = "") => {
    setAlertMessage({
      header: header,
      message: message
    })
    setAlertOpen(true)
  }

  const closeAlertMessage = () => {
    setAlertMessage(null)
    setAlertOpen(false)
  }

  const deleteToken = () => {
    localStorage.removeItem("tokenData")
  }

  const activateLoading = (message: string = "") => {
    setLoadingMessage(message)
    setLoading(true)
  }

  const desactivateLoading = () => {
    setLoading(false)
  }

  /**
   * Permite refrescar el token y obtener información general del usuario
   */
  const refresh = () => {

    let tokenData = localStorage.getItem("tokenData")

    if (tokenData != null) {
      let tokenObj: TokenResponseDTO = JSON.parse(tokenData)
      setTokenData(tokenObj)
    }
    setTokenRefreshed(true)

    // const onResponse = (tokenResponseDTO: TokenResponseDTO) => {
    //   setTokenData(tokenResponseDTO)
    //   setTokenRefreshed(true)
    // }
    // const onError = (axiosError: AxiosError) => {
    //   console.log("Error al obtener la data")
    //   console.log(axiosError)
    //   setTokenRefreshed(true)
    // }

    // authApi.refreshToken(onResponse, onError)

  }

  const refreshCallback = React.useCallback(refresh, [])

  useEffect(() => {
    refreshCallback()
  }, [refreshCallback])

  const renderApp = () => {
    return (
      <AppDataContextProvider value={
        {
          tokenData: tokenData,
          setToken: setTokenData,
          deleteToken: deleteToken,
          successToast: successToast,
          errorToast: errorToast,
          showAlertMessage: showAlertMessage,
          loading: loading,
          loadingMessage: loadingMessage,
          activateLoading: activateLoading,
          desactivateLoading: desactivateLoading,
          isHeaderHidden: isHeaderHidden,
          setIsHeaderHidden: setisHeaderHidden
        }
      }>
        <BrowserRouter>
          <Switch>
            {
              tokenData != null ?
                <>
                  <Route path="/" component={Dashboard} />
                </>
                :
                <>
                  <Route exact path="/login" component={Auth} />
                  <Route exact path="/register_external_user" component={UsuarioExternoForm} />
                  <Route exact path="/" component={Dashboard} />
                  <Redirect to="/login" />
                </>
            }
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      </AppDataContextProvider>
    )
  }

  const app = () => {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />

        {alertOpen
          ? <Modal
            centered={false}
            open={alertOpen}
          >
            <Modal.Header>{alertMessage?.header}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {alertMessage?.message}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={closeAlertMessage}>Continuar</Button>
            </Modal.Actions>
          </Modal>
          : null
        }
        {renderApp()}
      </>
    )
  }

  return (
    <div className="App">
      {
        !isTokenRefreshed ? <Loading active={true} />
          : app()
      }
    </div>
  );


}

export default App;
