import createApiService from '../createApiService'
const api = createApiService();
const get = () => {
    return api.makeAuthRequest({
        url: `/api/ProductCategoryParent`,
        method: "GET",
    });
};
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/ProductCategoryParent",
        method: "POST",
        data: data,
    });
};
const deleteCategoryParent = (params) => {
    return api.makeAuthRequest({
        url: `/api/ProductCategoryParent`,
        method: "DELETE",
        params: params
    });
};
const updateCategoryParent = (Id, data) => {
    return api.makeAuthRequest({
        url: `/api/ProductCategoryParent?Id=${Id}`,
        method: "PUT",
        data: data
    });
};
export const productCategoryParentServices = {
    get,
    create,
    deleteCategoryParent,
    updateCategoryParent
};
