import createApiService from '../createApiService'
const api = createApiService();
const create = (data) => {
    return api.makeAuthRequest({
        url: "/api/Pay/create-payment-url",
        method: "POST",
        data: data,
    });
};
export const vnPayServices = {
    create
};
