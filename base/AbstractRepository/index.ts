import IAbstractClient from './types';
import { AxiosClient } from '../AxiosClient';

export default abstract class AbstractRepository<
  T extends IAbstractClient = AxiosClient,
> {
  client!: T;

  constructor() {
    // @ts-ignore
    this.setClient(new AxiosClient());
  }

  setClient = (client: T) => {
    this.client = client;
  };
}
