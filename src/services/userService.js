import createApiService from '../createApiService'
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/User`,
        method: "GET",
        // params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/User",
        method: "POST",
        data: data,
    });
};
const login = (data) => {
    return api.makeAuthRequest({
        url: "/api/User/login",
        method: "POST",
        data: data,
    })
}
export const userServices = {
    get,
    create,
    login
};
