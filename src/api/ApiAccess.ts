import Axios, { AxiosResponse, AxiosError } from 'axios'
import { saveAs } from 'file-saver';
import GetPageProps from './types/GetPageProps';
import SearchGenerator from './SearchGenerator';
import Page from './types/Page';
import GetDeleteProps from './types/GetDeleteProps';
import PostPutProps from './types/PostPutProps';
import PageResponse from './types/PageResponse';
import SortGenerator from './SortGenerator';
import GetFileProps from './types/GetFileProps';
import PostFileProps from './types/PostFileProps';

const devURL = "http://localhost:8084"
const extTestURL = "http://35.209.77.64:8085"
const extURL = "http://35.209.77.64:8084"

const base_url = window.location.origin
const refreshTokenUrl = "/refresh-token"

// const headers = {
//     'Content-Type': 'application/json',
//     'Charset': 'utf-8',
//     'Access-Control-Allow-Origin': base_url,
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
// }

const getHeaders = () => {
    let token = localStorage.getItem("token")
    let headers: any = {
        'Content-Type': 'application/json',
        'Charset': 'utf-8'
    }
    if (token != null) {
        headers["Authorization"] = `Bearer ${token}`
    }
    return headers
}

/** Instancia de axios aplicando configuraciones especificas para la comunicación. */
const axiosInstance = Axios.create({
    baseURL: devURL,
    withCredentials: true
});

const deleteTokens = () => {
    localStorage.removeItem("tokenData")
    localStorage.removeItem("token")
}

function genericRequest(props: GetDeleteProps, methodType: any, body?: object, handle401: boolean = true) {
    let axios = axiosInstance(
        {
            url: props.relativePath,
            method: methodType,
            params: props.params,
            data: body,
            headers: getHeaders()
        }
    )

    axios.then(res => {
        props.onResponse(res);
    }).catch((error: AxiosError) => {
        if (error.response?.status === 401 && handle401) {
            window.alert("Su sesión a expirado.")
            window.location.href = base_url + "/login"
            deleteTokens()
        }
        else {
            props.onError(error);
        }
    })

}

function fileUpload(props: PostPutProps, handle401: boolean = true) {

    let headers = getHeaders()
    headers['Content-Type'] = 'multipart/form-data'

    axiosInstance(
        {
            headers: headers,
            url: props.relativePath,
            method: 'post',
            params: props.params,
            data: props.body,
        }
    ).then(res => {
        props.onResponse(res);
    }).catch((error: AxiosError) => {
        if (error.response?.status === 401 && handle401) {
            window.alert("Su sesión a expirado.")
            window.location.href = base_url + "/login"
            deleteTokens()
        }
        else {
            props.onError(error);
        }
    })
}

function fileRequest(props: GetFileProps, methodType: any, body?: object, handle401: boolean = true) {
    axiosInstance(
        {
            url: props.relativePath,
            method: methodType,
            params: props.params,
            data: body,
            responseType: 'blob',
            timeout: 300000,
            headers: getHeaders()
        }
    ).then(res => {
        if (props.filename != null) {
            saveAs(res.data, props.filename)
        }
        else {
            saveAs(res.data)
        }
        props.onResponse(res)
    }).catch(error => {
        if (error.response?.status === 401 && handle401) {
            window.alert("Su sesión a expirado.")
            window.location.href = base_url + "/login"
            deleteTokens()
        }
        else {
            props.onError(error);
        }
    })
}

/** Realiza una solicitud de tipo GET al servicio.
 *  @param {GetDeleteProps} props Propiedades de la solicitud a realizar. 
 */
function getRequest(props: GetDeleteProps) {

    genericRequest(props, 'get');

}

/** Realiza una solicitud de tipo GET al servicio para solicitar una página.
 *  @param {GetPageProps} props Propiedades de la solicitud a realizar. 
 */
function getPageRequest(props: GetPageProps) {

    let params = new URLSearchParams()
    params.append("page", props.pageNumber.toString())
    params.append("size", props.size.toString())

    if (props.sort != null) {
        props.sort.forEach(element => {
            params.append("sort", SortGenerator(element))
        });
    }

    if (props.search != null) {
        let searchString = SearchGenerator(props.search).trim()
        console.log(searchString)
        if (searchString !== "") {
            params.append("search", SearchGenerator(props.search))
        }
    }

    if (props.params != null) {
        props.params.forEach(function (value, key) {
            params.append(key, value)
        });
    }

    const handleResponse = (res: AxiosResponse) => {
        let pageData = res.data.page
        let page: Page = {
            list: pageData.content,
            page: pageData.number,
            size: pageData.size,
            isFirst: pageData.first,
            isLast: pageData.isLast,
            totalPages: pageData.totalPages
        }
        let pageRes = res as PageResponse
        pageRes.page = page
        props.onResponse(pageRes)
    }

    let getProps: GetDeleteProps = {
        relativePath: props.relativePath,
        params: params,
        onResponse: handleResponse,
        onError: props.onError
    }

    getRequest(getProps)
}

function getFileRequest(props: GetFileProps) {
    fileRequest(props, 'get')
}


/** Realiza una solicitud de tipo POST al servicio.
 *  @param {PostPutProps} props Propiedades de la solicitud a realizar. 
 */
function postRequest(props: PostPutProps) {

    genericRequest(props, 'post', props.body);

}

/** Realiza una solicitud de tipo POST al servicio.
 *  @param {PostPutProps} props Propiedades de la solicitud a realizar. 
 */
function uploadFileRequest(props: PostPutProps) {
    fileUpload(props);
}

function postRequestNo401(props: PostPutProps) {

    genericRequest(props, 'post', props.body, false);

}


/** Realiza una solicitud de tipo POST al servicio.
 *  @param {PostPutProps} props Propiedades de la solicitud a realizar. 
 */
function postFileRequest(props: PostFileProps) {

    fileRequest(props, 'post', props.body);

}


/** Realiza una solicitud de tipo PUT  al servicio.
 *  @param {PostPutProps} props Propiedades de la solicitud a realizar. 
 */
function putRequest(props: PostPutProps) {

    genericRequest(props, 'put', props.body);

}

function putRequestNo401(props: PostPutProps) {
    genericRequest(props, 'put', props.body, false);
}


/** Realiza una solicitud de tipo DELETE al servicio.
 *  @param {GetDeleteProps} props Propiedades de la solicitud a realizar. 
 */
function deleteRequest(props: GetDeleteProps) {

    genericRequest(props, 'delete');

}


export { getRequest, getFileRequest, getPageRequest, uploadFileRequest, postRequest, postFileRequest, postRequestNo401, deleteRequest, putRequest, putRequestNo401 };
