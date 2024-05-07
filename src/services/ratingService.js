import createApiService from '../createApiService'
const api = createApiService();
const get = (params) => {
    return api.makeAuthRequest({
        url: `/api/Rating`,
        method: "GET",
        params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Rating",
        method: "POST",
        data: data,
    });
};
const getCountRating = (params) => {
    return api.makeAuthRequest({
        url: `/api/Rating/countRating`,
        method: "GET",
        params: params
    });
};
const deleteRating = (params) => {
    return api.makeAuthRequest({
        url: `/api/Rating`,
        method: "DELETE",
        params: params
    });
};
export const ratingServices = {
    get,
    create,
    deleteRating,
    getCountRating
};
