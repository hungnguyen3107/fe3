import createApiService from '../createApiService'
const api = createApiService();

const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Return",
        method: "POST",
        data: data,
    });
};
const get = (params) => {
    return api.makeAuthRequest({
        url: `/api/Return`,
        method: "GET",
        params: params
    });
};
export const returnServices = {
    create,
    get
};
