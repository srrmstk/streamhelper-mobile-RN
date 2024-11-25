import EncryptedStorage from 'react-native-encrypted-storage';

import AbstractLocalClient from '../AbstractLocalClient';

export default class EncryptedStorageClient implements AbstractLocalClient {
  get = async (tableName: string) => {
    const data = await EncryptedStorage.getItem(tableName);
    return data ? JSON.parse(data) : null;
  };

  set = async (tableName: string, data: any) => {
    return EncryptedStorage.setItem(tableName, JSON.stringify(data));
  };

  removeAll = async (tableName: string) => {
    return EncryptedStorage.removeItem(tableName);
  };

  update = async (tableName: string, data: any) => {
    let res = await this.get(tableName);

    if (res) {
      for (let k in data) {
        res[k] = data[k];
      }
    }

    return await this.set(tableName, res);
  };
}
