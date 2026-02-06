const axios = require('axios');
const BASE_URL = 'https://api.escuelajs.co/api/v1/categories'; 

const categoryService = {
    getAll: async (name = "") => {
        const url = name ? `${BASE_URL}/?name=${name}` : BASE_URL;
        const response = await axios.get(url);
        return response.data;
    },
    getById: async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    },
    getBySlug: async (slug) => {
        const response = await axios.get(`${BASE_URL}/?slug=${slug}`);
        return response.data;
    },
    create: async (data) => {
        const response = await axios.post(BASE_URL, data);
        return response.data;
    },
    edit: async (id, data) => {
        const response = await axios.put(`${BASE_URL}/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    },
    getProductsByCategory: async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}/products`);
        return response.data;
    }
};

module.exports = categoryService;   