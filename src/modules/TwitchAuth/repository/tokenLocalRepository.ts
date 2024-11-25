import AbstractLocalRepository from '../../../base/AbstractLocalRepository';
import { ELocalClientTypes } from '../../../base/AbstractLocalRepository/types';

export default class TokenLocalRepository extends AbstractLocalRepository {
  constructor() {
    super(ELocalClientTypes.encryptedStorage);
  }

  tableName(): string {
    return 'accessToken';
  }
}
