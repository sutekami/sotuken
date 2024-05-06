import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Request_With': 'XMLHttpRequest',
  },
  responseType: 'json'
});

const api = {
  signup: {
    index: () => {
      const config = { url: '/signup', method: 'get' }
      return axiosInstance.request(config);
    },
    create: ({params}) => {
      const config = {
        url: '/signup',
        method: 'post',
        data: params,
      };
      return axiosInstance.request(config);
    },
  },
};

export default api;
