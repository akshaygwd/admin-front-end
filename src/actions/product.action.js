import axiosInstance from "../helpers/axios"

export const addProduct = form => {
    return async dispatch => {
        const res = await axiosInstance.post('/product/createProduct', form);
        console.log(res);
    }
}