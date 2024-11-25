import IAbstractClient from './types';
import { AxiosClient } from '../AxiosClient';

export default abstract class AbstractRepository<
  T extends IAbstractClient = AxiosClient,
> {
  client!: T;

  constructor(client: IAbstractClient = new AxiosClient()) {
    // @ts-ignore
    this.setClient(client);
  }

  setClient = (client: T) => {
    this.client = client;
  };
}
