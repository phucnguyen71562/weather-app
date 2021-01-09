import axios from 'axios';
import queryString from 'query-string';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params: any) => queryString.stringify(params),
});

instance.interceptors.request.use((config: any) => {
  const customHeaders = {};

  return {
    ...config,
    headers: {
      ...customHeaders,
      ...config.headers,
    },
  };
});

instance.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default instance;
