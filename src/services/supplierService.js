import createApiService from '../createApiService'
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/Supplier`,
        method: "GET",
        // params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Supplier",
        method: "POST",
        data: data,
    });
};
export const supplierServices = {
    get,
    create,
};
