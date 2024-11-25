import AsyncStorage from '@react-native-async-storage/async-storage';

import AbstractLocalClient from '../AbstractLocalClient';

export default class AsyncStorageClient implements AbstractLocalClient {
  get = async (tableName: string) => {
    const data = await AsyncStorage.getItem(tableName);
    return data ? JSON.parse(data) : null;
  };

  set = async (tableName: string, data: any) => {
    return AsyncStorage.setItem(tableName, JSON.stringify(data));
  };

  removeAll = async (tableName: string) => {
    return AsyncStorage.removeItem(tableName);
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
