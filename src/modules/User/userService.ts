import { ModelFactory } from 'base/ModelFactory';

import { UserModel } from './models/userModel';
import { UserRepository } from './userRepository';

export class UserService {
  protected repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  getUser = async () => {
    const { data } = await this.repository.getUser();
    return ModelFactory.create(UserModel, data.data[0]);
  };
}
