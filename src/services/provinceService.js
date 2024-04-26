import createApiService from '../createApiService'
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/Province`,
        method: "GET",
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/province",
        method: "POST",
        data: data,
    });
};
export const provinceServices = {
    get,
    create

};
