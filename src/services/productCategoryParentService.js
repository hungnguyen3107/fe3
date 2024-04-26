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
export const productCategoryParentServices = {
    get,
    create

};
