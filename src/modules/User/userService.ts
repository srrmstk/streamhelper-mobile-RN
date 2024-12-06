import { ModelFactory } from 'base/ModelFactory';
import { BanUserDto } from 'modules/User/dto/banUserDto';
import { UnbanUserDto } from 'modules/User/dto/unbanUserDto';

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

  getUserById = async (id: string) => {
    const { data } = await this.repository.getUserById(id);
    return ModelFactory.create(UserModel, data.data[0]);
  };

  banUser = async (dto: BanUserDto) => {
    return await this.repository.banUser(dto);
  };

  unbanUser = async (dto: UnbanUserDto) => {
    return await this.repository.unbanUser(dto);
  };
}
