import createApiService from '../createApiService'
const api = createApiService();
const get = (params) => {
    return api.makeAuthRequest({
        url: `/api/product`,
        method: "GET",
        params: params
    });
};

const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/product",
        method: "POST",
        data: data,
    });
};
const deleteProduct = (params) => {
    return api.makeAuthRequest({
        url: `/api/product`,
        method: "DELETE",
        params: params
    });
};
const updateProduct = (Id, data) => {
    return api.makeAuthRequest({
        url: `/api/product?Id=${Id}`,
        method: "PUT",
        data: data
    });
};
export const productServices = {
    get,
    create,
    deleteProduct,
    updateProduct
};
