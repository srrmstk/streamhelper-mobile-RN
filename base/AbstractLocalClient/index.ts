import IAbstractLocalClient from './types';

export default abstract class AbstractLocalClient
  implements IAbstractLocalClient
{
  abstract get: (tableName: string) => Promise<any>;

  abstract set: (tableName: string, data: any) => Promise<any>;

  abstract removeAll: (tableName: string) => Promise<any>;

  update = async (tableName: string, data: any): Promise<any> => {
    let res = await this.get(tableName);

    if (res) {
      for (let k in data) {
        res[k] = data[k];
      }
    }

    return await this.set(tableName, res);
  };
}
