import createApiService from '../createApiService'
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/Rating`,
        method: "GET",
        // params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Rating",
        method: "POST",
        data: data,
    });
};
export const ratingServices = {
    get,
    create,
};
