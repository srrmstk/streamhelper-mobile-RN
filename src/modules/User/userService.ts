import { UserRepository } from './userRepository';
import { ModelFactory } from '../../base/ModelFactory';
import { UserModel } from './models/userModel';

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
