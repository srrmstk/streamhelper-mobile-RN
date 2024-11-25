import IAbstractLocalClient from './types';

export default abstract class AbstractLocalClient
  implements IAbstractLocalClient
{
  abstract get: (tableName: string) => Promise<any>;

  abstract set: (tableName: string, data: any) => Promise<any>;

  abstract removeAll: (tableName: string) => Promise<any>;

  abstract update: (tableName: string, data: any) => Promise<any>;
}
