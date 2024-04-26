import axios from "axios";
import { serverConfig } from "./const/serverConfig";
function getAuthToken() {
    return window.localStorage.getItem("token") ?? "";
}
var { server } = serverConfig;
const _makeRequest = (instantAxios) => async (args) => {
    const _headers = args.headers ? args.headers : {};
    const body = args.body ? args.body : {};
    const defaultHeaders = {};
    const formDataHeaders = {
        'Content-Type': 'multipart/form-data',
    };
    args = {
        ...args,
        headers: {
            ...defaultHeaders,
            ...formDataHeaders,
            ..._headers,
        },
        data: body,
    };
    const request = instantAxios(args);

    return request
        .then((response) => response.data)
        .catch((error) => {
            throw error.response.data ? error.response.data : error.response;
        });
};

const _makeAuthRequest = (instantAxios) => async (args) => {
    const requestHeaders = args.headers ? args.headers : {};
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");
    const client_id = localStorage.getItem("client_id");

    const headers = {
        Authorization: `Bearer ${token}`,
        ClientID: client_id,
    };

    let isRefreshing = false;
    const failedQueue = [];

    const processQueue = (error, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        failedQueue = [];
    };

    instantAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        (err) => {
            const originalRequest = err.config;

            if (err.response.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(token => {
                            originalRequest.headers['Authorization'] = 'Bearer ' + token;
                            return axios(originalRequest);
                        })
                        .catch(err => {
                            return Promise.reject(err);
                        });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(function (resolve, reject) {
                    axios({
                        method: "POST",
                        url: `${serverConfig.server}/api/v1/auth/refresh`,
                        headers: {
                            Authorization: 'Bearer ' + refreshToken,
                        }
                    }).then(({ data }) => {
                        console.log("check data", data)
                        if (data.status) {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.data;
                            originalRequest.headers['Authorization'] = 'Bearer ' + data.data;
                            processQueue(null, data.data);
                            resolve(axios(originalRequest));
                        }
                    })
                        .catch(err => {
                            processQueue(err, null);
                            window.location.href = "/login";
                            reject(err);
                        })
                        .finally(() => {
                            isRefreshing = false;
                        });
                });
            }

            return Promise.reject(err);
        }
    );

    args = {
        ...args,
        headers: {
            ...requestHeaders,
            ...headers,
        },
    };

    const request = instantAxios(args);

    return request
        .then((response) => response.data)
        .catch((error) => {
            throw error.response;
        });
};

const makeRequest = (options = {}) => {
    let BaseURL = server;

    if (options.BaseURL) BaseURL = options.BaseURL;

    const instance = axios.create({
        baseURL: BaseURL,
        timeout: 1000000,
    });

    return {
        makeRequest: _makeRequest(instance),
        makeAuthRequest: _makeAuthRequest(instance),
    };
};

export default makeRequest;

