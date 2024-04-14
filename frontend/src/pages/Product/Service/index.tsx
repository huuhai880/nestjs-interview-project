import axios_client from "@/services/axios_client";
const ProductServices = {
    getProductList: (params?: any) => {
        const url = "/products";

        return axios_client.get(url, {params})
    },

    addProduct: (params?: any) => {
        const url = `/products`;

        return axios_client.post(url, params)
    },

    updateProduct: (id: number | string | undefined, params?: any) => {
        const url = `/products/${id}`;

        return axios_client.put(url, params)
    },


    delProduct: (id: number | string | undefined, params?: any) => {
        const url = `/products/${id}`;

        return axios_client.delete(url, params)
    },

    getDetailProduct: (id: number | string | undefined, params?: any) => {
        const url = `/products/${id}`;

        return axios_client.get(url, params)
    },


}
export default ProductServices;