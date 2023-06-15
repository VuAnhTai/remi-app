import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';
import { customAlphabet } from 'nanoid';
import { ACCESS_TOKEN_KEY, API_URI, USER_KEY } from '@/env/constants';
import qs from 'qs';
import { PUBLIC_URLS } from '@/auth/constants';
import { DomUtils } from '@/common/utils/dom';
import { LocalStorageUtils } from '@/common/utils';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const randomId = () => customAlphabet(ALPHABET, 32)();

const myAxios = axios.create({
  baseURL: API_URI,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(myAxios, {
  retries: 5,
  retryCondition: e => {
    return isNetworkOrIdempotentRequestError(e) || e.response?.status === 502;
  },
  retryDelay: axiosRetry.exponentialDelay,
});

myAxios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    config.headers = config.headers || {};

    const accessToken = LocalStorageUtils.get(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // config.headers['X-Frontend-Version'] = `${APP_VERSION}_${BUILD_NUMBER}`
    config.headers['X-Request-Id'] = randomId();
    if (config.method === 'post') {
      config.headers['X-Idempotent-Key'] = randomId();
    }

    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {
    const path = location.pathname;

    if (error?.response?.status === 401 && !DomUtils.isServer() && !PUBLIC_URLS.includes(path)) {
      LocalStorageUtils.remove(ACCESS_TOKEN_KEY);
      LocalStorageUtils.remove(USER_KEY);
      location.href = '/login';
    }

    return Promise.reject(error.response?.data);
  }
);

export const RestApis = myAxios;

export type RestApiConfig = AxiosRequestConfig;
