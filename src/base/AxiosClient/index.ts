import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import { LOCALES } from 'constants/locales';
import { ToastService } from 'modules/Toast/toastService';

import { IAxiosConfig } from './types';
import IAbstractClient from '../AbstractRepository/types';

export class AxiosClient implements IAbstractClient {
  client: AxiosInstance;
  private toastService: ToastService;

  static readonly SUCCESS_CODES = [200, 201, 202, 203, 204];
  static readonly SERVER_ERROR_CODE = 500;
  static readonly UN_AUTH = 401;

  // eslint-disable-next-line
  constructor(props?: CreateAxiosDefaults<any>) {
    this.client = axios.create(props);
    this.toastService = new ToastService();

    this.setInterceptorRequest();
    this.setInterceptorResponse();
  }

  get = (config: IAxiosConfig) => {
    return this.client.get(config.url, config.config);
  };

  post = (config: IAxiosConfig) => {
    return this.client.post(config.url, config.data, config.config);
  };

  put = (config: IAxiosConfig) => {
    return this.client.put(config.url, config.data, config.config);
  };

  delete = (config: IAxiosConfig) => {
    return this.client.delete(config.url, config.config);
  };

  setAccessToken = (token: string) => {
    this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
  };

  clearAccessToken = () => {
    this.client.defaults.headers['Authorization'] = null;
  };

  private setInterceptorRequest = () => {
    this.client.interceptors.request.use(
      async config => {
        const newConfig: InternalAxiosRequestConfig = {
          ...config,
          headers: {
            ...config.headers,
          } as AxiosRequestHeaders,
        };

        return newConfig;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  };

  private setInterceptorResponse = () => {
    this.client.interceptors.response.use(
      response => {
        if (!AxiosClient.SUCCESS_CODES.includes(response.status)) {
          this.toastService.showErrorToast({
            title: response.data?.message || LOCALES.SomethingWentWrong,
            description: LOCALES.PleaseTryAgain,
          });

          return Promise.reject(response);
        }

        return response;
      },
      error => {
        const status = error.response?.status;

        if (status === AxiosClient.SERVER_ERROR_CODE) {
          this.toastService.showErrorToast({
            title: LOCALES.ServerError,
            description: LOCALES.PleaseTryAgain,
          });
        }

        if (status === AxiosClient.UN_AUTH) {
          // logout
          return;
        }

        return Promise.reject(error);
      },
    );
  };
}
