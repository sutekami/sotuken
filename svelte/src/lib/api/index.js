import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Request_With': 'XMLHttpRequest',
  },
  responseType: 'json',
  withCredentials: true,
});

const api = {
  root: {
    session: () => {
      const config = { url: '/', method: 'get' };
      return axiosInstance.request(config);
    },
  },
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
  signin: {
    index: () => {},
    auth: ({params}) => {
      const config = {
        url: '/signin',
        method: 'post',
        data: params,
      };
      return axiosInstance.request(config);
    },
  },
  new_issue: {
    create: ({params}) => {
      const config = {
        url: '/new-issue',
        method: "post",
        data: params,
      };
      return axiosInstance.request(config);
    },
  }
};

export default api;
