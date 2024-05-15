import createApiService from '../createApiService'
const api = createApiService();
const get = (params) => {
    return api.makeAuthRequest({
        url: `/api/ProductCategory`,
        method: "GET",
        params: params
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/ProductCategory",
        method: "POST",
        data: data,
    });
};
const deleteCategory = (params) => {
    return api.makeAuthRequest({
        url: `/api/ProductCategory`,
        method: "DELETE",
        params: params
    });
};
const updateCategory = (Id, data) => {
    return api.makeAuthRequest({
        url: `/api/ProductCategory?Id=${Id}`,
        method: "PUT",
        data: data
    });
};
export const categoryServices = {
    get,
    create,
    deleteCategory,
    updateCategory
};
