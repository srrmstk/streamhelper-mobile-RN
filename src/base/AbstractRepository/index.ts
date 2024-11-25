import IAbstractClient from './types';
import { AxiosClient } from '../AxiosClient';

export default abstract class AbstractRepository {
  client!: IAbstractClient;

  constructor(client: IAbstractClient = new AxiosClient()) {
    this.setClient(client);
  }

  setClient = (client: IAbstractClient) => {
    this.client = client;
  };
}
