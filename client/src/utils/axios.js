import axiosClass from 'axios'

export const axios = axiosClass.create({
    baseURL: 'http://localhost:9000/api',
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

export const freeAxios = axiosClass.create({
    baseURL: 'http://localhost:9000/api',
    headers: {
        Accept: "application/json",
    },
});
