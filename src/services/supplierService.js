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
const deleteSupplier = (params) => {
    return api.makeAuthRequest({
        url: `/api/Supplier`,
        method: "DELETE",
        params: params
    });
};
const updateSupplier = (Id, data) => {
    return api.makeAuthRequest({
        url: `/api/Supplier?Id=${Id}`,
        method: "PUT",
        data: data
    });
};
export const supplierServices = {
    get,
    create,
    deleteSupplier,
    updateSupplier
};
