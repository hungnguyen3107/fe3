import createApiService from '../createApiService'
const api = createApiService();
const get = (params) => {
    return api.makeAuthRequest({
        url: `/api/Order`,
        method: "GET",
        params: params
    });
};
const changeStatus = (params, data) => {
    return api.makeAuthRequest({
        url: `/api/Order`,
        method: "PUT",
        params: params,
        data: data
    });
};
const getId = (params) => {
    return api.makeAuthRequest({
        url: `/api/Order/OrderDetail`,
        method: "GET",
        params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Order",
        method: "POST",
        data: data,
    });
};
export const orderServices = {
    get,
    create,
    getId,
    changeStatus

};
