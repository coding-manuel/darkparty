import axiosClass from 'axios'

export const axios = axiosClass.create({
    baseURL: 'http://localhost:9000/api',
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "content-Type": "application/json",
    },
});
