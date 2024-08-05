import { AxiosRequestConfig } from 'axios';

export interface IAxiosConfig {
  url: string;
  data?: Object;
  config?: AxiosRequestConfig;
}
