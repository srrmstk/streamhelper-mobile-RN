import EncryptedStorage from 'react-native-encrypted-storage';

import AbstractLocalClient from '../AbstractLocalClient';

export default class EncryptedStorageClient extends AbstractLocalClient {
  get = async (tableName: string): Promise<any> => {
    const data = await EncryptedStorage.getItem(tableName);
    return data ? JSON.parse(data) : null;
  };

  set = async (tableName: string, data: any): Promise<any> => {
    return EncryptedStorage.setItem(tableName, JSON.stringify(data));
  };

  removeAll = async (tableName: string): Promise<any> => {
    return EncryptedStorage.removeItem(tableName);
  };
}
