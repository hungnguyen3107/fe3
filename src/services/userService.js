import createApiService from '../createApiService'
const api = createApiService();
const get = (params) => {
    return api.makeAuthRequest({
        url: `/api/User`,
        method: "GET",
        params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/User",
        method: "POST",
        data: data,
    });
};
const updatUser = (Id, data) => {
    return api.makeAuthRequest({
        url: `/api/User?Id=${Id}`,
        method: "PUT",
        data: data
    });
};
const login = (data) => {
    return api.makeAuthRequest({
        url: "/api/User/login",
        method: "POST",
        data: data,
    })
}
const deleteUser = (params) => {
    return api.makeAuthRequest({
        url: `/api/User`,
        method: "DELETE",
        params: params
    });
};
export const userServices = {
    get,
    create,
    login,
    updatUser,
    deleteUser
};
