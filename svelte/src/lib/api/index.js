import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Request_With': 'XMLHttpRequest',
  },
  responseType: 'json'
});

const test = async () => {
  const res = await axiosInstance.get('/signup');
  console.log(res);
}

export { test };
