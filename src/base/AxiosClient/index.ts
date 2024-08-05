import axios, { AxiosInstance } from 'axios';
import IAbstractClient from '../AbstractRepository/types';
import { IAxiosConfig } from './types';

export class AxiosClient implements IAbstractClient {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create();
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
}
