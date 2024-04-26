import createApiService from '../createApiService'
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/Ward`,
        method: "GET",
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Ward",
        method: "POST",
        data: data,
    });
};
export const WardServices = {
    get,
    create
};
