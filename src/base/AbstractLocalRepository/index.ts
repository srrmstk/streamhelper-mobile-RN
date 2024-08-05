import IAbstractLocalClient from '../AbstractLocalClient/types';
import AsyncStorageClient from '../LocalStorageClient';
import EncryptedStorageClient from '../EncryptedStorageClient';
import { ELocalClientTypes } from './types';

export default abstract class AbstractLocalRepository {
  client!: IAbstractLocalClient;

  private static clients = {
    [ELocalClientTypes.asyncStorage]: new AsyncStorageClient(),
    [ELocalClientTypes.encryptedStorage]: new EncryptedStorageClient(),
  };

  constructor(storageType = ELocalClientTypes.asyncStorage) {
    this.setClient(AbstractLocalRepository.clients[storageType]);
  }

  setClient = (client: IAbstractLocalClient) => {
    this.client = client;
  };

  abstract tableName(): string;

  get = async () => {
    return await this.client.get(this.tableName());
  };

  set = async (data: any) => {
    return await this.client.set(this.tableName(), data);
  };

  update = async (data: any) => {
    return await this.client.update(this.tableName(), data);
  };

  removeAll = async () => {
    return await this.client.removeAll(this.tableName());
  };
}
